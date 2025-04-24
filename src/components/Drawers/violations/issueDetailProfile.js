import {Avatar, Badge, Flex, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import man1 from '/src/images/avatar/man1.png';

const IssueDetailProfile = () => {
  return (
    <Stack
      bg="#fafafa"
      border="0.5px solid #e4e4e7"
      rounded="4px"
      p="16px "
      minH="81px"
      spacing="8px"
    >
      <Flex alignItems="center" justifyContent="space-between" w="full">
        <Flex gap="8px" alignItems="center">
          <Avatar src={man1.src} boxSize="24px" />
          <Text fontSize="11px" fontWeight="500" color="#000000">
            {'Marcus Chen'}
          </Text>
        </Flex>
        <Badge
          p="2px 8px"
          fontSize="12px"
          h="22px"
          fontWeight="500"
          lineHeight="18px"
          borderRadius="16px"
          color="#4545fe"
          bg="#f5f9ff"
          textTransform="capitalize"
        >
          in cure
        </Badge>
      </Flex>
      <Flex justifyContent="space-between" w="full">
        <Text fontSize="11px" fontWeight="500" color="#000000">
          V-1432 • Trash cans left out
        </Text>
        <Text fontSize="11px" fontWeight="500" color="#000000">
          Inspector • Patel
        </Text>
      </Flex>
    </Stack>
  );
};

export default IssueDetailProfile;
