'use strict'

class ResetPassword {
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
}

module.exports = ResetPassword
