import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {
  Button,
  ChakraProvider,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Stack,
  Text,
  extendTheme,
  useDisclosure,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

const customTheme = extendTheme({
  colors: {
    customScheme: {
      500: '#191919',
    },
  },
});

const ConfirmPassword = ({formik, mutation, confirmPwd, setConfirmPwd}) => {
  const pswrdDisclosure = useDisclosure();
  //   const confirmpswrdDisclosure = useDisclosure();
  const [score, setScore] = useState('');

  const isFieldValid =
    confirmPwd.trim() &&
    formik?.values?.password.trim() &&
    formik?.values?.password === confirmPwd &&
    score >= 2;

  const sx = {
    '&:-webkit-autofill': {
      ' -webkit-background-clip': 'text',
      '-webkit-text-fill-color': '#ffffff',
      transition: 'background-color 5000s ease-in-out 0s',
      'box-shadow': 'inset 0 0 20px 20px #1A1A1A',
    },
    '&:-webkit-autofill:hover': {
      ' -webkit-background-clip': 'text',
      '-webkit-text-fill-color': '#ffffff',
      transition: 'background-color 5000s ease-in-out 0s',
      'box-shadow': 'inset 0 0 20px 20px #1A1A1A',
    },
    '&:-webkit-autofill:focus': {
      ' -webkit-background-clip': 'text',
      '-webkit-text-fill-color': '#ffffff',
      transition: 'background-color 5000s ease-in-out 0s',
      'box-shadow': 'inset 0 0 20px 20px #1A1A1A',
    },
    '&:-webkit-autofill:active': {
      ' -webkit-background-clip': 'text',
      '-webkit-text-fill-color': '#ffffff',
      transition: 'background-color 5000s ease-in-out 0s',
      'box-shadow': 'inset 0 0 20px 20px #1A1A1A',
    },
  };

  const inputStyles = {
    border: '1px solid #3F3F3F',
    bg: '#1A1A1A',
    h: '50px',
    color: '#ffffff',
    _placeholder: {color: '#919191'},
    _focus: {
      boxShadow: 'none',
      borderColor: '#CBD5E0',
    },
    _focusVisible: {
      boxShadow: 'none',
      borderColor: '#CBD5E0',
    },
    sx,
  };
  return (
    <Stack
      as="form"
      p="23px 30px 39.68px 31px"
      w="451px"
      spacing="48px"
      borderRadius="16px"
      bg="#303030"
      onSubmit={formik.handleSubmit}
    >
      <Heading fontSize="32px" fontWeight="600" color="#ffffff">
        Password setup
      </Heading>
      <Stack spacing={-3}>
        <InputGroup>
          <Input
            name="password"
            id="password"
            value={formik?.values?.password}
            onChange={formik?.handleChange}
            placeholder="Create password"
            {...inputStyles}
            type={pswrdDisclosure.isOpen ? 'text' : 'password'}
          />
        </InputGroup>
      </Stack>
      <Stack spacing={-3}>
        <InputGroup>
          <Input
            id="confirmPwd"
            name="confirmPwd"
            value={confirmPwd}
            onChange={e => setConfirmPwd(e.target.value)}
            placeholder="Confirm password"
            {...inputStyles}
            type={pswrdDisclosure.isOpen ? 'text' : 'password'}
          />
          <InputRightElement
            h="full"
            cursor="pointer"
            color={'#FFFFFF'}
            onClick={pswrdDisclosure.onToggle}
          >
            {pswrdDisclosure.isOpen ? <ViewIcon boxSize="20px" /> : <ViewOffIcon boxSize="20px" />}
          </InputRightElement>
        </InputGroup>
        {confirmPwd !== '' && formik?.values?.password !== confirmPwd && (
          <Text align="left" fontSize="12px" fontWeight="400" color="red.500">
            The passwords you provided do not match.
          </Text>
        )}
      </Stack>
      <Stack spacing="7px" position="relative">
        <HStack visibility="hidden" position="absolute">
          <PasswordStrengthBar onChangeScore={setScore} password={formik?.values?.password} />
        </HStack>
        <ChakraProvider theme={customTheme}>
          <Progress
            value={score * 25}
            borderRadius="12px"
            bg="#F5F5F5"
            p="2px"
            colorScheme={'customScheme'}
          />
        </ChakraProvider>
        <Text fontSize="12px" color="#ffffff" fontWeight="400" align="left">
          Password strength
        </Text>
      </Stack>
      <HStack w="full">
        <Button
          w="full"
          h="54px"
          py="16px"
          borderRadius="12px"
          isDisabled={!isFieldValid}
          color="#191919"
          fontSize="18px"
          fontWeight="400"
          isLoading={mutation.isLoading}
          type="submit"
        >
          Create Account
        </Button>
      </HStack>
    </Stack>
  );
};

export default ConfirmPassword;
