import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  ColorModeScript,
  extendTheme,
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import { Navbar } from './common/Navbar';
import { Footer } from './common/Footer';

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
      <Box maxW="6xl" mx="auto">
        <Outlet />
      </Box>
      <Footer />
    </ChakraProvider>
  </>
);
