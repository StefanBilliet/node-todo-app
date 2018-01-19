const express = require('express');
const bodyParser = require('body-parser'); 

const Todo = require('./models/todo');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  const todo = new Todo({
    text: request.body.text
  });

  todo.save((error, document) => {
    if(error) {
      response.status(400).send(error).end();
      return;
    }
    
    response.send(document).end();
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app };