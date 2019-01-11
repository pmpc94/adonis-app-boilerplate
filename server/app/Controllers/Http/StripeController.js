'use strict'
const Order = use('App/Models/Order');
const OrderProduct = use('App/Models/OrderProduct');
const Mail = use('Mail');
const Config = use('Config');

class StripeController {
  async store({ request, response }) {
    try {
      const { data, type } = request.all();
      const ch_id = data.object.id;
      const email = data.object.receipt_email;
      const order = await Order.findBy('stripe_customer_id', ch_id);
      //TODO - more errors should be handled
      if (type === 'charge.succeeded') {
        order.merge({ status: 'paid' })
      } else if (type === 'charge.expired' || type === 'charge.failed') {
        order.merge({ status: 'canceled'})
      } else {
        order.merge({ status: 'created'})
      }
      order.save();

      const orderProducts = await order.orderProducts().fetch()
      console.log("ORDER", orderProducts.toJSON())

      await Mail.send('emails.confirmed', orderProducts.toJSON(), (message) => {
        message.from(Config.get('mail.from'))
        message.to(email)
        message.subject('Your order is confirmed.')
      });

      //TODO - GET VENDORS
      //Iterate through vendors length
      //send email to each vendor with correspondent orderProducts

      response.ok('Your order was successfully charged.', order);
    } catch (error) {
      response.errorHandler({}, error);
    }

  }
}

module.exports = StripeController
