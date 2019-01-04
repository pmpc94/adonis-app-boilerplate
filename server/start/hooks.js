const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {

  const Validator = use('Validator')

  Validator.extend('exists', existsFn)
  Validator.extend('hasAuthorization', hasAuthorizationFn)
})

const existsFn = async (data, field, message, args, get) => {
  const Database = use('Database')
  const value = get(data, field)
  if (!value) {
    /**
     * skip validation if value is not defined. `required` rule
     * should take care of it.
     */
    return
  }

  const [table, column] = args

  const query = Database.query()
          .from(table)
          .where(column, value)
  if (args.length==4) {
    query.where(args[2], args[3])
  }

  const row = await query.first()

  if (!row) {
    throw message
  }
}

const hasAuthorizationFn = async (data, field, message, args, get) => {
  const Database = use('Database')

  const [table, resource_id, user_id] = args
  let row = null;

  if (table == 'products') {
     row = await Database.table(table).where('id', resource_id).where('user_id', user_id).first()
  }
  else if (table == 'orders') {
    const Order = use('App/Models/Order');
    row = await Order
    .query()
    .whereHas('orderProducts', (builder) => {
      builder.join('products', 'order_products.product_id', '=', 'products.id')
      .where('products.user_id', user_id)
    }, '>', 0)
    .where('id', resource_id)
    .first()
  }

  if (!row) {
    throw message
  }
}
