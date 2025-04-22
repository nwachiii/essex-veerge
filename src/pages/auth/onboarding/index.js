import AuthEmailVerification from '@/components/auth/components/authEmailVerification';
import AuthPageLayout from '@/components/auth/components/authPagesWrapper';
import CreatePassword from '@/components/auth/components/createPassword';
import CompanyInfo from '@/components/auth/onboarding/screens/companyInfo';
import PersonalInfo from '@/components/auth/onboarding/screens/personalInfo';
import SelectARegion from '@/components/auth/onboarding/screens/selectARegion';
import {useToast} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {registerVeergeAccount} from 'apis/auth';
import axios from 'utils/axiosInstance';
import {BaseURL_ONE} from 'constants/routes';

import {useFormik} from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {toastForError} from 'utils/toastForErrors';
import * as Yup from 'yup';

const nextPage = '/dashboard';

const defaultScreen = 'select a region';

const VeergeAccountCreation = () => {
  const [screen, setScreen] = useState(defaultScreen);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const router = useRouter();

  const toast = useToast();

  const formSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter your First name'),
    country: Yup.string().required('Kindly select a country'),
    last_name: Yup.string().required('Kindly enter your Last name'),
    company_email: Yup.string()
      .email('Kindly enter a valid email address')
      .required("Kindly enter your company's email address"),
    company_name: Yup.string().required("Kindly enter your company's name"),
    company_address: Yup.string().required("Kindly enter your company's address"),
    currency: Yup.string().required('Kindly select your preferred currency'),
    role: Yup.string().required('Kindly enter your role'),
    email: Yup.string()
      .required('Kindly enter your Email address')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Kindly enter a valid Email address'
      ),
  });

  const initialValues = {
    first_name: '',
    last_name: '',
    country: '',
    email: '',
    currency: '',
    company_address: '',
    default_timezone: '',
    role: '',
    company_email: '',
    company_name: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: formSubmitted,
    validateOnMount: false,
    validateOnBlur: formSubmitted,

    onSubmit: values => {
      mutate(values);
    },
    validationSchema: formSchema,
  });

  const {mutate, isLoading} = useMutation(
    formData => {
      return registerVeergeAccount(formData);
    },
    {
      onSuccess: res => {
        localStorage.setItem('devToken', JSON.stringify(res?.data?.token));
        localStorage.setItem('loggedinUser', JSON.stringify(res?.data?.user));
        localStorage.setItem('DEVELOPER_PLAN', JSON.stringify(res?.data?.plan));
        localStorage.setItem('baseCountry', res?.data?.country);
        localStorage.setItem('baseCurrency', res?.data?.currency);
        setTimeout(() => {
          router.push(nextPage);
        }, 500);
      },
      onError: err =>
        toast({
          title: `${err?.response?.data?.message ?? err?.response?.data}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        }),
    }
  );
  //verify email otp mutation
  const verifyEmailMutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/verify_totp_email`, formData);
    },
    {
      onSuccess: res => {
        setScreen('create password');
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );
  //send email otp mutation
  const sendEmailOTPMutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_email_developer`, formData);
    },
    {
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const navigationTo = ({screen = '', email_verification_code} = {}) => {
    if (screen === 'email verification') {
      const email = formik.values.email;
      const payload = {email};
      return sendEmailOTPMutation.mutate(payload, {
        onSuccess: () => {
          setScreen(screen);
        },
      });
    } else if (screen === 'create password') {
      const email = formik.values.email;
      const verifyBody = {email, email_verification_code};
      return verifyEmailMutation.mutate(verifyBody);
    } else {
      setScreen('company info');
    }
  };

  const resendOtp = hasSentOtp => {
    const email = formik.values.email;
    const payload = {email};
    return sendEmailOTPMutation.mutate(payload, {
      onSuccess: () => {
        hasSentOtp(true);
        return toast({
          title: `A new OTP has been sent`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });
  };

  const displayAccountCreationScreens = scrn => {
    switch (scrn) {
      case 'select a region':
        return <SelectARegion formik={formik} handleScreen={setScreen} />;

      case 'personal info':
        return (
          <PersonalInfo
            isLoading={sendEmailOTPMutation.isLoading}
            formik={formik}
            setFormSubmitted={setFormSubmitted}
            handleScreen={navigationTo}
          />
        );
      case 'email verification':
        return (
          <AuthEmailVerification
            mutation={verifyEmailMutation}
            resendOtp={resendOtp}
            handleVerify={navigationTo}
            email={formik.values.email}
            header="Email verification"
            nextScreen="create password"
            subText={
              <>
                We have sent a 6 digit OTP code to your email address{' '}
                {formik.values.email ? (
                  <span style={{fontWeight: 600}}>({formik.values.email})</span>
                ) : (
                  ''
                )}
                . Kindly input to verify and continue.
              </>
            }
          />
        );

      case 'create password':
        return (
          <CreatePassword onSubmit={navigationTo} header="Password setup" mainFormik={formik} />
        );

      case 'company info':
        return (
          <CompanyInfo setFormSubmitted={setFormSubmitted} isLoading={isLoading} formik={formik} />
        );

      default:
        return <SelectARegion formik={formik} handleScreen={setScreen} />;
    }
  };
  return (
    <>
      <Head>
        <title>Veerge | Create an Account</title>
        <meta name="description" content="Veerge | Create an account" />
        <meta name="theme-color" content="#191919" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <AuthPageLayout>{displayAccountCreationScreens(screen)}</AuthPageLayout>
    </>
  );
};

export default VeergeAccountCreation;
