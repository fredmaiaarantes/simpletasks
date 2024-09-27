import { Migrations } from 'meteor/quave:migrations';
import { Accounts } from 'meteor/accounts-base';
import { Tasks } from '../tasks/tasks';

Migrations.add({
  version: 1,
  name: 'Add a seed username and password.',
  up() {
    Accounts.createUser({
      username: 'fredmaia',
      password: 'abc123',
    });
  },
});

Migrations.add({
  version: 2,
  name: 'Add a few sample tasks.',
  up() {
    const user = Accounts.findUserByUsername('fredmaia');
    Tasks.insert({
      description: 'Install Node@14',
      done: false,
      userId: user._id,
      createdAt: new Date(2024, 1, 1),
    });
    Tasks.insert({
      description: 'Install Meteor.js 2.0',
      done: false,
      userId: user._id,
      createdAt: new Date(2024, 1, 2),
    });
    Tasks.insert({
      description: 'Clone this repository',
      done: false,
      userId: user._id,
      createdAt: new Date(2024, 1, 3),
    });
  },
});
