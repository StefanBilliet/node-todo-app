const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://admin:admin@localhost:27017', (error, client) => {
  if (error) {
    console.log('Unable to connect to MongoDB server.');
    return;
  }

  console.log('Connected to MongoDB server. ');

  const db = client.db('todoApp');

  // db.collection('todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log('Deleted todos');
  //   console.log(JSON.stringify(result, null, 2));
  // }, (error) => {
  //   console.log('Unable to delete todos', error);
  // })
  // .then(() => {
  //   client.close();
  // });

  // db.collection('todos').deleteOne({text: 'Something to do'}).then((result) => {
  //   console.log('Deleted todos');
  //   console.log(JSON.stringify(result, null, 2));
  // }, (error) => {
  //   console.log('Unable to delete todos', error);
  // })
  // .then(() => {
  //   client.close();
  // });

  db.collection('todos').findOneAndDelete({completed: false}).then((result) => {
    console.log('Deleted todos');
    console.log(JSON.stringify(result, null, 2));
  }, (error) => {
    console.log('Unable to delete todos', error);
  })
  .then(() => {
    client.close();
  });
});