import React from 'react';
import {
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
  Link,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';

import ClosedEyeIcon from '@/components/assets/closedEyeIcon';
import CheckBlackIcon from '@/components/assets/check-Icon';
import {motion} from 'framer-motion';
import {validateSpecificFields} from 'utils/validateFormikFields';
import AnimateInput from '@/components/AnimateInput';

const CreatePassword = ({header, mutation, onSubmit, mainFormik}) => {
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    upperCase: false,
    specialCharacter: false,
    number: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const eyeForCnPwd = useDisclosure();
  const eye = useDisclosure();

  const formik = useFormik({
    validateOnChange: formSubmitted,
    validateOnMount: false,
    validateOnBlur: formSubmitted,
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
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
      mainFormik.setFieldValue('password', values.password);

      onSubmit();
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
    <Stack
      as={motion.div}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.1,
        },
      }}
      initial={{opacity: 0}}
      w="full"
      spacing="32px"
      borderRadius="4px"
      maxW="400px"
    >
      <HStack alignSelf="center" spacing="8px">
        <Heading
          textAlign="center"
          fontSize="48px"
          lineHeight="57.6px"
          fontWeight="600"
          color="#191919"
          fontFamily="Neue Haas Grotesk Display Pro"
        >
          {header}
        </Heading>
      </HStack>
      <Stack
        w="full"
        as="form"
        onSubmit={async e => {
          e.preventDefault();

          const isValid = await validateSpecificFields(['password', 'confirmPassword'], formik);

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
          <InputGroup>
            <AnimateInput
              type={eye.isOpen ? 'text' : 'password'}
              variant="auth"
              id="password"
              name="password"
              w="full"
              borderColor={'#E5E5E5'}
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
        <Stack spacing="12px">
          <FormControl isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}>
            <Stack spacing="4px">
              <InputGroup>
                <AnimateInput
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
              fontSize="12px"
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
              fontSize="12px"
              fontWeight="500"
              color={'#292929'}
            >
              At least 1 number
            </Text>
          </HStack>
        </Flex>

        <Button
          alignSelf="center"
          isLoading={mutation?.isLoading}
          type="submit"
          isDisabled={!formik.isValid}
          variant="filled-radius"
        >
          Proceed
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreatePassword;

const PasswordProgressBar = ({passPercent}) => {
  console.log(passPercent);
  return (
    <Box overflow="hidden" w="full" h="11px" borderRadius="12px" bg="#19191933">
      <Box
        bg="#191919"
        transition="0.3s ease-in-out"
        h="full"
        w={`${passPercent}%`}
        borderRadius="12px"
      />
    </Box>
  );
};
