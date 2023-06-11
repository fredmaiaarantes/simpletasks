import React, { Suspense } from 'react';
import { TaskForm } from './TaskForm';
import { TasksHeader } from './TasksHeader';
import { TaskItems } from './TaskItems';

import { Spinner } from '@chakra-ui/react';
/* eslint-disable import/no-default-export */
export default function TasksPage() {
  return (
    <>
      <TasksHeader />
      <TaskForm />
      <Suspense fallback={<Spinner />}>
        <TaskItems />
      </Suspense>
    </>
  );
}
