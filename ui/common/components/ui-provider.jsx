import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

import React from 'react';

export const defaultSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
    },
  },
})

function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}

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
      <Provider>
        {children}
      </Provider>
    </>
  );
}
