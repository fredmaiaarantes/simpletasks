import { TasksCollection } from './tasks.collection';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn, checkTaskOwner } from '../lib/auth';

// [insertTask, removeTask, toggleTaskDone].forEach(fn => {
//   fn.addBeforeResolveHook(checkLoggedIn);
// });

// insertTask.setResolver(({ description }) =>
//   TasksCollection.insert({
//     description,
//     userId: Meteor.userId(),
//     createdAt: new Date(),
//   })
// );

// removeTask.setResolver(({ taskId }) => {
//   checkTaskOwner({ taskId });
//   TasksCollection.remove(taskId);
// });

// toggleTaskDone.setResolver(({ taskId }) => {
//   checkTaskOwner({ taskId });
//   const task = TasksCollection.findOne(taskId);
//   TasksCollection.update({ _id: taskId }, { $set: { done: !task.done } });
// });

Meteor.methods({
  async addTask({ description }) {
    checkLoggedIn();
    return await TasksCollection.insertAsync({
      description,
      done: false,
      userId: Meteor.userId(),
      createdAt: new Date(),
    });
  },

  async removeTask({ taskId }) {
    await checkTaskOwner({ taskId });
    return await TasksCollection.removeAsync(taskId);
  },

  async toggleTaskDone({ taskId }) {
    await checkTaskOwner({ taskId });
    const task = await TasksCollection.findOneAsync(taskId);
    return await TasksCollection.updateAsync(
      { _id: taskId },
      { $set: { done: !task.done } }
    );
  },

});
