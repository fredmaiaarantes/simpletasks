import {
  Box,
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  Spinner,
} from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import React, { Suspense } from 'react';

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
      <Suspense fallback={<Spinner />}>
        <Navbar />
      </Suspense>
      <Box maxW="6xl" mx="auto">
        <Outlet />
      </Box>
      <Footer />
    </ChakraProvider>
  </>
);
