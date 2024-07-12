import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import React from 'react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

const toastOptions = {
  defaultOptions: {
    position: 'top-right',
    duration: 5000,
    isClosable: true,
  },
};

export function UIProvider({ children }) {
  return (
    <>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <ChakraProvider theme={customTheme} toastOptions={toastOptions}>
        {children}
      </ChakraProvider>
    </>
  );
}
