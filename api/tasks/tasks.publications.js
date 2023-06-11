import { Meteor } from 'meteor/meteor';
import { Tasks } from './tasks';

function findTasksByLoggedUser() {
  return Tasks.find({ userId: Meteor.userId() });
}

Meteor.publish('tasksByLoggedUser', findTasksByLoggedUser);
