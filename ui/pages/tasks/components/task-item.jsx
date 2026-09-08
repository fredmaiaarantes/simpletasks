import {
  Box,
  Button,
  Checkbox,
  HStack,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import React, { memo } from 'react';
import { useTaskItem } from '../hooks/use-task-item';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
};

export const TaskItem = memo(({ task }) => {
  const { onDelete, onMarkAsDone } = useTaskItem();

  return (
    <HStack mt={4}>
      <Box w="80%">
        <Checkbox
          colorScheme="green"
          isChecked={task.done}
          onChange={() => onMarkAsDone(task._id)}
        >
          <Tooltip
            label={`Added on ${formatDate(task.createdAt)}`}
            hasArrow
            placement="right-start"
            openDelay={600}
          >
            <span
              style={{ textDecoration: task.done ? 'line-through' : 'none' }}
            >
              {task.description}
            </span>
          </Tooltip>
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
