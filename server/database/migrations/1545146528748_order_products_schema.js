'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductsSchema extends Schema {
  up () {
    this.create('order_products', (table) => {
      table.increments()
      table.string('product_name', 255).notNullable()
      table.float('price').notNullable()
      table.integer('quantity').notNullable()
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_products')
  }
}

module.exports = OrderProductsSchema
