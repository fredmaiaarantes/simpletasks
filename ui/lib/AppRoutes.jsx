import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import React from 'react';
import { Layout } from './Layout';
import { RoutePaths } from './RoutePaths';
import { LoggedUserOnly } from './LoggedUserOnly';

const LoginPage = React.lazy(() => import('../auth/LoginPage'));
const TasksPage = React.lazy(() => import('../tasks/TasksPage'));
const NotFoundPage = React.lazy(() => import('./NotFoundPage'));

export const AppRoutes = () => (
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
);
