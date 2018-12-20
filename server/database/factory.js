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

var roleArray = ['customer', 'vendor'];
var categoryArray = ['Terrestrial', 'Giant', 'Dwarf'];
var statusArray = ['created', 'paid', 'canceled'];

function generateRandomElement(array) {
  var randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

  Factory.blueprint('App/Models/User', async (faker) => {
  return {
    firstName: faker.first(),
    lastName: faker.last(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    role: generateRandomElement(roleArray)
  }
});

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    name: faker.name(),
    description: faker.sentence(),
    category: generateRandomElement(categoryArray),
    price: faker.floating({ min:0, max: 100}),
    user_id: async () => {
      return (await Factory.model('App/Models/User').create()).id
    }
  }
});

Factory.blueprint('App/Models/ProductImage', (faker) => {
  return {
    image_path: faker.url(),
    thumbnail: faker.bool()
  }
});

Factory.blueprint('App/Models/Order', (faker) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    address1: faker.address(),
    address2: faker.address(),
    total_price: faker.floating({ min: 0, max: 100 }),
    status: generateRandomElement(statusArray),
    customer_id: async () => {
      return (await Factory.model('App/Models/User').create()).id
    }
  }
});

Factory.blueprint('App/Models/OrderProduct', (faker) => {
  return {
    product_name: faker.name(),
    price: faker.floating({ min:0, max: 100 }),
    quantity: faker.integer({ min: 0, max: 20 })
  }
});
