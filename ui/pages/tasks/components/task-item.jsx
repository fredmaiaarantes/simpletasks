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
    <HStack mt={4} align="start">
      <Box flex={1} minW={0}>
        <Checkbox
          colorScheme="green"
          maxW="full"
          alignItems="start"
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
              style={{
                textDecoration: task.done ? 'line-through' : 'none',
                overflowWrap: 'anywhere',
              }}
            >
              {task.description}
            </span>
          </Tooltip>
        </Checkbox>
      </Box>
      <Stack flexShrink={0} justify="flex-end" direction="row">
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
