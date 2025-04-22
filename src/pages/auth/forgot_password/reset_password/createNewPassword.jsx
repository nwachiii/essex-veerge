import axios from 'utils/axiosInstance';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import PasswordStrengthBar from 'react-password-strength-bar';
import {
  Box,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import {Button, Form, Input} from '../../../../ui-lib';
import {themeStyles} from '../../../../theme';
import {forgotPasswordReset} from '../../../../apis/auth';
import {OS} from '../../../../utils';
import LoginAssistance from '../../../../components/VeergeAssistance/LoginAssistance';

const CreateNewPassword = () => {
  const nextPage = 'success';
  const router = useRouter();
  const toast = useToast();
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const userOperatingSystem = OS(window);
  const WIDGET_MODAL = useDisclosure();
  const userCountry = localStorage && JSON.parse(window.localStorage.getItem('country'));
  const resetPwrdEmail = localStorage && JSON.parse(localStorage.getItem('resetPwrdEmail'));

  const mutation = useMutation(formData => forgotPasswordReset(formData), {
    onSuccess: res => {
      localStorage.clear();
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
          !resetPwrdEmail ? "Email wasn't found, Please enter a valid email" : 'An error occurred'
        }`,
      });
    },
  });
  const formik = useFormik({
    initialValues: {os: '', location: '', password: '', email: ''},
    onSubmit: values => {
      mutation.mutate({
        ...values,
        os: userOperatingSystem,
        location: userCountry,
        email: resetPwrdEmail,
      });
      // router.push(nextPage)
    },
  });
  const isDisabled =
    !confirmPwd || confirmPwd.length < 8 || !(confirmPwd == formik?.values?.password);

  return (
    <>
      <Form as="form">
        <Form.Header> {router === false ? 'Password reset' : 'Password setup'}</Form.Header>
        <Form.Body>
          <Stack spacing={-3}>
            <Input
              isAuth
              name="password"
              isRequired
              id="password"
              value={formik?.values?.password}
              onChange={formik?.handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              placeholder="New password"
              _placeholder={{color: 'gray.500'}}
              type={showPassword ? 'text' : 'password'}
            />
          </Stack>
          <Stack spacing={-3}>
            <Box position="relative">
              <Input
                isAuth
                isRequired
                id="confirmPwd"
                name="confirmPwd"
                value={confirmPwd}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                onChange={e => setConfirmPwd(e.target.value)}
                placeholder="Confirm password"
                _placeholder={{color: 'gray.500'}}
                type={showPassword ? 'text' : 'password'}
              />
              <Box
                position="absolute"
                bottom="-26%"
                right={'2%'}
                mt={-2}
                h="full"
                cursor="pointer"
                color="#FFFFFF"
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon h={6} w={10} /> : <ViewOffIcon h={6} w={10} />}
              </Box>
            </Box>
            {confirmPwd !== '' && formik?.values?.password !== confirmPwd && (
              <Text mt={-4} fontSize={'12px'} align="left" color="red">
                Passwords do not match!
              </Text>
            )}
            {formik?.values?.password.length < 8 && formik?.values?.password.length > 3 && (
              <Text mt={-4} fontSize={'12px'} align="left" color="red">
                Passwords should be at least 8 characters in length!
              </Text>
            )}
            {confirmPwd !== '' &&
              formik?.values?.password == confirmPwd &&
              confirmPwd.length >= 8 && (
                <Text pl={2} mt={-4} align="left" color={themeStyles.color.matador__green}>
                  {` It's a match! 👍🏻`}
                </Text>
              )}
          </Stack>
          <Stack spacing={-3} mt={4}>
            <PasswordStrengthBar password={formik?.values?.password} />
            <Text fontSize={'12px'} as="small" align="left" mt={-5}>
              Password strength
            </Text>
          </Stack>
        </Form.Body>
        <Form.Footer>
          {/* {formik?.values?.password !== '' && formik?.values?.password.length >= 8 && formik?.values?.password == confirmPwd && ( */}
          <Button
            fontSize="16px"
            fontWeight="400"
            withoutLoader
            isDisabled={isDisabled}
            type="button"
            onClick={formik.handleSubmit}
          >
            {mutation?.isLoading ? <Spinner color="#191919" /> : 'Reset'}
          </Button>
          {/* )} */}
        </Form.Footer>
      </Form>
      <LoginAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </>
  );
};

export default CreateNewPassword;
