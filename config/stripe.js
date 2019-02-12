'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  secret: Env.get('STRIPE_API_KEY', 'SECRET'),
  public: Env.get('STRIPE_PUBLIC_KEY', 'PUBLIC')
}
