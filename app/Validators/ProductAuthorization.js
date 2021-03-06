'use strict'

const { formatters } = use('Validator')

class ProductAuthorization {
  get rules () {
    let product_id = this.ctx.params.slug || this.ctx.params.id;
    let user_id = null;
    if (this.ctx.auth.user !== null) {
       user_id = this.ctx.auth.user.id;
    }
    return {
      authorization:`hasAuthorization:products,${product_id},${user_id}`
    }
  }

  async fails (errors) {
    return this.ctx.response.unauthorized('Oops! It seems like you do not have authorization.', null, errors)
  }

  get formatter () {
    return formatters.Vanilla
  }
}

module.exports = ProductAuthorization
