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
        const products = await Product
        .query()
        .with('thumbnail')
        .paginate(page)
        return response.ok('The clicked page has the following list of products.', products);
      }
      const user = await auth.getUser();
      const products = await Product
      .query()
      .with('thumbnail')
      .where('products.user_id', user.id)
      .fetch()
      response.ok('The list of your products.', products);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async show({ auth, request, response }) {
    try {
      const { id } = request.params;
      if (auth.user === null) {
        const product = await Product
        .query()
        .with('images').with('thumbnail')
        .where('id', id)
        .firstOrFail()
        return response.ok('The product that you requested.', product);
      }
      const user = await auth.getUser();
      const product = await Product
      .query()
      .with('images').with('thumbnail')
      .where('id', id)
      .firstOrFail()
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
        price
      } = request.all();
      const product = await Product.create({
        name,
        description,
        category,
        price
      }, trx);

      await user.products().save(product, trx);
      const images = request.file('image_path', {
        types: ['image'],
        maxSize: '20mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })
      await images.moveAll(Helpers.publicPath(`/images/uploads`), (file) => {
        return {
          name: `${new Date().getTime()}.${file.clientName}`
        }
      })
      if (!images.movedAll()) {
        return images.errors()
      }
      for (let i=0; i<images._files.length; i++) {
        let productImage = await ProductImage.create({
          image_path: `public/images/uploads/${images._files[i].clientName}`,
          product_id: product.id,
          thumbnail: i == 0 ? 1 : 0
        }, trx);
        await product.images().save(productImage, trx);
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
      const product = await Product.findOrFail(id);
      await product.delete();
      response.ok('Your product was deleted from the database.', product);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async update({ auth, request, response }) {
    try {
      const { id } = request.params;
      const product = await Product.findOrFail(id);
      product.merge(request.all());
      await product.save();
      response.ok('Your product was updated.', product);
    } catch (error) {
      response.errorHandler({}, error);
    }
  }
}

module.exports = ProductController
