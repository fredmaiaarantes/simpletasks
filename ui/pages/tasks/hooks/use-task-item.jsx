import { useToast } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

export function useTaskItem() {
  const toast = useToast();

  async function onMarkAsDone(_id) {
    await Meteor.callAsync('toggleTaskDone', { taskId: _id });
  }

  async function onDelete(_id) {
    try {
      await Meteor.callAsync('removeTask', { taskId: _id });
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
