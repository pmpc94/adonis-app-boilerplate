const Mongoose = use('Mongoose');
const Schema = Mongoose.Schema;

const AuditSchema = new Schema({
  object: Object,
  type: String,
  timestamp : { type : Date, default: Date.now }
});

const Audit = Mongoose.model('Audit', AuditSchema);

module.exports = Audit
