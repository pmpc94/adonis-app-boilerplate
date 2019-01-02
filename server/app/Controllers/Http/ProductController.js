'use strict'

const Product = use('App/Models/Product');
const ProductImage = use('App/Models/ProductImage');
const Database = use('Database');

class ProductController {

  async all({ request, response }) {
    var page = request.input('page');
    var products = await Database.from('products').paginate(page, 20);
    response.ok('The clicked page has the following list of products.', products);
  }

  async index({ auth, request, response }) {
    const user = await auth.getUser();
    const products = await user.products().fetch();
    response.ok('The list of your products.', products);
    //TODO - VERIFY THAT THE USER HAS ACCESS TO THE RESOURCE (VALIDATOR PRODUCT)
  }

  async show({ auth, request, response }) {
    const { id } = request.params;
    const product = await Product.find(id);
    response.ok('The product that you requested.', product);
    //TODO - VERIFY THAT THE USER HAS ACCESS TO THE RESOURCE (VALIDATOR PRODUCT)
  }

  async store({ auth, request, params }) {
    const user = await auth.getUser();

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
    response.ok('Your product was stored in the database.', product);
    //TODO - VERIFY THAT THE USER HAS ACCESS TO THE RESOURCE (VALIDATOR PRODUCT)
  }

  async destroy({ auth, request, response }) {
    const user = await auth.getUser();
    const { id } = request.params;
    const product = await Product.find(id);
    await product.delete();
    response.ok('Your product was deleted from the database.', product);
    //TODO - VERIFY THAT THE USER HAS ACCESS TO THE RESOURCE (VALIDATOR PRODUCT DESTROY)
  }

  async update({ auth, request, response }) {
    const user = await auth.getUser();
    const { id } = request.params;
    const product = await Product.find(id);
    product.merge(request.all());
    await product.save();
    response.ok('Your product was updated.', product);
    //TODO - VERIFY THAT THE USER HAS ACCESS TO THE RESOURCE (VALIDATOR PRODUCT UPDATE)
  }
}

module.exports = ProductController
