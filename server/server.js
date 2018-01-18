const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@localhost:27017/todoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

const todo1 = new Todo({
  text: 'Cook dinner'
});

const todo2 = new Todo({
  text: 'Do the dishes',
  completed: true,
  completedAt: 1
});

todo2.save().then((todo) => {
  console.log('Saved todo', todo);
}, (error) => {
  console.log('Could not save todo', error);
});

const user = new User({
  email: 'joskevermeulen@gmail.com'
});

user.save().then((user) => {
  console.log('Saved user', user);
}, (error) => {
  console.log('Could not save user', error);
});