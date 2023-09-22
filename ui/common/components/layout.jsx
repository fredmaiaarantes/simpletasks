import { Box } from '@chakra-ui/react';
import { Navbar } from './navbar';
import { Navigate } from 'react-router-dom';
import { Footer } from './footer';
import React from 'react';
import { useUserId } from 'meteor/react-meteor-accounts';
import { routes } from '../../routes';

export function Layout({ loggedOnly = true, children }) {
  const userId = useUserId();
  if (loggedOnly && !userId) {
    return <Navigate to={routes.root} />;
  }

  return (
    <>
      <Navbar />
      <Box maxW="6xl" mx="auto">
        {children}
      </Box>
      <Footer />
    </>
  );
}
