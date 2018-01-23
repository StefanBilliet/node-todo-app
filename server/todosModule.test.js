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
    expect(response.text).toEqual(JSON.stringify({todos}));
  });
});

describe('GET /todos/id', () => {
  describe('Given no todo with id', () => {
    test('should return 404', async () => {
      const todoId = new mongoose.Types.ObjectId('5a6106521b12fe0955193508');      
      sandbox.stub(Todo, 'findById').withArgs(todoId).returns(null);

      const response = await request(app)
      .get(`/todos/${todoId}`)
      .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.text).toBe('todo');
    });
  });

  describe('Given todo with id', () => {
    test('should return 200 with todo in body', async () => {   
      const todo = {
        _id: new mongoose.Types.ObjectId('5a6106521b12fe0955193508'),
        text: 'Something to do'
      };

      sandbox.stub(Todo, 'findById').withArgs(todo._id.toHexString()).returns(todo);

      const response = await request(app)
      .get(`/todos/${todo._id}`)
      .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.text).toEqual(JSON.stringify(todo));
    });
  });
});

describe('DELETE /todos/id', () => {
  describe('Given no todo with id', () => {
    test('should return 404', async () => {
      const todoId = new mongoose.Types.ObjectId('5a6106521b12fe0955193508');      
      sandbox.stub(Todo, 'findByIdAndRemove').withArgs(todoId).returns(null);

      const response = await request(app)
      .delete(`/todos/${todoId}`)
      .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.text).toBe('todo');
    });
  });

  describe('Given todo with id', () => {
    test('should delete todo and return 201 with deleted todo in body', async () => {   
      const todo = {
        _id: new mongoose.Types.ObjectId('5a6106521b12fe0955193508'),
        text: 'Something to do'
      };

      sandbox.stub(Todo, 'findByIdAndRemove').withArgs(todo._id.toHexString()).returns(todo);

      const response = await request(app)
      .delete(`/todos/${todo._id}`)
      .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.text).toEqual(JSON.stringify(todo));
    });
  });
});