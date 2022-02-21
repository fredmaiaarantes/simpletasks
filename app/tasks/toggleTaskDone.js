import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasks.collection';

const validate = ({ taskId }) => {
  try {
    check(taskId, String);
  } catch (exception) {
    throw new Meteor.Error('403', 'The information entered is not valid');
  }
  const task = TasksCollection.findOne({
    _id: taskId,
    userId: Meteor.userId(),
  });
  if (!task) {
    throw new Meteor.Error('Error', 'Access denied.');
  }
};

export const toggleTaskDone = new ValidatedMethod({
  name: 'toggleTaskDone',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLoggedIn',
  },
  validate,
  run({ taskId }) {
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    TasksCollection.update(taskId, {
      $set: {
        done: !task.done,
      },
    });
  },
});
