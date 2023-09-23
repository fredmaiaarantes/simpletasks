import { Meteor } from 'meteor/meteor';

export function mockLoggedUserId(userId) {
  Meteor.userId = () => userId;
}

export function getMeteorPublication(name) {
  return Meteor.server.publish_handlers[name].apply({});
}
