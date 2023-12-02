import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

const schema = {
  _id: String,
  description: String,
  done: Boolean,
  createdAt: Date,
  userId: String,
};

Tasks.attachSchema(schema);
