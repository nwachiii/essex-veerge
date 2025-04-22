import React from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Link,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import {validateSpecificFields} from 'utils/validateFormikFields';

const InputEmailToResetPassword = ({formik, isLoading, setFormSubmitted, handleScreen}) => {
  const isFormValid = !formik.errors.email;
  const router = useRouter();
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
      align="center"
      spacing={'24px'}
      w="max-content"
    >
      <Heading
        textAlign="center"
        fontSize="48px"
        fontWeight="600"
        color="#191919"
        fontFamily="Neue Haas Grotesk Display Pro"
      >
        Forgot password
      </Heading>

      <Stack
        maxW="400px"
        w="full"
        as="form"
        onSubmit={async e => {
          e.preventDefault();
          const isValid = await validateSpecificFields(['email'], formik);

          if (isValid) {
            formik.setErrors({});
            formik.setTouched({});
            setFormSubmitted(false);

            handleScreen({screen: 'email verification'});
          } else {
            setFormSubmitted(true);
          }
        }}
        spacing="24px"
      >
        <FormControl isInvalid={formik.errors.email && formik.touched.email}>
          <Input
            w="full"
            type="email"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="auth"
            placeholder="Email Address"
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={isLoading}
          isDisabled={!isFormValid}
          variant="filled-radius"
          type="submit"
        >
          Proceed
        </Button>

        <Text
          textAlign="center"
          fontFamily="Neue Haas Grotesk Display Pro"
          fontSize="14px"
          fontWeight="500"
          color="#606060"
        >
          Remember your password?
        </Text>
        <Button variant="outline-radius" onClick={() => router.push('/auth/onboarding/login')}>
          Log In!
        </Button>
      </Stack>
    </Stack>
  );
};

export default InputEmailToResetPassword;
