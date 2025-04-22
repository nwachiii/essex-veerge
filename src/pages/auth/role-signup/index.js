import {
  Checkbox,
  useToast,
  Select,
  VStack,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import PasswordStrengthBar from 'react-password-strength-bar';
import axios from 'utils/axiosInstance';

import {useRouter} from 'next/router';
import React from 'react';
// import {Button, Form, Input} from '../../../ui-lib/ui-lib.components';
import {BaseURL_ONE} from '../../../constants/routes';

import SignProfilePicture from './SignProfilePicture';
import fallbackSrc from '/src/images/avatar.jpeg';

import {encodeFileToBase64} from '../../../utils';
import Link from 'next/link';
import SignUpComponent from '@/components/roleBasedSignUp/signUpComponent';
import LayoutForRoleSignUp from '@/components/roleBasedSignUp/layoutForRoleSignUp';
import VerifyPhoneOtp from '@/components/roleBasedSignUp/verifyPhoneOtp';
import ConfirmPassword from '@/components/roleBasedSignUp/confirmPassword';
import {toastForError} from 'utils/toastForErrors';
import {CreateToast} from 'ui-lib/ui-lib.components';
import AuthPageLayout from '@/components/auth/components/authPagesWrapper';
import {motion} from 'framer-motion';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import StateOfPswrdIcon from '@/components/assets/stateOfPswrdIcon';
import ClosedEyeIcon from '@/components/assets/closedEyeIcon';
import CheckBlackIcon from '@/components/assets/check-Icon';
import DisabledAccount from '@/components/auth/login/screens/disAbledAccount';

const SignUp = () => {
  const [screen, setScreen] = useState('teamMembersInfo');
  const [avatar, setAvatar] = useState([]);
  const [confirmPwd, setConfirmPwd] = useState('');

  const queryClient = useQueryClient();
  const toaster = CreateToast();
  const toast = useToast();
  const router = useRouter();
  const {email} = router.query;
  const nextPage = '/dashboard';

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/invitee-signup`, formData);
    },
    {
      onSuccess: res => {
        queryClient.clear();
        localStorage.clear();
        localStorage.setItem('devToken', JSON.stringify(res?.data?.token));
        localStorage.setItem('loggedinUser', JSON.stringify(res?.data?.user));
        localStorage.setItem('baseCountry', res?.data?.country);
        localStorage.setItem('baseCurrency', res?.data?.currency);
        localStorage.setItem('DEVELOPER_PLAN', JSON.stringify(res?.data?.plan));
        toaster(
          'Account created successfully',
          {color: '#fff', bg: '#000', borderRadius: '5px', h: '48px'},
          {position: 'top-right'}
        );
        formik.resetForm();

        return setTimeout(() => {
          router.push(nextPage);
        }, 1500);
      },
      onError: err => {
        if (err.response.data.message === 'Business billing plan has expired') {
          return setScreen('disabled');
        }
        return toastForError(err, true, toast);
      },
    }
  );

  const handleInput = file => {
    encodeFileToBase64(file)
      .then(
        res => (
          formik.setFieldValue('avatar', res.replace('data:', '').replace(/^.+,/, '')),
          setAvatar([
            Object.assign(
              {image: res.replace('data:', '').replace(/^.+,/, '')},
              {preview: URL.createObjectURL(file)}
            ),
          ])
        )
      )
      .catch(err => {
        return err;
      });
  };

  const initialValues = {first_name: '', last_name: '', email, password: '', confirmPassword: ''};

  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: values => {
  //     mutation.mutate({...values, email: email});
  //   },
  // });

  const handleScreen = screen => setScreen(screen);

  const displayRoleSignUpScreens = scrn => {
    switch (scrn) {
      case 'teamMembersInfo':
        return (
          <SignUpComponent
            formik={formik}
            handleInput={handleInput}
            avatar={avatar}
            handleScreen={handleScreen}
          />
        );
        break;
      case 'disabled':
        return <DisabledAccount />;
      case 'verifyPhoneNumber':
        return <VerifyPhoneOtp formik={formik} handleScreen={handleScreen} />;

        break;
      case 'confirmPswd&SignUp':
        return (
          <ConfirmPassword
            formik={formik}
            mutation={mutation}
            confirmPwd={confirmPwd}
            setConfirmPwd={setConfirmPwd}
          />
        );

        break;

      default:
        return (
          <SignUpComponent
            formik={formik}
            handleInput={handleInput}
            avatar={avatar}
            handleScreen={handleScreen}
          />
        );
        break;
    }
  };
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    upperCase: false,
    specialCharacter: false,
    number: false,
  });
  const eyeForCnPwd = useDisclosure();
  const eye = useDisclosure();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required('Kindly fill in your First name'),
      last_name: Yup.string().required('Kindly fill in your Last name'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9]).{8,}$/,
          'Password must include at least one uppercase letter, one special character (!+,-/:;<+>?@), and one number'
        ),
      confirmPassword: Yup.string()
        .required('')
        .oneOf([Yup.ref('password'), null], 'Both Password entries must be identical.'),
    }),
    onSubmit: values => {
      const {confirmPassword, ...payload} = values;

      mutation.mutate(payload);
    },
  });

  const handlePasswordChange = event => {
    formik.handleChange(event);
    const name = event.target.name;
    const password = event.target.value;
    formik.touched[name] ? null : formik.setFieldTouched(name, true);

    // Update password validation states
    setPasswordValidations(prev => ({
      ...(name === 'confirmPassword'
        ? {...prev, confirmPassword: password === formik.values.password}
        : {
            minLength: password.length >= 8,
            upperCase: /[A-Z]/.test(password),
            specialCharacter: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
            number: /[0-9]/.test(password),
          }),
    }));
  };
  return (
    <AuthPageLayout>
      {screen !== 'disabled' ? (
        <Stack align="center" spacing={'24px'} w="max-content">
          <Heading
            textAlign="center"
            fontSize="48px"
            fontWeight="600"
            color="#141414"
            fontFamily="Neue Haas Grotesk Display Pro"
          >
            Account Set Up
          </Heading>

          <Stack maxW="400px" w="full" as="form" onSubmit={formik.handleSubmit} spacing="24px">
            <FormControl isInvalid={formik.errors.first_name && formik.touched.first_name}>
              <Input
                w="full"
                type="text"
                variant="auth"
                id="first_name"
                name="first_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="First Name"
              />
              <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.last_name && formik.touched.last_name}>
              <Input
                w="full"
                type="text"
                id="last_name"
                name="last_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                variant="auth"
                placeholder="Last Name"
              />
              <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
            </FormControl>

            <Stack w="full">
              <InputGroup>
                <Input
                  type={eye.isOpen ? 'text.1' : 'password'}
                  variant="auth"
                  id="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={handlePasswordChange}
                  placeholder="Create New Password"
                />
                <InputRightElement h="full" mr="18.667px">
                  <ClosedEyeIcon cursor="pointer" onClick={eye.onToggle} isOpen={eye.isOpen} />
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Stack>
              <FormControl
                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
              >
                <Stack spacing="4px">
                  <InputGroup>
                    <Input
                      type={eyeForCnPwd.isOpen ? 'text.1' : 'password'}
                      variant="auth"
                      id="confirmPassword"
                      name="confirmPassword"
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm New Password"
                    />
                    <InputRightElement
                      cursor="pointer"
                      onClick={eyeForCnPwd.onToggle}
                      h="full"
                      mr="18.667px"
                    >
                      <ClosedEyeIcon
                        cursor="pointer"
                        onClick={eyeForCnPwd.onToggle}
                        isOpen={eyeForCnPwd.isOpen}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage fontSize="12px" fontWeight="400">
                    {formik.touched.confirmPassword && formik.errors.confirmPassword}
                  </FormErrorMessage>
                </Stack>
              </FormControl>
            </Stack>
            <Flex wrap="wrap" gap="12px">
              <HStack
                as={motion.div}
                border="1px solid #e5e5e5"
                borderRadius="24px"
                bg="#f5f5f5"
                w="fit-content"
                px="8px"
                h="33px"
                align="center"
                layout
              >
                {formik.touched.password && passwordValidations.minLength ? (
                  <CheckBlackIcon
                    as={motion.div}
                    animate={{
                      transform: 'scale(0.8)',
                      x: '0px',
                      opacity: '1',
                      transition: {type: 'spring', stiffness: 200, delay: 0.2},
                    }}
                    initial={{transform: 'scale(0.5)', x: '-10px', opacity: '0'}}
                    boxSize="16px"
                  />
                ) : null}
                <Text
                  as={motion.p}
                  fontFamily="Neue Haas Grotesk Display Pro"
                  fontSize="12px"
                  fontWeight="500"
                  lineHeight="16.8px"
                  color={'#292929'}
                  layout
                >
                  At least 8 characters
                </Text>
              </HStack>
              <HStack
                as={motion.div}
                border="1px solid #e5e5e5"
                borderRadius="24px"
                bg="#f5f5f5"
                w="fit-content"
                px="8px"
                h="33px"
                align="center"
                layout
              >
                {formik.touched.password && passwordValidations.upperCase ? (
                  <CheckBlackIcon
                    as={motion.div}
                    animate={{
                      transform: 'scale(0.8)',
                      x: '0px',
                      opacity: '1',
                      transition: {type: 'spring', stiffness: 200, delay: 0.2},
                    }}
                    initial={{transform: 'scale(0.5)', x: '-10px', opacity: '0'}}
                    boxSize="16px"
                  />
                ) : null}
                <Text
                  as={motion.p}
                  fontFamily="Neue Haas Grotesk Display Pro"
                  layout
                  fontSize="12px"
                  fontWeight="500"
                  color={'#292929'}
                >
                  At least 1 upper case letter
                </Text>
              </HStack>
              <HStack
                as={motion.div}
                layout
                border="1px solid #e5e5e5"
                borderRadius="24px"
                bg="#f5f5f5"
                w="fit-content"
                px="8px"
                h="33px"
                align="center"
              >
                {formik.touched.password && passwordValidations.specialCharacter ? (
                  <CheckBlackIcon
                    as={motion.div}
                    animate={{
                      transform: 'scale(0.8)',
                      x: '0px',
                      opacity: '1',
                      transition: {type: 'spring', stiffness: 200, delay: 0.2},
                    }}
                    initial={{transform: 'scale(0.5)', x: '-10px', opacity: '0'}}
                    boxSize="16px"
                  />
                ) : null}
                <Text
                  as={motion.p}
                  fontFamily="Neue Haas Grotesk Display Pro"
                  layout
                  fontSize="12px"
                  fontWeight="500"
                  color={'#292929'}
                >
                  At least 1 special character {'(!+,-/:;<+>?@)'}
                </Text>
              </HStack>
              <HStack
                as={motion.div}
                layout
                border="1px solid #e5e5e5"
                borderRadius="24px"
                bg="#f5f5f5"
                w="fit-content"
                px="8px"
                h="33px"
                align="center"
              >
                {formik.touched.password && passwordValidations.number ? (
                  <CheckBlackIcon
                    as={motion.div}
                    animate={{
                      transform: 'scale(0.8)',
                      x: '0px',
                      opacity: '1',
                      transition: {type: 'spring', stiffness: 200, delay: 0.2},
                    }}
                    initial={{transform: 'scale(0.5)', x: '-10px', opacity: '0'}}
                    boxSize="16px"
                  />
                ) : null}
                <Text
                  as={motion.p}
                  fontFamily="Neue Haas Grotesk Display Pro"
                  layout
                  fontSize="12px"
                  fontWeight="500"
                  color={'#292929'}
                >
                  At least 1 number
                </Text>
              </HStack>
            </Flex>

            <Button
              isDisabled={!formik.isValid}
              isLoading={mutation.isLoading}
              alignSelf="center"
              type="submit"
              variant="filled-radius"
            >
              Create Account
            </Button>
          </Stack>
        </Stack>
      ) : (
        displayRoleSignUpScreens(screen)
      )}
    </AuthPageLayout>
  );
};

export default SignUp;
