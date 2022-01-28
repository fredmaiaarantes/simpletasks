import { check } from 'meteor/check';
import { TasksCollection } from './tasks.collection';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const insertTask = new ValidatedMethod({
  name: 'insertTask',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLoggedIn',
  },
  validate: ({ description }) => {
    check(description, String);
  },
  run({ description }) {
    TasksCollection.insert({
      description,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
});

export const removeTask = new ValidatedMethod({
  name: 'removeTask',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLoggedIn',
  },
  validate: ({ taskId }) => {
    check(taskId, String);
  },
  run({ taskId }) {
    TasksCollection.findAndCheckOwnership({ taskId, userId: this.userId });
    TasksCollection.remove(taskId);
  },
});

export const toggleTaskDone = new ValidatedMethod({
  name: 'toggleTaskDone',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLoggedIn',
  },
  validate: ({ taskId }) => {
    check(taskId, String);
  },
  run({ taskId }) {
    TasksCollection.toggleDone({ taskId, userId: this.userId });
  },
});
