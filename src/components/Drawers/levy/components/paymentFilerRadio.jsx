import {Box, Flex, Icon, Text} from '@chakra-ui/react';
import React from 'react';

const PaymentFilerRadio = ({state, data, getRadioProps, getLabelProps}) => {
  return (
    <Flex gap="8px" alignItems="center" role="radio" cursor="pointer">
      <Box
        display="flex"
        transition="0.3s ease-in-out"
        justifyContent="center"
        alignItems="center"
        boxSize="16px"
        border="1px solid"
        borderColor={state.isChecked ? '#4545fe' : '#d4d4d8'}
        borderRadius="full"
        {...getRadioProps()}
      >
        <Box
          borderRadius="full"
          boxSize="8px"
          transition="0.3s ease-in-out"
          bg={state.isChecked ? '#4545fe' : '#d4d4d8'}
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

export default PaymentFilerRadio;
