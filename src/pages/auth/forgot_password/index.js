import AuthEmailVerification from '@/components/auth/components/authEmailVerification';
import AuthPageLayout from '@/components/auth/components/authPagesWrapper';
import InputEmailToResetPassword from '@/components/auth/forgot_password/screens/inputEmailToResetPassword';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {useToast} from '@chakra-ui/react';
import {OS} from 'utils';
import {useMutation} from '@tanstack/react-query';
import {forgotPasswordReset, requestEmailOTP, verifyResetEmail} from 'apis/auth';
import {useRouter} from 'next/router';
import {toastForError} from 'utils/toastForErrors';
import CreatePassword from '@/components/auth/components/createPassword';

const defaultScreen = 'input email';

const ForgotPassword = () => {
  const [screen, setScreen] = useState(defaultScreen);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const userCountry = localStorage && JSON.parse(window.localStorage.getItem('country'));
  const userOperatingSystem = OS(window);
  const toast = useToast();

  const router = useRouter();

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please enter your Email address')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid Email address'
      ),
  });

  //reset password mutation
  const resetPasswordMutation = useMutation(formData => forgotPasswordReset(formData), {
    onError: err => {
      toast({
        duration: 8000,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        title: `${'An error occurred'}`,
      });
    },
  });
  // verify email address mutation

  const verifyEmailMutation = useMutation(formData => verifyResetEmail(formData), {
    onError: err => {
      toast({
        duration: 8000,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        title: `${err?.response.data.message ?? 'An error occurred'}`,
      });
    },
  });

  // send Email OTP mutation
  const sendEmailOTPMutation = useMutation(data => requestEmailOTP(data));

  const initialValues = {
    email: '',
    password: '',
    forgot: true,
    os: userOperatingSystem,
    location: userCountry,
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: formSubmitted,
    validateOnMount: false,
    validateOnBlur: formSubmitted,
    enableReinitialize: true,

    onSubmit: values => {
      const {forgot, ...payload} = values;
      resetPasswordMutation.mutate(payload, {
        onSuccess: () => {
          return router.push('/account');
        },
        onError: err => {
          return toastForError(err, true, toast);
        },
      });
    },
    validationSchema: formSchema,
  });

  const navigationTo = ({screen, email_verification_code}) => {
    if (screen === 'email verification') {
      const {password, ...payload} = formik.values;
      return sendEmailOTPMutation.mutate(payload, {
        onSuccess: () => setScreen(screen),
        onError: err => toastForError(err, true, toast),
      });
    } else if (screen === 'create password') {
      const {forgot, password, ...verifypayload} = formik.values;
      const verifyBody = {
        ...verifypayload,
        email_verification_code,
      };
      return verifyEmailMutation.mutate(verifyBody, {
        onSuccess: res => {
          setScreen(screen);
        },
      });
    }
  };

  const resendOtp = hasSentOtp => {
    const {password, ...payload} = formik.values;
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
      onError: err => {
        toast({
          title: `${err.response.data.message ?? err.response.data.email[0] ?? 'Invalid OTP entered'}`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });
  };

  const displayForgotPasswordScreen = scrn => {
    switch (scrn) {
      case 'input email':
        return (
          <InputEmailToResetPassword
            setFormSubmitted={setFormSubmitted}
            isLoading={sendEmailOTPMutation.isLoading}
            formik={formik}
            handleScreen={navigationTo}
          />
        );

      case 'email verification':
        return (
          <AuthEmailVerification
            mutation={verifyEmailMutation}
            resendOtp={resendOtp}
            email={formik.values.email}
            header="Reset password"
            nextScreen="create password"
            subText={
              <>
                We have sent a 6 digit OTP code to your email address{' '}
                {formik.values.email ? (
                  <span style={{fontWeight: 600}}>({formik.values.email})</span>
                ) : (
                  ''
                )}
                . Kindly input to reset your password
              </>
            }
            handleVerify={navigationTo}
            maxW="586px"
          />
        );

      case 'create password':
        return (
          <CreatePassword
            onSubmit={formik.handleSubmit}
            header="Reset password"
            mutation={resetPasswordMutation}
            mainFormik={formik}
          />
        );

      default:
        return (
          <InputEmailToResetPassword
            isLoading={sendEmailOTPMutation.isLoading}
            formik={formik}
            setFormSubmitted={setFormSubmitted}
            handleScreen={navigationTo}
          />
        );
    }
  };
  return <AuthPageLayout>{displayForgotPasswordScreen(screen)}</AuthPageLayout>;
};

export default ForgotPassword;
