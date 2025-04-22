import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  useDisclosure,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  DrawerCloseButton,
  DrawerBody,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import passwordIcon from '/src/images/icons/password_icon_settings.svg';
import ClosedEyeIcon from '@/components/assets/closedEyeIcon';
import CheckBlackIcon from '@/components/assets/check-Icon';
import {motion} from 'framer-motion';
import {validateSpecificFields} from 'utils/validateFormikFields';

import {CreateToast, Popup2} from 'ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';

import {updatePassword} from '/src/apis/settings';

import {LiaAngleDownSolid} from 'react-icons/lia';
import {FaArrowLeft} from 'react-icons/fa';
import {FaArrowLeftLong} from 'react-icons/fa6';

export const ChangePassword = ({isModalOpen, onModalClose}) => {
  const toaster = CreateToast();
  const toast = useToast();
  const passwordDisclosure = useDisclosure();

  const mutation = useMutation(
    formData => {
      return updatePassword(formData);
    },
    {
      onSuccess: res => {
        formik.resetForm();
        passwordDisclosure.onClose();

        toaster('Password Updated Successfully');
      },
      onError: err => {
        console.log(err);
        toast({
          title: 'Oops',
          description:
            err?.response?.status === 500
              ? "Apologies for the inconvenience. We're working on it. Please try again later."
              : err?.response?.status === 401
                ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                : (err?.response?.data?.message ??
                  err?.response?.message ??
                  err?.message ??
                  'Something went wrong'),
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });

        if (err?.response?.data?.message === 'Incorrect password') {
          formik.setFieldValue('old_password', '');
        }
        // onModalClose();
      },
    }
  );

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    upperCase: false,
    specialCharacter: false,
    number: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const eyeForCnPwd = useDisclosure();
  const eye = useDisclosure();
  const eyeForOldPwd = useDisclosure();

  const formik = useFormik({
    validateOnChange: formSubmitted,
    validateOnMount: false,
    validateOnBlur: formSubmitted,
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required("This field can't be empty"),
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
      mutation.mutate({
        password: values.password,
        old_password: values.oldPassword,
      });
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
    <>
      <HStack justify="space-between" onClick={passwordDisclosure.onOpen} role="button">
        <HStack spacing="12px">
          <Image src={passwordIcon.src} alt="password icon" fontSize="9px" />
          <Text fontSize="14px" fontWeight="400" lineHeight="17.75px" color="#191919">
            Change password
          </Text>
        </HStack>
        <Icon color="#cbcbcb" as={LiaAngleDownSolid} transform="rotate(-90deg)" />
      </HStack>
      <Drawer
        isOpen={passwordDisclosure.isOpen}
        onClose={() => {
          formik.resetForm();
          passwordDisclosure.onClose();
        }}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent pt="67px">
          <HStack
            boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
            mb="10px"
            py="12px"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
            width="full"
            bg="#F5F5F5"
          >
            <HStack onClick={passwordDisclosure.onClose} role="button" spacing="8px">
              <Icon as={FaArrowLeft} />
              <Text textTransform={'capitalize'} fontSize="18px" fontWeight={600} color="#191919">
                Change password
              </Text>
            </HStack>
          </HStack>
          <DrawerBody>
            <Stack
              w="full"
              as="form"
              onSubmit={async e => {
                e.preventDefault();

                const isValid = await validateSpecificFields(
                  ['password', 'confirmPassword'],
                  formik
                );

                if (isValid) {
                  formik.setErrors({});
                  formik.setTouched({});
                  setFormSubmitted(false);

                  formik.handleSubmit();
                } else {
                  setFormSubmitted(true);
                }
              }}
              spacing="32px"
            >
              <Stack w="full" spacing={{base: '8px', md: '20px'}}>
                {/* <InputGroup> */}
                <Input
                  type={eye.isOpen ? 'text' : 'password'}
                  variant="auth"
                  id="oldPassword"
                  name="oldPassword"
                  w="full"
                  borderColor={'#E5E5E5'}
                  onBlur={formik.handleBlur}
                  value={formik.values.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Current Password"
                />
                {/* <InputRightElement h="full" mr="18.667px">
                    <ClosedEyeIcon cursor="pointer" onClick={eyeForOldPwd.onToggle} isOpen={eyeForOldPwd.isOpen} />
                  </InputRightElement>
                </InputGroup> */}
              </Stack>
              <Stack w="full" spacing={{base: '8px', md: '20px'}}>
                <InputGroup>
                  <Input
                    type={eye.isOpen ? 'text' : 'password'}
                    variant="auth"
                    id="password"
                    name="password"
                    w="full"
                    borderColor={'#E5E5E5'}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                  />
                  <InputRightElement h="full" mr="18.667px">
                    <ClosedEyeIcon cursor="pointer" onClick={eye.onToggle} isOpen={eye.isOpen} />
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack spacing="12px">
                <FormControl
                  isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                >
                  <Stack spacing="4px">
                    <InputGroup>
                      <Input
                        type={eyeForCnPwd.isOpen ? 'text' : 'password'}
                        variant="auth"
                        w="full"
                        id="confirmPassword"
                        name="confirmPassword"
                        borderColor={'#E5E5E5'}
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
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          delay: 0.2,
                        },
                      }}
                      initial={{
                        transform: 'scale(0.5)',
                        x: '-10px',
                        opacity: '0',
                      }}
                      boxSize="16px"
                    />
                  ) : null}
                  <Text
                    as={motion.p}
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily="Neue Haas Grotesk Display Pro"
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
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          delay: 0.2,
                        },
                      }}
                      initial={{
                        transform: 'scale(0.5)',
                        x: '-10px',
                        opacity: '0',
                      }}
                      boxSize="16px"
                    />
                  ) : null}
                  <Text
                    as={motion.p}
                    fontFamily="Neue Haas Grotesk Display Pro"
                    lineHeight="16.8px"
                    layout
                    fontSize="14px"
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
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          delay: 0.2,
                        },
                      }}
                      initial={{
                        transform: 'scale(0.5)',
                        x: '-10px',
                        opacity: '0',
                      }}
                      boxSize="16px"
                    />
                  ) : null}
                  <Text
                    as={motion.p}
                    fontFamily="Neue Haas Grotesk Display Pro"
                    lineHeight="16.8px"
                    layout
                    fontSize="14px"
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
                        transition: {
                          type: 'spring',
                          stiffness: 200,
                          delay: 0.2,
                        },
                      }}
                      initial={{
                        transform: 'scale(0.5)',
                        x: '-10px',
                        opacity: '0',
                      }}
                      boxSize="16px"
                    />
                  ) : null}
                  <Text
                    as={motion.p}
                    fontFamily="Neue Haas Grotesk Display Pro"
                    lineHeight="16.8px"
                    layout
                    fontSize="14px"
                    fontWeight="500"
                    color={'#292929'}
                  >
                    At least 1 number
                  </Text>
                </HStack>
              </Flex>

              <Button
                alignSelf="center"
                mt="40px"
                isLoading={mutation?.isLoading}
                type="submit"
                isDisabled={!formik.isValid}
                variant="filled-radius"
              >
                Proceed
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default ChangePassword;
