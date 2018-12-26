'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');

class UserController {

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async resetPassword({ request, response }) {
    const { email } = request.all();
    const user = await User.findBy('email', email);

    if (!user) {
      return response.status(404).json({data: 'User does not exist'})
    }

    await Mail.send('emails.welcome', {}, (message) => {
      message.from('pedro.carolina@polygon.pt')
      message.to(email)
    });

    return response.status(200).json(user);
  }

  async updatePassword({ request, response }) {
    const { email, password } = request.all();
    const user = await User.findBy('email', email);
    user.merge(request.only('password'));
    await user.save();
    return response.status(200).json(user);
  }
}

module.exports = UserController
