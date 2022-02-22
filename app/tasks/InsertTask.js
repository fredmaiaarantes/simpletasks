import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { check } from 'meteor/check';
import { Task } from './Task';
import { Meteor } from 'meteor/meteor';

const validateInput = ({ description }) => {
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
  validate: validateInput,
  run({ description }) {
    const task = new Task({
      description,
      userId: this.userId,
      createdAt: new Date(),
    });
    task.save();
  },
});
