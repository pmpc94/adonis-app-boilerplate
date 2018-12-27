'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');
const Config = use('Config');

class UserController {

  async login({ request, auth, response }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return response.status(200).json({message: 'You were successfully logged in.', status: 200});
  }

  async resetPassword({ request, response }) {
    const { email } = request.all();
    const user = await User.findBy('email', email);
    await Mail.send('emails.welcome', {}, (message) => {
      message.from(Config.get('mail.from'))
      message.to(email)
    });
    return response.status(200).json({message: 'A request to change the password was sent to the provided email', status: 200});
  }

  async updatePassword({ request, response }) {
    const { email, password } = request.all();
    const user = await User.findBy('email', email);
    // user.merge(request.only('password'));
    await user.save({ password });
    return response.status(200).json({message: 'Your password was successfully updated', status: 200});
  }
}

module.exports = UserController
