import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';

import './db/migrations';
import './tasks/tasks.publications';
import './tasks/tasks.methods';

/**
 * This is the server-side entry point
 */
Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
