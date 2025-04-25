import {Stack, Text} from '@chakra-ui/react';
import React from 'react';

const Note = () => {
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
        Note
      </Text>

      <Text fontSize="11px" fontWeight="400" color="#52525b">
        Trash cans were on curb when patrol passed.
      </Text>
    </Stack>
  );
};

export default Note;
