import { check } from 'meteor/check';
import { TasksCollection } from './tasks.collection';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn } from '../common/auth';

/**
 * Insert a task for the logged user.
 * @param {{ description: String }}
 * @throws Will throw an error if user is not logged in.
 */
const insertTask = ({ description }) => {
  check(description, String);
  checkLoggedIn();
  TasksCollection.insert({
    description,
    userId: Meteor.userId(),
    createdAt: new Date(),
  });
};

/**
 * Check if user is logged in and is the task owner.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
const checkTaskOwner = ({ taskId }) => {
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

/**
 * Remove a task.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export const removeTask = ({ taskId }) => {
  checkTaskOwner({ taskId });
  TasksCollection.remove(taskId);
};

/**
 * Toggle task as done or not.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
const toggleTaskDone = ({ taskId }) => {
  checkTaskOwner({ taskId });
  const task = TasksCollection.findOne(taskId);
  TasksCollection.update({ _id: taskId }, { $set: { done: !task.done } });
};

/**
 * Register task API methods.
 */
Meteor.methods({
  insertTask,
  removeTask,
  toggleTaskDone,
});
