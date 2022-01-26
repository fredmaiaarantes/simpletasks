import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import * as yup from 'yup';
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
import { ErrorStatus } from '../common/ErrorStatus';
import { Accounts } from 'meteor/accounts-base';

export const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = yup.object({
    username: yup
      .string('Enter your username')
      .required('Username is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });

  const handleError = (error, actions) => {
    if (error) {
      const errorMessage = error?.reason || 'Sorry, please try again.';
      actions.setStatus(errorMessage);
    }
    actions.setSubmitting(false);
  };

  const onSubmit = (values, actions) => {
    if (isSignup) {
      Accounts.createUser(
        { username: values.username, password: values.password },
        error => {
          handleError(error, actions);
        }
      );
    } else {
      Meteor.loginWithPassword(values.username, values.password, error => {
        handleError(error, actions);
      });
    }
  };

  const formik = useFormik({
    initialValues: { username: 'fredmaiaarantes', password: 'abc123' },
    validationSchema,
    onSubmit,
  });

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
          <Text fontSize="lg" color="gray.600">
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
                      bg="blue.400"
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
                    <Button onClick={() => setIsSignup(true)} variant="link">
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
                      bg="green.400"
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
                    <Button onClick={() => setIsSignup(false)} variant="link">
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
};
