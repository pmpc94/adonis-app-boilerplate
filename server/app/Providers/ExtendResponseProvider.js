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
        this.status(401).json({
          message: message,
          status: 401,
          code: 'UNAUTHORIZED',
          data: data,
          errors: errorMessages
        })
    })
    Response.macro('errorHandler', function (data=null, error) {
        this.status(error.status).json({
          message: 'An error occured.',
          status: error.status,
          code: error.code,
          data: data,
          errors: error
        })
    })
    Response.macro('notFound', function (data=null, error=null) {
        this.status(404).json({
          message: 'Not found.',
          status: 404,
          code: 'NOT_FOUND',
          data: data,
          errors: error
        })
    })
  }
}

module.exports = ExtendResponseProvider
