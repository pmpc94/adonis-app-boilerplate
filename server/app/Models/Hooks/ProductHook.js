'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const dashify = require('dashify');

const ProductHook = exports = module.exports = {}

   ProductHook.createSlugs = async (product) => {
     product.slug = dashify(product.name, { lower: true })
   }
