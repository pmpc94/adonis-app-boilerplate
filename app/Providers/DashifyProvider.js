'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const dashify = require('dashify');

class DashifyProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.bind('Dashify', () => {
      return dashify;
    })
  }
}

module.exports = DashifyProvider
