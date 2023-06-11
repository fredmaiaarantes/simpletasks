import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TaskItem } from './TaskItem';
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data/suspense';
import { Tasks } from '../../api/tasks/tasks';

export const TaskItems = () => {
  useSubscribe('tasksByLoggedUser');
  const [hideDone, setHideDone] = useState(false);
  const userId = useTracker('userId', () => Meteor.userId());
  const filter = hideDone ? { done: { $ne: true }, userId } : { userId };

  const tasks = useFind(() => Tasks.find(filter, { sort: { createdAt: -1 } }), [
    hideDone,
  ]);
  const pendingCount = useFind(() =>
    Tasks.find({
      done: { $ne: true },
      userId,
    })
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
        <TaskItem key={task._id} task={task} />
      ))}
    </Box>
  );
};
