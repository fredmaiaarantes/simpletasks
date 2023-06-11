import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Layout } from './lib/Layout';
import { RoutePaths } from './lib/RoutePaths';
import { LoggedUserOnly } from './lib/LoggedUserOnly';
import { Spinner } from '@chakra-ui/react';

const LoginPage = React.lazy(() => import('./auth/LoginPage'));
const TasksPage = React.lazy(() => import('./tasks/TasksPage'));
const NotFoundPage = React.lazy(() => import('./lib/NotFoundPage'));

export const App = () => (
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <ReactRoutes>
        <Route path={RoutePaths.ROOT} element={<Layout />}>
          <Route element={<LoginPage />} index />
          <Route
            element={
              <LoggedUserOnly>
                <TasksPage />
              </LoggedUserOnly>
            }
            path={RoutePaths.TASKS}
          />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  </Suspense>
);
