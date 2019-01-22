'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

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
}

module.exports = Product
