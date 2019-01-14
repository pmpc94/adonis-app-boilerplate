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

      if (type === 'charge.succeeded') {
        order.merge({ status: 'paid' })
      } else if (type === 'charge.expired' || type === 'charge.failed') {
        order.merge({ status: 'canceled'})
      } else {
        order.merge({ status: 'created'})
      }
      order.save();

      const orderProducts = await order.orderProducts().fetch()

      await Mail.send('emails.confirmed', { first_name: order.first_name, last_name: order.last_name, order_id: order.id, orderProducts: orderProducts.toJSON(), total: order.total_price }, (message) => {
        message.from(Config.get('mail.from'))
        message.to(email)
        message.subject('Your order is confirmed.')
      });

      const query = await Order
      .query()
      .join('order_products', 'order_products.order_id', '=', 'orders.id')
      .join('products', 'products.id', '=', 'order_products.product_id')
      .join('users', 'users.id', 'products.user_id')
      .where('order_products.order_id', orderProducts.rows[0].order_id).fetch()

      for (let i=0, user_id=0, vendors=[]; i<query.rows.length; i++) {

        user_id = query.rows[i].user_id;
        if (!vendors.includes(user_id)) {
          let filteredProducts = query.toJSON().filter(x => x.user_id === user_id);
          let total = 0;
          await Mail.send('emails.orders', {
            products: filteredProducts,
            first_name: filteredProducts[0].firstName,
            last_name: filteredProducts[0].lastName,
            customer_first_name: filteredProducts[0].first_name,
            customer_last_name: filteredProducts[0].last_name,
            customer_email: order.receipt_email,
            order_id: filteredProducts[0].order_id,
            total: filteredProducts.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), total)
          }, (message) => {
            message.from(Config.get('mail.from'))
            message.to(filteredProducts[0].email)
            message.subject('You just sold some products.')
          });
          vendors.push(user_id);
        }
      }
      response.ok('Your order was successfully charged.', order);
    } catch (error) {
      console.log("error", error)
      response.errorHandler({}, error);
    }

  }
}

module.exports = StripeController
