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
    findByUserId({ userId, hideDone }) {
      return hideDone
        ? this.findPendingByUserId({ userId })
        : this.find(
            { userId },
            {
              sort: { createdAt: -1 },
            }
          );
    },
    findPendingByUserId({ userId }) {
      return this.find(
        { done: { $ne: true }, userId },
        {
          sort: { createdAt: -1 },
        }
      );
    },
    countPendingByUserId({ userId }) {
      return this.find({ done: { $ne: true }, userId }).count();
    },
    findAndCheckOwnership({ taskId, userId }) {
      const task = this.findOne({
        _id: taskId,
        userId,
      });
      if (!task) {
        throw new Meteor.Error('Error', 'Access denied.');
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
