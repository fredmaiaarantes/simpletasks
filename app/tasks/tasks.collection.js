import { createCollection } from 'meteor/quave:collections';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const TasksCollection = createCollection({
  name: 'tasks',
  schema: new SimpleSchema({
    description: {
      type: String,
    },
    done: {
      type: Boolean,
      defaultValue: false,
    },
    createdAt: {
      type: Date,
    },
    userId: {
      type: String,
    },
  }),
  collection: {
    findAndCheckOwnership({ taskId, userId }) {
      const task = this.findOne({
        _id: taskId,
        userId,
      });
      if (!task) {
        throw new Meteor.Error('Error removing task', 'Access denied.');
      }
      return task;
    },
    toggleDone({ taskId, userId }) {
      const task = this.findAndCheckOwnership({ taskId, userId });
      this.update(taskId, {
        $set: {
          done: !task.done,
        },
      });
    },
  },
});
