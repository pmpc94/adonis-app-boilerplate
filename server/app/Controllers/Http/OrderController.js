'use strict'

const Order = use('App/Models/Order');
const OrderProduct = use('App/Models/OrderProduct');
const Product = use ('App/Models/Product');
const User = use('App/Models/User');
const Config = use('Config');
const Database = use('Database');

class OrderController {
  async index({ auth, request, response }) {
    const user = await auth.getUser();
    const orders = await Order
      .query()
      .whereHas('orderProducts', (builder) => {
        builder.join('products', 'order_products.product_id', '=', 'products.id').where('products.user_id', user.id)
      }, '>', 0)
      .with('orderProducts', (builder) => {
        builder.join('products', 'order_products.product_id', '=', 'products.id').where('products.user_id', user.id)
      })
      .fetch()
    response.ok('A list of your current customer orders.', orders);
  }

  async show({ auth, request, response }) {
    const { id } = request.params;
    const order = await Order.find(id);
    response.ok('The order that you requested.', order);
  }

  async store({ request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const {
        first_name,
        last_name,
        email,
        address1,
        address2,
        status,
        quantity,
        product_id
      } = request.all();
    let { total_price } = request.all();
    let user = await User.findOrCreate({ email }, {
      firstName: first_name,
      lastName: last_name,
      email: email,
      password: 'useless',
      role: 'customer'
    }, trx);
      const order = await Order.create({
        customer_id: user.id,
        first_name,
        last_name,
        address1,
        address2,
        total_price,
        status
      }, trx);

      for (let i=0; i<product_id.length; i++) {
        const product = await Product.find(product_id[i]);
        await order.orderProducts().create({
          product_name: product.name,
          price: product.price,
          quantity,
          order_id: order.id,
          product_id: product_id[i]
        }, trx);
        total_price = total_price + (quantity * product.price);
      }
          order.merge({ total_price });
          await order.save(trx);
          trx.commit();
        response.ok('Your order was successfully created.', order);
      } catch(error) {
        throw error;
      }
  }

  async update({ auth, request, response }) {
    const user = await auth.getUser();
    const { id } = request.params;
    const order = await Order.find(id);
    order.merge(request.only(['status']));
    await order.save();
    response.ok('Your order was updated.', order);
  }
}

module.exports = OrderController
