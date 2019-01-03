'use strict'

const { formatters } = use('Validator')

class Authorization {
  get rules () {
    const productId = this.ctx.params.id;
    const userId = this.ctx.auth.user.id;
    return {
       user_id:`hasAuthorization:products,${productId},${userId}`
    }
  }

  async fails (errors) {
    return this.ctx.response.unauthorized('Oops! It seems like you do not have authorization.', null, errors)
  }

  get formatter () {
   return formatters.Vanilla
 }
}

module.exports = Authorization
