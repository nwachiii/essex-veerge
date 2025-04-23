import React from 'react';
import {Button, HStack, Text, useDisclosure, Spinner} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';
import {useRouter} from 'next/router';

export default function CreateListingFooter({
  SubmitUnits,
  mutation,
  disabled,
  formik,
  step,
  children,
  noDiscard,
  isDisabled,
  ...restProps
}) {
  const router = useRouter();
  return (
    <HStack spacing="28px" mt={10} ml="auto" maxW="500px" align="center" justify="flex-end">
      {children}
      {/* {!(step === 4) && (
				<Button type='submit' variant='contained' w='202px' h='55px' bg='#F5F5F5' color='green'>
					Save as Draft
				</Button>
			)} */}
      {!noDiscard && !(step === 3) && (
        <Button
          type="reset"
          variant="outline"
          w="202px"
          h="55px"
          bg="#FFFFFF"
          borderRadius="72px"
          borderColor={themeStyles.color.matador__red}
          color={themeStyles.color.matador__red}
          onClick={() => router.push('/listings')}
          rounded="full"
        >
          Discard
        </Button>
      )}

      {!(step === 3) && (
        <Button
          variant="dark"
          borderRadius="72px"
          w="202px"
          h="55px"
          type="submit"
          {...restProps}
          color={'#FFFFFF'}
          onClick={SubmitUnits}
          bg={'#4545FE'}
          _hover={{
            background: '',
          }}
          fontWeight={400}
          borderColor={themeStyles.color.primary}
          isDisabled={isDisabled || disabled || mutation.isLoading}
          rounded="full"
        >
          {mutation.isLoading ? <Spinner /> : step === 3 ? 'Publish now' : 'Proceed'}
        </Button>
      )}
    </HStack>
  );
}
