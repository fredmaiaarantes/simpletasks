import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';
import '../db/migrations';

import './tasks/RemoveTask';
import './tasks/InsertTask';
import './tasks/ToggleTaskDone';
import './tasks/TasksPublications';

/**
 * This is the server-side entry point
 */
Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
