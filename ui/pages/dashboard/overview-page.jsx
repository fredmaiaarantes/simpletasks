import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

export default function OverviewPage() {
  return (
    <Box py={10} px={6}>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="2xl">Overview</Heading>
        <Text color="gray.500">
          This is the Overview page.
        </Text>
      </Stack>
    </Box>
  );
}
