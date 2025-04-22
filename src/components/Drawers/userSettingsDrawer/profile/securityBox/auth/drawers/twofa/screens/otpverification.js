import {useState, useEffect} from 'react';
import {DrawerFooter, Text, Button, useToast, Stack, DrawerBody} from '@chakra-ui/react';
import {OTPInput} from 'chakra-otp-input';
import {useMutation} from '@tanstack/react-query';
import {BaseURL_ONE} from '/src/constants/routes';
import axios from 'utils/axiosInstance';
import {toastForError} from '/src/utils/toastForErrors';
import {CreateToast} from 'ui-lib/ui-lib.components';

export const Otpverification = ({handleScreen}) => {
  const [OTP, setOTP] = useState(null);
  const [shouldCount, setShouldCount] = useState(false);
  const [shouldCountForCall, setShouldCountForCall] = useState(false);

  const [count, setCount] = useState(30);
  const [countForCall, setCountForCall] = useState(30);

  const toast = useToast();

  const developer = JSON.parse(localStorage.getItem('loggedinUser'));
  const toaster = CreateToast();

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/verify_totp_phone`, formData);
    },
    {
      onSuccess: res => {
        handleScreen('scanqrcode');
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const sendOTPMessageMutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_phone_developer`, {
        phone: developer?.phone,
        country: developer?.country,
        '2fa': true,
      });
    },
    {
      onSuccess: res => {
        toaster('Your OTP is on its way. It will arrive as a text message. ');
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
        country: developer?.country,

        phone: developer?.phone,
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

  const handleVerify = () => {
    return mutation.mutate({
      //   email: developerEmail,
      phone: developer?.phone,
      phone_verification_code: OTP,
    });
  };

  const isValid = OTP?.length == 6;
  return (
    <>
      <DrawerBody mt="15px" px="29px" py="0px" textAlign={'center'}>
        <Stack spacing="48px" w="full" mb="48px">
          <Text fontSize="14px" color="#3D3D3D" fontWeight="300">
            Kindly enter the verification code we sent to
            <Text color="#4545FE" as="span">
              {' '}
              {developer?.phone}
            </Text>{' '}
          </Text>
          <Stack spacing="8px">
            <OTPInput
              // style={{color: '#191919'}}
              w="full"
              h="55.658px"
              value={OTP}
              type="number"
              noInputs={6}
              bg="#E5E5E5"
              boxShadow="none"
              color="#333"
              fontSize="28.884px"
              fontWeight="300"
              borderRadius="8px"
              onChange={value => setOTP(value)}
            />
            <Text fontSize="14px" fontWeight="400">
              {shouldCountForCall ? '' : "Didn't receive an OTP ?"}
              <Text
                as="span"
                color={shouldCount ? '#333' : shouldCountForCall ? '#e1e1e1' : '#4545FE'}
                cursor={shouldCount || shouldCountForCall ? 'default' : 'pointer'}
                textDecoration={shouldCount ? '' : 'underline'}
                onClick={() =>
                  shouldCount || shouldCountForCall ? null : sendOTPMessageMutation.mutate()
                }
              >
                {' '}
                {shouldCount ? (
                  <>
                    {`resend in`}{' '}
                    <Text as="span" color="#4545FE">
                      {' '}
                      {`0:${count} Sec`}{' '}
                    </Text>
                  </>
                ) : (
                  `Resend OTP`
                )}
              </Text>{' '}
              |{' '}
              <Text
                as="span"
                cursor={shouldCount || shouldCountForCall ? 'default' : 'pointer'}
                color={shouldCount ? '#e1e1e1' : ''}
                onClick={() =>
                  shouldCount || shouldCountForCall ? null : callMutationForOtp.mutate()
                }
              >
                {' '}
                {shouldCountForCall ? (
                  <>
                    {`didn't receive a call? retry in`}
                    <Text as="span" color="#4545FE">
                      {' '}
                      {`0:${countForCall} Sec`}
                    </Text>
                  </>
                ) : (
                  'Call now'
                )}
              </Text>
            </Text>
          </Stack>
        </Stack>
      </DrawerBody>

      <DrawerFooter p="0px" px="29px" mb="26px">
        <Button
          h="55px"
          color="#fff"
          w="full"
          bg="#191919"
          variant="dark"
          borderRadius="12px"
          fontSize="18px"
          fontWeight="400"
          _hover={{opacity: 1}}
          _active={{opacity: 1}}
          isDisabled={!isValid}
          isLoading={mutation.isLoading}
          onClick={handleVerify}
        >
          Verify
        </Button>
      </DrawerFooter>
    </>
  );
};

export default Otpverification;
