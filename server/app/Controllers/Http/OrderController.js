'use strict'

class OrderController {
  async index({ auth }) {
    const user = await auth.getUser();
    return await user.orders().fetch();
  }

  async create({ auth, request }) {
    const user = await auth.getUser();
    const { title } = request.all();
  }

  async destroy({ auth, request, params }) {

  }

  async update({ auth, request, params }) {

  }
}

module.exports = OrderController
