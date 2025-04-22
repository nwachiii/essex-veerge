import React, {useState} from 'react';
import styled from '@emotion/styled';
import {SlideFade, Text, Textarea, VStack} from '@chakra-ui/react';

import {useSharedInputStyles} from '../../ui-lib.hooks';
import {InputLabel} from '../Input/Input';

const StyledTextAreaContainer = styled.div`
  width: 100%;

  > textarea::placeholder {
    font-size: 14px;
    color: rgba(63, 61, 86, 0.6);
  }
`;

export const CustomTextArea = ({
  error,
  maxLength,
  label,
  rows = 2,
  action = null,
  ...restProps
}) => {
  const inputStyles = useSharedInputStyles();
  const [showLabel, setShowLabel] = useState(false);

  const handleLabel = e => {
    if (e.cancelable) e.preventDefault();
    setShowLabel(!showLabel);
  };

  return (
    <VStack position="relative" alignItems="flex-start" w="75%" pt="20px">
      {(label || showLabel) && (
        <InputLabel
          fontSize="14px"
          pl="7px"
          mb={0}
          as="label"
          label={label ?? restProps.placeholder}
        />
      )}

      <StyledTextAreaContainer>
        <Textarea
          {...restProps}
          rows={rows ?? 5}
          style={{
            outline: 0,
            width: '100%',
            padding: '20px 16px',
            fontSize: '16px',
            borderRadius: '12px',
            background: 'transparent',
            border: '1px solid #A0AEC0',
            borderColor: inputStyles.borderColor,
          }}
          maxlength={maxLength ?? '1200'}
          // title="1200 characters max"
        />
        {/* <Text
          fontSize="12px"
          color="gray.500"
          position="absolute"
          right="0px"
          bottom="9px"
          mr={'20px'}
          zIndex={'1'}
          padding={'10px'}
          backgroundColor={'rgba(256, 256, 256, .8)'}
        >
          Max. {maxLength || '1200'} characters
        </Text> */}
      </StyledTextAreaContainer>

      {action}

      <SlideFade in={!!error} offsetY="20px">
        <Text textStyle="p-xs" color="red">
          {error}
        </Text>
      </SlideFade>
    </VStack>
  );
};

Textarea.Label = InputLabel;
