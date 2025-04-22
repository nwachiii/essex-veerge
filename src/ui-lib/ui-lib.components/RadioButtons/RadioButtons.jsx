import React from 'react';
import {Box, Center, Text, useRadio} from '@chakra-ui/react';

export const RadioButtons = props => {
  const {getInputProps, getCheckboxProps} = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="full" mt={'10px'}>
      <input {...input} />
      <Center
        {...checkbox}
        defaultChecked={props.children[2]}
        cursor="pointer"
        fontWeight={'600'}
        color={'#606060'}
        bg="transparent"
        border="none"
        boxShadow="none"
        _checked={{
          bg: 'transparent',
          color: '#4545FE',
          fontWeight: 'semibold',
          borderTop: '2px solid #4545FE',
          borderBottom: '2px solid #4545FE',
        }}
        _focus={{
          boxShadow: 'none',
          outline: 'none',
        }}
        px={3}
        py={2}
        w="75%"
      >
        <Text
          fontSize={props.isChecked ? '20px' : '16px'}
          fontWeight={props.isChecked ? '600' : '400'}
        >
          {props.children}
        </Text>
      </Center>
    </Box>
  );
};
