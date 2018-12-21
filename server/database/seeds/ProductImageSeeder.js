'use strict'

/*
|--------------------------------------------------------------------------
| ProductImageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProductImageSeeder {
  async run () {
    const productImage = await Factory.model('App/Models/ProductImage').createMany(200);
  }
}

module.exports = ProductImageSeeder
