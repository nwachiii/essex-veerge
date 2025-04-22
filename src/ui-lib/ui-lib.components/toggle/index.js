import {Box, HStack} from '@chakra-ui/react';

export const Toggle = ({value, onChange}) => {
  return (
    <Box>
      <HStack
        position="relative"
        onClick={onChange}
        bg="#D9D9D9"
        h="8px"
        cursor="pointer"
        w="25px"
        borderRadius="10px"
      >
        <Box
          position="absolute"
          bg={value ? '#4545FE' : '#191919'}
          transition="0.4s ease-in-out "
          boxSize="13px"
          transform={`translateX(${value ? '12px' : '0px'})`}
          borderRadius="full"
        ></Box>
      </HStack>
    </Box>
  );
};

export const Toggle2 = ({size = `20px`, variant = 'default', padding = `2px`, value, onChange}) => {
  const number_value = size?.replace(/\D/g, '') * 1;
  const padding_value = padding?.replace(/\D/g, '') * 1;
  const variants = {
    default: {
      parentBg: {bg: '#D9D9D9'},
      childBg: {bg: value ? '#4545FE' : '#191919'},
    },
    alternative: {
      parentBg: {bg: value ? '#4545FE' : '#A3A3A3'},
      childBg: {bg: '#fff'},
    },
  };
  const selectedVariant = variants[variant];
  return (
    <Box>
      <HStack
        position="relative"
        onClick={onChange}
        bg="#D9D9D9"
        cursor="pointer"
        w={`${(number_value + padding_value) * 2}px`}
        borderRadius={size}
        p={padding}
        transition="0.4s ease-in-out "
        {...selectedVariant.parentBg}
      >
        <Box
          bg={value ? '#4545FE' : '#191919'}
          transition="0.4s ease-in-out "
          boxSize={size}
          transform={`translateX(${value ? size : '0px'})`}
          borderRadius="full"
          {...selectedVariant.childBg}
        ></Box>
      </HStack>
    </Box>
  );
};
