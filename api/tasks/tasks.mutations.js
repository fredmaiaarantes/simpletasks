import { createMutation } from 'grubba-rpc';
import { z } from 'zod';

const DescriptionValidator = z.object({ description: z.string() });

const IdValidator = z.object({ taskId: z.string() });

/**
 * Insert a task for the logged user.
 * @param {{ description: String }}
 * @throws Will throw an error if user is not logged in.
 * @return string
 */
export const insertTask = createMutation(
  'tasks.insert',
  DescriptionValidator
).expect(z.string());

/**
 * Remove a task.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export const removeTask = createMutation('tasks.remove', IdValidator).expect(
  z.void()
);

/**
 * Toggle task as done or not.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export const toggleTaskDone = createMutation(
  'tasks.toggleDone',
  IdValidator
).expect(z.void());
