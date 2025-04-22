import Link from 'next/link';
import {Button, Form, Input} from '../../../ui-lib';
import {Spinner, Stack, Text, useDisclosure, useToast} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {requestEmailOTP} from '../../../apis/auth';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import {OS} from '../../../utils';
import LoginAssistance from '../../../components/VeergeAssistance/LoginAssistance';

export default function ForgotPassword() {
  const toast = useToast();
  const router = useRouter();
  const WIDGET_MODAL = useDisclosure();
  const userCountry = localStorage && JSON.parse(window.localStorage.getItem('country'));
  const userOperatingSystem = OS(window);

  const mutation = useMutation(data => requestEmailOTP(data), {
    onSuccess: res => {
      console.log(res);
      router.push('/auth/forgot_password/reset_password');
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err.response.data.message ?? err.response.data.email[0] ?? 'An error occured'}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      localStorage.clear();
    },
  });
  const formik = useFormik({
    initialValues: {email: ''},
    onSubmit: values => {
      const data = {...values, forgot: true, os: userOperatingSystem, location: userCountry};
      mutation.mutate(data);
      // console.log(data);
      localStorage.setItem('resetPwrdEmail', JSON.stringify(values.email));
      localStorage.setItem('***', JSON.stringify(data));
    },
  });

  const isEmpty =
    !formik.values.email || formik.values.email.length < 4 || formik.values.email.search('@') == -1;

  return (
    <>
      <Form gap={4} p={'32px'} as="form" onSubmit={formik.handleSubmit}>
        <Stack>
          <Text color="#A6A6A6" fontSize={18}>
            Forgot your password?
          </Text>
          <Form.Header>
            <Text>Enter your email address</Text>
          </Form.Header>
        </Stack>
        <Form.Body>
          <Input
            mx={1}
            isAuth
            required
            name="email"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder="Enter Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            _placeholder={{
              paddingLeft: 3,
              paddingTop: '0.1rem',
              color: '#919191',
              fontWeight: '400',
              letterSpacing: '0.02em',
            }}
            border="1px solid #3F3F3F"
            gap={0}
          />
          <Button
            mt={4}
            fontSize="16px"
            fontWeight="400"
            cursor={isEmpty ? 'not-allowed' : 'pointer'}
            isDisabled={isEmpty || mutation?.isLoading}
            type="submit"
            onClick={formik.handleSubmit}
          >
            {mutation?.isLoading ? <Spinner color="#191919" /> : 'Reset Password'}
          </Button>
          <Text textAlign={'left'} pt={4} fontSize={'14px'} color={'#E5E5E5'}>
            {`I remember my password`}
            <Link prefetch={false} href="/auth/onboarding">
              <Text
                as="span"
                onClick={() => router.push('/')}
                cursor="pointer"
                mt="21px"
                fontSize="18px"
                fontWeight="500"
                color={'#7255CB'}
                pl={1}
              >
                Login
              </Text>
            </Link>
          </Text>
        </Form.Body>
      </Form>
      <LoginAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </>
  );
}
