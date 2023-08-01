import { Box } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Navigate } from 'react-router-dom';
import { Footer } from './Footer';
import React from 'react';
import { useUserId } from 'meteor/react-meteor-accounts';

export function Layout({ loggedOnly = true, children }) {
  const userId = useUserId();
  if (loggedOnly && !userId) {
    return <Navigate to="/"/>;
  }

  return (
    <>
      <Navbar/>
      <Box maxW="6xl" mx="auto">
        {children}
      </Box>
      <Footer/>
    </>
  );
}
