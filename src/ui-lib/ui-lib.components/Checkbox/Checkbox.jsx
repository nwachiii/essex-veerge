import {Flex, Text, chakra, useCheckbox, Box} from '@chakra-ui/react';
import React from 'react';

export const CustomCheckbox = props => {
  const {state, getCheckboxProps, getInputProps, getLabelProps, htmlProps} = useCheckbox(props);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="40"
      bg="#4545FE.50"
      border="1px solid"
      borderColor="#4545FE.500"
      rounded="lg"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
      hidden
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="#4545FE.500"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={2} h={2} bg="#4545FE.500" />}
      </Flex>
      <Text color="gray.700" {...getLabelProps()}>
        {props.value}
      </Text>
    </chakra.label>
  );
};
