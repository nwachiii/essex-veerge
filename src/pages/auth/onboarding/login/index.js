import AuthPageLayout from '@/components/auth/components/authPagesWrapper';
import Login from '@/components/auth/login/screens/login';
import VerifyTwoForLogin from '@/components/auth/login/screens/verifyTwoForLogin';
import {useToast} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import axios from 'utils/axiosInstance';
import {BaseURL_ONE} from 'constants/routes';
import {useFormik} from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {OS} from 'utils';
import * as Yup from 'yup';
import DisabledAccount from '@/components/auth/login/screens/disAbledAccount';

const defaultScreen = 'login';
const nextPage = '/dashboard';

const LoginToVeerge = () => {
  const [screen, setScreen] = useState(defaultScreen);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const userOperatingSystem = OS(window);
  const userCountry = localStorage && JSON.parse(window.localStorage.getItem('country'));

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/developer-login`, formData);
    },
    {
      onSuccess: res => {
        if (res?.data?.is_2Fa) {
          setScreen('2fa verification');
        } else {
          setTimeout(() => {
            router.push(nextPage);
          }, 500);
          localStorage.setItem('devToken', JSON.stringify(res?.data?.token));
          localStorage.setItem('loggedinUser', JSON.stringify(res?.data?.user));
          localStorage.setItem('baseCountry', res?.data?.country);
          localStorage.setItem('baseCurrency', res?.data?.currency);
          localStorage.setItem('DEVELOPER_PLAN', JSON.stringify(res?.data?.plan));
        }
      },
      onError: err => {
        if (err.response.data.message === 'Business billing plan has expired') {
          return setScreen('disabled');
        }
        return toast({
          title: `${
            err.message === 'Network Error'
              ? 'Network Error'
              : err.response.statusText == 'Not Found'
                ? 'Incorrect email/password'
                : (err.response.data.resolve ?? '')
          }`,
          description: `${
            err.message === 'Network Error'
              ? 'Please check your network connection'
              : err.response.statusText == 'Not Found'
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

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please enter your Email address')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid Email address'
      ),
    password: Yup.string().required('Please enter your password'),
  });

  const initialValues = {email: '', password: '', os: userOperatingSystem, location: userCountry};

  const formik = useFormik({
    initialValues,
    validateOnChange: formSubmitted,
    validateOnMount: false,
    validateOnBlur: formSubmitted,

    enableReinitialize: true,
    onSubmit: values => {
      mutation.mutate(values);
    },
    validationSchema: formSchema,
  });

  const handleLogin = code => e => {
    e.preventDefault();
    const payload = {...formik.values, code};
    return mutation.mutate(payload);
  };

  const displayForgotPasswordScreen = scrn => {
    switch (scrn) {
      case 'login':
        return <Login setFormSubmitted={setFormSubmitted} mutation={mutation} formik={formik} />;

      case '2fa verification':
        return <VerifyTwoForLogin mutation={mutation} handleLogin={handleLogin} />;
      case 'disabled':
        return <DisabledAccount />;
      default:
        return <Login setFormSubmitted={setFormSubmitted} mutation={mutation} formik={formik} />;
    }
  };
  return (
    <AuthPageLayout>
      <Head>
        <title>Veerge | Login</title>
        <meta name="description" content="Veerge | Login" />
        <meta name="theme-color" content="#191919" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      {displayForgotPasswordScreen(screen)}
    </AuthPageLayout>
  );
};

export default LoginToVeerge;
