import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Meteor } from 'meteor/meteor';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function useTaskForm() {
  const toast = useToast();
  const schema = z.object({
    description: z.string().min(1, 'Task description is required'),
  });

  const { handleSubmit, register, reset, formState } = useForm({
    resolver: zodResolver(schema),
  });

  async function saveTask(values) {
    const description = values.description.trim();
    try {
      await Meteor.callAsync('insertTask', { description });
      reset();
    } catch (err) {
      const reason = err?.reason || 'Sorry, please try again.';
      toast({
        title: 'An error occurred.',
        description: reason,
        status: 'error',
      });
    }
  }

  return {
    saveTask,
    register,
    formState,
    handleSubmit,
  };
}
