import { TasksCollection } from './tasks.collection';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn, checkTaskOwner } from '../lib/auth';
import * as Tasks from './tasks.mutations';

Tasks.insertTask.setResolver(({ description }) => {
  checkLoggedIn();
  TasksCollection.insert({
    description,
    userId: Meteor.userId(),
    createdAt: new Date(),
  });
});

Tasks.removeTask.setResolver(({ taskId }) => {
  checkTaskOwner({ taskId });
  TasksCollection.remove(taskId);
});

Tasks.toggleTaskDone.setResolver(({ taskId }) => {
  checkTaskOwner({ taskId });
  const task = TasksCollection.findOne(taskId);
  TasksCollection.update({ _id: taskId }, { $set: { done: !task.done } });
});
