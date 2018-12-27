'use strict'

class Login {
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

}

module.exports = Login
