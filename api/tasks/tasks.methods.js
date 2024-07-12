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
 @returns {Promise<string>} - The ID of the inserted task.
 */
async function insertTask({ description }) {
  check(description, String);
  checkLoggedIn();
  const task = {
    description,
    done: false,
    userId: Meteor.userId(),
    createdAt: new Date(),
  };
  return Tasks.insertAsync(task);
}

/**
 Removes a task from the Tasks collection.
 @async
 @function removeTask
 @param {Object} taskData - The task data.
 @param {string} taskData.taskId - The ID of the task to remove.
 @returns {Promise<number>}
 */
async function removeTask({ taskId }) {
  check(taskId, String);
  await checkTaskOwner({ taskId });
  return Tasks.removeAsync(taskId);
}

/**
 Toggles the 'done' status of a task in the Tasks collection.
 @async
 @function toggleTaskDone
 @param {Object} taskData - The task data.
 @param {string} taskData.taskId - The ID of the task to toggle.
 @returns {Promise<number>}
 */
async function toggleTaskDone({ taskId }) {
  check(taskId, String);
  await checkTaskOwner({ taskId });
  const task = await Tasks.findOneAsync(taskId);
  return Tasks.updateAsync({ _id: taskId }, { $set: { done: !task.done } });
}

Meteor.methods({ insertTask, removeTask, toggleTaskDone });
