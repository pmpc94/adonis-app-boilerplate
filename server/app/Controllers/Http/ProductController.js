'use strict'

const Product = use('App/Models/Product');
const ProductImage = use('App/Models/ProductImage');
const Database = use('Database');
const Helpers = use('Helpers');

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

  async store({ auth, request, response }) {
    const user = await auth.getUser();
    const {
      name,
      description,
      category,
      price,
      user_id
    } = request.all();
    const product = new Product();
    product.fill({
      name,
      description,
      category,
      price,
      user_id
    });
    await user.products().save(product);
    const images = request.file('image_path', {
       types: ['image'],
       maxSize: '20mb',
       allowedExtensions: ['jpg', 'png', 'jpeg']
     })
    await images.moveAll(Helpers.publicPath(`/images`), (file) => {
      return {
        name: `${new Date().getTime()}.${file.clientName}`
      }
    })
    if (!images.movedAll()) {
        return images.errors()
    }
    for (let i=0; i<images._files.length; i++) {
      let productImage = new ProductImage();
      productImage.fill({
            image_path: `public/images/${images._files[i].clientName}`,
            product_id: product.id,
            thumbnail: i == 0 ? 1 : 0
          });
      await product.productImages().save(productImage);
    }
    response.ok('Your product was stored in the database.', product);
    //TODO - VERIFY THAT THE USER HAS ACCESS TO THE RESOURCE (VALIDATOR PRODUCT)
    //TODO - DATABASE TRANSACTIONS
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
