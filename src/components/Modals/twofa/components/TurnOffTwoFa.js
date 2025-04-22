import React, {useState} from 'react';
import {
  ModalContent,
  ModalHeader,
  DrawerFooter,
  DrawerBody,
  ModalCloseButton,
  HStack,
  Heading,
  Text,
  Button,
  useToast,
  Stack,
} from '@chakra-ui/react';
import {OTPInput} from 'chakra-otp-input';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateToast} from '../../../../ui-lib/ui-lib.components';
import {toastForError} from '../../../../utils/toastForErrors';
import {updateTwoFac} from '../../../../apis/settings';

export const TurnOffTwoFa = ({onModalClose}) => {
  const [twoFaOtp, setTwoFaValue] = useState(null);

  const toast = useToast();

  const queryClient = useQueryClient();
  const toaster = CreateToast();

  const mutation = useMutation(
    values => {
      return updateTwoFac(values);
    },
    {
      onSuccess: async res => {
        console.log(res);
        if (res?.data?.status === 'False') {
          toastForError(err, true, toast);
        } else {
          console.log(res, 'succ');

          queryClient.invalidateQueries(['fetchDeveloperProfile']);
          await queryClient.refetchQueries(['fetchDeveloperProfile']);
          // await refetch();
          // toast({
          //   title: 'updated successfully',
          //   description: `Two Factor Authentication enabled
          //       `,
          //   status: 'success',
          //   duration: 8000,
          //   isClosable: true,
          //   position: 'top-right',
          // });
          toaster('Two Factor Authentication disabled');
          onModalClose();
        }
      },
      onError: err => {
        console.log('failed');

        return toastForError(err, true, toast);
      },
    }
  );

  console.log(mutation.error);

  //   mutation.isError ? toastForError(mutation.error, true, toast) : '';

  const handleVerify = () => {
    console.log('verify');
    return mutation.mutate({
      code: twoFaOtp,
      update: false,
    });
  };

  const isValid = twoFaOtp?.length == 6;

  return (
    <>
      <DrawerBody mt="15px" px="29px" py="0px">
        <Stack spacing="48px" w="full" mb="48px">
          <Text fontSize="14px" color="#3D3D3D" fontWeight="300">
            This extra step is to make sure {"it's"} really you trying to change settings. Kindly,
            enter the 2-step verification code from your authenticator app.
          </Text>
          <Stack spacing="8px">
            <OTPInput
              // style={{color: '#191919'}}
              w="full"
              h="55.658px"
              value={twoFaOtp}
              type="number"
              noInputs={6}
              bg="#E5E5E5"
              boxShadow="none"
              color="#333"
              fontSize="28.884px"
              fontWeight="300"
              borderRadius="8px"
              onChange={value => setTwoFaValue(value)}
            />
          </Stack>
        </Stack>
      </DrawerBody>

      <DrawerFooter p="0px" px="29px" mb="26px">
        <Button
          h="55px"
          color="#fff"
          w="full"
          bg="#4545FE"
          borderRadius="72px"
          fontSize="18px"
          fontWeight="400"
          _hover={{
            opacity: 1,
          }}
          _active={{
            opacity: 1,
          }}
          onClick={handleVerify}
          isLoading={mutation.isLoading}
          isDisabled={!isValid}
        >
          Verify
        </Button>
      </DrawerFooter>
    </>
  );
};

export default TurnOffTwoFa;
