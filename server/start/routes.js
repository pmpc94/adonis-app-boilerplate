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
  //VENDORS
  Route.post('login', 'UserController.login').validator('UserLogin');
  Route.post('resetPassword', 'UserController.resetPassword').validator('UserResetPassword');
  Route.post('updatePassword', 'UserController.updatePassword').validator('UserUpdatePassword');

  //ORDERS
  Route.get('orders', 'OrderController.index').middleware('auth');
  Route.get('orders/:id', 'OrderController.show').middleware('auth').validator('OrderAuthorization');
  Route.patch('orders/:id', 'OrderController.update').middleware('auth').validator('OrderAuthorization').validator('OrderUpdate');
  Route.post('order', 'OrderController.store').middleware('guest').validator('OrderStore');

  //PRODUCTS
  Route.get('products', 'ProductController.index');
  Route.get('categoriesCount', 'ProductController.categoriesCount');
  Route.get('categoriesFilter', 'ProductController.categoriesFilter');
  Route.get('products/:id', 'ProductController.show').validator('ProductAuthorization');
  Route.post('product', 'ProductController.store').middleware('auth').validator('ProductStore');
  Route.delete('products/:id', 'ProductController.destroy').middleware('auth').validator('ProductAuthorization');
  Route.patch('products/:id', 'ProductController.update').middleware('auth').validator('ProductAuthorization').validator('ProductUpdate');
  Route.any('*', ({ response }) => response.notFound())
}).prefix('api');

//STRIPE
Route.post('webhooks', 'StripeController.store');

//FRONT-END RENDERING
Route.on('*').render('landing')
