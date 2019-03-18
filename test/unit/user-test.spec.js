'use strict'

const Mail = use('Mail')
const {before, after, test, trait} = use('Test/Suite')('User')
const User = use('App/Models/User')
const {validateAll} = use('Validator')
const Audit = use('App/Models/MongoDB/Audit')
const ace = require('@adonisjs/ace')
const Mongoose = use('Mongoose')

let user
let customer

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

before(async () => {
  // Mongoose.dropDatabase()
  await ace.call('migration:reset')
  await ace.call('migration:run')

  user = await User.create({
    firstName: 'Pedro',
    lastName: 'Carolina',
    email: 'user-vendor-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'vendor',
  })
  customer = await User.create({
    firstName: 'Pedro',
    lastName: 'Customer',
    email: 'user-customer-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'customer',
  })
})

test('POST /login 200', async ({client}) => {
  const response = await client.post('api/login').send({
    email: user.email,
    password: 'polygon',
  })
      .accept('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'You were successfully logged in.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('POST /login 401 (Wrong password)', async ({client}) => {
  user.password = 'polygon' + 'wrong_secret'
  const response = await client.post('api/login')
      .accept('json')
      .send({
        email: user.email,
        password: user.password,
      }).end()
  response.assertStatus(401)
  response.assertJSONSubset({
    'message': 'E_PASSWORD_MISMATCH: Cannot verify user password',
    'status': 401,
    'code': 'E_PASSWORD_MISMATCH',
  })
}).timeout(6000)

test('Login Password Required', async ({assert}) => {
  const data = {
    password: '',
  }
  const validation = await validateAll(data, {
    password: 'required',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      field: 'password',
      message: 'required validation failed on password',
      validation: 'required',
    },
  ])
}).timeout(6000)

test('Exists user email', async ({assert}) => {
  const data = {
    email: 'user-vendor-pedro.carolina@polygon.pt',
  }
  const validation = await validateAll(data, {
    email: 'exists:users,email',
  })

  assert.isFalse(validation.fails())
}).timeout(6000)

test('Does not exist user email', async ({assert}) => {
  const data = {
    email: 'badjoraspedro.carolina@polygon.pt',
  }
  const validation = await validateAll(data, {
    email: 'exists:users,email',
  })

  assert.isTrue(validation.fails())
}).timeout(6000)

test('POST /login 422 (Invalid customer)', async ({client}) => {
  const response = await client.post('api/login')
      .send({
        email: customer.email,
        password: 'polygon',
      }).end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('POST /login 422 (Invalid email)', async ({client}) => {
  const response = await client.post('api/login')
      .send({email: 'invalid'}).end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('POST /resetPassword 200', async ({client}) => {
  const response = await client.post('api/resetPassword')
      .send({email: 'user-vendor-pedro.carolina@polygon.pt'}).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'A request to change the password was sent to the provided email.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(10000)

test('POST /resetPassword 422 (Invalid email)', async ({client}) => {
  const response = await client.post('api/resetPassword')
      .send({email: 'invalid'}).end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('ResetPassword Email Required Assertion', async ({assert}) => {
  const data = {
    email: '',
  }
  const validation = await validateAll(data, {
    email: 'required',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      field: 'email',
      message: 'required validation failed on email',
      validation: 'required',
    },
  ])
}).timeout(6000)

test('ResetPassword Email Validation Assertion', async ({assert}) => {
  const data = {
    email: 'pedro.carolina.gmail.com',
  }
  const validation = await validateAll(data, {
    email: 'email',
  })
  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      field: 'email',
      message: 'email validation failed on email',
      validation: 'email',
    },
  ])
}).timeout(6000)

test('ResetPassword Send Email', async ({client, assert}) => {
  Mail.fake()

  // write your test
  const response = await client.post('api/resetPassword')
      .send({email: 'user-vendor-pedro.carolina@polygon.pt'}).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'A request to change the password was sent to the provided email.',
    'status': 200,
    'code': 'OK',
  })

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.from.address, 'pedro.carolina@polygon.pt')
  assert.equal(recentEmail.message.to[0].address, 'user-vendor-pedro.carolina@polygon.pt')
  assert.equal(recentEmail.message.subject, 'Please update your password.')

  Mail.restore()
})

test('ResetPassword Audit', async ({client, assert}) => {
  // write your test
  const response = await client.post('api/resetPassword')
      .send({email: 'user-vendor-pedro.carolina@polygon.pt'}).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'A request to change the password was sent to the provided email.',
    'status': 200,
    'code': 'OK',
  })
  try {
    const token = await Audit.findOne({'token.email': 'user-vendor-pedro.carolina@polygon.pt', 'type': 'Token'})
    if (token) {
      assert.include(token, {
        email: 'user-vendor-pedro.carolina@polygon.pt',
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
})

test('POST /updatePassword 200', async ({client}) => {
  const response = await client.post('api/updatePassword')
      .send({
        email: 'user-vendor-pedro.carolina@polygon.pt',
        password: 'polygon',
        token: '1184728052',
      }).accept('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    'message': 'Your password was successfully updated.',
    'status': 200,
    'code': 'OK',
  })
}).timeout(6000)

test('POST /updatePassword 422 (Invalid email)', async ({client}) => {
  const response = await client.post('api/updatePassword')
      .send({
        email: 'pedro',
        password: 'polygon',
        token: '1184728052',
      }).accept('json').end()
  response.assertStatus(422)
  response.assertJSONSubset({
    'message': 'Oops! The data you inserted was not valid.',
    'status': 422,
    'code': 'UNPROCESSABLE_ENTITY',
  })
}).timeout(6000)

test('POST User Exists (Audit)', async ({client, assert}) => {
  const usr = await User.create({
    firstName: 'Pedro',
    lastName: 'Carolina',
    email: 'user-vendor-audit-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'vendor',
  })
  try {
    const user = await Audit.findOne({'object.email': usr.email, 'type': 'User'})
    if (user) {
      assert.include(user.object, {
        firstName: 'Pedro',
        lastName: 'Carolina',
        email: 'user-vendor-audit-pedro.carolina@polygon.pt',
        role: 'vendor',
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
}).timeout(6000)

test('POST Update User Password 200 (Audit)', async ({client, assert}) => {
  const usr = await User.create({
    firstName: 'Pedro',
    lastName: 'Carolina',
    email: 'user-vendor-audit-password-pedro.carolina@polygon.pt',
    password: 'polygon',
    role: 'vendor',
  })
  try {
    const user = await Audit.findOne({'object.password': usr.password, 'type': 'User'})
    if (user) {
      assert.include(user.object, {
        password: usr.password,
      }, 'object contains values')
    }
  } catch (e) {
    throw e
  }
}).timeout(6000)
