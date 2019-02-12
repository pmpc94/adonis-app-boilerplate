'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const Dashify = use('Dashify')

const Product = exports = module.exports = {}

   Product.createSlugs = async (product) => {
     product.slug = Dashify(product.name, { lower: true })
   }
