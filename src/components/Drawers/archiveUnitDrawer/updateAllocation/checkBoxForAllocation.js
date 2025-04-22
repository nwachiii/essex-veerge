import {
  HStack,
  Image,
  VStack,
  useRadio,
  chakra,
  useRadioGroup,
  Text,
  useCheckbox,
  useCheckboxGroup,
  StackDivider,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import check from '/src/images/icons/checkForFeedBack.svg';

export const CheckBoxForAllocation = ({value, feedbackType, setAllocation, arrayOfAllocation}) => {
  const toast = useToast();
  const handleChange = selected => {
    if (selected.length <= value) {
      setAllocation(selected);
    } else {
      toast({
        title: 'Request failed',
        description: `You can only select up to ${value} items.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const {getCheckboxProps, value: selectedValues} = useCheckboxGroup({
    onChange: handleChange,
  });

  return (
    <VStack
      w="full"
      spacing="none"
      align="flex-start"
      divider={<StackDivider mt="13.36" mb="22.91px" />}
      mt={2}
      h={'100%'}
      maxHeight={{base: '15vh', '2xl': '30vh'}}
      overflowY={'auto'}
      pr={4}
    >
      {arrayOfAllocation.map((item, idx) => {
        return (
          <CustomCheckBox
            key={idx}
            checkValue={item.name}
            {...getCheckboxProps({
              value: item.id,
            })}
            selectedValues={selectedValues}
            maxAllowed={value}
          />
        );
      })}
    </VStack>
  );
};

function CustomCheckBox(props) {
  const {checkValue, selectedValues, maxAllowed} = props;
  const {state, getCheckboxProps, getInputProps, getLabelProps, htmlProps} = useCheckbox(props);

  return (
    <chakra.label {...htmlProps} w="full" cursor="pointer">
      <input
        {...getInputProps()}
        hidden
        disabled={selectedValues?.length >= maxAllowed && !state.isChecked}
      />

      <HStack {...getCheckboxProps()} spacing="11px" w="full" justify="space-between">
        <Text
          textTransform="capitalize"
          fontSize="15.273px"
          fontWeight="400"
          color="#191919"
          {...getLabelProps()}
        >
          {checkValue}
        </Text>
        <HStack justify="center" align="center" w="22px" h="22px" bg="#D9D9D9" borderRadius="4px">
          <Image
            alt={''}
            transition="0.2s ease-in-out"
            opacity={state.isChecked ? 1 : 0}
            transform={state.isChecked ? 'scale(1)' : 'scale(0.2)'}
            // opacity={feedbackType === option ? 1 : 0}
            src={check.src}
          />
        </HStack>
      </HStack>
    </chakra.label>
  );
}
