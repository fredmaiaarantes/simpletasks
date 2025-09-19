import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Logout } from './logout';

export function Navbar() {
  const [colorMode, setColorMode] = useState('light');
  
  useEffect(() => {
    // Load saved color mode from localStorage
    const savedColorMode = localStorage.getItem('chakra-ui-color-mode');
    if (savedColorMode) {
      setColorMode(savedColorMode);
    }
  }, []);
  
  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newColorMode);
    localStorage.setItem('chakra-ui-color-mode', newColorMode);
    // Update the document class for CSS variables
    document.documentElement.setAttribute('data-theme', newColorMode);
  };

  return (
    <Box>
      <Flex
        bg="white"
        _dark={{ bg: 'gray.800' }}
        color="gray.600"
        // _dark={{ color: 'white' }}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        // _dark={{ borderColor: 'gray.900' }}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Text
            as="span"
            bgGradient="linear(to-l, #675AAA, #4399E1)"
            bgClip="text"
            fontWeight="bold"
            fontFamily="heading"
            textAlign="left"
          >
            Simple Tasks
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          gap={6}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Logout />
        </Stack>
      </Flex>
    </Box>
  );
}
