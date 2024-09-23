import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn, checkTaskOwner } from '../lib/auth';
import { Tasks } from './tasks';

/**

 Inserts a new task into the Tasks collection.
 @async
 @function insertTask
 @param {Object} taskData - The task data.
 @param {string} taskData.description - The description of the task.
 @returns {string} - The ID of the inserted task.
 */
function insertTask({ description }) {
  check(description, String);
  checkLoggedIn();
  const task = {
    description,
    done: false,
    userId: Meteor.userId(),
    createdAt: new Date(),
  };
  return Tasks.insert(task);
}

/**
 Removes a task from the Tasks collection.
 @async
 @function removeTask
 @param {Object} taskData - The task data.
 @param {string} taskData.taskId - The ID of the task to remove.
 @returns {number}
 */
function removeTask({ taskId }) {
  check(taskId, String);
  checkTaskOwner({ taskId });
  return Tasks.remove(taskId);
}

/**
 Toggles the 'done' status of a task in the Tasks collection.
 @async
 @function toggleTaskDone
 @param {Object} taskData - The task data.
 @param {string} taskData.taskId - The ID of the task to toggle.
 @returns {number}
 */
function toggleTaskDone({ taskId }) {
  check(taskId, String);
  checkTaskOwner({ taskId });
  const task = Tasks.findOne(taskId);
  return Tasks.update({ _id: taskId }, { $set: { done: !task.done } });
}

Meteor.methods({ insertTask, removeTask, toggleTaskDone });
