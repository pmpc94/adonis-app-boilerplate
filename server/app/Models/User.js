'use strict'

const Validator = use('Validator')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword')
    this.addHook('afterCreate', 'LoggerHook.createLog')
    this.addHook('afterUpdate', 'LoggerHook.updateLog')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }

  products () {
    return this.hasMany('App/Models/Product')
  }
}

module.exports = User
