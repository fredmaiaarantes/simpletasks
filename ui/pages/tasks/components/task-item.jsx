import React, { memo } from 'react';
import { Box, Button, Checkbox, HStack, Stack, useToast } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

export const TaskItem = memo(({ task }) => {
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

  return (
    <HStack mt={4}>
      <Box w="80%">
        <Checkbox
          colorScheme="green"
          isChecked={task.done}
          onChange={() => onMarkAsDone(task._id)}
        >
          {task.description}
        </Checkbox>
      </Box>
      <Stack w="20%" justify="flex-end" direction="row">
        <Button
          colorScheme="red"
          variant="outline"
          size="xs"
          onClick={() => onDelete(task._id)}
        >
          Remove
        </Button>
      </Stack>
    </HStack>
  );
});
