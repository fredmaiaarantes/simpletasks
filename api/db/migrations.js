import { Migrations } from 'meteor/quave:migrations';
import { Accounts } from 'meteor/accounts-base';
import { Tasks } from '../tasks/tasks';

Migrations.add({
  version: 1,
  name: 'Add a seed username and password.',
  up: async function() {
    await Accounts.createUserAsync({
      username: 'fredmaia',
      password: 'abc123',
    });
  },
});

Migrations.add({
  version: 2,
  name: 'Add a few sample tasks.',
  up: async function() {
    const createdAt = new Date();
    const user = await Accounts.findUserByUsername('fredmaia');
    await Tasks.insertAsync({
      description: 'Install Node@20',
      done: false,
      userId: user._id,
      createdAt,
    });
    await Tasks.insertAsync({
      description: 'Install MeteorJS',
      done: false,
      userId: user._id,
      createdAt,
    });
    await Tasks.insertAsync({
      description: 'Clone this repository',
      done: false,
      userId: user._id,
      createdAt,
    });
  },
});
