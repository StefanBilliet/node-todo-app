const express = require('express');
const bodyParser = require('body-parser'); 

const Todo = require('./models/todo');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', async (request, response) => {
  const todo = new Todo({
    text: request.body.text
  });

  try {
    todo.save();
    response.send(document);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.get('/todos', async (request, response) => {
  try {
    const todos = await Todo.find();  
    response.send({
      todos
    });
  } catch(error) {
    response.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app };