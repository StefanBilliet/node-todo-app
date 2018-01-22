const Todo = require('./todo');

describe('Todo model tests', () => {
  test('empty text fails', async () => {
    const sut = new Todo({text: null});
    try {
      await sut.validate();      
    } catch ({errors}) {
      expect(errors.text).toBeDefined();  
    }
  });

  test('non empty text passes', async () => {
    const sut = new Todo({text: 'Something to do...'});
    try {
      await sut.validate();      
    } catch ({errors}) {
      expect(errors.text).not.toBeDefined();  
    }
  });
})