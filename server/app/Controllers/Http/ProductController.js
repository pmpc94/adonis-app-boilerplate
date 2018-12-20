'use strict'

class ProductController {

  async index({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
  }

  async create({ auth, request, params }) {

  }

  async destroy({ auth, request, params }) {

  }

  async update({ auth, request, params }) {
    
  }
}

module.exports = ProductController
