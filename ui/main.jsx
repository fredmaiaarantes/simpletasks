import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { UIProvider } from './common/components/ui-provider';
import { Loading } from './common/components/loading';
import { Routes } from './routes';

/**
 * This is the client-side entry point
 */
Meteor.startup(() => {
  document.documentElement.setAttribute('lang', 'en');
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <UIProvider>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </UIProvider>
  );
});
