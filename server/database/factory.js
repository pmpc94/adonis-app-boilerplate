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

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    firstName: faker.first(),
    lastName: faker.last(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    role: helper.getRandomElement(helper.roleArray)
  }
});

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    name: faker.name(),
    description: faker.sentence(),
    category: helper.getRandomElement(helper.categoryArray),
    price: faker.floating({ min:1, max: 50}),
    user_id: helper.getRandomId('vendor')
  }
});

Factory.blueprint('App/Models/Order', (faker) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    address1: faker.address(),
    address2: faker.address(),
    total_price: 0,
    status: helper.getRandomElement(helper.statusArray),
    customer_id: helper.getRandomId('customer')
  }
});

Factory.blueprint('App/Models/OrderProduct', async (faker, id, data) => {
  var quantity = faker.integer({ min: 1, max: 5 });
  var product = await helper.getRandomProduct(data.id, quantity);
  return {
    product_name: product.rows[0].name,
    price: product.rows[0].price,
    quantity: quantity,
    order_id: data.id,
    product_id: product.rows[0].id
  }
});

Factory.blueprint('App/Models/ProductImage', (faker, id, data) => {
  return {
    image_path: 'public/images/test-image.jpeg',
    thumbnail: data.thumbnail,
    product_id: data.id
  }
});
