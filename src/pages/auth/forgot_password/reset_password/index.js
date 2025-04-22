import {Center, Flex, HStack, Spinner, Text, useDisclosure, useToast} from '@chakra-ui/react';
import {OTPInput} from 'chakra-otp-input';
import {Button, Form} from '../../../../ui-lib';
import {useMutation} from '@tanstack/react-query';
import {forgotPasswordReset, requestEmailOTP, verifyResetEmail} from '../../../../apis/auth';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {OS} from '../../../../utils';
import LoginAssistance from '../../../../components/VeergeAssistance/LoginAssistance';

export default function ResetPassword() {
  const nextPage = '/auth/forgot_password/reset_password/createNewPassword';
  const router = useRouter();
  const toast = useToast();
  const [pwrdOTP, setPwrdOTP] = useState(null);
  const WIDGET_MODAL = useDisclosure();
  const userCountry = localStorage && JSON.parse(window.localStorage.getItem('country'));
  const userOperatingSystem = OS(window);
  const resetPwrdEmail = localStorage && JSON.parse(localStorage.getItem('resetPwrdEmail'));
  const resendOTPData = localStorage && JSON.parse(localStorage.getItem('***'));
  const mutation = useMutation(formData => verifyResetEmail(formData), {
    onSuccess: res => {
      toast({
        duration: 8000,
        status: 'success',
        isClosable: true,
        position: 'top-right',
        title: 'Verified ✅',
      });
      setTimeout(() => {
        router.push(nextPage);
      }, 1000);
    },
    onError: err => {
      console.log(err);
      toast({
        duration: 8000,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        title: `${
          !resetPwrdEmail
            ? "Email wasn't found, Please enter a valid email"
            : (err?.response.data.message ?? 'An error occurred')
        }`,
      });
    },
  });
  const resendOTPMutation = useMutation(data => requestEmailOTP(data), {
    onSuccess: res => {
      console.log(res);
      toast({
        title: `A new OTP has been sent`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err.response.data.message ?? err.response.data.email[0] ?? 'Invalid OTP entered'}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleVerify = () => {
    const data = {
      os: userOperatingSystem,
      location: userCountry,
      email: resetPwrdEmail,
      email_verification_code: pwrdOTP,
    };
    mutation.mutate(data);
  };
  useEffect(() => {
    pwrdOTP?.length == 6 && handleVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pwrdOTP]);

  return (
    <>
      <Form p={'32px'}>
        <Form.Header fontWeight={600}>Password reset</Form.Header>
        <Form.Description>
          <Text
            fontSize={'14px'}
            align="left"
            color="#A6A6A6"
            fontWeight={400}
          >{`We have sent a six (6) digit OTP to your email address ${
            resetPwrdEmail ? resetPwrdEmail : ''
          }. Kindly input to reset your password.`}</Text>
        </Form.Description>

        <Form.Body>
          <Flex py="8" justify="center" align="center" w="full">
            <OTPInput
              style={{
                color: '#FFFFFF',
                background: '#1A1A1A',
                border: '1px solid #3F3F3F',
                width: '55px',
                height: '50px',
                borderRadius: '12px',
              }}
              typeof="number"
              value={pwrdOTP}
              noInputs={6}
              onChange={value => setPwrdOTP(value)}
            />
          </Flex>
        </Form.Body>

        <Button
          mx="auto"
          w="80%"
          isDisabled={pwrdOTP?.length !== 6}
          withoutLoader
          fontSize="16px"
          fontWeight="400"
          borderRadius="72px"
          mt={0}
          onClick={handleVerify}
        >
          {mutation.isLoading ? <Spinner color="#191919" /> : 'Proceed'}
        </Button>

        <Text color="#E5E5E5" mt="30px" mx="auto" fontFamily={'Proxima Nova'} fontSize={'14px'}>
          {` Didn't get the OTP?`}{' '}
        </Text>
        <Center w="full">
          {resendOTPMutation?.isLoading ? (
            <Spinner color="#FFFFFF" />
          ) : (
            <span
              onClick={() => resendOTPMutation.mutate(resendOTPData)}
              style={{color: '#FFFFFF', cursor: 'pointer', fontWeight: '500'}}
            >
              Resend
            </span>
          )}
        </Center>
      </Form>
      <LoginAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </>
  );
}
