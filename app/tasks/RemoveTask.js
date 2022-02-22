import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Task } from './Task';
import { validateTaskId, validateTaskOwner } from './Validator';

const validateInput = ({ taskId }) => {
  validateTaskId({ taskId });
  validateTaskOwner({ taskId });
};

export const removeTask = new ValidatedMethod({
  name: 'removeTask',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLoggedIn',
  },
  validate: validateInput,
  run({ taskId }) {
    Task.remove(taskId);
  },
});
