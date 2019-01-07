'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ServiceException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    
  }
}

module.exports = ServiceException
