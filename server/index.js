const { app } = require('./bootstrapper');
const configureMongoose = require('./db/configureMongoose');

configureMongoose();

app.listen(3000, () => {
  console.log('Started on port 3000');
});