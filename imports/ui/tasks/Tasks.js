import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Spinner,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { Task } from './Task';
import { TasksCollection } from '../../db/TasksCollection';
import { TaskForm } from './TaskForm';
import { useTracker } from 'meteor/react-meteor-data';

const markAsDone = ({ _id, done }) => Meteor.call('tasks.setDone', _id, !done);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const Tasks = ({ user }) => {
  const [hideDone, setHideDone] = useState(false);
  const doneFilter = { done: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...doneFilter, ...userFilter };

  const { tasks, pendingCount, allCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingCount: 0, allCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasksData = TasksCollection.find(
      hideDone ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pending = TasksCollection.find(pendingOnlyFilter).count();
    const all = TasksCollection.find({}).count();

    return { tasks: tasksData, pendingCount: pending, allCount: all };
  });

  const Header = () => (
    <Stack as={Box} textAlign="center" spacing={{ base: 8 }} py={{ base: 10 }}>
      <Heading fontWeight={600}>
        <Text
          as="span"
          bgGradient="linear(to-l, #675AAA, #4399E1)"
          bgClip="text"
        >
          Simple Tasks
        </Text>
      </Heading>
    </Stack>
  );

  const EmptyTasks = () => (
    <Stack justify="center" direction="row">
      <Text color="gray.400" fontSize="xl">
        Add your first task above.
      </Text>
    </Stack>
  );

  if (allCount === 0) {
    return (
      <>
        <Header />
        <TaskForm />
        <EmptyTasks />
      </>
    );
  }

  return (
    <>
      <Header />
      <TaskForm />
      {isLoading ? (
        <Spinner />
      ) : (
        <Box
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
                You have {allCount} {allCount === 1 ? 'task ' : 'tasks '}
                and {pendingCount} pending.
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

          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onMarkAsDone={markAsDone}
              onDelete={deleteTask}
            />
          ))}
        </Box>
      )}
    </>
  );
};
