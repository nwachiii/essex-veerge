import {Flex, useToast, Text, Spinner, useDisclosure} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import axios from 'utils/axiosInstance';
import {OTPInput} from 'chakra-otp-input';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {BaseURL_ONE} from '../../../../constants/routes';
import {Button, Form} from 'ui-lib/ui-lib.components';

import {verifyVoiceOTP} from '../../../../apis/auth';
import {PhoneIcon} from '@chakra-ui/icons';
import CreateAccountAssistance from '../../../../components/VeergeAssistance/CreateAccountAssistance';
import {toastForError} from 'utils/toastForErrors';

export default function PhoneVerification() {
  const toast = useToast();
  const nextPage = '/auth/onboarding/create_account/upload_document_info';
  const WIDGET_MODAL = useDisclosure();
  const router = useRouter();
  const [phoneOTP, setPhoneOTP] = useState(null);
  const developerPhoneNumber = JSON.parse(localStorage.getItem('SignUpData'))?.phone;

  const mutation = useMutation(
    formData => {
      // console.log(formData);
      return axios.post(`${BaseURL_ONE}/user/verify_totp_phone`, formData);
    },
    {
      onSuccess: res => {
        toast({
          title: 'Phone Number Verified!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setTimeout(() => {
          router.push(nextPage);
        }, 1000);
      },
      onError: err => {
        console.log(err);
        toast({
          title: `${err.response.data.phone_verification_code ?? err.response.data.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const voiceMutation = useMutation(formData => verifyVoiceOTP(formData), {
    onSuccess: res => {
      // console.log(res);
      toast({
        title: `${
          res?.data?.message?.message ??
          res?.data?.message ??
          'A phone call has been initiated. Kindly check your phone.'
        }`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      // console.log(err);
      toast({
        title: `We couldn't reach your phone, please try again with a valid phone number`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const resendOTPMutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_phone_developer`, {
        phone: formData,
        country: 1,
      });
    },
    {
      onSuccess: res => {
        toast({
          title: `A new OTP has been sent`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        localStorage.removeItem('P***');
      },
      onError: err => {
        console.log(err);
        toastForError(err, true, toast);
      },
    }
  );

  const handleVerify = () => {
    mutation.mutate({
      phone: developerPhoneNumber?.toString()?.slice(3),
      phone_verification_code: phoneOTP,
    });
  };

  const handleVoiceOTP = () => {
    voiceMutation.mutate({
      phone: developerPhoneNumber?.toString()?.slice(3),
      country: 1,
      veerge: true,
    });
  };
  return (
    <>
      <Form>
        <Form.Header fontSize="32px" fontWeight="600">
          Phone verification
        </Form.Header>
        <Form.Description>
          <Text fontSize={'14px'} align="left" fontWeight={'400'} color={'#FFFFFF'}>
            We have sent a 6 digit OTP code to your mobile number that ends with{' '}
            <span style={{color: '#FFFFFF'}}>
              <b>{developerPhoneNumber?.toString()?.slice(-2)}</b>
            </span>
            . Kindly input the code to proceed
          </Text>
        </Form.Description>

        <Form.Body>
          <Flex py="8" justify="center" align="center" w="full">
            <OTPInput
              style={{color: '#FFFFFF', background: '#1A1A1A'}}
              value={phoneOTP}
              type="number"
              noInputs={6}
              onChange={value => setPhoneOTP(value)}
            />
          </Flex>
          <Text pb={3} fontSize="12px" align="center" w="full">
            {`Didn't receive an OTP?`}{' '}
          </Text>
          <Flex gap="20px" align="center" justify={'center'}>
            <Text
              onClick={() => resendOTPMutation.mutate(Number(developerPhoneNumber))}
              cursor="pointer"
              as="span"
              fontWeight="500"
              color="#FFFFFF"
            >
              {resendOTPMutation.isLoading ? <Spinner /> : <u>Resend OTP</u>}
            </Text>
            <Text>|</Text>
            <Text
              onClick={handleVoiceOTP}
              cursor="pointer"
              as="span"
              fontWeight="500"
              color="#FFFFFF"
            >
              {voiceMutation?.isLoading ? (
                <Spinner />
              ) : (
                <u>
                  Call me instead <PhoneIcon style={{marginBottom: '7px'}} />
                </u>
              )}
            </Text>
          </Flex>
        </Form.Body>
        <Form.Footer>
          {phoneOTP?.length == 6 && (
            <Button borderRadius="72px" fontSize={'18px'} fontWeight="500" onClick={handleVerify}>
              {mutation?.isLoading ? <Spinner /> : 'Proceed'}
            </Button>
          )}
        </Form.Footer>
      </Form>
      <CreateAccountAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </>
  );
}
