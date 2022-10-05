import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../tasks/tasks.collection';

/**
 * Check if user is logged in.
 * @throws Will throw an error if user is not logged in.
 */
export const checkLoggedIn = () => {
  if (!Meteor.userId()) {
    throw new Meteor.Error('Error', 'Access denied.');
  }
};

/**
 * Check if user is logged in and is the task owner.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export const checkTaskOwner = ({ taskId }) => {
  check(taskId, String);
  checkLoggedIn();
  const task = TasksCollection.findOne({
    _id: taskId,
    userId: Meteor.userId(),
  });
  if (!task) {
    throw new Meteor.Error('Error', 'Access denied.');
  }
};
