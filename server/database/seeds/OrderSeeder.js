'use strict'

/*
|--------------------------------------------------------------------------
| OrderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class OrderSeeder {
  async run () {
    const order = await Factory.model('App/Models/Order').make();
    const orderProduct = await Factory.model('App/Models/OrderProduct').make();

    await order.orderProducts().save(orderProduct);
  }
}

module.exports = OrderSeeder
