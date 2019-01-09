'use strict'
const Order = use('App/Models/Order');

class StripeController {
  async store({ request, response }) {
    try {
      const { data, type } = request.all();
      const ch_id = data.object.id;
      const order = await Order.findBy('stripe_customer_id', ch_id);
      //more cases will be handled
      if (type === 'charge.succeeded') {
        order.merge({ status: 'paid' })
      } else if (type === 'charge.expired' || type === 'charge.failed') {
        order.merge({ status: 'canceled'})
      } else {
        order.merge({ status: 'created'})
      }
      order.save();
      response.ok('Your order was successfully charged.', order);
    } catch (error) {
      response.errorHandler({}, error);
    }

  }
}

module.exports = StripeController
