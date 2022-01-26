import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './api/tasksMethods';
import './api/tasksPublications';

const SEED_USERNAME = 'fredmaiaarantes';
const SEED_PASSWORD = 'abc123';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
