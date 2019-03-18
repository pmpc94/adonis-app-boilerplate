'use strict'

const Mail = use('Mail')
const Suite = use('Test/Suite')('Order')
const {before, after, test, trait} = Suite
const Product = use('App/Models/Product')
const Order = use('App/Models/Order')
const OrderProduct = use('App/Models/OrderProduct')
const User = use('App/Models/User')
const {validateAll} = use('Validator')
const Audit = use('App/Models/MongoDB/Audit')
const ace = require('@adonisjs/ace')
const Mongoose = use('Mongoose')
let user
let customer
let product

before(async () => {
  // Mongoose.dropDatabase()
  await ace.call('migration:reset')
  await ace.call('migration:run')

  // executed before all the tests for a given suite
  user = await User.create({
    firstName: 'Pedro',
    lastName: 'Carolina',
    email: 'order-vendor-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'vendor',
  })
  product = await Product.create({
    name: 'Test Order',
    slug: 'test-order',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
    user_id: user.id,
  })
  customer = await User.create({
    firstName: 'Dominika',
    lastName: 'Carolitanka',
    email: 'order-customer-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'customer',
  })
})

trait('Test/ApiClient')
trait('Auth/Client')

test('POST order 200 (Customer)', async ({client}) => {
  const response =
    await client.post('api/order')
        .send({
          'first_name': 'Dominika',
          'last_name': 'Carolitanka',
          'email': 'order-customer-' + 'pedro.carolina@polygon.pt',
          'address1': 'Katowice',
          'address2': 'Poland',
          'quantity': [{'id': 1, 'amount': 5}],
          'product_id': [1],
          'token': 'tok_visa',
        })
        .end()
  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'Your order was successfully created.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('POST order 200 (Send Email to Customer and Vendor(s))', async ({client, assert}) => {
  Mail.fake()

  const response = await client.post('api/order')
      .send({
        'first_name': 'Dominika',
        'last_name': 'Carolitanka',
        'email': 'order-customer-' + 'pedro.carolina@polygon.pt',
        'address1': 'Katowice',
        'address2': 'Poland',
        'quantity': [{'id': 1, 'amount': 5}],
        'product_id': [1],
        'token': 'tok_visa',
      })
      .end()

  const firstEmail = Mail.pullRecent()

  const secondEmail = Mail.pullRecent()

  response.assertStatus(200)
  assert.equal(firstEmail.message.from.address, 'pedro.carolina@polygon.pt')
  assert.equal(firstEmail.message.to[0].address, 'order-vendor-pedro.carolina@polygon.pt')
  assert.equal(firstEmail.message.subject, 'You just sold some products.')
  assert.equal(secondEmail.message.from.address, 'pedro.carolina@polygon.pt')
  assert.equal(secondEmail.message.to[0].address, 'order-customer-pedro.carolina@polygon.pt')
  assert.equal(secondEmail.message.subject, 'Your order is confirmed.')

  Mail.restore()
}).timeout(6000)

test('Order Required Assertions', async ({assert}) => {
  const data = {
    first_name: '',
    last_name: '',
    email: '',
    address1: '',
    product_id: '',
  }
  const validation = await validateAll(data, {
    first_name: 'required',
    last_name: 'required',
    email: 'required',
    address1: 'required',
    product_id: 'required',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'required validation failed on first_name',
      field: 'first_name',
      validation: 'required',
    },
    {
      message: 'required validation failed on last_name',
      field: 'last_name',
      validation: 'required',
    },
    {
      message: 'required validation failed on email',
      field: 'email',
      validation: 'required',
    },
    {
      message: 'required validation failed on address1',
      field: 'address1',
      validation: 'required',
    },
    {
      message: 'required validation failed on product_id',
      field: 'product_id',
      validation: 'required',
    },
  ])
}).timeout(6000)

test('Order String Assertions', async ({assert}) => {
  const data = {
    first_name: 123,
    last_name: 123,
    email: 123,
    address1: 123,
    address2: 123,
  }
  const validation = await validateAll(data, {
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    address1: 'string',
    address2: 'string',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'string validation failed on first_name',
      field: 'first_name',
      validation: 'string',
    },
    {
      message: 'string validation failed on last_name',
      field: 'last_name',
      validation: 'string',
    },
    {
      message: 'string validation failed on email',
      field: 'email',
      validation: 'string',
    },
    {
      message: 'string validation failed on address1',
      field: 'address1',
      validation: 'string',
    }, {
      message: 'string validation failed on address2',
      field: 'address2',
      validation: 'string',
    },
  ])
}).timeout(6000)

