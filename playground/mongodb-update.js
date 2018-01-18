const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://admin:admin@localhost:27017', (error, client) => {
  if (error) {
    console.log('Unable to connect to MongoDB server.');
    return;
  }

  console.log('Connected to MongoDB server. ');

  const db = client.db('todoApp');

  db.collection('users').findOneAndUpdate({ _id: new ObjectId('5a5e6c26b4fdd74500ec4967') }, {
    $set: { name: 'Joske Vermeulen' },
    $inc: { age: 1 }
  }).then((result) => {
    console.log('Updated user');
    console.log(JSON.stringify(result, null, 2));
  }, (error) => console.log('Could not update user', error))
    .then(() => client.close());
});