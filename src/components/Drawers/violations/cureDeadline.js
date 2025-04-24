import React from 'react';
import {Box, Flex, Icon, Image, Stack, Text} from '@chakra-ui/react';

const CureDeadline = () => {
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
        Cure Deadline
      </Text>
      <Text fontSize="11px" fontWeight="500" color="#000000">
        21 Apr, 2025 (7 days) <br />
        <Text as="span" fontSize="11px" fontWeight="400" color="#52525b">
          Fine Schedule: $0 if cured by deadline, $350 if 1-14 days late.
        </Text>
      </Text>
    </Stack>
  );
};

export default CureDeadline;
