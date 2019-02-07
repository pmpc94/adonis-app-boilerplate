const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderLoggerSchema = new Schema({
  first_name: String,
  last_name: String,
  address1: String,
  address2: String,
  total_price: Number,
  receipt_email: String,
  timestamp : { type : Date, default: Date.now }
});

const OrderLogger = mongoose.model('OrderLogger', OrderLoggerSchema);

module.exports = OrderLogger
