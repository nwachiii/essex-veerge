import {useCheckbox, chakra, useCheckboxGroup} from '@chakra-ui/react';
import React from 'react';

const CustomCheckBox = ({Component, handleChange, data, ...props}) => {
  const {getCheckboxProps, setValue} = useCheckboxGroup({
    onChange: handleChange,
    ...props,
  });
  return data.map((item, idx) => (
    <CheckBoxContainer
      key={idx}
      data={item}
      Component={Component}
      {...getCheckboxProps({value: item.value})}
    />
  ));
};

const CheckBoxContainer = ({Component, data, ...props}) => {
  const {state, getCheckboxProps, getInputProps, getLabelProps, htmlProps} = useCheckbox(props);
  return (
    <chakra.label {...htmlProps}>
      <input {...getInputProps()} hidden />
      <Component
        data={data}
        state={state}
        getLabelProps={getLabelProps}
        getCheckboxProps={getCheckboxProps}
      />
    </chakra.label>
  );
};

export default CustomCheckBox;
