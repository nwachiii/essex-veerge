import SearchIcon from '@/components/assets/searchIcon';
import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  StackDivider,
  Text,
  useOutsideClick,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react';
import {MdCancel} from 'react-icons/md';
import SearchInput from './utils/searchInput';

const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const LevyTable = ({data = [], handlers, Component}) => {
  return (
    <Stack w="full" spacing="none" minH="20vh" border="1px solid #e4e4e7">
      <Flex
        borderBottom="0.5px solid #e4e4e7"
        h="56px"
        p="18px"
        bg="#fafafa"
        alignItems="center"
        justifyContent="space-between"
        w="full"
      >
        <Text fontSize="16px" fontWeight={400} color="#52525b">
          Subscriber
        </Text>

        <SearchInput />
      </Flex>
      <Stack
        w="full"
        spacing="none"
        h="full"
        divider={<StackDivider border="none" h="0.5px" bg="#e4e4e7" />}
      >
        {data.length ? (
          data.map((item, idx) => {
            return <Component key={idx} props={item} {...handlers} />;
          })
        ) : (
          <Text>Empty</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default LevyTable;
