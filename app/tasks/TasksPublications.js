import { Meteor } from 'meteor/meteor';
import { Task } from './Task';

Meteor.publish('tasksByLoggedUser', function publishTasks() {
  return Task.find({ userId: this.userId });
});
