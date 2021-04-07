import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Box, ChakraProvider, Container, Stack } from '@chakra-ui/react';
import theme from '../../client/theme';
import { useTracker } from 'meteor/react-meteor-data';
import { Tasks } from './tasks/Tasks';
import { LoginForm } from './auth/LoginForm';
import { Navbar } from './Navbar';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <ChakraProvider theme={theme}>
      <Navbar user={user} />
      <Container maxW="3xl" mb={8}>
        <Stack as={Box} spacing={{ base: 8 }}>
          {!user ? <LoginForm /> : <Tasks user={user} />}
        </Stack>
      </Container>
    </ChakraProvider>
  );
};
