import React, { Suspense } from 'react';
import { Loading } from './lib/Loading';
import { AppRoutes } from './lib/AppRoutes';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export const App = () => (
  <>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <ChakraProvider theme={customTheme}>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </ChakraProvider>
  </>
);
