import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Box,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { ErrorStatus } from '../common/ErrorStatus';

export const TaskForm = () => {
  const validationSchema = object({
    description: string('Enter task description').required(
      'Task description is required'
    ),
  });

  const onSubmit = (values, actions) => {
    const description = values.description.trim();
    Meteor.call('insertTask', { description }, err => {
      if (err) {
        const errorMessage = err?.reason || 'Sorry, please try again.';
        actions.setStatus(errorMessage);
      } else {
        actions.resetForm();
      }
      actions.setSubmitting(false);
    });
  };

  const formik = useFormik({
    initialValues: { description: '' },
    initialStatus: null,
    validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <ErrorStatus status={formik.status} />
      <form onSubmit={formik.handleSubmit}>
        <InputGroup size="md">
          <FormControl
            isInvalid={formik.errors.description && formik.touched.description}
          >
            <Input
              h="2.6rem"
              pr="6rem"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Type to add new tasks"
            />
            <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
          </FormControl>
          <InputRightElement width="6rem">
            <Button
              h="2.5rem"
              size="sm"
              bg="blue.600"
              color="white"
              type="submit"
              isLoading={formik.isSubmitting}
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
