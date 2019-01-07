'use strict'

const { formatters } = use('Validator')

class OrderStore {

  get rules () {
    const order = this.ctx.request.only(['product_id', 'email']);
    return {
      first_name: 'required|string|min:3|max:255',
      last_name: 'required|string|min:3|max:255',
      email: `required|email|validateOrder:users,${order.email}`,
      address1: 'required|string|min:3|max:255',
      address2: 'string',
      total_price: 'number|min:1',
      status: 'equals:created',
      quantity: 'number|min:1',
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
      'address1.required': 'You must provide an address.',
      'total_price.number': 'You must insert a minimum value of 1.', //TO CORRECT - IT IS ACCEPTING NEGATIVE VALUES
      'status': 'You must insert a status equals to created.',
      'quantity.number': 'You must insert a valid number.', //TO CORRECT - IT IS ACCEPTING NEGATIVE VALUES
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
