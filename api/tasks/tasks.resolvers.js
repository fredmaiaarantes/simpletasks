import { TasksCollection } from './tasks.collection';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn, checkTaskOwner } from '../lib/auth';
import { insertTask, removeTask, toggleTaskDone } from './tasks.mutations';

[insertTask, removeTask, toggleTaskDone].forEach(fn => {
  fn.addBeforeResolveHook(checkLoggedIn);
});

insertTask.setResolver(({ description }) =>
  TasksCollection.insert({
    description,
    userId: Meteor.userId(),
    createdAt: new Date(),
  })
);

removeTask.setResolver(({ taskId }) => {
  checkTaskOwner({ taskId });
  TasksCollection.remove(taskId);
});

toggleTaskDone.setResolver(({ taskId }) => {
  checkTaskOwner({ taskId });
  const task = TasksCollection.findOne(taskId);
  TasksCollection.update({ _id: taskId }, { $set: { done: !task.done } });
});
