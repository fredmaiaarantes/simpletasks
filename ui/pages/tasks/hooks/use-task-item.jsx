import { useToast } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

export function useTaskItem() {
  const toast = useToast();

  function onMarkAsDone(_id) {
    Meteor.call('toggleTaskDone', { taskId: _id });
  }

  function onDelete(_id) {
    try {
      Meteor.call('removeTask', { taskId: _id });
      toast({
        title: 'Task removed.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
      });
    }
  }

  return {
    onMarkAsDone,
    onDelete,
  };
}
