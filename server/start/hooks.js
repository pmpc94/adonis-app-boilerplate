const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {

  const Validator = use('Validator')

  Validator.extend('exists', existsFn)
  Validator.extend('isCustomer', isCustomerFn)
  Validator.extend('isVendor', isVendorFn)
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
  const row = await Database.table(table).where(column, value).first()

  if (!row) {
    throw message
  }
}

const isCustomerFn = async (data, field, message, args, get) => {
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
  console.log(args);
  const row = await Database.table(table).where(column, value).where('role', 'customer').first()

  if (!row) {
    throw message
  }
}

const isVendorFn = async (data, field, message, args, get) => {
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
  console.log(args);
  const row = await Database.table(table).where(column, value).where('role', 'vendor').first()

  if (!row) {
    throw message
  }
}
