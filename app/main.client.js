import React, { Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Routes } from './ui/common/Routes';
import { Spinner } from '@chakra-ui/react';

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
