import { createCollection } from 'meteor/quave:collections';
import SimpleSchema from 'simpl-schema';

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
  },
});
