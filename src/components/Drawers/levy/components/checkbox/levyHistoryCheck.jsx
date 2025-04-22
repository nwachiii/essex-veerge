import {Box, Flex, Icon, Text} from '@chakra-ui/react';
import React from 'react';
import {FaCheck} from 'react-icons/fa';

const LevyHistoryCheck = ({state, data, getCheckboxProps, getLabelProps}) => {
  return (
    <Flex gap="8px" alignItems="center" role="checkbox" cursor="pointer">
      <Box
        display="flex"
        transition="0.3s ease-in-out"
        justifyContent="center"
        alignItems="center"
        boxSize="16px"
        border="1px solid"
        borderColor={state.isChecked ? '#4545fe' : '#d4d4d8'}
        borderRadius="4px"
        {...getCheckboxProps()}
      >
        <Icon
          as={FaCheck}
          transition="0.3s ease-in-out"
          color={state.isChecked ? '#4545fe' : '#d4d4d8'}
          transform={`scale(${state.isChecked ? '0.7' : '0'})`}
          opacity={state.isChecked ? '1' : '0'}
        />
      </Box>
      <Text fontSize="13px" fontWeight="500" color="#27272a" {...getLabelProps()}>
        {data.name}
      </Text>
    </Flex>
  );
};

export default LevyHistoryCheck;
