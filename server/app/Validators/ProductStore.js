'use strict'

const { formatters } = use('Validator')

class ProductStore {
  get rules () {
    return {
      user_id: 'required|exists:users,id|isVendor:users,id',
      name: 'required|string|min:3|max:255',
      description: 'required|string|min:3|max:255',
      // category: 'required|string|min:3|max:255', TODO - ENUM: terrestrial, giant or drawrf
      price: 'number|min:1'
    }
  }

  get messages () {
    return {
      'user_id.required': 'You must provide a user id.',
      'name.required': 'You must provide a name.',
      'description.required': 'You must provide a description.'
    }
  }

  async fails (errors) {
    return this.ctx.response.unprocessableEntity('Oops! The data you inserted was not valid.', null, errors)
  }

  get formatter () {
   return formatters.Vanilla
 }
}

module.exports = ProductStore
