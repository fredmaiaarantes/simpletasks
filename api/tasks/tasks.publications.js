import { Meteor } from 'meteor/meteor';
import { Tasks } from './tasks';

/**
 Finds tasks belonging to the logged-in user.
 @function findTasksByLoggedUser
 @returns {Mongo.Cursor} - The cursor containing the tasks found.
 */
function findTasksByLoggedUser() {
  return Tasks.find({ userId: Meteor.userId() });
}

Meteor.publish('tasksByLoggedUser', findTasksByLoggedUser);
