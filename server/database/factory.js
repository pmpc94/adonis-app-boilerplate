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

  Factory.blueprint('App/Models/User', async (faker) => {
  return {
    firstName: faker.string({ length: 10}),
    lastName: faker.string({ length: 10}),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    role: faker.string({ length: 10 })
  }
});

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    name: faker.string({ length: 20}),
    description: faker.paragraph(),
    category: faker.string({ length: 10}),
    price: faker.floating({ min:0, max: 100})
  }
});

Factory.blueprint('App/Models/ProductImage', (faker) => {
  return {
    image_path: faker.sentence(),
    thumbnail: faker.bool()
  }
});

Factory.blueprint('App/Models/Order', (faker) => {
  return {
    first_name: faker.string({ length: 20 }),
    last_name: faker.string({ length: 20 }),
    address1: faker.string({ length: 20 }),
    address2: faker.string({ length: 20 }),
    total_price: faker.floating({ min: 0, max: 1000 }),
    status: faker.string(30)
  }
});

Factory.blueprint('App/Models/OrderProduct', (faker) => {
  return {
    product_name: faker.string({ length: 20 }),
    price: faker.floating({ min:0, max: 100 }),
    quantity: faker.integer({ min: 0, max: 1000 })
  }
});
