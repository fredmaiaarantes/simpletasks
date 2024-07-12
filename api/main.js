import { Migrations } from 'meteor/quave:migrations';
import { Meteor } from 'meteor/meteor';

import './db/migrations';
import './tasks/tasks.publications';
import './tasks/tasks.methods';

/**
 * This is the server-side entry point
 */
Meteor.startup(() => {
  Migrations.migrateTo('latest').catch((e) =>
    console.error('Error running migrations', e)
  );
});
