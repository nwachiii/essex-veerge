import React from 'react';
import {Box, Flex, Icon, Image, Stack, Text} from '@chakra-ui/react';

const Timeline = () => {
  return (
    <Stack
      bg="#fafafa"
      border="0.5px solid #e4e4e7"
      rounded="4px"
      p="10px 16px"
      minH="81px"
      spacing="4px"
    >
      <Text fontSize="13px" fontWeight="500" color="#000000">
        Timeline
      </Text>
      <Stack justify="center" spacing="12px" pos="relative">
        <Flex align="center" gap="8px">
          <Box bg="#4545fe" boxSize="4px" borderRadius="full" />
          <Text fontSize="10px" fontWeight="400" color="#000000">
            <Text as="span" fontWeight="500">
              {' '}
              14 Apr 10:42
            </Text>{' '}
            Patrol logged violation
          </Text>
        </Flex>
        <Flex align="center" gap="8px">
          <Box bg="#4545fe" boxSize="4px" borderRadius="full" />
          <Text fontSize="10px" fontWeight="400" color="#000000">
            <Text as="span" fontWeight="500">
              {' '}
              14 Apr 10:45
            </Text>{' '}
            Notice emailed & SMS-ed
          </Text>
        </Flex>
        <Box w="0.5px" h="27px" bg="#4545fe" pos="absolute" top="7.25px" left="1.5px" />
      </Stack>
    </Stack>
  );
};

export default Timeline;
