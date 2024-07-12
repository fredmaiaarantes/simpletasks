import { Box } from '@chakra-ui/react';
import { useUserId } from 'meteor/react-meteor-accounts';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../routes';
import { Footer } from './footer';
import { Navbar } from './navbar';

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
