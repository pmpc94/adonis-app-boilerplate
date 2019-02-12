module.exports = exports = function pluginTimeout (schema, options) {

  schema.pre('save', function (next) {
    if (Mongoose.connection.readyState === 0 || Mongoose.connection.readyState === 3) {
      const error = new Error('MongoDB disconnected from server.');
      return next(error);
    }
    next();
  });

}

const Mongoose = use('Mongoose');
