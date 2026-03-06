import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

export default function WorkflowCreatePage() {
  return (
    <Box py={10} px={6}>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="2xl">Workflow Create</Heading>
        <Text color="gray.500">
          This is the Workflow Create page.
        </Text>
      </Stack>
    </Box>
  );
}
