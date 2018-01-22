module.exports = (app, Todo) => {
  app.post('/todos', async (request, response) => {
    debugger;
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
}