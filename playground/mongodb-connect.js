const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://admin:admin@localhost:27017', (error, client) => {
  if (error) {
    console.log('Unable to connect to MongoDB server.');
    return;
  }

  console.log('Connected to MongoDB server. ');

  const db = client.db('todoApp');

  // db.collection('todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (error, result) => {
  //    if (error) {
  //      console.log('Unable to insert todo', error);
  //      return;
  //    }

  //     console.log(JSON.stringify(result.ops, null, 2));
  // });

  db.collection('users').insertOne({
    name: 'Stefan Billiet',
    age: 30,
    location: 'secret'
  }, (error, result) => {
     if (error) {
       console.log('Unable to add user', error);
       return;
     }

      console.log(JSON.stringify(result.ops, null, 2));
  });

  client.close();
});