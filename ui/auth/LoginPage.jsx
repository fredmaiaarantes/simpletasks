import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ErrorStatus } from '../common/ErrorStatus';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from '../Routes';
import { useTracker } from 'meteor/react-meteor-data';
import { SignedIn } from './SignedIn';
import { object, string } from 'yup';

/* eslint-disable import/no-default-export */
export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userId = useTracker(() => Meteor.userId());
  const navigate = useNavigate();

  const validationSchema = object({
    username: string('Enter your username').required('Username is required'),
    password: string('Enter your password').required('Password is required'),
  });

  const handleError = (error, actions) => {
    if (error) {
      const errorMessage = error?.reason || 'Sorry, please try again.';
      actions.setStatus(errorMessage);
    }
    actions.setSubmitting(false);
    navigate(RoutePaths.TASKS);
  };

  const onSubmit = (values, actions) => {
    const { username, password } = values;
    if (isSignup) {
      Accounts.createUser({ username, password }, error => {
        handleError(error, actions);
      });
    } else {
      Meteor.loginWithPassword(username, password, error => {
        handleError(error, actions);
      });
    }
  };

  const formik = useFormik({
    initialValues: { username: 'fredmaia', password: 'abc123' },
    validationSchema,
    onSubmit,
  });

  if (userId) {
    return <SignedIn />;
  }
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bgGradient="linear(to-l, #675AAA,#4399E1)"
            bgClip="text"
          >
            Sign in to your account
          </Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            to start creating your simple tasks
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <ErrorStatus status={formik.status} />
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                isInvalid={formik.errors.username && formik.touched.username}
              >
                <Input
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Enter your username"
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.password && formik.touched.password}
              >
                <InputGroup size="md">
                  <Input
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              {!isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="blue.600"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={formik.isSubmitting}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(true)}>
                      Create a new account
                    </Button>
                  </Stack>
                </>
              )}

              {isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="green.600"
                      color="white"
                      _hover={{
                        bg: 'green.500',
                      }}
                      isLoading={formik.isSubmitting}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(false)}>
                      I have an account
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
