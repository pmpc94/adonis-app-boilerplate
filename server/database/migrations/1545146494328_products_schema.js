'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('description', 255)
      table.enum('category', ['terrestrial', 'giant', 'dwarf'])
      table.float('price').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
