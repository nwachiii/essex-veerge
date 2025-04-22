import axios from 'utils/axiosInstance';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import PasswordStrengthBar from 'react-password-strength-bar';
import {Box, Spinner, Stack, Text, useDisclosure} from '@chakra-ui/react';
import {Button, Form, Input} from 'ui-lib/ui-lib.components';
import CreateAccountAssistance from '../../../../components/VeergeAssistance/CreateAccountAssistance';

const CreateNewPassword = () => {
  const nextPage = '/auth/onboarding/create_account/account_setup';
  const router = useRouter();
  const [confirmPwd, setConfirmPwd] = useState('');
  const route = router.route.slice(13) === '/reset_password';
  const WIDGET_MODAL = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);

  const currentSignUpData = JSON.parse(localStorage.getItem('SignUpData'));

  const mutation = useMutation(formData => {
    return axios.post('/api', formData);
  });

  const formik = useFormik({
    initialValues: currentSignUpData,
    onSubmit: values => {
      const cannotProceed =
        !confirmPwd || confirmPwd.length < 8 || !(confirmPwd == values?.password);
      mutation.mutate(JSON.stringify(values, null, 2));
      cannotProceed == false && localStorage.setItem('SignUpData', JSON.stringify(values));
      Object.keys(values).length &&
        cannotProceed == false &&
        setTimeout(() => {
          router.push(nextPage);
        }, 1600);
    },
    validate: values => {
      const errors = {};

      console.log(values);
      if (values?.password?.includes(' ')) {
        errors.password = `Password cannot include spaces`;
      }
      return errors;
    },
    validateOnChange: true,
  });

  const isDisabled =
    !confirmPwd || confirmPwd.length < 8 || !(confirmPwd == formik?.values?.password);

  // console.log('jkjk', formik?.values?.password, confirmPwd);

  return (
    <>
      <Form as="form">
        <Form.Header fontSize="32px" fontWeight="600">
          {router === false ? 'Password reset' : 'Password setup'}
        </Form.Header>
        <Form.Body>
          <Stack spacing={-3}>
            <Input
              isAuth
              isRequired
              name="password"
              id="password"
              value={formik?.values?.password}
              onChange={formik?.handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              placeholder="Create password"
              type={showPassword ? 'text' : 'password'}
            />
          </Stack>
          <Stack spacing={-3}>
            <Box position={'relative'}>
              <Input
                isAuth
                id="confirmPwd"
                name="confirmPwd"
                value={confirmPwd}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                onChange={e => setConfirmPwd(e.target.value)}
                placeholder="Confirm password"
                // _placeholder={{
                //   color: 'gray.500',
                // }}
                type={showPassword ? 'text' : 'password'}
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
            {formik?.errors?.password ? (
              <Text mt={-4} fontSize={'12px'} align="left" color="red">
                {formik?.errors?.password}
              </Text>
            ) : confirmPwd !== '' && formik?.values?.password !== confirmPwd ? (
              <Text mt={-4} fontSize={'12px'} align="left" color="red">
                Passwords do not match!
              </Text>
            ) : formik?.values?.password?.length < 8 && formik?.values?.password?.length > 3 ? (
              <Text mt={-4} fontSize={'12px'} align="left" color="red">
                Passwords should be at least 8 characters in length!
              </Text>
            ) : null}
          </Stack>
          <Stack spacing={-3} mt={4}>
            <PasswordStrengthBar
              scoreWords={['weak', 'weak', 'okay', 'normal', 'good']}
              password={formik?.values?.password}
              scoreWordStyle={{
                textTransform: `capitalize`,
                visibility: formik?.values?.password?.length < 8 ? 'hidden' : `visible`,
              }}
              shortScoreWord={`too short`}
              minLength={8}
            />
            <Text fontSize={'12px'} mt={'-5'} as="small" align="left">
              Password strength
            </Text>
          </Stack>
        </Form.Body>
        <Form.Footer>
          <Button
            fontSize={'18px'}
            fontWeight="500"
            withoutLoader
            type="button"
            borderRadius="72px"
            onClick={formik.handleSubmit}
            isDisabled={isDisabled}
          >
            {route === true ? (
              'Reset'
            ) : mutation.isLoading ? (
              <Spinner color="#191919" />
            ) : (
              'Proceed'
            )}
          </Button>
        </Form.Footer>
      </Form>
      <CreateAccountAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </>
  );
};

export default CreateNewPassword;
