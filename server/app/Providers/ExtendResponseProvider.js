'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ExtendResponseProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Response = use('Adonis/Src/Response')

    Response.macro('ok', function (message, data, errors) {
        this.status(200).json({
          message: message,
          status: 200,
          code: 'OK',
          data: data,
          errors: errors
        })
    })

    Response.macro('unprocessableEntity', function (message, data, errorMessages) {
        this.status(422).json({
          message: message,
          status: 422,
          code: 'UNPROCESSABLE_ENTITY',
          data: data,
          errors: errorMessages
        })
    })

    Response.macro('unauthorized', function (message, data, errorMessages) {
        this.status(422).json({
          message: message,
          status: 401,
          code: 'UNAUTHORIZED',
          data: data,
          errors: errorMessages
        })
    })

    Response.macro('unavailable', function (message, data, errorMessages) {
        this.status(503).json({
          message: message,
          status: 503,
          code: 'SERVICE UNAVAILABLE',
          data: data,
          errors: errorMessages
        })
    })
  }
}

module.exports = ExtendResponseProvider
