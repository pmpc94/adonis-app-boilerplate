'use strict'

const Order = use('App/Models/Order');
const OrderProduct = use('App/Models/OrderProduct');
const User = use('App/Models/User');

class OrderController {
  async index({ auth, request }) {
    const user = await auth.getUser();
    return await user.orders().fetch();
  }

  async show({ auth, request, params }) {

  }

  async store({ request, response }) {
    const {
      customer_id,
      first_name,
      last_name,
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
  }

  async update({ auth, request, params, response }) {
    const user = await auth.getUser();
    const { id } = params;
    const order = await Order.find(id);
    order.merge(request.only(['status']));
    await order.save();
    return response.status(200).json(order);
  }
}

module.exports = OrderController
