'use strict'

const Suite = use('Test/Suite')('Product')
const {before, beforeEach, after, test, trait} = Suite
const User = use('App/Models/User')
const Product = use('App/Models/Product')
const ProductImage = use('App/Models/ProductImage')
const Helpers = use('Helpers')
const {validateAll} = use('Validator')
const Audit = use('App/Models/MongoDB/Audit')
const ace = require('@adonisjs/ace')
const Mongoose = use('Mongoose')

let user
let customer
let product

trait('Test/ApiClient')
trait('Auth/Client')

before(async () => {
  // Mongoose.dropDatabase()
  await ace.call('migration:reset')
  await ace.call('migration:run')

  user = await User.create({
    firstName: 'Pedro',
    lastName: 'Carolina',
    email: 'product-vendor-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'vendor',
  })
  customer = await User.create({
    firstName: 'Dominika',
    lastName: 'Nocula',
    email: 'product-customer-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'vendor',
  })
  product = await Product.create({
    name: 'Test Product',
    slug: 'test-product',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
})

beforeEach(async () => {
  const prod = await Product.findBy('slug', 'test-product')
    prod !== null ? prod.delete() : ''
})

test('POST /product 200', async ({client}) => {
  const response =
      await client.post('api/product')
          .field('name', product.name)
          .field('description', product.description)
          .field('category', product.category)
          .field('price', product.price)
          .attach(
              'image_path[0]',
              Helpers.publicPath('/images/test/default-image-mars.jpg'))
          .loginVia(user, 'jwt')
          .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'Your product was stored in the database.',
    'status': 200,
    'code': 'OK',
    'data': {
      'slug': 'test-product',
    },
  })
  // response.assertHeader('content-type', 'multipart/form-data')
}).timeout(6000)

test('POST /products 422 (Repeated product name)', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product First',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  const response = await client.post('api/product')
      .field('name', product.name)
      .field('description', product.description)
      .field('category', product.category)
      .field('price', product.price)
      .attach(
          'image_path[0]',
          Helpers.publicPath('/images/test/default-image-mars.jpg'))
      .loginVia(user, 'jwt')
      .end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('Product Required Assertions', async ({assert}) => {
  const data = {
    name: '',
    description: '',
    category: '',
    price: '',
  }
  const validation = await validateAll(data, {
    name: 'required',
    description: 'required',
    category: 'required',
    price: 'required',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'required validation failed on name',
      field: 'name',
      validation: 'required',
    },
    {
      message: 'required validation failed on description',
      field: 'description',
      validation: 'required',
    },
    {
      message: 'required validation failed on category',
      field: 'category',
      validation: 'required',
    },
    {
      message: 'required validation failed on price',
      field: 'price',
      validation: 'required',
    },
  ])
}).timeout(6000)

test('Product String Assertions', async ({assert}) => {
  const data = {
    name: 123,
    description: 123,
    category: 123,
  }
  const validation = await validateAll(data, {
    name: 'string',
    description: 'string',
    category: 'string',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'string validation failed on name',
      field: 'name',
      validation: 'string',
    },
    {
      message: 'string validation failed on description',
      field: 'description',
      validation: 'string',
    },
    {
      message: 'string validation failed on category',
      field: 'category',
      validation: 'string',
    },
  ])
}).timeout(6000)

test('Product Min Characters Assertions', async ({assert}) => {
  const data = {
    name: 'er',
    description: 'er',
    category: 'er',
  }
  const validation = await validateAll(data, {
    name: 'min:3',
    description: 'min:3',
    category: 'min:3',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'min validation failed on name',
      field: 'name',
      validation: 'min',
    },
    {
      message: 'min validation failed on description',
      field: 'description',
      validation: 'min',
    },
    {
      message: 'min validation failed on category',
      field: 'category',
      validation: 'min',
    },
  ])
}).timeout(6000)

test('Product Max Characters Assertions', async ({assert}) => {
  const data = {
    name: 'errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr',
    description: 'errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr',
    category: 'errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr',
  }
  const validation = await validateAll(data, {
    name: 'max:255',
    description: 'max:255',
    category: 'max:255',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'max validation failed on name',
      field: 'name',
      validation: 'max',
    },
    {
      message: 'max validation failed on description',
      field: 'description',
      validation: 'max',
    },
    {
      message: 'max validation failed on category',
      field: 'category',
      validation: 'max',
    },
  ])
}).timeout(6000)

