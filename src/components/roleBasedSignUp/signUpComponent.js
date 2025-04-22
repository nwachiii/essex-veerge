import React from 'react';
import {
  Box,
  Checkbox,
  InputGroup,
  useToast,
  InputRightElement,
  Stack,
  SimpleGrid,
  Text,
  Center,
  Flex,
  Select,
  VStack,
  Heading,
  HStack,
  Button,
  Input,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';

import SignProfilePicture from 'pages/auth/role-signup/SignProfilePicture';
import PasswordStrengthBar from 'react-password-strength-bar';
import {PhoneNumberInput} from 'ui-lib/ui-lib.components/NumberInput';

export const SignUpComponent = ({formik, handleInput, avatar, handleScreen}) => {
  const isFieldValid =
    !!formik?.values?.first_name?.trim() &&
    !!formik?.values?.last_name?.trim() &&
    !!formik?.values?.number;

  const handlePhone = val => {
    function extractNumbers(inputString) {
      const result = inputString.replace(/\D/g, '');
      return result;
    }

    const phonenumber = extractNumbers(val.target.value);

    formik.setFieldValue('number', phonenumber);
  };

  const handleCountrySelection = val => {
    formik.setFieldValue('country', val.target.value);
  };

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
    placeholder: 'Enter your mobile number',
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
  const textStyle = {
    color: '#919191',
    pl: '17px',
  };
  const selectStyles = {
    w: '90px',
  };
  return (
    <Stack
      as="form"
      p="36px 30px"
      spacing="48px"
      borderRadius="16px"
      w="452px"
      bg="#303030"
      onSubmit={() => handleScreen('verifyPhoneNumber')}
    >
      <Stack spacing="12px" w="full">
        <Heading fontSize="32px" color="#FFFFFF" fontWeight="600">
          Welcome Onboard
        </Heading>
        <Text fontWeight="400" color="#FFFFFF" fontSize="14px">
          Kindly set up your profile.
        </Text>
      </Stack>
      <Stack spacing="28px">
        <SignProfilePicture handleInput={handleInput} file={avatar} />

        <Input
          required
          type="text"
          id="first_name"
          name="first_name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          {...inputStyles}
          px="17px"
          placeholder="First Name"
        />
        <Input
          required
          type="text"
          id="last_name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
          {...inputStyles}
          px="17px"
          placeholder="Last Name"
          name="last_name"
        />

        <PhoneNumberInput
          countryId={formik.values.country}
          countrySelectHandleChange={handleCountrySelection}
          inputOnchange={handlePhone}
          inputValue={formik.values.number}
          inputStyles={{...inputStyles, pl: '90px'}}
          textStyle={textStyle}
          selectStyles={selectStyles}
        />
      </Stack>
      <HStack w="full">
        <Button
          w="full"
          h="54px"
          py="16px"
          borderRadius="72px"
          isDisabled={!isFieldValid}
          color="#191919"
          fontSize="18px"
          fontWeight="400"
          type="submit"
        >
          Proceed
        </Button>
      </HStack>
    </Stack>
  );
};

export default SignUpComponent;
