import {Box, Flex, Input, InputGroup, InputLeftElement, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import SearchIcon from '../assets/searchIcon';

const customScrollbarStyles = {
  'overflow-y': 'auto',
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#0000004D',
  },
};
const FilterSearch = ({label, data}) => {
  return (
    <Box w="full">
      <Stack w="full" mb="16px" spacing="6px">
        <Text fontSize="13px" fontWeight="500" color="#3F3F46" textTransform="capitalize">
          {label}
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon
              display="flex"
              justifyConten="center"
              alignItems="center"
              border="none"
              boxSize="20px"
              p="0px"
            />
          </InputLeftElement>
          <Input p="8px 12px 8px 30px" h="36px" type="text" placeholder={`Search ${label}`} />
        </InputGroup>
      </Stack>
      <Stack spacing="16px" w="full" maxH="92px" sx={customScrollbarStyles}>
        {data.map((item, idx) => (
          <Flex key={idx} gap="8px">
            <Box border="1px solid #d4d4d8" bg="#ffffff" rounded="4px" minW="16px" h="16px" />
            <Text fontSize="13px" fontWeight="400" color="#27272a">
              {item.label}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterSearch;
