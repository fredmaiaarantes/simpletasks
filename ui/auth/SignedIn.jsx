import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { RoutePaths } from '../Routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignedIn = () => {
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bgGradient="linear(to-l, #675AAA,#4399E1)"
            bgClip="text"
          >
            You are already signed in
          </Heading>
          <Text fontSize="lg" color="gray.400">
            to start creating your simple tasks
          </Text>
        </Stack>
        <Stack spacing={10}>
          <Button
            onClick={() => navigate(RoutePaths.TASKS)}
            bg="blue.600"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Go to your tasks
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
