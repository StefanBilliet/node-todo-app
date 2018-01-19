const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@localhost:27017/todoApp');

module.exports = {
  mongoose
};