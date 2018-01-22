const request = require('supertest');
const sinon = require('sinon');
const mongoose = require('mongoose');

const { app } = require('./bootstrapper');
const todosModule = require('./todosModule');
const Todo = require('./models/todo');
const sandbox = sinon.createSandbox();

afterEach(async () => {
  sandbox.restore();
});

todosModule(app, Todo);

describe('POST /todos', () => {
  test('should create a new todo', async () => {
    const todoCandidate = {
      text: 'Something to do'
    };
    sandbox.stub(Todo.prototype, 'save').returns({
      text: 'Something to do'
    });

    const response = await request(app)
    .post('/todos')
    .send(todoCandidate);

    expect(response.status).toBe(200);
    expect(response.body.text).toBe(todoCandidate.text);
  });

  test('should not create a new todo with invalid body data', async () => {
    const todoCandidate = {
      text: null
    };
    sandbox.stub(Todo.prototype, 'save').throws(new mongoose.Error.ValidationError());

    const response = await request(app)
    .post('/todos')
    .send(todoCandidate);

    expect(response.status).toBe(400);
  });
});


describe('GET /todos', () => {
  test('should return todos', async () => {
    const todos = [{
      text: 'Something to do'
    }];

    sandbox.stub(Todo, 'find').returns(todos);

    const response = await request(app)
    .get('/todos');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({todos});
  });
});