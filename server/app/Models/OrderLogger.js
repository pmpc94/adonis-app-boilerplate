const Mongoose = use('Mongoose');
const Schema = Mongoose.Schema;

const OrderLoggerSchema = new Schema({
  order_id: Number,
  first_name: String,
  last_name: String,
  address1: String,
  address2: String,
  total_price: Number,
  status: { type : String, default: 'created' },
  receipt_email: String,
  timestamp : { type : Date, default: Date.now }
});

// OrderLoggerSchema.methods.findAndUpdate = (query, update, options, function (error, doc) => {
//
// })

// OrderLoggerSchema.pre('save', async function() {
//   await Promise.resolve();
//   throw new Error('something went wrong');
// });

const OrderLogger = Mongoose.model('OrderLogger', OrderLoggerSchema);

module.exports = OrderLogger
