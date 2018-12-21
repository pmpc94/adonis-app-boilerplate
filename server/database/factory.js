'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');
const helper = require('./helper');

var roleArray = ['customer', 'vendor'];
var categoryArray = ['terrestrial', 'giant', 'dwarf'];
var statusArray = ['created', 'paid', 'canceled'];

  Factory.blueprint('App/Models/User', async (faker) => {
  return {
    firstName: faker.first(),
    lastName: faker.last(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    role: helper.getRandomElement(roleArray)
  }
});

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    name: faker.name(),
    description: faker.sentence(),
    category: helper.getRandomElement(categoryArray),
    price: faker.floating({ min:1, max: 50}),
    user_id: helper.getRandomVendorId()
  }
});

Factory.blueprint('App/Models/Order', (faker) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    address1: faker.address(),
    address2: faker.address(),
    total_price: 0,
    status: helper.getRandomElement(statusArray),
    customer_id: helper.getRandomCustomerId()
  }
});

Factory.blueprint('App/Models/OrderProduct', async (faker, id, data) => {
  var quantity = faker.integer({ min: 1, max: 5 });
  var product = await helper.getRandomProduct(data.id, quantity);
  return {
    product_name: product[0][0].name,
    price: product[0][0].price,
    quantity: quantity,
    order_id: data.id,
    product_id: product[0][0].id
  }
});


Factory.blueprint('App/Models/ProductImage', (faker, id, data) => {
  return {
    image_path: faker.url(),
    thumbnail: 1,
    product_id: data.id
  }
});
