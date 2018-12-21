'use strict'

class ProductController {

  async index({ auth, request, params }) {
    const user = await auth.getUser();
    return await user.products().fetch();
  }

  async create({ auth, request, params }) {
    const user = await.auth.getUser();
    const {
      name,
      description,
      category,
      price
    } = request.all();
    const product = new Product();
    product.fill({
      name,
      description,
      category,
      price
    });
    await user.products().save(product);
    return product;
  }

  async destroy({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const product = await Product.find(id);
    AuthorizationService.verifyPermission(product, user);
    await product.delete();
    return product;
  }

  async update({ auth, request, params }) {
    const user =
  }
}

module.exports = ProductController
