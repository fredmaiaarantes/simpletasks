import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Task } from './Task';

const validate = ({ taskId }) => {
  try {
    check(taskId, String);
  } catch (exception) {
    throw new Meteor.Error('403', 'The information entered is not valid');
  }
  const task = Task.findOne({
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
    const task = Task.findOne(taskId);
    task.done = !task.done;
    task.save();
  },
});
