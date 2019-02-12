'use strict'

const { formatters } = use('Validator')

class OrderStore {

  get rules () {
    return {
      first_name: 'required|string|min:3|max:255',
      last_name: 'required|string|min:3|max:255',
      email: 'required|email|validateCustomer',
      address1: 'required|string|min:3|max:255',
      address2: 'string',
      status: 'equals:created',
      quantity: 'validateQuantity',
      product_id: 'required|existsArray:products,id'
    }
  }

  get messages () {
    return {
      'customer_id.required': 'You must provide a customer id.',
      'first_name.required': 'You must provide a first name.',
      'last_name.required': 'You must provide a last name.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.validateCustomer': 'You must provide a valid customer.',
      'address1.required': 'You must provide an address.',
      'quantity.validateQuantity': 'You must provide a positive quantity.',
      'status': 'You must insert a status equals to created.',
      'product_id.existsArray': 'You must provide valid products id.'
    }
  }

  async fails (errors) {
    return this.ctx.response.unprocessableEntity('Oops! The data you inserted was not valid.', null, errors)
  }

  get formatter () {
    return formatters.Vanilla
  }
}

module.exports = OrderStore
