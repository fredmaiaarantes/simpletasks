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
});
