import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

export default function ProjectListPage() {
  return (
    <Box py={10} px={6}>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="2xl">Project List</Heading>
        <Text color="gray.500">
          This is the Project List page.
        </Text>
      </Stack>
    </Box>
  );
}
