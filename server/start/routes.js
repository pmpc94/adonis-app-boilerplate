'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
//AUTHENTICATION
  Route.post('auth/register', 'UserController.register');
  Route.post('auth/login', 'UserController.login');
//ORDERS
  Route.get('orders', 'OrderController.index').middleware('auth');
  Route.get('orders/:id', 'OrderController.index').middleware('auth');
  Route.post('orders', 'OrderController.create').middleware('auth');
  Route.delete('orders/:id', 'OrderController.destroy').middleware('auth');
  Route.patch('orders/:id', 'OrderController.update').middleware('auth');
//ORDER PRODUCTS
  Route.get('orders/:id/orderProducts', 'OrderController.index').middleware('auth');
  Route.post('orders/:id/orderProducts', 'OrderController.create').middleware('auth');
  Route.delete('orders/:id/orderProducts/:id', 'OrderController.destroy').middleware('auth');
  Route.patch('orders/:id/orderProducts/:id', 'OrderController.update').middleware('auth');
//PRODUCTS
  Route.get('products', 'ProductController.index').middleware('auth');
  Route.get('products/:id', 'ProductController.index').middleware('auth');
  Route.post('products', 'ProductController.create').middleware('auth');
  Route.delete('products/:id', 'ProductController.destroy').middleware('auth');
  Route.patch('products/:id', 'ProductController.update').middleware('auth');
//PRODUC ORDERS
  Route.get('products/:id/orderProducts', 'ProductController.index').middleware('auth');
  Route.post('products/:id/orderProducts', 'ProductController.create').middleware('auth');
  Route.delete('products/:id/orderProducts/:id', 'ProductController.destroy').middleware('auth');
  Route.patch('products/:id/orderProducts/:id', 'ProductController.update').middleware('auth');

//PRODUCT productImages
  Route.get('products/:id/productImages', 'ProductController.index').middleware('auth');
  Route.post('products/:id/productImages', 'ProductController.create').middleware('auth');
  Route.delete('products/:id/productImages/:id', 'ProductController.destroy').middleware('auth');
  Route.patch('products/:id/productImages/:id', 'ProductController.update').middleware('auth');
}).prefix('api');
