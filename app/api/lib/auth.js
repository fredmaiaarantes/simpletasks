import { Meteor } from 'meteor/meteor';

export const checkLoggedIn = () => {
  if (!Meteor.userId()) {
    throw new Meteor.Error('Error', 'Access denied.');
  }
};
