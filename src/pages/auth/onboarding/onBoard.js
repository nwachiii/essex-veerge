import axios from 'utils/axiosInstance';
import {useFormik} from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Fragment, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {BaseURL_ONE} from '../../../constants/routes';
import {MATADOR_DEVELOPER_SIGNUP_INFO} from '../../../constants/auth';
import {
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import CreateAccountAssistance from '../../../components/VeergeAssistance/CreateAccountAssistance';
import {Button, Form, Input} from '../../../ui-lib';
import {capitalizeTextFormat} from '../../../utils';

export default function CreateAccount() {
  const router = useRouter();
  const toast = useToast();
  const WIDGET_MODAL = useDisclosure();
  const [check, setCheck] = useState(false);
  const nextPage = '/auth/onboarding/create_account/email_verification';

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_email_developer`, {email: formData});
    },
    {
      onSuccess: res => {
        setTimeout(() => {
          router.push(nextPage);
        }, 2500);
      },
      onError: err => {
        toast({
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
          title: `${err.response.data.email || err?.response?.data?.message || err?.statusText}`,
        });
      },
    }
  );
  const formik = useFormik({
    initialValues: MATADOR_DEVELOPER_SIGNUP_INFO,
    onSubmit: (values, {setSubmitting}) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
      mutation.mutate(values.email?.toLowerCase());
      localStorage.setItem(
        'SignUpData',
        JSON.stringify(
          {
            ...values,
            email: values.email?.toLowerCase(),
            first_name: capitalizeTextFormat(values?.first_name),
            last_name: capitalizeTextFormat(values?.last_name),
          },
          null,
          2
        )
      );
    },
  });
  // check if fields are empty
  const isFieldEmpty =
    !formik.values.email ||
    !formik.values.first_name ||
    !formik.values.last_name ||
    formik.values.email?.search('@') == -1 ||
    check == false ||
    formik.values.email?.search('.com') == -1;

  return (
    <Fragment>
      <Head>
        <title>Veerge | Create an Account</title>
        <meta name="description" content="Veerge | Create an account" />
        <meta name="theme-color" content="#191919" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>

      <Form as="form">
        <Form.Header fontSize="32px" fontWeight="600">
          Create an account
        </Form.Header>
        <Form.Body>
          <Stack spacing="6px" mt="20px">
            <SimpleGrid columns={'2'} spacing="23px">
              <Input
                isAuth
                mx={1}
                required
                type="text"
                id="first_name"
                name="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                placeholder="First Name"
              />
              <Input
                isAuth
                mx={1}
                required
                type="text"
                id="last_name"
                name="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                placeholder="Last Name"
              />
            </SimpleGrid>
            <Input
              isAuth
              mx={1}
              required
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email address"
              // pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            />
          </Stack>
          <Flex gap="10px" align={'flex-start'} w="100%" pl={2}>
            <input
              type={'checkbox'}
              style={{width: '50px'}}
              onChange={e => setCheck(e.target.checked)}
              ischecked={check}
            />
            <Text textAlign={'left'} fontSize="12px">
              By creating an account, you assert that you represent a property development company
              and agree to adhere to our{' '}
              <a target="_blank" href="https://veerge-support.myxellia.io/privacy">
                <u>Privacy policy</u>
              </a>{' '}
              and{' '}
              <a target="_blank" href="https://veerge-support.myxellia.io/terms">
                <u>Terms of service</u>
              </a>
            </Text>
          </Flex>
        </Form.Body>

        <Button
          fontSize={'18px'}
          fontWeight={'500'}
          withoutLoader
          type="button"
          onClick={formik.handleSubmit}
          borderRadius="72px"
          isDisabled={isFieldEmpty || formik.isSubmitting}
        >
          {mutation.isLoading ? <Spinner color="#191919" /> : 'Proceed'}
        </Button>
        <Text
          onClick={WIDGET_MODAL.onOpen}
          py={3}
          cursor={'pointer'}
          mx="auto"
          color="#FFFFFF"
          fontSize={'12px'}
          textDecoration={'underline'}
        >
          Need help with Sign Up?
        </Text>
        <Text pb={2} align={'center'} color={'#FFFFFF'}>
          {`Already have an account?`}
        </Text>
        <Center>
          <Link href="/auth/onboarding/login">
            <Text
              textAlign={'center'}
              mx="auto"
              fontWeight={'600'}
              letterSpacing={'1px'}
              fontSize={'16px'}
              cursor="pointer"
              as="span"
              color={' #FFFFFF'}
            >
              Login!
            </Text>
          </Link>
        </Center>
      </Form>
      <CreateAccountAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </Fragment>
  );
}
