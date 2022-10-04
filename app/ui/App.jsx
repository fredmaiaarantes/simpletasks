import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Layout } from './lib/Layout';
import { RoutePaths } from './lib/RoutePaths';

const LoginPage = React.lazy(() => import('./auth/LoginPage'));
const TasksPage = React.lazy(() => import('./tasks/TasksPage'));
const NotFoundPage = React.lazy(() => import('./lib/NotFoundPage'));

export const App = () => (
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <ReactRoutes>
        <Route path={RoutePaths.ROOT} element={<Layout />}>
          <Route element={<LoginPage />} index />
          <Route element={<TasksPage />} path={RoutePaths.TASKS} />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  </Suspense>
);
