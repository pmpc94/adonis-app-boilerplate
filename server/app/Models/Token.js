'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
  static boot () {
    super.boot()
    this.addTrait('Audit')
  }
}

module.exports = Token
