'use strict'

const { formatters } = use('Validator')

class OrderUpdate {
  get rules () {
    const order_id = this.ctx.params.id;
    const order = this.ctx.request.only('status');

    return {
      status: `in:canceled,paid|validateStatus:orders,${order_id},${order.status}`
    }
  }

  async fails (errors) {
    return this.ctx.response.unprocessableEntity('Oops! The data you inserted was not valid.', null, errors)
  }

  get formatter () {
    return formatters.Vanilla
  }
}

module.exports = OrderUpdate
