import {useRadio, chakra, useRadioGroup} from '@chakra-ui/react';
import React from 'react';

const CustomRadio = ({Component, handleChange, data}) => {
  const {getRadioProps} = useRadioGroup({
    onChange: handleChange,
  });
  return data.map((item, idx) => (
    <CheckBoxContainer
      key={idx}
      data={item}
      Component={Component}
      {...getRadioProps({value: item.value})}
    />
  ));
};

const CheckBoxContainer = ({Component, data, ...props}) => {
  const {state, getRadioProps, getInputProps, getLabelProps, htmlProps} = useRadio(props);
  return (
    <chakra.label {...htmlProps}>
      <input {...getInputProps()} hidden />
      <Component
        data={data}
        state={state}
        getLabelProps={getLabelProps}
        getRadioProps={getRadioProps}
      />
    </chakra.label>
  );
};

export default CustomRadio;
