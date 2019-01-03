'use strict'

const { formatters } = use('Validator')

class UserResetPassword {
  get rules () {
    return {
      email: 'required|email|exists:users,email'
    }
  }

  get sanitizationRules () {
    return {
       email: 'normalize_email'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.'
    }
  }

  async fails (errors) {
    return this.ctx.response.unprocessableEntity('Oops! The data you inserted was not valid.', null, errors)
  }

  get formatter () {
   return formatters.Vanilla
 }
}

module.exports = UserResetPassword
