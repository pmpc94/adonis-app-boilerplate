'use strict'

class UserController {

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async reset({ request }) {
    
  }
}

module.exports = UserController
