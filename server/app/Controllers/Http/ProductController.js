'use strict'

const Product = use('App/Models/Product');
const ProductImage = use('App/Models/ProductImage');
const Database = use('Database');
const Helpers = use('Helpers');

class ProductController {

  async index({ auth, request, response }) {
    try {
      if (auth.user === null) {
        const MAX_PRODUCTS = 21;
        const page = request.input('page');
        const category = request.input('category');
        let column = request.input('name') !== undefined ? 'name' : request.input('price') !== undefined ? 'price' : undefined;
        let order = request.input('name') || request.input('price');
        column = column === undefined ? 'id' : column;
        order = order === undefined ? 'ASC' : order;
        const min = request.input('min');
        const max = request.input('max');
        const products = category === undefined ? await Product
        .query()
        .orderBy(column, order)
        .with('thumbnail')
        .where('price', '>', min).where('price', '<', max)
        .paginate(page, MAX_PRODUCTS) : await Product.query().orderBy(column, order).with('thumbnail').where('category', category).where('price', '>', min).where('price', '<', max).paginate(page, MAX_PRODUCTS)
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

  async categoriesCount({ request, response }) {
    try {
      const categories = await Product
      .query()
      .select('category as name')
      .count('category as total')
      .groupBy('category')
      response.ok('The count of the categories.', categories)
    } catch (error) {
      response.errorHandler({}, error);
    }
  }

  async priceRange({ request, response }) {
    try {
      const category = request.input('category');
      const priceRange = category === undefined ? await Product
      .query()
      .min('price as min_price')
      .max('price as max_price').first() : await Product.query().min('price as min_price').max('price as max_price').where('category', category).first()
      response.ok('The price range.', priceRange)
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
          image_path: `${images._files[i].clientName}`,
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
