const mongoose = require('../server/db/configureMongoose')();
const User = require('../server/models/user');

const userId = '5a6106521b12fe0955193508';

User.findById(userId)
.then(user => {
  if (!user) {
    console.log(`User with id ${userId} was not found.`);
    return;
  }

  console.log('User', user);
  mongoose.connection.close();
})
.catch(error => {
  console.log(error);
  mongoose.connection.close();
});