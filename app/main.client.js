import React, { Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Routes } from './ui/common/Routes';

/**
 * This is the client-side entry point
 */
Meteor.startup(() => {
  document.documentElement.setAttribute('lang', 'en');
  const rootElement = document.getElementById('react-target');
  render(
    <Suspense fallback={<span>Loading...</span>}>
      <Routes />
    </Suspense>,
    rootElement
  );
});
