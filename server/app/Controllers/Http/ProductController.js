'use strict'

const Product = use('App/Models/Product');
const ProductImage = use('App/Models/ProductImage');
const Database = use('Database');

class ProductController {

  async index({ request, response }) {
    var page = request.input('page');
    var products = await Database.from('products').paginate(page, 20);
    return response.status(200).json(products);
  }

  async indexAll({ auth, request }) {
    const user = await auth.getUser();
    return await user.products().fetch();
  }

  async store({ auth, request, params }) {
    const user = await auth.getUser();
    console.log("REQUEST ALL", request.all());
    const {
      name,
      description,
      category,
      price,
      user_id,
      image_path
    } = request.all();
    console.log(name, image_path);
    const product = new Product();
    product.fill({
      name,
      description,
      category,
      price,
      user_id
    });
    const productImage = new ProductImage();
    //TODO - RETRIEVE VARIABLE IMAGE_PATH
    console.log(product);
    var arrayLength = image_path.length;
      for (let i=0; i< arrayLength; i++) {
        i == 0 ? thumbnail = 1 : thumbnail = 0;
        productImage.fill({
          image_path: image_path[i],
          product: product.id,
          thumbnail
        });
    }
    await user.products().save(product);
    await product.productImages().save(productImage);
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
    product.merge(request.all());
    await product.save();
    return response.status(200).json(product);
  }
}

module.exports = ProductController
