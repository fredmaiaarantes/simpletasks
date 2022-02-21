import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { check } from 'meteor/check';
import { TasksCollection } from './tasks.collection';
import { Meteor } from 'meteor/meteor';

const validate = ({ description }) => {
  try {
    check(description, String);
  } catch (exception) {
    throw new Meteor.Error('403', 'The information entered is not valid');
  }
};

export const insertTask = new ValidatedMethod({
  name: 'insertTask',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLoggedIn',
  },
  validate,
  run({ description }) {
    TasksCollection.insert({
      description,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
});
