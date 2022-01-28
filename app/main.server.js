import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './tasks/tasks.methods';
import './tasks/tasks.publications';

const SEED_USERNAME = 'fredmaiaarantes';
const SEED_PASSWORD = 'abc123';

/**
 * This is the server-side entry point
 */
Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
