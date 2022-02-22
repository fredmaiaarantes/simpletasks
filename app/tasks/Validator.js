import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Task } from './Task';

export const validateTaskId = ({ taskId }) => {
  try {
    check(taskId, String);
  } catch (exception) {
    throw new Meteor.Error('403', 'The information entered is not valid');
  }
};

export const validateTaskOwner = ({ taskId }) => {
  const task = Task.findOne({
    _id: taskId,
    userId: Meteor.userId(),
  });
  if (!task) {
    throw new Meteor.Error('Error', 'Access denied.');
  }
};
