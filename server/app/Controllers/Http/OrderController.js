'use strict'

const Order = use('App/Models/Order');
const OrderProduct = use('App/Models/OrderProduct');
const Product = use ('App/Models/Product');
const User = use('App/Models/User');

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
    const {
      customer_id,
      first_name,
      last_name,
      email,
      address1,
      address2,
      status,
      product_name,
      price,
      quantity,
      product_id
    } = request.all();
    let {
      total_price
    } = request.all();
    const order = new Order();
      order.fill({
        customer_id,
        first_name,
        last_name,
        address1,
        address2,
        total_price,
        status
      });
    await order.save();
    const orderProduct = new OrderProduct();
      orderProduct.fill({
        product_name,
        price,
        quantity,
        order_id: order.id,
        product_id
      });
    await orderProduct.save();
    total_price = total_price + (quantity * price);
    await order.merge({ total_price });
    await order.save({ total_price });
    response.ok('Your order was successfully created, order', order);
    //TODO - SAVE USER
    //TODO - DATABASE TRANSACTIONS
  }

  async update({ auth, request, response }) {
    const user = await auth.getUser();
    const { id } = request.params;
    const order = await Order.find(id);
    order.merge(request.only(['status']));
    await order.save();
    response.ok('Your order was updated.', order);
    //TODO - STATUS CAN BE CHANGED FROM:
    // PAID -> CANCELED
    // CREATED -> CANCELED
    // CREATED -> PAID
    // CANCELED -> [CANNOT BE CHANGED]
  }
}

module.exports = OrderController
