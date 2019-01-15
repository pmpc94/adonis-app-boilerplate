'use strict'

const Product = use('App/Models/Product');
const ProductImage = use('App/Models/ProductImage');
const Database = use('Database');
const Helpers = use('Helpers');

class ProductController {

  async index({ auth, request, response }) {
    try {
      if (auth.user === null) {
        const page = request.input('page');
        const products = await Product.query().paginate(page);
        return response.ok('The clicked page has the following list of products.', products);
      }
      const user = await auth.getUser();
      const products = await user.products().fetch();
      response.ok('The list of your products.', products);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async show({ auth, request, response }) {
    try {
      const { id } = request.params;
      if (auth.user === null) {
        const product = await Product.find(id);
        return response.ok('The product that you requested.', product);
      }
      const user = await auth.getUser();
      const product = await Product.find(id);
      response.ok('The product that you requested.', product);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async store({ auth, request, response }) {
    const trx = await Database.beginTransaction();
    try {
      const user = await auth.getUser();
      const {
        name,
        description,
        category,
        price,
        user_id
      } = request.all();
      const product = await Product.create({
        name,
        description,
        category,
        price,
        user_id
      }, trx);

      await user.products().save(product, trx);
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
        let productImage = await ProductImage.create({
          image_path: `public/images/${images._files[i].clientName}`,
          product_id: product.id,
          thumbnail: i == 0 ? 1 : 0
        }, trx);
        await product.productImages().save(productImage, trx);
      }
      trx.commit();
      response.ok('Your product was stored in the database.', product);
    } catch(error) {
      trx.rollback();
      response.errorHandler({}, error);
    }
  }

  async destroy({ auth, request, response }) {
    try {
      const { id } = request.params;
      const product = await Product.find(id);
      await product.delete();
      response.ok('Your product was deleted from the database.', product);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async update({ auth, request, response }) {
    try {
      const { id } = request.params;
      const product = await Product.find(id);
      product.merge(request.all());
      await product.save();
      response.ok('Your product was updated.', product);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }
}

module.exports = ProductController
