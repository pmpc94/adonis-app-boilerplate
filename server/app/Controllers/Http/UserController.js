'use strict'

const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Mail = use('Mail');
const Config = use('Config');
const Hash = use('Hash')
const hash = require('string-hash');

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

      await Token.query()
      .where('email', user.email)
      .delete()

      const { token } = await Token.create({
        email: user.email,
        token: await hash(user.email)
      })

      await Mail.send('emails.password', { email, token }, (message) => {
        message.from(Config.get('mail.from'))
        message.to(email)
        message.subject('Please update your password.')
      });
      response.ok('A request to change the password was sent to the provided email.', { secrets: ''});
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async updatePassword({ request, response }) {
    try {
      const { email, password, token } = request.all();
      const user = await User.findBy('email', email);
      const passwordReset = await Token.query()
        .where('email', user.email)
        .where('token', token)
        .first()

      user.merge({ password })
      await user.save({ password })
      await Token.query()
        .where('email', user.email)
        .delete()
      response.ok('Your password was successfully updated.', user);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }
}

module.exports = UserController
