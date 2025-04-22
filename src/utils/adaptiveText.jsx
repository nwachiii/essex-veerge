import {Text, HStack} from '@chakra-ui/react';
import React from 'react';

export const AdaptiveText = ({
  text,
  fontSize = 24,
  minSize = 12,
  maxSize = 36,
  lens = 17,
  pow = 0.9,

  ...textProps
}) => {
  const dynamicFontSize =
    text.length > lens ? Math.max(minSize, fontSize * Math.pow(pow, text.length - lens)) : maxSize;

  return (
    <Text fontSize={`${dynamicFontSize}px`} {...textProps}>
      {text}
    </Text>
  );
};
