import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

const TasksCollection = new Mongo.Collection('tasks');

export const Task = Class.create({
  name: 'Task',
  collection: TasksCollection,
  fields: {
    description: String,
    userId: String,
    done: {
      type: Boolean,
      default: false,
    },
    createdAt: Date,
  },
});
