const express = require('express');
const bodyParser = require('body-parser'); 

const Todo = require('./models/todo');
const User = require('./models/user');

const todosModule = require('./todosModule');

const app = express();

app.use(bodyParser.json());

todosModule(app, Todo);

module.exports = { app };