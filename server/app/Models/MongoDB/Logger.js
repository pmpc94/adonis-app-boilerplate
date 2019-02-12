const Mongoose = use('Mongoose');
const Schema = Mongoose.Schema;

const LoggerSchema = new Schema({
  object: Object,
  type: String,
  timestamp : { type : Date, default: Date.now }
});

const Logger = Mongoose.model('Logger', LoggerSchema);

module.exports = Logger
