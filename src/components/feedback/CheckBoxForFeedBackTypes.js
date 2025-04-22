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
} from '@chakra-ui/react';
import React from 'react';
import check from '/src/images/icons/checkForFeedBack.svg';

export const CheckBoxForFeedBackTypes = ({feedbackType, setFeedBackType}) => {
  const handleChange = value => {
    return setFeedBackType(value);
  };

  const arrayOfFeedbackTypes = ['general', 'inspection', 'purchase', 'bug', 'suggestion'];
  const {getCheckboxProps} = useCheckboxGroup({
    onChange: handleChange,
    value: feedbackType,
  });
  return (
    <VStack w="full" align="flex-start" spacing="27px">
      {arrayOfFeedbackTypes.map(item => {
        return (
          <CustomCheckBox
            key={item}
            checkValue={item}
            {...getCheckboxProps({
              value: item,
            })}
          />
        );
      })}
    </VStack>
  );
};

function CustomCheckBox(props) {
  const {checkValue} = props;
  const {state, getCheckboxProps, getInputProps, getLabelProps, htmlProps} = useCheckbox(props);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps()} hidden />

      <HStack {...getCheckboxProps()} spacing="11px">
        <HStack justify="center" align="center" w="22px" h="22px" bg="#D9D9D9" borderRadius="4px">
          <Image
            alt=""
            transition="0.2s ease-in-out"
            opacity={state.isChecked ? 1 : 0}
            transform={state.isChecked ? 'scale(1)' : 'scale(0.2)'}
            src={check.src}
          />
        </HStack>

        <Text
          textTransform="capitalize"
          fontSize="14px"
          fontWeight="400"
          color="#000"
          {...getLabelProps()}
        >
          {checkValue} Feedback
        </Text>
      </HStack>
    </chakra.label>
  );
}
