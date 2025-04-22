import { FormControl, Text, SlideFade } from '@chakra-ui/react';
import { themeStyles } from '../../theme';

export const FormErrorWrapper = ({ChildComponent, mb, marginBottom, error, border, ...rest}) => {
  return (
    <FormControl {...themeStyles.textStyles.sl5}>
      <ChildComponent
        {...rest}
        mb={0}
        isInvalid={error}
        border={border}
        _focus={{
          border: error
            ? '0.5px solid red !important'
            : border
              ? border
              : `0.5px solid #747474 !important`,
        }}
        _hover={{
          border: error
            ? '0.5px solid red !important'
            : border
              ? border
              : `0.5px solid #747474 !important`,
        }}
        _focusVisible={{
          border: error
            ? '0.5px red solid !important'
            : border
              ? border
              : `0.5px solid #747474 !important`,
        }}
      />
      <SlideFade in={error} offsetY="10px">
        <Text
          color={themeStyles.color.matador__red}
          my={'5px'}
          fontSize={'14px'}
          mb={mb}
          marginBottom={marginBottom}
        >
          {error}
        </Text>
      </SlideFade>
    </FormControl>
  );
};
