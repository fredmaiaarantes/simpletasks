import {
  Box,
  Button,
  HStack,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TaskItem } from './TaskItem';
import { toggleTaskDone } from '../../tasks/ToggleTaskDone';
import { removeTask } from '../../tasks/RemoveTask';
import React from 'react';
import FlipMove from 'react-flip-move';

export const TaskItems = ({
  tasks,
  pendingCount,
  hideDone,
  setHideDone,
  isLoading,
}) => (
  <Box
    mt={8}
    py={{ base: 2 }}
    px={{ base: 4 }}
    pb={{ base: 4 }}
    border={1}
    borderStyle="solid"
    borderRadius="md"
    borderColor={useColorModeValue('gray.200', 'gray.700')}
  >
    <HStack mt={2}>
      <Box w="70%">
        <Text
          as="span"
          color={useColorModeValue('gray.500', 'gray.400')}
          fontSize="xs"
        >
          You have {tasks.length} {tasks.length === 1 ? 'task ' : 'tasks '}
          and {pendingCount || 0} pending.
        </Text>
      </Box>
      <Stack w="30%" justify="flex-end" direction="row">
        <Button
          colorScheme="teal"
          size="xs"
          onClick={() => setHideDone(!hideDone)}
        >
          {hideDone ? 'Show All Tasks' : 'Show Pending'}
        </Button>
      </Stack>
    </HStack>
    {isLoading() ? (
      <Spinner />
    ) : (
      <FlipMove duration={700}>
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onMarkAsDone={taskId => toggleTaskDone.call({ taskId })}
            onDelete={taskId => removeTask.call({ taskId })}
          />
        ))}
      </FlipMove>
    )}
  </Box>
);
