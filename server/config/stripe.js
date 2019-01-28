'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  secret: Env.get('STRIPE_API_KEY', 'SECRET'),
  private: Env.get('STRIPE_PRIVATE_KEY', 'PRIVATE')
}
