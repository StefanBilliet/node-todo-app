const request = require('supertest');

const { app } = require('./server');
const Todo = require('./models/todo');

beforeEach(async () => {
  await Todo.remove({});
});

describe('POST /todos', () => {
  test('should create a new todo', async () => {
    const todoCandidate = {
      text: 'Something to do'
    };

    const response = await request(app)
    .post('/todos')
    .send(todoCandidate);

    const todos = await Todo.find();
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(todoCandidate.text);

    expect(response.status).toBe(200);
    expect(response.body.text).toBe(todoCandidate.text);
  });

  test('should not create a new todo with invalid body data', async () => {
    const todoCandidate = {
      text: null
    };

    const response = await request(app)
    .post('/todos')
    .send(todoCandidate);

    const todos = await Todo.find();
    expect(todos.length).toBe(0);

    expect(response.status).toBe(400);
  });
});