test('Order Min Characters Assertions', async ({assert}) => {
  const data = {
    first_name: 'er',
    last_name: 'er',
    email: 'er',
    address1: 'er',
  }
  const validation = await validateAll(data, {
    first_name: 'min:3',
    last_name: 'min:3',
    email: 'min:3',
    address1: 'min:3',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'min validation failed on first_name',
      field: 'first_name',
      validation: 'min',
    },
    {
      message: 'min validation failed on last_name',
      field: 'last_name',
      validation: 'min',
    },
    {
      message: 'min validation failed on email',
      field: 'email',
      validation: 'min',
    },
    {
      message: 'min validation failed on address1',
      field: 'address1',
      validation: 'min',
    },
  ])
}).timeout(6000)

test('Order Max Characters Assertions', async ({assert}) => {
  const data = {
    first_name: 'errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr',
    last_name: 'errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr',
    email: 'errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr',
    address1: 'errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr',
  }
  const validation = await validateAll(data, {
    first_name: 'max:255',
    last_name: 'max:255',
    email: 'max:255',
    address1: 'max:255',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'max validation failed on first_name',
      field: 'first_name',
      validation: 'max',
    },
    {
      message: 'max validation failed on last_name',
      field: 'last_name',
      validation: 'max',
    },
    {
      message: 'max validation failed on email',
      field: 'email',
      validation: 'max',
    },
    {
      message: 'max validation failed on address1',
      field: 'address1',
      validation: 'max',
    },
  ])
}).timeout(6000)

test('Order Valid Email Assertion', async ({assert}) => {
  const data = {
    email: 'pedro.hotmail.com',
  }
  const validation = await validateAll(data, {
    email: 'email',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'email validation failed on email',
      field: 'email',
      validation: 'email',
    },
  ])
}).timeout(6000)

test('Order Validate Negative Quantity Assertion', async ({assert}) => {
  const data = {
    quantity: [{amount: -1}],
  }
  const validation = await validateAll(data, {
    quantity: 'validateQuantity',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'validateQuantity validation failed on quantity',
      field: 'quantity',
      validation: 'validateQuantity',
    },
  ])
}).timeout(6000)

test('Order Validate Positive Quantity Assertion', async ({assert}) => {
  const data = {
    quantity: [{amount: 1}],
  }
  const validation = await validateAll(data, {
    quantity: 'validateQuantity',
  })
  assert.isFalse(validation.fails())
}).timeout(6000)

test('GET orders 200', async ({client}) => {
  const response = await client.get('api/orders').loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'A list of your current customer orders.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('GET order/:id 200', async ({client}) => {
  const order = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: order.id,
    product_id: 1,
  })
  const response =
      await client.get(`api/order/${order.id}`).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'The order that you requested.',
    status: 200,
    code: 'OK',
  })
}).timeout(6000)

test('GET order/:id 401', async ({client}) => {
  const order = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: order.id,
    product_id: 1,
  })
  const response = await client.get(`api/order/${order.id}`).loginVia(customer, 'jwt').end()
  response.assertStatus(401)
  response.assertJSONSubset({
    message: 'Oops! It seems like you do not have authorization.',
    status: 401,
    code: 'UNAUTHORIZED',
  })
}).timeout(6000)

test('PATCH order/:id 200', async ({client}) => {
  const order = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: order.id,
    product_id: 1,
  })
  const response =
    await client.get(`api/order/${order.id}`).loginVia(user, 'jwt').accept('json')
        .send({status: 'paid'}).end()
  response.assertStatus(200)
}).timeout(6000)

test('PATCH order/:id 401', async ({client}) => {
  const order = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: order.id,
    product_id: 1,
  })
  const response =
    await client.get(`api/order/${order.id}`).loginVia(customer, 'jwt')
        .accept('json')
        .send({status: 'canceled'}).end()
  response.assertStatus(401)
}).timeout(6000)

test('PATCH order/:id 200', async ({client}) => {
  const order = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: order.id,
    product_id: 1,
  })
  const response =
    await client.patch(`api/order/${order.id}`).send({
      status: 'canceled',
      deleted: true,
    }).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    code: 'OK',
    status: 200,
    message: 'Your order was updated.',
  })
}).timeout(6000)

