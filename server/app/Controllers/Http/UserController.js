'use strict'

const User = use('App/Models/User');
const ElasticEmail = use('App/External/APIs/ElasticEmail');

class UserController {

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async resetPassword({ request, response }) {
    const { email } = request.all();
    const user = await User.findBy('email', email);
    const emailParams = ElasticEmail.emailParams;
    emailParams["to"] = user.email;
    if (!user) {
      return response.status(404).json({data: 'User does not exist'})
    }
    return ElasticEmail.sendEmail(emailParams);
  }
}

module.exports = UserController
