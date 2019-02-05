'use strict'

const { formatters } = use('Validator')

class ProductStore {
  get rules () {
    const user_id = this.ctx.auth.user.id;
    return {
      name: 'required|string|min:3|max:255|notExists:products,name',
      description: 'required|string|min:3|max:255',
      category: 'required|string|min:3|max:255|in:terrestrial,giant,dwarf',
      price: 'number|range:0,99999'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name.',
      'name.notExists': 'You must provide a unique product name.',
      'description.required': 'You must provide a description.',
      'category.required': 'You must provide a category.',
      'category.in': 'You must provide a valid category',
      'price.number': 'You must insert a valid number',
      'price.range': 'You must insert a positive number'
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
