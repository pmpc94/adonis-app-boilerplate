'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');
const Config = use('Config');

class UserController {

  async login({ request, auth, response }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    response.ok('You were successfully logged in.', token);
  }

  async resetPassword({ request, response }) {
    const { email } = request.all();
    const user = await User.findBy('email', email);
    await Mail.send('emails.welcome', {}, (message) => {
      message.from(Config.get('mail.from'))
      message.to(email)
    });
    response.ok('A request to change the password was sent to the provided email.', user);
  }

  async updatePassword({ request, response }) {
    const { email, password } = request.all();
    const user = await User.findBy('email', email);
    await user.save({ password });
    response.ok('Your password was successfully updated', user);
  }
}

module.exports = UserController
