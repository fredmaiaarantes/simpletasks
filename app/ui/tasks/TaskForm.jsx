import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Box,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ErrorStatus } from '../lib/ErrorStatus';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export const TaskForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const schema = z.object({
    description: z.string().min(1, 'Task description is required'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = values => {
    const description = values.description.trim();
    Meteor.call('insertTask', { description }, err => {
      if (err) {
        const reason = err?.reason || 'Sorry, please try again.';
        setErrorMessage(reason);
      } else {
        reset();
      }
    });
  };

  return (
    <Box>
      <ErrorStatus status={errorMessage} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="md">
          <FormControl isInvalid={!!errors.description}>
            <Input
              h="2.6rem"
              pr="6rem"
              id="description"
              {...register('description')}
              placeholder="Type to add new tasks"
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <InputRightElement width="6rem">
            <Button
              h="2.5rem"
              size="sm"
              bg="blue.600"
              color="white"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Add Task
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};
