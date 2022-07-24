import React, { Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Spinner } from '@chakra-ui/react';

import '../api/tasks/tasks.methods';
import { Routes } from './Routes';

/**
 * This is the client-side entry point
 */
Meteor.startup(() => {
  document.documentElement.setAttribute('lang', 'en');
  const rootElement = document.getElementById('react-target');
  render(
    <Suspense fallback={<Spinner />}>
      <Routes />
    </Suspense>,
    rootElement
  );
});
