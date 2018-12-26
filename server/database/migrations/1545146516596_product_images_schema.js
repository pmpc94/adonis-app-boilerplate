'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductImagesSchema extends Schema {
  up () {
    this.create('product_images', (table) => {
      table.increments()
      table.string('image_path', 255).notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.boolean('thumbnail').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_images')
  }
}

module.exports = ProductImagesSchema
