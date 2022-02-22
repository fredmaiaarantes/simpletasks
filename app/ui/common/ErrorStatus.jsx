import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';
import React from 'react';

export const ErrorStatus = ({ status }) => (
  <>
    {status && (
      <Alert status="error" mb={4}>
        <AlertIcon />
        <AlertDescription>{status}</AlertDescription>
      </Alert>
    )}
  </>
);
