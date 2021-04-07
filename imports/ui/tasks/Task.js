import React from 'react';
import { Box, Button, HStack, Stack, Checkbox } from '@chakra-ui/react';

export const Task = ({ task, onMarkAsDone, onDelete }) => (
  <HStack mt={4}>
    <Box w="80%">
      <Checkbox
        colorScheme="green"
        isChecked={task.done}
        onChange={() => onMarkAsDone(task)}
      >
        {task.description}
      </Checkbox>
    </Box>
    <Stack w="20%" justify="flex-end" direction="row">
      <Button
        colorScheme="red"
        variant="outline"
        size="xs"
        onClick={() => onDelete(task)}
      >
        Remove
      </Button>
    </Stack>
  </HStack>
);