test('POST /products 422 (Invalid description)', async ({client}) => {
  const response =
      await client.post('api/product')
          .field('name', product.name)
          .field('description', '')
          .field('category', product.category)
          .field('price', product.price)
          .attach(
              'image_path[0]',
              Helpers.publicPath('/images/test/default-image-mars.jpg'))
          .loginVia(user, 'jwt')
          .end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('POST /products 422 (Invalid category)', async ({client}) => {
  const response =
      await client.post('api/product')
          .field('name', product.name)
          .field('description', product.description)
          .field('category', 'invalid')
          .field('price', product.price)
          .attach(
              'image_path[0]',
              Helpers.publicPath('/images/test/default-image-mars.jpg'))
          .loginVia(user, 'jwt')
          .end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('POST /products 422 (Invalid price)', async ({client}) => {
  const response =
      await client.post('api/product')
          .field('name', product.name)
          .field('description', product.description)
          .field('category', product.category)
          .field('price', -1)
          .attach(
              'image_path[0]',
              Helpers.publicPath('/images/test/default-image-mars.jpg'))
          .loginVia(user, 'jwt')
          .end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('Price must be a number', async ({assert}) => {
  const data = {
    price: 'NaN',
  }
  const validation = await validateAll(data, {
    price: 'number',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      message: 'number validation failed on price',
      field: 'price',
      validation: 'number',
    },
  ])
}).timeout(6000)

test('GET /products 200 (All)', async ({client}) => {
  const response = await client.get('api/products?page=1&min=0&max=1000').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'The clicked page has the following list of products.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('GET /products 200 (Vendor)', async ({client}) => {
  const response = await client.get('api/products').loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'The list of your products.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('GET /product/:slug 200', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Second',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.get(`api/product/${product.id}`).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'The product that you requested.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('GET /product/:slug 401', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Third',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.get(`api/product/${product.id}`).loginVia(customer, 'jwt').end()
  response.assertStatus(401)
  response.assertJSONSubset({
    'message': 'Oops! It seems like you do not have authorization.',
    'status': 401,
    'code': 'UNAUTHORIZED',
  })
}).timeout(6000)

test('DELETE /product/:id 200', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Fourth',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.delete(`api/product/${product.id}`)
      .loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'Your product was deleted from the database.',
    'status': 200,
    'code': 'OK',
  })
  // verify that product was deleted
}).timeout(6000)

test('DELETE /product/:id 401', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Fifth',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.delete(`api/product/${product.id}`)
      .loginVia(customer, 'jwt').end()
  response.assertStatus(401)
  response.assertJSONSubset({
    'message': 'Oops! It seems like you do not have authorization.',
    'status': 401,
    'code': 'UNAUTHORIZED',
  })
}).timeout(6000)

test('PATCH /product/:id', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Sixth',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.patch(`api/product/${product.id}`)
      .send({
        'name': 'Olga Badjoraasasdds',
        'description': 'Cenas Description',
        'category': 'giant',
        'price': 3,
      }).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'Your product was updated.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('PATCH /product/:id 401', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Seventh',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.patch(`api/product/${product.id}`)
      .send({
        'name': 'Olga Badjoraasasdds',
        'description': 'Cenas Description',
        'category': 'giant',
        'price': 3,
      }).loginVia(customer, 'jwt').end()
  response.assertStatus(401)
  response.assertJSONSubset({
    'message': 'Oops! It seems like you do not have authorization.',
    'status': 401,
    'code': 'UNAUTHORIZED',
  })
}).timeout(6000)

test('PATCH /product/:id 422 (Invalid product name)', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Eighth',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.patch(`api/product/${product.id}`)
      .send({
        'name': '',
        'description': product.description,
        'category': product.category,
        'price': product.price,
      }).loginVia(user, 'jwt').end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('PATCH /product/:id 422 (Invalid description)', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Nineth',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.patch(`api/product/${product.id}`)
      .send({
        'name': product.name,
        'description': '',
        'category': product.category,
        'price': product.price,
      }).loginVia(user, 'jwt').end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('PATCH /product/:id 422 (Invalid category)', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Tenth',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.patch(`api/product/${product.id}`)
      .send({
        'name': product.name,
        'description': product.description,
        'category': 'invalid',
        'price': product.price,
      }).loginVia(user, 'jwt').end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('PATCH /product/:id 422 (Invalid price)', async ({client}) => {
  const product = await Product.create({
    name: 'Test Product Eleventh',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: product.id,
    thumbnail: 1,
  })
  await user.products().save(product)
  const response = await client.patch(`api/product/${product.id}`)
      .send({
        'name': product.name,
        'description': product.description,
        'category': product.category,
        'price': -1,
      }).loginVia(user, 'jwt').end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('POST product 200 (Audit)', async ({client, assert}) => {
  const prod = await Product.create({
    name: 'Test Product Twelveteh',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: prod.id,
    thumbnail: 1,
  })
  await user.products().save(prod)
  try {
    const product = await Audit.findOne({'id': prod.id, 'type': 'Product'})

    if (product) {
      assert.include(product, {
        name: 'Test Product Twelveteh',
        slug: 'test-product-twelveteh',
        description: 'Product description test.',
        category: 'dwarf',
        price: 100,
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
}).timeout(6000)

test('PATCH product/:id 200 (Audit)', async ({client, assert}) => {
  const prod = await Product.create({
    name: 'Test Product Thirteenth',
    description: 'Product description test.',
    category: 'dwarf',
    price: 100,
  })
  await ProductImage.create({
    image_path: `${new Date().getTime()}.${Helpers.publicPath('/images/test/default-image-mars.jpg')}`,
    product_id: prod.id,
    thumbnail: 1,
  })
  await user.products().save(prod)
  prod.merge({
    name: 'Test Product Thirteenth-Updated',
    description: 'Product description test-Updated.',
    category: 'giant',
    price: 200,
  })
  await prod.save()
  try {
    const product = await Audit.findOne({'id': prod.id, 'type': 'Product'})
    if (product) {
      assert.include(product, {
        object: {
          name: 'Test Product Thirteenth-Updated',
          description: 'Product description test-Updated.',
          category: 'giant',
          price: 200,
        },
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
}).timeout(6000)
