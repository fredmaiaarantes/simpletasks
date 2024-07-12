import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../tasks/tasks';

/**
 * Check if user is logged in.
 * @throws Will throw an error if user is not logged in.
 */
export function checkLoggedIn() {
  if (!Meteor.userId()) {
    throw new Meteor.Error('Error', 'Not authorized.');
  }
}

/**
 * Check if user is logged in and is the task owner.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export async function checkTaskOwner({ taskId }) {
  check(taskId, String);
  checkLoggedIn();
  const task = await Tasks.findOneAsync({
    _id: taskId,
    userId: Meteor.userId(),
  });
  if (!task) {
    throw new Meteor.Error('Error', 'Access denied.');
  }
}
