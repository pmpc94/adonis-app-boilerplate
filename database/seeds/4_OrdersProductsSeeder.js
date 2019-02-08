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
    //make sure all orders have at least one or more products associated
    for(let i=1; i<=50; i++) {
      await Factory.model('App/Models/OrderProduct').create(
        {
          id: i
        });
        await Factory.model('App/Models/OrderProduct').create(
          {
            id: (Math.floor(Math.random() * 50) + 1)
          });
        }
      }
    }

    module.exports = OrdersProductsSeeder
