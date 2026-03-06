import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

export default function SecurityPage() {
  return (
    <Box py={10} px={6}>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="2xl">Security</Heading>
        <Text color="gray.500">
          This is the Security page.
        </Text>
      </Stack>
    </Box>
  );
}
