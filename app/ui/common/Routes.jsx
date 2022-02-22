import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import { App } from '../App';
import React from 'react';

const LoginPage = React.lazy(() => import('../auth/LoginPage'));
const TasksPage = React.lazy(() => import('../tasks/TasksPage'));
const NotFoundPage = React.lazy(() => import('./NotFoundPage'));

export const RoutePaths = {
  ROOT: '/',
  TASKS: '/tasks',
};

export const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path={RoutePaths.ROOT} element={<App />}>
        <Route element={<LoginPage />} index />
        <Route element={<TasksPage />} path={RoutePaths.TASKS} />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </ReactRoutes>
  </BrowserRouter>
);
