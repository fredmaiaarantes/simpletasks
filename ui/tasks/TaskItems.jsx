import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TaskItem } from './TaskItem';
import React, { useEffect, useState } from 'react';
import { removeTask, toggleTaskDone } from '../../api/tasks/tasks.mutations';
import { Meteor } from 'meteor/meteor';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { TasksCollection } from '../../api/tasks/tasks.collection';
import { tasksPublication } from '../../api/tasks/tasks.publications';
import { useTracker } from './useTracker';
import { useFind } from './useFind';
// import { useFind } from 'meteor/react-meteor-data';
// import { useSubscribe } from './useSubscribe';

export const TaskItems = () => {
  const [hideDone, setHideDone] = useState(false);
  useSubscribe(tasksPublication.config.name);
  const userId = useTracker('user', () => Meteor.userId());
  const filter = hideDone ? { done: { $ne: true }, userId } : { userId };

  useEffect(() => {
    console.log('hideDone changed', hideDone, filter);
  }, [hideDone]);

  const tasks = useFind(
    () =>
      TasksCollection.find(filter, {
        sort: { createdAt: -1 },
      }),
    [hideDone]
  );

  const pendingCount = useFind(
    () => TasksCollection.find({ done: { $ne: true }, userId }),
    [hideDone]
  ).length;

  return (
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
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onMarkAsDone={taskId => toggleTaskDone({ taskId })}
          onDelete={taskId => removeTask({ taskId })}
        />
      ))}
    </Box>
  );
};
