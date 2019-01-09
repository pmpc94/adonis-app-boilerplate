'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('customer_id').unsigned().references('users.id').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('address1', 255).notNullable()
      table.string('address2', 255)
      table.float('total_price').notNullable()
      table.enum('status', ['created', 'paid', 'canceled']).notNullable()
      table.string('stripe_customer_id', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
