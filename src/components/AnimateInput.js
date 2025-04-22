import React from 'react';
import styled from '@emotion/styled';
import {Box, Input, Text} from '@chakra-ui/react';

const AnimateInput = ({
  h,
  pl,
  px,
  w,
  mt,
  my,
  mb,
  mr,
  mx,
  labLeft,
  labelFontS,
  borderColor,
  labelFontW,
  labelColor,
  laelFontH,
  ml,
  placeholder,
  noLabel,
  variant = 'default',
  ...rest
}) => {
  return (
    <Box
      labLeft={pl || px}
      borderColor={borderColor}
      h={h}
      mt={mt}
      my={my}
      mb={mb}
      mr={mr}
      ml={ml}
      mx={mx}
      w={w}
      variant={variant}
      labelColor={labelColor}
      as={Wrap}
    >
      <Input
        placeholder={''}
        px={px}
        py="20px"
        pl={pl}
        borderWidth="1px"
        borderColor={borderColor || '#919191'}
        _focusVisible={{
          borderColor: '#919191',
          boxShadow: 'none',
        }}
        {...rest}
        className="styled_for_Input"
      />

      {!noLabel && (
        <Text
          color={labelColor || 'gray'}
          fontSize={labelFontS || '12px'}
          lineHeight={laelFontH}
          fontWeight={labelFontW}
          as="label"
          pt={1}
          className="label"
        >
          {placeholder}
        </Text>
      )}
    </Box>
  );
};

export default AnimateInput;

const Wrap = styled.div`
  position: relative;
  width: 300px;
  box-sizing: border-box;
  height: 55px;

  input {
    position: absolute;
    left: 0;
    top: -5%;
    width: 100%;
    border-color: ${props => props.borderColor};
    outline: none;
    height: 100%;
  }

  label {
    position: absolute;
    box-sizing: border-box;
    z-index: 2;
    left: ${props => (props.labLeft ? props.labLeft : '10px')};
    top: 50%;
    transform: translateY(-70%);
    pointer-events: none;
    padding: 0px 3px;
    background: ${props => (props.variant === 'auth' ? '#F6F6F6' : '#FFF')};
    cursor: text;
    transition:
      top 300ms ease-in-out,
      left 300ms ease-in-out,
      font-size 300ms ease-in-out,
      transform 300ms ease-in-out;
  }

  .styled_for_Input:focus ~ .label,
  .styled_for_Input:not(:placeholder-shown).styled_for_Input:not(:focus) ~ .label {
    top: 0%;
    color: ${props => props.labelColor};
    font-size: 12px;
    left: ${props => (props.labLeft ? props.labLeft : '10px')};
  }

  .styled_for_Input:focus::placeholder {
    color: transparent;
  }

  .styled_for_Input:not(:focus)::placeholder {
    color: transparent;
  }

  /* Autofill styles */
  .styled_for_Input:-internal-autofill-selected {
    -webkit-appearance: menulist-button;
    -moz-appearance: menulist-button;
    appearance: menulist-button;
    background-image: none !important;
    background-color: transparent !important;
    color: gray !important;
  }

  .styled_for_Input:auto-fill {
    color: gray;
    outline: 5px solid gray;
  }

  .styled_for_Input:-webkit-autofill,
  .styled_for_Input:-webkit-autofill:hover,
  .styled_for_Input:-webkit-autofill:focus,
  .styled_for_Input:-webkit-autofill:active {
    -webkit-box-shadow: 0px 0 0 30000px #ffffff inset !important;
    -webkit-text-fill-color: #191919 !important;
  }
`;
