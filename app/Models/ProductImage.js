'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Config = use('Config');

class ProductImage extends Model {
  static boot () {
    super.boot()
    this.addTrait('Audit')
  }
  product () {
    return this.belongsTo('App/Models/Product')
  }

  static get computed() {
    return ['url']
  }
  getUrl({ image_path }) {
     image_path =
     image_path === 'images/default-image-mars.jpg' ? 'images/default-image-mars.jpg' : `images/uploads/${image_path}`
     return `${Config.get('app.url')}/${image_path}`
  }
}

module.exports = ProductImage
