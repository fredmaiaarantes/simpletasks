import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React from 'react';
import { useTaskForm } from '../hooks/use-task-form';

export function TaskForm() {
  const {
    saveTask,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useTaskForm();

  return (
    <Box>
      <form onSubmit={handleSubmit(saveTask)}>
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
}
