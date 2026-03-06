import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

export default function UserListPage() {
  return (
    <Box py={10} px={6}>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="2xl">User List</Heading>
        <Text color="gray.500">
          This is the User List page.
        </Text>
      </Stack>
    </Box>
  );
}
