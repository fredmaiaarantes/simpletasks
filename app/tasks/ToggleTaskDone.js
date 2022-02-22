import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Task } from './Task';
import { validateTaskId, validateTaskOwner } from './Validator';

const validateInput = ({ taskId }) => {
  validateTaskId({ taskId });
  validateTaskOwner({ taskId });
};

export const toggleTaskDone = new ValidatedMethod({
  name: 'toggleTaskDone',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLoggedIn',
  },
  validate: validateInput,
  run({ taskId }) {
    const task = Task.findOne(taskId);
    task.done = !task.done;
    task.save();
  },
});
