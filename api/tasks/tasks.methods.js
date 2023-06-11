import { Tasks } from './tasks';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn, checkTaskOwner } from '../lib/auth';
import { check } from 'meteor/check';

async function insertTask({ description }) {
  check(description, String);
  checkLoggedIn();
  const task = {
    description,
    userId: Meteor.userId(),
    createdAt: new Date(),
  };
  return Tasks.insertAsync(task);
}

async function removeTask({ taskId }) {
  check(taskId, String);
  await checkTaskOwner({ taskId });
  return Tasks.removeAsync(taskId);
}

async function toggleTaskDone({ taskId }) {
  check(taskId, String);
  await checkTaskOwner({ taskId });
  const task = await Tasks.findOneAsync(taskId);
  return Tasks.updateAsync({ _id: taskId }, { $set: { done: !task.done } });
}

Meteor.methods({ insertTask, removeTask, toggleTaskDone });
