'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

// import('@adonisjs/lucid/src/Factory')}
const Factory = use('Factory');

class UserSeeder {
  async run () {
    const user = await Factory.model('App/Models/User').create(100);
    const order = await Factory.model('App/Models/Order').make();
    const product = await Factory.model('App/Models/Product').make();

    await user.orders().save(order);
    await user.products().save(product);
  }
}

module.exports = UserSeeder
