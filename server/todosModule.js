module.exports = (app, Todo) => {
  app.post('/todos', async (request, response) => {
    const todo = new Todo({
      text: request.body.text
    });

    try {
      const document = await todo.save();
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
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get('/todos/:id', async (request, response) => {
    try {
      const todo = await Todo.findById(request.params.id);

      if (!todo) {
        response.status(404).send('todo');
        return;
      }

      response.send(todo);
    } catch (error) {
      response.status(500).send(error);
    }
  });
}