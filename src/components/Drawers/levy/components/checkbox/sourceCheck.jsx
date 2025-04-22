import {Box, Flex, Icon, Text} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import React from 'react';
import {FaCheck} from 'react-icons/fa';

const SourceCheck = ({state, data, getCheckboxProps, getLabelProps}) => {
  return (
    <Flex
      as={motion.div}
      layout
      gap="20px"
      justify="space-between"
      alignItems="center"
      role="checkbox"
      cursor="pointer"
    >
      <Text maxW="200px" fontSize="12px" fontWeight="300" color="#000000" {...getLabelProps()}>
        {data.name}
      </Text>
      <Box
        display="flex"
        transition="0.3s ease-in-out"
        justifyContent="center"
        alignItems="center"
        boxSize="12px"
        minW="12px"
        border="1px solid"
        borderColor={state.isChecked ? '#191919' : '#d4d4d8'}
        bg={state.isChecked ? '#191919' : 'transparent'}
        borderRadius="4px"
        {...getCheckboxProps()}
      >
        <Icon
          as={FaCheck}
          transition="0.3s ease-in-out"
          color={state.isChecked ? '#ffffff' : '#d4d4d8'}
          transform={`scale(${state.isChecked ? '0.4' : '0'})`}
          opacity={state.isChecked ? '1' : '0'}
        />
      </Box>
    </Flex>
  );
};

export default SourceCheck;
