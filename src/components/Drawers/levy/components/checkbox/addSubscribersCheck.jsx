import {Avatar, Box, Flex, Icon, Text} from '@chakra-ui/react';
import React from 'react';
import {FaCheck} from 'react-icons/fa';

const AddSubscribersCheck = ({state, data, getCheckboxProps, getLabelProps}) => {
  return (
    <Flex
      gap="12px"
      alignItems="center"
      borderBottom="0.5px solid #e4e4e7"
      role="checkbox"
      p="16px 12px"
      cursor="pointer"
    >
      <Box
        display="flex"
        transition="0.3s ease-in-out"
        justifyContent="center"
        alignItems="center"
        boxSize="20px"
        border="1px solid"
        borderColor={state.isChecked ? '#4545fe' : '#d4d4d8'}
        borderRadius="4px"
        {...getCheckboxProps()}
      >
        <Icon
          as={FaCheck}
          transition="0.3s ease-in-out"
          color={state.isChecked ? '#4545fe' : '#d4d4d8'}
          transform={`scale(${state.isChecked ? '0.8' : '0'})`}
          opacity={state.isChecked ? '1' : '0'}
        />
      </Box>
      <Avatar boxSize="40px" />
      <Text fontSize="16px" fontWeight={400} color="#27272a" {...getLabelProps()}>
        {data.name}
      </Text>
    </Flex>
  );
};

export default AddSubscribersCheck;
