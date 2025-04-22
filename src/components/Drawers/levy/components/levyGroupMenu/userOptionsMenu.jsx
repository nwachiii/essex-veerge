import {Avatar, Flex, Stack, StackDivider, Text} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import React from 'react';

const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
const UserOptionsMenu = ({isFocus, userRef}) => {
  return (
    <Stack
      ref={userRef}
      sx={customScrollStyle}
      as={motion.div}
      maxH="200px"
      layout
      pos="absolute"
      top="calc(100% + 9px)"
      bg="#ffffff"
      h="fit-content"
      right="0px"
      p="8px"
      minW={'176px'}
      maxW={isFocus ? '240px' : 'fit-content'}
      overflow="hidden"
      borderRadius="5px"
      boxShadow=" 2.99px 2.99px 5.97px 0px #7B9D9D26,-2.99px -2.99px 5.97px 0px #7B9D9D26"
      divider={<StackDivider as={motion.div} layout border="none" h="0.5px" bg="#e4e4e4" />}
    >
      {[1, 2, 3, 3, 3, 2].map((item, idx) => (
        <Flex key={idx} gap="12px" alignItems="center" role="checkbox" p="4px 8px" cursor="pointer">
          <Avatar boxSize="20px" />
          <Text fontSize="13px" fontWeight={400} color="#27272a">
            Olivia Bell m
          </Text>
        </Flex>
      ))}
    </Stack>
  );
};

export default UserOptionsMenu;
