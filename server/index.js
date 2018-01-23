const { app } = require('./bootstrapper');
const configureMongoose = require('./db/configureMongoose');

configureMongoose();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});