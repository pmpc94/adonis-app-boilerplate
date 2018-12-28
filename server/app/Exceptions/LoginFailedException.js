'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class LoginFailedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error, { request, response }) {
     let json = {
       status: error.status,
       code: error.code,
       message: error.message
     }
     return response.status(error.status).json(json);
   }
}

module.exports = LoginFailedException
