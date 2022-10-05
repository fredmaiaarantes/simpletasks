import { TasksCollection } from './tasks.collection';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn, checkTaskOwner } from '../lib/auth';
import { createMutation } from 'grubba-rpc';
import { z } from 'zod';

const DescriptionValidator = z.object({ description: z.string() });

const IdValidator = z.object({ taskId: z.string() });

/**
 * Insert a task for the logged user.
 * @param {{ description: String }}
 * @throws Will throw an error if user is not logged in.
 */
export const insertTask = createMutation(
  'tasks.insert',
  DescriptionValidator,
  ({ description }) => {
    checkLoggedIn();
    TasksCollection.insert({
      description,
      userId: Meteor.userId(),
      createdAt: new Date(),
    });
  }
);

/**
 * Remove a task.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export const removeTask = createMutation(
  'tasks.remove',
  IdValidator,
  ({ taskId }) => {
    checkTaskOwner({ taskId });
    TasksCollection.remove(taskId);
  }
);

/**
 * Toggle task as done or not.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export const toggleTaskDone = createMutation(
  'tasks.toggleDone',
  IdValidator,
  ({ taskId }) => {
    checkTaskOwner({ taskId });
    const task = TasksCollection.findOne(taskId);
    TasksCollection.update({ _id: taskId }, { $set: { done: !task.done } });
  }
);
