import {Flex, useToast, Text, Spinner, useDisclosure} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import axios from 'utils/axiosInstance';
import {OTPInput} from 'chakra-otp-input';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {BaseURL_ONE} from '../../../../constants/routes';
import {Button, Form} from 'ui-lib/ui-lib.components';
import CreateAccountAssistance from '../../../../components/VeergeAssistance/CreateAccountAssistance';

export default function EmailVerification() {
  const toast = useToast();
  const nextPage = '/auth/onboarding/create_account/createNewPassword';
  const router = useRouter();
  const [emailOTP, setEmailOTP] = useState(null);
  const developerEmail = JSON.parse(localStorage.getItem('SignUpData'))?.email;
  const WIDGET_MODAL = useDisclosure();

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/verify_totp_email`, formData);
    },
    {
      onSuccess: res => {
        toast({
          title: 'Email Verified!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setTimeout(() => {
          router.push(nextPage);
        }, 500);
      },
      onError: err => {
        console.log(err);
        toast({
          title: `${
            err?.response?.data?.email_verification_code ||
            err?.response?.data?.message ||
            err?.statusText
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const resendOTPMutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_email_developer`, {email: formData});
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
      },
      onError: err => {
        toast({
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
          title: `${
            err.response.data.email ||
            err?.response?.data?.message ||
            err?.statusText == 'Internal Server Error'
              ? 'Please ensure the phone number you entered in the previous page is valid'
              : 'Something went wrong. Please try again later'
          }`,
        });
      },
    }
  );

  const handleVerify = () => {
    mutation.mutate({email: developerEmail, email_verification_code: emailOTP});
  };
  return (
    <>
      <Form>
        <Form.Header fontSize="32px" fontWeight="600">
          Email verification
        </Form.Header>
        <Form.Description>
          <Text
            fontSize={'14px'}
            fontWeight={'400'}
            color={'#FFFFFF'}
            align="left"
          >{`We have sent a 6 digit OTP code to your email address ${developerEmail}. Kindly input to verify and continue`}</Text>
        </Form.Description>

        <Form.Body>
          <Flex py="8" justify="center" align="center" w="full">
            <OTPInput
              style={{color: '#FFFFFF', background: '#1A1A1A'}}
              value={emailOTP}
              type="number"
              noInputs={6}
              onChange={value => setEmailOTP(value)}
            />
          </Flex>
          <Text pb={3} fontSize="12px" align="center" w="full">
            {` Didn't receive an OTP?`}{' '}
          </Text>
          <Text
            onClick={() => resendOTPMutation.mutate(developerEmail)}
            cursor="pointer"
            as="span"
            fontWeight="500"
            color="#FFFFFF"
          >
            {resendOTPMutation?.isLoading ? <Spinner /> : <u>Resend</u>}
          </Text>
        </Form.Body>
        <Form.Footer>
          {emailOTP?.length == 6 && (
            <Button fontSize={'18px'} fontWeight="500" onClick={handleVerify}>
              {mutation?.isLoading ? <Spinner /> : 'Verify'}
            </Button>
          )}
        </Form.Footer>
      </Form>
      <CreateAccountAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </>
  );
}
