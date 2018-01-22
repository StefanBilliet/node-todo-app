const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://admin:admin@localhost:27017/todoApp')
  return mongoose;
};