'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'LoggerHook.createLog')
    this.addHook('afterUpdate', 'LoggerHook.updateLog')
  }
   user () {
     return this.belongsTo('App/Models/User')
   }

   orderProducts () {
     return this.hasMany('App/Models/OrderProduct')
   }
}

module.exports = Order
