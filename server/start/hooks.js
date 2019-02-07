const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Config = use('Config');

  const View = use('View')
  View.global('stripeKey', () => {
    return Config.get('stripe.public')
  })

  const Validator = use('Validator')
  Validator.extend('exists', existsFn)
  Validator.extend('notExists', notExistsFn)
  Validator.extend('existsArray', existsArrayFn)
  Validator.extend('hasAuthorization', hasAuthorizationFn)
  Validator.extend('validateStatus', validateStatusFn)
  Validator.extend('validateCustomer', validateCustomerFn)
  Validator.extend('validateQuantity', validateQuantityFn)
})

const existsFn = async (data, field, message, args, get) => {
  const Database = use('Database')

  let value = get(data, field)

  if (!value && args.length !== 4) {
    /**
    * skip validation if value is not defined. `required` rule
    * should take care of it.
    */
    return
  }

  let [table, column] = args

  if (args.length === 4) {
    column = 'id';
    value = args[1];
  }

  const query = Database.query()
  .from(table)
  .where(column, value)
  if (args.length==4) {
    query.where(args[2], args[3])
  }
  const row = await query.first();

  if (!row) {
    throw message
  }
}

const notExistsFn = async (data, field, message, args, get) => {
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

  const row = await query.first();

  if (row) {
    throw message
  }
}

const existsArrayFn = async (data, field, message, args, get) => {
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
  .whereIn(column, value)

  const row = await query.count('* as length');

  if (row[0].length !== value.length) {
    throw message
  }
}

const hasAuthorizationFn = async (data, field, message, args, get) => {
  const Database = use('Database')

  const [table, resource_id, user_id] = args
  let row = null;

  if (table == 'products') {
    if (user_id === 'null') { //It's the public part of the platform
      row = await Database.table(table).where('id', resource_id).toSQL()
    } else {
      row = await Database.table(table).where('id', resource_id).where('user_id', user_id).first()
    }
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

const validateStatusFn = async (data, field, message, args, get) => {
  const Database = use('Database')

  const [table, order_id, status] = args

  const row = await Database.table(table).where('id', order_id).first()

  if (row.status === 'paid' && status !== 'canceled') {
    throw message
  }
  else if (row.status === 'created' && status !== 'canceled' && status !== 'paid') {
    throw message
  }
  else if (row.status === 'canceled') {
    throw message
  }

  if (!row) {
    throw message
  }
}

const validateCustomerFn = async (data, field, message, args, get) => {
  const Database = use('Database')

  const row = await Database.table('users').where('email', data.email).first()

  if (!row) {
    //do nothing, the customer does not exist and will be created in the controller
  }
  else if (row.role === 'customer') {
    //do nothing, validator passes
  }
  else if (row.role ==='vendor') {
    //Let's catch this pokeError!
    throw message
  }
}

const validateQuantityFn = async (data, field, message, args, get) => {
  const Database = use('Database')

  const hasNegative = data.quantity.some(value => value.amount < 0);

  if (hasNegative)
  throw message
}
