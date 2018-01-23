const mongoose = require('mongoose');

module.exports = () => {
  const connectionString = process.env.MONGODB_URI || 'mongodb://admin:admin@localhost:27017/todoApp';
  mongoose.connect(connectionString);
  return mongoose;
};