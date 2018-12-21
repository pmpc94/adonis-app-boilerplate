'use strict'

/*
|--------------------------------------------------------------------------
| OrderProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class OrdersProductsSeeder {
  async run () {
      const orderProduct = await Factory.model('App/Models/OrderProduct').createMany(50);
  }
}

module.exports = OrdersProductsSeeder
