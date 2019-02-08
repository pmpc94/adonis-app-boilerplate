module.exports = exports = function pluginTimeout (schema, options) {

  schema.pre('save', function (error, result, next) {
    console.log("pre")
      console.log("READY STATE", Mongoose.connection.readyState)
      if (Mongoose.connection.readyState === 0 || Mongoose.connection.readyState === 3) {
        console.log("MongoDB disconnected.")
      }
      next()
  });

  schema.post('save', function (error, result, next) {
    console.log("post")
    if (Mongoose.connection.readyState === 0 || Mongoose.connection.readyState === 3) {
      console.log("MongoDB disconnected.")
    }
    next();
  });
}

const Mongoose = use('Mongoose');
