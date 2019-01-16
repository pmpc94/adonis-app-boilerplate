'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Config = use('Config');

class Product extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  orderProducts () {
    return this.hasMany('App/Models/OrderProduct')
  }

  images () {
    return this.hasMany('App/Models/ProductImage')
  }

  thumbnail() {
    return this.hasOne('App/Models/ProductImage').where(
      'thumbnail',
      true
    )
  }

  //TODO - What if there are multiple images, how will the url be presented?
  static get computed() {
    return ['url']
  }
  getUrl({ image_path }) {
    image_path =
    image_path === 'default-image-mars.jpg' ? 'default-image-mars.jpg' : `uploads/${image_path}`
    return `${Config.get('app.url')}/${image_path}`
  }
}

module.exports = Product
