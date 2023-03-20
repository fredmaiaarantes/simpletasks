import {
  Box,
  ChakraProvider,
  ColorModeScript,
  extendTheme,
} from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import React from 'react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export const Layout = () => (
  <>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <ChakraProvider theme={customTheme}>
      <Navbar />
      <Box maxW="6xl" mx="auto">
        <Outlet />
      </Box>
      <Footer />
    </ChakraProvider>
  </>
);
