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
import React from 'react';
import { Meteor } from 'meteor/meteor';

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
    borderColor={useColorModeValue('gray.400', 'gray.700')}
  >
    <HStack mt={2}>
      <Box w="70%">
        <Text
          as="span"
          color={useColorModeValue('gray.600', 'gray.400')}
          fontSize="xs"
        >
          You have {tasks.length} {tasks.length === 1 ? 'task ' : 'tasks '}
          and {pendingCount || 0} pending.
        </Text>
      </Box>
      <Stack w="30%" justify="flex-end" direction="row">
        <Button
          bg="teal.600"
          color="white"
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
      <>
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onMarkAsDone={taskId => Meteor.call('toggleTaskDone', { taskId })}
            onDelete={taskId => Meteor.call('removeTask', { taskId })}
          />
        ))}
      </>
    )}
  </Box>
);
