import React from 'react';
import { Outlet } from 'react-router-dom';
import { ColorModeScript, extendTheme, ChakraProvider } from '@chakra-ui/react';
import { Navbar } from './common/Navbar';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export const App = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Navbar />
      <Outlet />
    </ChakraProvider>
  </>
);
