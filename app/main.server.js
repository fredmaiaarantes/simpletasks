import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';
import '../db/migrations';

import './tasks/removeTask';
import './tasks/insertTask';
import './tasks/toggleTaskDone';
import './tasks/tasks.publications';

/**
 * This is the server-side entry point
 */
Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
