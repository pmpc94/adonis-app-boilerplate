'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const mongoose = require('mongoose')

class MongooseProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.bind('Mongoose', () => {
      mongoose.Promise = require('bluebird');
      mongoose.plugin(require('../Models/MongoDB/PluginTimeout'));
      return mongoose;
    })
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
    const Config = use('Config');
    mongoose.connect(`mongodb://${Config.get('mongo.host')}/${Config.get('mongo.db')}`, { useNewUrlParser: true });
  }
}

module.exports = MongooseProvider
