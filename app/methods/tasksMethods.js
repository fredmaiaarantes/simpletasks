import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../collections/tasksCollection';

Meteor.methods({
  'tasks.insert'(description) {
    check(description, String);

    if (!this.userId) {
      throw new Meteor.Error('Error adding task', 'Not authorized.');
    }
    TasksCollection.insert({ description });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Error removing task', 'Not authorized.');
    }
    TasksCollection.findAndCheckOwnership({ taskId, userId });
    TasksCollection.remove(taskId);
  },

  'tasks.toggleDone'(taskId) {
    check(taskId, String);
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Error updating task', 'Not authorized.');
    }
    TasksCollection.toggleDone({ taskId, userId });
  },
});
