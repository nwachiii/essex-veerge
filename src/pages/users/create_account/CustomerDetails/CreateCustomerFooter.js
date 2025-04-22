import React from 'react';
import {Button, HStack} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';

export default function CreateCustomerFooter({
  SubmitCustomerInfo,
  disabled,
  formik,
  step,
  mutation,
  children,
  disCardBtnStyle,
  forCreationSummary,
  ...restProps
}) {
  return (
    <HStack spacing="28px" mt={10} ml="auto" maxW="500px" align="center" justify="flex-end">
      {children}
      {!forCreationSummary ? (
        <Button
          type="reset"
          variant="outline"
          w="202px"
          h="55px"
          bg="#FFFFFF"
          colorScheme="red"
          {...disCardBtnStyle}
          borderRadius="72px"
          onClick={() => location.reload(false)}
        >
          Discard
        </Button>
      ) : null}
      <Button
        bg="#191919"
        borderRadius="72px"
        _hover={{
          background: '',
        }}
        _active={{
          background: '',
        }}
        _visited={{
          background: '',
        }}
        variant={'primary'}
        color="#FFFFFF"
        w="202px"
        h="55px"
        type="submit"
        {...restProps}
        onClick={SubmitCustomerInfo}
        borderColor={themeStyles.color.primary}
        disabled={step === 4 && disabled}
        isLoading={mutation?.isLoading}
      >
        {step === 4 ? 'Create account' : 'Proceed'}
      </Button>
    </HStack>
  );
}
