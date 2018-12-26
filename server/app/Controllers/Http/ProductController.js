'use strict'

const Product = use('App/Models/Product');

class ProductController {

  async index({ request, response }) {
    var products = Product.all().fetch();
    return response.status(200).json(products);
  }

  async indexAll({ auth, request }) {
    const user = await auth.getUser();
    return await user.products().fetch();
  }

  async indexAll({ auth, request }) {
    const user = await auth.getUser();
    return await user.products().fetch();
  }

  async store({ auth, request, params }) {
    const user = await.auth.getUser();
    const {
      name,
      description,
      category,
      price
      //thumbnail
    } = request.all();
    const product = new Product();
    product.fill({
      name,
      description,
      category,
      price
      //thumbnail
    });
    await user.products().save(product);
    return response.status(200).json(product);
  }

  async destroy({ auth, request, params, response }) {
    const user = await auth.getUser();
    const { id } = params;
    const product = await Product.find(id);
    AuthorizationService.verifyPermission(product, user);
    await product.delete();
    return response.status(200).json(product);
  }

  async update({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const product = await Product.find(id);
    order.merge(request.all());
    await product.save();
    return response.status(200).json(product);
  }
}

module.exports = ProductController
