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
  //CUSTOMERS
  Route.post('orders', 'OrderController.store').middleware('guest');
  Route.get('products', 'ProductController.index').middleware('guest');
}).prefix('customer');

Route.group(() => {
  //VENDORS
  Route.post('login', 'UserController.login').validator('Login');
  Route.post('resetPassword', 'UserController.resetPassword').validator('ResetPassword');
  Route.post('updatePassword', 'UserController.updatePassword').validator('UpdatePassword');

  //ORDERS
  Route.get('orders', 'OrderController.index').middleware('auth');
  Route.get('orders/:id', 'OrderController.show').middleware('auth');
  Route.patch('orders/:id', 'OrderController.update').middleware('auth');
  //PRODUCTS
  Route.get('products', 'ProductController.listProducts').middleware('auth');
  Route.get('products/:id', 'ProductController.show').middleware('auth');
  Route.post('storeProduct', 'ProductController.store').middleware('auth');
  Route.delete('products/:id', 'ProductController.destroy').middleware('auth');
  Route.patch('products/:id', 'ProductController.update').middleware('auth');
}).prefix('vendor');
