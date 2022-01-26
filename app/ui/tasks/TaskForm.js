import React from 'react';
import { Meteor } from 'meteor/meteor';
import * as yup from 'yup';
import {
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Box,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ErrorStatus } from '../common/ErrorStatus';

export const TaskForm = () => {
  const validationSchema = yup.object({
    description: yup
      .string('Enter task description')
      .required('Task description is required'),
  });

  const onSubmit = (values, actions) => {
    const description = values.description.trim();
    Meteor.call('tasks.insert', description, error => {
      if (error) {
        const errorMessage = error?.reason || 'Sorry, please try again.';
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
