import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../collections/tasksCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
