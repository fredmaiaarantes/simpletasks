import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasks.collection';
import { createPublication } from 'grubba-rpc';
import { z } from 'zod';

export const tasksPublication = createPublication(
  'tasksByLoggedUser',
  z.undefined(),
  () => TasksCollection.find({ userId: Meteor.userId() })
);
