import React, {useState, useEffect} from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  useToast,
  Heading,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import {OTPInput} from 'chakra-otp-input';
import {useMutation} from '@tanstack/react-query';
import axios from 'utils/axiosInstance';

import {toastForError} from '../../../../utils/toastForErrors';
import {BaseURL_ONE} from '../../../../constants/routes';
import {CreateToast} from '../../../../ui-lib';

const DEFAULTTIMER = 30;
export const VerifyEmailScreen = ({customScrollbarStyles, handleClose, handleScreen}) => {
  const [emailOTP, setEmailOTP] = useState(null);
  const [shouldCount, setShouldCount] = useState(false);

  const [count, setCount] = useState(DEFAULTTIMER);
  const toast = useToast();

  const toaster = CreateToast();

  const developer = JSON.parse(localStorage.getItem('loggedinUser'));

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/verify_totp_email`, formData);
    },
    {
      onSuccess: res => {
        // toast({
        //   title: 'Email Verified!',
        //   status: 'success',
        //   duration: 5000,
        //   isClosable: true,
        //   position: 'top-right',
        // });
        handleScreen('scanqrcode');
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  mutation.isSuccess ? handleScreen('scanqrcode') : null;

  const sendOTPMutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_email_developer`, {
        email: developer?.email,
        country: developer?.country,
        '2fa': true,
      });
    },
    {
      onSuccess: res => {
        setShouldCount(true);
        toaster('An OTP has been sent to your registered email address.');
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  useEffect(() => {
    let timer;

    if (shouldCount) {
      if (count < 1) {
        setShouldCount(false);
        setCount(DEFAULTTIMER);
      } else {
        timer = setInterval(() => {
          setCount(prev => prev - 1);
        }, 1000);
      }
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCount, count]);

  useEffect(() => {
    sendOTPMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = () => {
    return mutation.mutate({
      //   email: developerEmail,
      email: developer?.email,
      email_verification_code: emailOTP,
    });
  };

  const isValid = emailOTP?.length == 6;

  return (
    <>
      <HStack mt="26px" justify="space-between" px="29px" align="center" position="relative">
        <Heading fontWeight="600" fontSize="24px" color="#191919">
          Two factor authentication
        </Heading>
        <ModalCloseButton onClick={handleClose} position="initial" />
      </HStack>
      <ModalBody mt="15px" w="483px" px="29px" py="0px">
        <Stack spacing="48px" w="full" mb="48px">
          <Text fontSize="14px" color="#3D3D3D" fontWeight="300">
            Kindly enter the verification code we sent to
            <Text color="#4545FE" as="span">
              {' '}
              {developer?.email}
            </Text>{' '}
            to proceed
          </Text>
          <Stack spacing="8px">
            <OTPInput
              // style={{color: '#191919'}}
              w="full"
              h="55.658px"
              value={emailOTP}
              type="number"
              noInputs={6}
              bg="#E5E5E5"
              boxShadow="none"
              color="#333"
              fontSize="28.884px"
              fontWeight="300"
              borderRadius="8px"
              onChange={value => setEmailOTP(value)}
            />
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              {" Didn't "}receive an OTP ?
              <Text
                as="span"
                color={shouldCount ? '#3D3D3D' : '#4545FE'}
                cursor={shouldCount ? 'default' : 'pointer'}
                textDecoration={shouldCount ? '' : 'underline'}
                onClick={() => (shouldCount ? null : sendOTPMutation.mutate())}
              >
                {' '}
                {shouldCount ? `resend in 0:${count} Sec` : `Resend OTP`}
              </Text>
            </Text>
          </Stack>
        </Stack>
      </ModalBody>

      <ModalFooter p="0px" px="29px" mb="26px">
        <Button
          h="55px"
          color="#fff"
          w="full"
          bg="#4545FE"
          borderRadius="12px"
          fontSize="18px"
          fontWeight="400"
          _hover={{opacity: 1}}
          _active={{opacity: 1}}
          isLoading={mutation.isLoading}
          isDisabled={!isValid}
          //   onClick={handleScreen('scanqrcode')}
          onClick={handleVerify}
        >
          Verify
        </Button>
      </ModalFooter>
    </>
  );
};

export default VerifyEmailScreen;
