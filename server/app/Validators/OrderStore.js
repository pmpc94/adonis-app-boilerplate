'use strict'

const { formatters } = use('Validator')

class OrderStore {
  //TODO - What if product_id.name != product_name? This CAN'T happen! To think about this :-)
  get rules () {
    const product = this.ctx.request.only('product_id');
    return {
      customer_id: 'required|exists:users,id|exists:users,id,role,customer',
      first_name: 'required|string|min:3|max:255',
      last_name: 'required|string|min:3|max:255',
      email: 'required|email',
      address1: 'required|string|min:3|max:255',
      address2: 'string',
      total_price: 'number|min:1',
      status: 'equals:created',
      product_name: `required|exists:products,name,id,${product.product_id}`,
      price: 'number|min:1',
      quantity: 'number|min:1',
      product_id: 'required|number|exists:products,id'
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
      'product_name.required': 'You must provide a product name.',
      'order_id': 'You must provide an order id.',
      'product_id': 'You must provide a product id.'
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
