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
  Route.post('orders', 'OrderController.store').middleware('guest').validator('OrderStore');
  Route.get('products', 'ProductController.all').middleware('guest');
  //TODO - GET PRODUCT SELECTED BY CUSTOMER
}).prefix('customer');

Route.group(() => {
  //VENDORS
  Route.post('login', 'UserController.login').validator('UserLogin');
  Route.post('resetPassword', 'UserController.resetPassword').validator('UserResetPassword');
  Route.post('updatePassword', 'UserController.updatePassword').validator('UserUpdatePassword');

  //ORDERS
  Route.get('orders', 'OrderController.index').middleware('auth');
  Route.get('orders/:id', 'OrderController.show').middleware('auth').validator('OrderAuthorization');
  Route.patch('orders/:id', 'OrderController.update').middleware('auth').validator('OrderAuthorization').validator('OrderUpdate');
  //PRODUCTS
  Route.get('products', 'ProductController.index').middleware('auth');
  Route.get('products/:id', 'ProductController.show').middleware('auth').validator('ProductAuthorization');
  Route.post('storeProduct', 'ProductController.store').middleware('auth').validator('ProductStore');
  Route.delete('products/:id', 'ProductController.destroy').middleware('auth').validator('ProductAuthorization');
  Route.patch('products/:id', 'ProductController.update').middleware('auth').validator('ProductAuthorization').validator('ProductUpdate');
}).prefix('vendor');

Route.post('webhooks', 'StripeController.store');

Route.on('/').render('landing')
Route.on('/about').render('landing')
Route.on('/shop').render('landing')
Route.on('/catalogue').render('landing')
Route.on('/arrivals').render('landing')
Route.on('/contacts').render('landing')
Route.on('/thanks').render('landing')
Route.on('/cart').render('landing')
Route.on('/checkout').render('landing')
Route.on('*').render('landing')
