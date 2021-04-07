import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  'tasks.insert'(description) {
    check(description, String);

    if (!this.userId) {
      throw new Meteor.Error('Error adding task', 'Not authorized.');
    }

    TasksCollection.insert({
      description,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Error removing task', 'Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Error removing task', 'Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setDone'(taskId, done) {
    check(taskId, String);
    check(done, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Error updating task', 'Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Error updating task', 'Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        done,
      },
    });
  },
});
