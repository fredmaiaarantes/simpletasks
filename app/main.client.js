import React, { Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Routes } from './ui/common/Routes';

Meteor.startup(() => {
  const rootElement = document.getElementById('react-target');
  render(
    <Suspense fallback={<span>Loading...</span>}>
      <Routes />
    </Suspense>,
    rootElement
  );
});
