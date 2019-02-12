'use strict'

class Audit {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)
    Model.addHook('afterCreate', 'Audit.createLog')
    Model.addHook('afterUpdate', 'Audit.updateLog')
  }
}

module.exports = Audit
