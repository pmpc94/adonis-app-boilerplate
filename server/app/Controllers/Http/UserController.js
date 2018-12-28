'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');
const Config = use('Config');
const ResponseService = use('App/Services/ResponseService');

class UserController {

  async login({ request, auth, response }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    ResponseService.sendSuccess(response, 'You were successfully logged in.', token);
  }

  async resetPassword({ request, response }) {
    const { email } = request.all();
    const user = await User.findBy('email', email);
    await Mail.send('emails.welcome', {}, (message) => {
      message.from(Config.get('mail.from'))
      message.to(email)
    });
    ResponseService.sendSuccess(response, 'A request to change the password was sent to the provided email.', user);
  }

  async updatePassword({ request, response }) {
    const { email, password } = request.all();
    const user = await User.findBy('email', email);
    // user.merge(request.only('password'));
    await user.save({ password });
    ResponseService.sendSuccess(response, 'Your password was successfully updated.', user);
  }
}

module.exports = UserController
