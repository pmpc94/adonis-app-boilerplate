'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  orderProducts () {
    return this.belongsTo('App/Models/OrderProduct')
  }

  productImages () {
    return this.hasMany('App/Models/ProductImage')
  }
}

module.exports = Product
