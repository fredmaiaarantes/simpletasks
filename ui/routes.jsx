import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import { Layout } from './common/components/layout';

export const routes = {
  root: '/',
  notFound: '*',
  tasks: '/tasks',
};

const SignInPage = React.lazy(() => import('./pages/auth/sign-in-page'));
const NotFoundPage = React.lazy(
  () => import('./pages/not-found/not-found-page')
);
const TasksPage = React.lazy(() => import('./pages/tasks/tasks-page'));

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          element={
            <Layout loggedOnly={false}>
              <SignInPage />
            </Layout>
          }
          index
        />
        <Route
          element={
            <Layout>
              <TasksPage />
            </Layout>
          }
          path={routes.tasks}
        />
        <Route
          element={
            <Layout loggedOnly={false}>
              <NotFoundPage />
            </Layout>
          }
          path={routes.notFound}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
}
