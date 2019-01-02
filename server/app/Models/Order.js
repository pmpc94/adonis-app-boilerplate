'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {  
   user () {
     return this.belongsTo('App/Models/User')
   }

   orderProducts () {
     return this.hasMany('App/Models/OrderProduct')
   }
}

module.exports = Order
