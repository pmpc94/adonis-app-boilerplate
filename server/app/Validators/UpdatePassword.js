'use strict'

const { formatters } = use('Validator')

class UpdatePassword {
  get rules () {
    return {
      email: 'required|email|exists:users,email',
      password: 'required'
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
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password'
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

module.exports = UpdatePassword
