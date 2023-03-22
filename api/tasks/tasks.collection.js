import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const TasksCollection = new Mongo.Collection('tasks');
Meteor.methods({
  async addTask({ description }) {
    return await TasksCollection.insertAsync({
      description,
      done: true,
      userId: Meteor.userId(),
      createdAt: new Date(),
    });
  },
});
// const TasksSchema = new SimpleSchema({
//   description: String,
//   done: {
//     type: Boolean,
//     defaultValue: false,
//   },
//   userId: {
//     type: String,
//     regEx: SimpleSchema.RegEx.Id,
//   },
//   createdAt: Date,
// });

// TasksCollection.attachSchema(TasksSchema);
