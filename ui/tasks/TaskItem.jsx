import React, { memo } from 'react';
import { Box, Button, HStack, Stack, Checkbox } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

export const TaskItem = memo(({ task }) => {
  async function onMarkAsDone(_id) {
    await Meteor.callAsync('toggleTaskDone', { taskId: _id });
  }

  async function onDelete(_id) {
    await Meteor.callAsync('removeTask', { taskId: _id });
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
