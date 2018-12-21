'use strict'

const Order = use('App/Models/Order');
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
      total_price,
      status
    } = request.all();
    const user = await User.find(customer_id);console.log(user);
    if (!user) {
      return response.status(404).json({data: 'User does not exist'});
    }
    else if (user.role ==='vendor') {
      return response.status(404).json({data: 'User is not a customer'});
    }
    else if (user.role === 'customer') {
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
    return response.status(200).json(order);
    }
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
