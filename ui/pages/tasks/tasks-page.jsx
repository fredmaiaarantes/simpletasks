import {
  Box,
  Button,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { TaskForm } from './components/task-form';
import { TaskItem } from './components/task-item';
import { useTasks } from './hooks/use-tasks';
import '/api/tasks/tasks.methods';

export default function TasksPage() {
  const { hideDone, setHideDone, tasks, count, pendingCount } = useTasks();
  return (
    <>
      <Stack textAlign="center" spacing={{ base: 8 }} py={{ base: 10 }}>
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
      <TaskForm />
      <Suspense fallback={<Spinner />}>
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
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize="xs"
              >
                You have {count} {count === 1 ? 'task ' : 'tasks '}
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
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </Box>
      </Suspense>
    </>
  );
}
