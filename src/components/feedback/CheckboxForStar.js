import {
  HStack,
  Image,
  VStack,
  useRadio,
  chakra,
  useRadioGroup,
  Checkbox,
  useCheckboxGroup,
  useCheckbox,
} from '@chakra-ui/react';
import React from 'react';
import check from '/src/images/icons/checkForFeedBack.svg';
import uncheck from '/src/images/icons/checkForFeedBack.svg';

import {Ratings} from '../common/Rating';

export const CheckboxForStar = ({setStar, radioStar}) => {
  const handleChange = value => {
    return setStar(value);
  };

  const {getCheckboxProps} = useCheckboxGroup({
    onChange: handleChange,
    value: radioStar,
  });

  return (
    <VStack
      w="full"
      // pb="13px"
      align="flex-start"
      // borderBottom="1px solid #E4E4E4"
      spacing="27px"
    >
      {['5', '4', '3', '2', '1'].map(item => {
        return <CustomCheckBox checkValue={item} key={item} {...getCheckboxProps({value: item})} />;
      })}
    </VStack>
  );
};

function CustomCheckBox(props) {
  const {
    state,
    getCheckboxProps,

    getInputProps,
    getLabelProps,
    htmlProps,
  } = useCheckbox(props);
  return (
    <chakra.label {...htmlProps} {...getLabelProps()} cursor="pointer">
      <input {...getInputProps()} hidden />

      <HStack {...getCheckboxProps()} spacing="11px">
        <HStack justify="center" align="center" w="22px" h="22px" bg="#D9D9D9" borderRadius="4px">
          <Image
            alt=""
            transition="0.2s ease-in-out"
            opacity={state.isChecked ? 1 : 0}
            transform={state.isChecked ? 'scale(1)' : 'scale(0.2)'}
            // opacity={radioStar === option ? 1 : 0}
            src={check.src}
          />
        </HStack>

        <Ratings rating={props?.checkValue} starStyle={{w: '24px', h: '24px'}} spacing="8px" />
      </HStack>
    </chakra.label>
  );
}
