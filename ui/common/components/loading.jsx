import {
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export function Loading() {
  return (
    <Box maxW="6xl" mx="auto">
      <Flex align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Text
              fontSize="lg"
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              Loading...
            </Text>
            <Spinner size="xl" />
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
}
