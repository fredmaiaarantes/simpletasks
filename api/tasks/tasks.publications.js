import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasks.collection';

Meteor.publish('tasksByLoggedUser', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
