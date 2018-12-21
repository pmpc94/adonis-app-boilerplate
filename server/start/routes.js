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
  Route.post('login', 'UserController.login');
  Route.post('resetPassword', 'UserController.reset')
//ORDERS
  Route.get('orders', 'OrderController.index').middleware('auth');
  Route.get('orders/:id', 'OrderController.index').middleware('auth');
  Route.patch('orders/:id', 'OrderController.update').middleware('auth');
//PRODUCTS
  Route.get('products', 'ProductController.index').middleware('auth');
  Route.get('products/:id', 'ProductController.index').middleware('auth');
  Route.post('products', 'ProductController.create').middleware('auth');
  Route.delete('products/:id', 'ProductController.destroy').middleware('auth');
  Route.patch('products/:id', 'ProductController.update').middleware('auth');
}).prefix('auth');

Route.group(() => {
  Route.post('orders', 'OrderController.create');
}).prefix('customer')
