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

const OrderLogger = Mongoose.model('OrderLogger', OrderLoggerSchema);

module.exports = OrderLogger
