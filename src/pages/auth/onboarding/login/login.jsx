import axios from 'utils/axiosInstance';
import Link from 'next/link';
import {useFormik} from 'formik';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';
import {
  Box,
  Flex,
  Stack,
  Text,
  SlideFade,
  Spinner,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import {OS} from '../../../../utils';
import {Navbar} from '../../../../components';
import {Button, Input} from 'ui-lib/ui-lib.components';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {BaseURL_ONE} from '../../../../constants/routes';
import {MATADOR_DEVELOPER_LOGIN_INFO} from '../../../../constants/auth';
import Head from 'next/head';
import LoginAssistance from '../../../../components/VeergeAssistance/LoginAssistance';
import TwoFAForm from './twoFAForm';

export const Login = () => {
  const WIDGET_MODAL = useDisclosure();
  const TWO_FA_MODAL = useDisclosure();
  const router = useRouter();
  const nextPage = '/dashboard';
  const toast = useToast();
  const [siginBodyValues, setSiginBodyValues] = useState(null);
  const userOperatingSystem = OS(window);
  const userCountry = localStorage && JSON.parse(window.localStorage.getItem('country'));
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/developer-login`, formData);
    },
    {
      onSuccess: res => {
        if (res?.data?.is_2Fa) {
          TWO_FA_MODAL.onOpen();
        } else {
          setTimeout(() => {
            router.push(nextPage);
          }, 2200);
          localStorage.setItem('devToken', JSON.stringify(res?.data?.token));
          localStorage.setItem('loggedinUser', JSON.stringify(res?.data?.user));
          localStorage.setItem('DEVELOPER_PLAN', JSON.stringify(res?.data?.plan));
        }
      },
      onError: err => {
        toast({
          title: `${
            err.response.statusText == 'Not Found'
              ? 'Incorrect email/password'
              : (err.response.data.resolve ?? '')
          }`,
          description: `${
            err.response.statusText == 'Not Found'
              ? "We couldn't find any match to the details you provided"
              : (err.response.data.message ?? err ?? err.message)
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const formik = useFormik({
    initialValues: MATADOR_DEVELOPER_LOGIN_INFO,
    onSubmit: values => {
      const loginBody = {
        ...values,
        email: values.email?.toLocaleLowerCase(),
        os: userOperatingSystem,
        location: userCountry,
      };
      mutation.mutate({...loginBody});
      setSiginBodyValues(loginBody);
    },
  });

  const isEmpty =
    !formik.values.email ||
    formik.values.password.length < 8 ||
    formik.values.email.search('@') == -1;

  return (
    <SlideFade in offsetY="50px" initialScale={1.2}>
      <Head>
        <title>Veerge | Login</title>
        <meta name="description" content="Veerge | Login" />
        <meta name="theme-color" content="#191919" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Box position={'relative'} w="full" bg="#191919" h="100vh">
        <Stack rounded={'xl'} pl={{base: 4, sm: 6, md: '78px'}} spacing={{base: 8}}>
          <Navbar />
        </Stack>
        <Flex w="full" align="center" justify="center" bg="#191919" mx="auto">
          {!TWO_FA_MODAL.isOpen ? (
            <Stack
              rounded={'xl'}
              px={{base: 4, sm: 6, md: 10}}
              spacing={{base: 8}}
              mx="auto"
              w={{base: 'md', md: '451px'}}
              background="rgba(255, 255, 255, 0.1)"
              boxShadow="0px 8px 48px rgba(0, 0, 0, 0.04)"
              borderRadius="20px"
              className="main-app"
            >
              <Box py="21px" mx="auto" w="full">
                <Stack spacing={4} mt="22px" textAlign="center">
                  <Text
                    align="left"
                    color="#FFF"
                    fontSize="32px"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="normal"
                    fontFamily="Euclid Circular B"
                  >
                    Login
                  </Text>
                </Stack>
                <Box mt="22px" as="form" onSubmit={formik.handleSubmit} w="full">
                  <Stack spacing={4} w="full">
                    <Input
                      isAuth
                      required
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      value={formik.values.email?.toLowerCase()}
                      onChange={formik.handleChange}
                      _placeholder={{color: '#FFFFFF'}}
                    />
                    <Box w="full" position={'relative'}>
                      <Input
                        isAuth
                        id="password"
                        _placeholder={{color: '#FFFFFF'}}
                        name="password"
                        placeholder="Password"
                        title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type={showPassword ? 'text' : 'password'}
                        required
                      />
                      <Box
                        position="absolute"
                        bottom="45%"
                        right={'2%'}
                        mt={-2}
                        cursor="pointer"
                        color="#FFFFFF"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <ViewIcon h={6} w={10} /> : <ViewOffIcon h={6} w={10} />}
                      </Box>
                    </Box>
                  </Stack>

                  <Flex w="full" justify="flex-end" mb="20px">
                    <Text
                      fontSize={'12px'}
                      cursor="pointer"
                      color={'#FFFFFF'}
                      onClick={e => {
                        e.stopPropagation();
                        router.push('/auth/forgot_password');
                      }}
                    >
                      Forgot Password?
                    </Text>
                  </Flex>

                  <Button
                    fontSize="18px"
                    fontWeight="500"
                    variant="tertiary"
                    w="full"
                    isDisabled={isEmpty}
                    h={55}
                    type="submit"
                  >
                    {mutation?.isLoading ? <Spinner color="#191919" /> : 'Login'}
                  </Button>

                  <Text py={6} fontSize={'14px'} align={'center'} color={'#E5E5E5'}>
                    {/* {`Don't have an account yet?`} */}
                    <Link prefetch={false} href="/auth/onboarding">
                      <Text
                        onClick={() => router.push('/auth/onboarding')}
                        cursor="pointer"
                        mt="21px"
                        fontSize="18px"
                        fontWeight="500"
                        color={'#FFFFFF'}
                      >
                        Create an account
                      </Text>
                    </Link>
                  </Text>
                </Box>
              </Box>
            </Stack>
          ) : (
            <TwoFAForm siginBodyValues={siginBodyValues} mutation={mutation} />
          )}{' '}
        </Flex>
      </Box>
      <LoginAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </SlideFade>
  );
};

export default Login;
