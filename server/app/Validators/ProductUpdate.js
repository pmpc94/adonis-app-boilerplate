'use strict'

const { formatters } = use('Validator')

class ProductUpdate {
  get rules () {
    return {
      user_id: 'required|exists:users,id,role,vendor',
      name: 'required|string|min:3|max:255',
      description: 'required|string|min:3|max:255',
      category: 'required|string|min:3|max:255|in:terrestrial,giant,dwarf',
      price: 'number|min:1'
    }
  }

  get messages () {
    return {
      'user_id.required': 'You must provide a user id.',
      'name.required': 'You must provide a name.',
      'description.required': 'You must provide a description.',
      'category.required': 'You must provide a category.',
      'category.in': 'You must provide a valid category',
      'price.number': 'You must insert a valid number',
      'price.min': 'You must insert a minimum value of 1.'
    }
  }

  async fails (errors) {
    return this.ctx.response.unprocessableEntity('Oops! The data you inserted was not valid.', null, errors)
  }

  get formatter () {
    return formatters.Vanilla
  }
}

module.exports = ProductUpdate
