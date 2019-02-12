'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const User = exports = module.exports = {}

  /**
   * A hook to hash the user password before saving
   * it to the database.
   */
   User.hashPassword = async (user) => {
     user.password = await Hash.make(user.password)
   }
