import { Box } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import React from 'react';

export const Layout = () => (
  <>
    <Navbar />
    <Box maxW="6xl" mx="auto">
      <Outlet />
    </Box>
    <Footer />
  </>
);
