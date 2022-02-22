import { Migrations } from 'meteor/percolate:migrations';
import { Accounts } from 'meteor/accounts-base';
import { Task } from '../app/tasks/Task';

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
    const createdAt = new Date();
    const { _id: userId } = Accounts.findUserByUsername('fredmaia');
    new Task({
      description: 'Install Node@14',
      userId,
      createdAt,
    }).save();
    new Task({
      description: 'Install MeteorJS',
      userId,
      createdAt,
    }).save();
    new Task({
      description: 'Clone this repository',
      userId,
      createdAt,
    }).save();
  },
});