test('PATCH order/:id 422', async ({client}) => {
  const order = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: order.id,
    product_id: 1,
  })
  const response =
    await client.patch(`api/order/${order.id}`).send({
      status: 'invalid',
    }).loginVia(user, 'jwt').end()
  response.assertStatus(422)
  response.assertJSONSubset({
    code: 'UNPROCESSABLE_ENTITY',
    status: 422,
    message: 'Oops! The data you inserted was not valid.',
  })
}).timeout(6000)

test('PATCH order/:id Status Logic', async ({client}) => {
  const order = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: order.id,
    product_id: 1,
  })
  const firstResponse =
    await client.patch(`api/order/${order.id}`).send({status: 'paid'})
        .loginVia(user, 'jwt').end()

  firstResponse.assertStatus(200)
  firstResponse.assertJSONSubset({
    message: 'Your order was updated.',
    status: 200,
    code: 'OK',
    data: {
      status: 'paid',
    },
  })

  const secondResponse =
    await client.patch(`api/order/${order.id}`).send({status: 'canceled'})
        .loginVia(user, 'jwt').end()

  secondResponse.assertStatus(200)
  secondResponse.assertJSONSubset({
    message: 'Your order was updated.',
    status: 200,
    code: 'OK',
    data: {
      status: 'canceled',
    },
  })
}).timeout(6000)

test('POST order 200 (Audit)', async ({client, assert}) => {
  const ord = await Order.create({
    customer_id: customer.id,
    first_name: customer.firstName,
    last_name: customer.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: ord.id,
    product_id: 1,
  })
  try {
    const order = await Audit.findOne({'object.id': ord.id, 'type': 'Order'})

    if (order) {
      assert.include(order.object, {
        customer_id: customer.id,
        first_name: 'Dominika',
        last_name: 'Carolitanka',
        address1: 'Poland',
        address2: 'Katowice',
        total_price: 0,
        status: 'created',
        stripe_customer_id: 0,
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
}).timeout(6000)

test('PATCH order/:id 200 (Audit)', async ({client, assert}) => {
  const ord = await Order.create({
    customer_id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    address1: 'Poland',
    address2: 'Katowice',
    total_price: 0,
    status: 'created',
    stripe_customer_id: 0,
    receipt_email: 'undefined',
  })
  await OrderProduct.create({
    product_name: product.name,
    price: product.price,
    quantity: 5,
    order_id: ord.id,
    product_id: 1,
  })
  ord.merge({
    status: 'paid',
  })
  await ord.save()
  try {
    const order = await Audit.findOne({'id': ord.id, 'type': 'Order'})
    if (order) {
      assert.include(order, {
        object: {
          status: 'paid',
        },
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
}).timeout(6000)

test('Stripe POST 200 (Audit)', async ({client, assert}) => {
  await Order.create({
    'first_name': 'Dominika',
    'last_name': 'Carolitanka',
    'address1': 'Katowice',
    'address2': 'Poland',
    'total_price': 500,
    'stripe_customer_id': 'jakim',
    'receipt_email': 'order-customer-pedro.carolina@polygon.pt',
  })
  const response = await client.post('webhooks')
      .send({
        'id': 'evt_1E8sHVLOSoAkp8VDV4fMZDIw',
        'object': 'event',
        'api_version': '2018-11-08',
        'created': 1551373369,
        'data': {
          'object': {
            'id': 'jakim',
            'receipt_email': 'order-customer-pedro.carolina@polygon.pt',
          },
        },
        'type': 'charge.succeeded',
      }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'Your order was successfully charged.',
    'status': 200,
    'code': 'OK',
    'data': {
      'first_name': 'Dominika',
      'last_name': 'Carolitanka',
      'address1': 'Katowice',
      'address2': 'Poland',
      'total_price': 500,
      'status': 'paid',
      'stripe_customer_id': 'jakim',
      'receipt_email': 'order-customer-pedro.carolina@polygon.pt',
    },
  })
  try {
    const stripe = await Audit.findOne({'object.data.object.id': 'jakim', 'type': 'Stripe Payment'})
    if (stripe) {
      assert.include(stripe.object.data.object, {
        id: 'jakim',
        receipt_email: 'order-customer-pedro.carolina@polygon.pt',
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
}).timeout(6000)
