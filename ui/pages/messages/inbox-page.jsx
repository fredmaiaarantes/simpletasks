import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

export default function InboxPage() {
  return (
    <Box py={10} px={6}>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="2xl">Inbox</Heading>
        <Text color="gray.500">
          This is the Inbox page.
        </Text>
      </Stack>
    </Box>
  );
}
