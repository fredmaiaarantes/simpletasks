import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../model/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
