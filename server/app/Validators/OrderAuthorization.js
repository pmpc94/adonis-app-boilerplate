'use strict'

const { formatters } = use('Validator')

class OrderAuthorization {
  get rules () {
    const order_id = this.ctx.params.id;
    const user_id = this.ctx.auth.user.id;
    return {
      authorization:`hasAuthorization:orders,${order_id},${user_id}`
    }
  }

  async fails (errors) {
    return this.ctx.response.unauthorized('Oops! It seems like you do not have authorization.', null, errors)
  }

  get formatter () {
    return formatters.Vanilla
  }
}

module.exports = OrderAuthorization
