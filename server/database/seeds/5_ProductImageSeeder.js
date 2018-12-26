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
    //make sure all products have at least one or more images associated
    for(let i=1; i<=200; i++) {
      await Factory.model('App/Models/ProductImage').create(
      {
        id: i
      });
      await Factory.model('App/Models/ProductImage').create(
      {
        id: (Math.floor(Math.random() * 200) + 1)
      });
    }
  }
}

module.exports = ProductImageSeeder
