const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://admin:admin@localhost:27017', (error, client) => {
  if (error) {
    console.log('Unable to connect to MongoDB server.');
    return;
  }

  console.log('Connected to MongoDB server. ');

  const db = client.db('todoApp');

  db.collection('todos').find({completed: true}).toArray().then((completedTodos) => {
    console.log('Completed todos');
    console.log(JSON.stringify(completedTodos, null, 2));
  }, (error) => {
    console.log('Unable to retrieve number of completed todos', error);
  })
  .then(() => {
    client.close();
  });
});