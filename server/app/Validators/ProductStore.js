'use strict'

const { formatters } = use('Validator')

class ProductStore {
  get rules () {
    return {
      customer_id: 'required|exists:users,id|isCustomer:users,id',
      first_name: 'required|string|min:3|max:255',
      last_name: 'required|string|min:3|max:255',
      address1: 'required|string|min:3|max:255',
      address2: 'string',
      total_price: 'number|min:1',
      status: 'equals:created'
    }
  }

  get messages () {
    return {
      'customer_id.required': 'You must provide a customer id.',
      'first_name.required': 'You must provide a first name.',
      'last_name.required': 'You must provide a last name.',
      'address1.required': 'You must provide an address.'
    }
  }

  async fails (errors) {
    return this.ctx.response.status(400).json({
        message: "Oops! Something went wrong with your request.",
        status: 400,
        data: {},
        errors
    })
  }

  get formatter () {
   return formatters.Vanilla
 }
}

module.exports = ProductStore
