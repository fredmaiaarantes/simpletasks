import { Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

export default function NotFoundPage() {
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Heading fontSize="2xl" bgClip="text" color="white">
          There's nothing here!
        </Heading>
      </Stack>
    </Flex>
  );
}
