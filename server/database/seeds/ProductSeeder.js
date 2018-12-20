'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProductSeeder {
  async run () {
    const product = await Factory.model('App/Models/Product').create(200);
    const productImage = await Factory.model('App/Models/ProductImage').make();
    const orderProduct = await Factory.model('App/Models/OrderProduct').make();

    await product.productImages().save(productImage);
    await product.orderProducts().save(orderProduct);
  }
}

module.exports = ProductSeeder
