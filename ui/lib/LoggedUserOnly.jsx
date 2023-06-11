import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserId } from 'meteor/react-meteor-accounts';
import { RoutePaths } from './RoutePaths';

export const LoggedUserOnly = ({ children }) => {
  const userId = useUserId();

  if (!userId) {
    return <Navigate to={RoutePaths.ROOT} />;
  }
  return children;
};
