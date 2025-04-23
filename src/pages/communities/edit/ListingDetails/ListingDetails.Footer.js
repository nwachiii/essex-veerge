import React from 'react';
import {Button, HStack, Text, useDisclosure, VStack} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';

export default function CreateListingFooter({
  SubmitUnits,
  mutation,
  disabled,
  formik,
  step,
  children,
  ...restProps
}) {
  return (
    <HStack spacing="28px" mt={10} ml="auto" maxW="500px" align="center" justify="flex-end">
      {children}
      {/* {!(step === 4) && (
				<Button type='submit' variant='contained' w='202px' h='55px' bg='#F5F5F5' color='green'>
					Save as Draft
				</Button>
			)}
			{!(step === 4) && (
				<Button type='reset' variant='outline' w='202px' h='55px' bg='#FFFFFF' colorScheme='red' onClick={() => location.reload(false)}>
					Discard
				</Button>
			)} */}

      {!(step === 4) && (
        <Button
          w="202px"
          h="55px"
          type="submit"
          borderRadius="72px"
          {...restProps}
          onClick={SubmitUnits}
          color={themeStyles.color.primary}
          borderColor={themeStyles.color.primary}
          disabled={step === 4 && disabled}
          isLoading={mutation?.isLoading}
        >
          {step === 4 ? 'Publish now' : 'Proceed'}
        </Button>
      )}
    </HStack>
  );
}
