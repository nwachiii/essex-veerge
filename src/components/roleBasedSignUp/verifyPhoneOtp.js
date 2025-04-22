import React, {useState, useEffect} from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Heading,
  Text,
  Button,
  useToast,
  Stack,
  PinInput,
  PinInputField,
  Image,
  Spinner,
} from '@chakra-ui/react';
import {OTPInput} from 'chakra-otp-input';
import {useMutation} from '@tanstack/react-query';
import {BaseURL_ONE} from '/src/constants/routes';
import axios from 'utils/axiosInstance';
import {toastForError} from '/src/utils/toastForErrors';
import {CreateToast} from 'ui-lib';
import callIcon from '/src/images/icons/callIcon.svg';

const VerifyPhoneOtp = ({formik, handleScreen}) => {
  const [OTP, setOTP] = useState(null);
  const [shouldCount, setShouldCount] = useState(false);
  const [shouldCountForCall, setShouldCountForCall] = useState(false);
  const [count, setCount] = useState(30);
  const [countForCall, setCountForCall] = useState(30);
  const toast = useToast();
  const toaster = CreateToast();

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/verify_totp_phone`, formData);
    },
    {
      onSuccess: res => {
        handleScreen('confirmPswd&SignUp');
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const sendOTPMessageMutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_phone_developer`, {
        phone: formik.values?.number,
        country: formik.values?.country,
      });
    },
    {
      onSuccess: res => {
        toaster('Your OTP is on its way. It will arrive as a text message.');
        setShouldCount(true);
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );
  const callMutationForOtp = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/voice_otp`, {
        country: formik.values?.country,
        phone: formik.values?.number,
      });
    },
    {
      onSuccess: res => {
        setShouldCountForCall(true);
        toaster('You will receive a call OTP shortly. Please be ready to receive the call.');
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
        setCount(30);
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
    let timed;

    if (shouldCountForCall) {
      if (countForCall < 1) {
        setShouldCountForCall(false);
        setCountForCall(30);
      } else {
        timed = setInterval(() => {
          setCountForCall(prev => prev - 1);
        }, 1000);
      }
    } else {
      clearInterval(timed);
    }

    return () => clearInterval(timed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCountForCall, countForCall]);

  useEffect(() => {
    sendOTPMessageMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = otp => {
    return mutation.mutate({
      //   email: developerEmail,
      phone: formik.values?.number,
      phone_verification_code: otp,
    });
  };

  const handleOtpInput = value => {
    if (value.length === 6) {
      setOTP(value);
      handleVerify(value);
    } else {
      setOTP(value);
    }
  };

  const isValid = OTP?.length == 6;
  return (
    <Stack p="23px 30px 39.68px 31px" w="451px" spacing="29px" borderRadius="16px" bg="#303030">
      <HStack justify="space-between" align="center" position="relative">
        <Heading fontWeight="600" fontSize="24px" color="#ffffff">
          Phone verification
        </Heading>
      </HStack>
      <Stack py="0px">
        <Stack spacing="29px" w="full">
          <Text fontSize="14px" color="#ffffff" fontWeight="300">
            We have sent a 6 digit OTP code to your mobile number that ends with{' '}
            {formik.values.number?.slice(-2) || '-'}. Kindly input the code to proceed
          </Text>
          <Stack spacing="29px" align="center">
            <OTPInput
              _focusVisible={{boxShadow: 'none', borderColor: '#CBD5E0'}}
              w="full"
              h="51.32px"
              value={OTP}
              type="number"
              noInputs={6}
              bg="#1A1A1A"
              boxShadow="none"
              color="#ffffff"
              fontSize="28.884px"
              borderColor="#3F3F3F"
              fontWeight="300"
              borderRadius="12px"
              onChange={handleOtpInput}
            />
            <Text fontSize="12px" fontWeight="400" color="#ffffff">
              {shouldCountForCall ? '' : "Didn't receive an OTP ?"}
            </Text>
            <HStack>
              <Text
                as="span"
                fontSize="14px"
                fontWeight="400"
                color={shouldCount ? '#ffffff' : shouldCountForCall ? '#919191' : '#ffffff'}
                cursor={shouldCount || shouldCountForCall ? 'default' : 'pointer'}
                onClick={() =>
                  shouldCount || shouldCountForCall ? null : sendOTPMessageMutation.mutate()
                }
              >
                {' '}
                {shouldCount ? (
                  <>
                    {`resend in`}
                    {'  '}
                    <Text as="span" color="#4545FE">
                      {' '}
                      {`0:${count} Sec`}{' '}
                    </Text>
                  </>
                ) : (
                  <Text as="span" textDecoration={'underline'} fontSize="16px">
                    {`Resend OTP`}{' '}
                  </Text>
                )}
              </Text>
              <Text color="#ffffff">|</Text>
              <HStack spacing="8px">
                <Text
                  fontWeight="400"
                  as="span"
                  fontSize="16px"
                  textDecoration={shouldCountForCall ? '' : 'underline'}
                  cursor={shouldCount || shouldCountForCall ? 'default' : 'pointer'}
                  color={shouldCount ? '#919191' : '#ffffff'}
                  onClick={() =>
                    shouldCount || shouldCountForCall ? null : callMutationForOtp.mutate()
                  }
                >
                  {shouldCountForCall ? (
                    <Text fontSize="14px">
                      {`didn't receive a call? retry in`}
                      <Text as="span" color="#4545FE">
                        {' '}
                        {`0:${countForCall} Sec`}
                      </Text>
                    </Text>
                  ) : (
                    'Call me instead'
                  )}
                </Text>
                {shouldCountForCall ? null : callMutationForOtp.isLoading ? (
                  <Spinner boxSize="24px" color="#ffffff" />
                ) : (
                  <Image src={callIcon.src} alt="call icon" />
                )}
              </HStack>
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <HStack p="0px">
        <Button
          h="55px"
          color="#191919"
          w="full"
          bg="#ffffff"
          borderRadius="12px"
          fontSize="18px"
          fontWeight="400"
          _hover={{opacity: 1}}
          _active={{opacity: 1}}
          isDisabled={!isValid}
          isLoading={mutation.isLoading}
          onClick={() => handleScreen('confirmPswd&SignUp')}
          // onClick={handleVerify}
        >
          Verify
        </Button>
      </HStack>
    </Stack>
  );
};

export default VerifyPhoneOtp;
