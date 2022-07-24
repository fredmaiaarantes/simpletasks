import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../Routes';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout(() => {
      navigate(RoutePaths.ROOT);
    });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
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
          spacing={6}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          {user && (
            <Button fontSize="sm" fontWeight={400} onClick={logout}>
              Sign Out
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
