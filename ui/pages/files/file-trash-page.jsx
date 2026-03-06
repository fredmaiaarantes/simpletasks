import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

export default function FileTrashPage() {
  return (
    <Box py={10} px={6}>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="2xl">File Trash</Heading>
        <Text color="gray.500">
          This is the File Trash page.
        </Text>
      </Stack>
    </Box>
  );
}
