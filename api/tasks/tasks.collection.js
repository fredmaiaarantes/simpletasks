import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const TasksCollection = new Mongo.Collection('tasks');

const TasksSchema = new SimpleSchema({
  description: String,
  done: {
    type: Boolean,
    defaultValue: false,
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: Date,
});

TasksCollection.attachSchema(TasksSchema);
