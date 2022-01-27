import { createCollection } from 'meteor/quave:collections';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

const collectionSchema = new SimpleSchema({
  description: {
    type: String,
  },
  done: {
    type: Boolean,
    defaultValue: false,
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  userId: {
    type: String,
    optional: true,
  },
});

const collectionHelpers = {
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
};

export const TasksCollection = createCollection({
  name: 'tasks',
  schema: collectionSchema,
  collection: collectionHelpers,
  apply(collection) {
    /* eslint-disable no-param-reassign */
    collection.before.insert((userId, doc) => {
      doc.userId = userId;
      doc.createdAt = new Date();
    });
  },
});
