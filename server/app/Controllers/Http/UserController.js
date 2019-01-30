'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');
const Config = use('Config');

class UserController {

  async login({ request, auth, response }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      response.ok('You were successfully logged in.', token);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async resetPassword({ request, response }) {
    try {
      const { email } = request.all();
      const user = await User.findBy('email', email);
      await Mail.send('emails.password', {}, (message) => {
        message.from(Config.get('mail.from'))
        message.to(email)
        message.subject('Please update your password.')
      });
      response.ok('A request to change the password was sent to the provided email.', user);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async updatePassword({ request, response }) {
    try {
      const { email, password } = request.all();
      const user = await User.findBy('email', email);
      await user.save({ password });
      response.ok('Your password was successfully updated', user);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }
}

module.exports = UserController
