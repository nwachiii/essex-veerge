import {Center, HStack, Text, useRadio, useRadioGroup} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';

// 1. Create a component that consumes the `useRadio` hook
function RadioCardForConstructionDate(props) {
  const {getInputProps, getRadioProps} = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Center cursor="pointer" as="label" gap={1} justify="space-between" w="full" {...props.rest}>
      <input {...input} />
      <Center
        {...checkbox}
        cursor="pointer"
        border="1px solid #E5E5E5"
        borderRadius="full"
        boxShadow="sm"
        _checked={{
          bg: '#4545FE',
          color: 'white',
          borderColor: '#4545FE',
        }}
        _focus={{
          boxShadow: 'none',
          border: 'none',
        }}
        px={1}
        py={1}
      >
        <Text bg="#FFF" boxSize="5px" borderRadius="full" />
      </Center>
      <Text>{props.children}</Text>
    </Center>
  );
}

export const RadioOptionsForConstructionDate = ({handleValue, options, ...rest}) => {
  const [activeTab, setActive] = useState(options[0]);
  const {getRootProps, getRadioProps, value} = useRadioGroup({
    name: 'construction-date',
    defaultValue: options[0],
    onChange: () => setActive(value?.toLowerCase()),
  });

  const group = getRootProps();

  useEffect(() => {
    handleValue(activeTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <HStack spacing="25px" {...group} w="full" {...rest}>
      {options.map(value => {
        const radio = getRadioProps({value});
        return (
          <RadioCardForConstructionDate key={value} {...radio}>
            {value}
          </RadioCardForConstructionDate>
        );
      })}
    </HStack>
  );
};
export default RadioOptionsForConstructionDate;
