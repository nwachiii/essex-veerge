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
import AuthTermsCheck from '@/components/assets/authTermsCheck';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import {validateSpecificFields} from 'utils/validateFormikFields';
import AnimateInput from '@/components/AnimateInput';

const PersonalInfo = ({handleScreen, setFormSubmitted, isLoading, formik}) => {
  const {onToggle, isOpen} = useDisclosure();

  const router = useRouter();

  // const validateAndProceed = async fields => {
  //   await Promise.all(fields.map(field => formik.validateField(field)));

  //   // Delay to ensure `formik.errors` updates
  //   let isValid;
  //   setTimeout(() => {
  //     const hasErrors = fields.some(field => !!formik.errors[field]);

  //     if (hasErrors) {
  //       console.log('Validation failed:', formik.errors);
  //        (isValid = false);
  //     } else {
  //       console.log('All fields are valid!');
  //       // Proceed with your logic
  //        (isValid = true);
  //     }
  //   }, 0);
  //   return isValid;
  // };

  const isFormValid =
    !formik.errors.first_name && !formik.errors.last_name && !formik.errors.email && isOpen;
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
        color="#141414"
        fontFamily="Neue Haas Grotesk Display Pro"
      >
        Tell us about yourself
      </Heading>

      <Stack
        maxW="400px"
        w="full"
        as="form"
        onSubmit={async e => {
          e.preventDefault();

          const isValid = await validateSpecificFields(
            ['email', 'first_name', 'last_name'],
            formik
          );

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
        <FormControl isInvalid={formik.errors.first_name && formik.touched.first_name}>
          <AnimateInput
            w="full"
            type="text"
            variant="auth"
            id="first_name"
            name="first_name"
            borderColor={'#E5E5E5'}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="First Name"
          />
          <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.errors.last_name && formik.touched.last_name}>
          <AnimateInput
            w="full"
            type="text"
            id="last_name"
            name="last_name"
            borderColor={'#E5E5E5'}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="auth"
            placeholder="Last Name"
          />
          <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.errors.email && formik.touched.email}>
          <AnimateInput
            w="full"
            type="email"
            id="email"
            name="email"
            borderColor={'#E5E5E5'}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="auth"
            placeholder="Email Address"
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <HStack align="start" w="full" justify="space-between">
          <AuthTermsCheck onToggle={onToggle} isOpen={isOpen} />

          <Text
            fontFamily="Neue Haas Grotesk Display Pro"
            w="full"
            fontSize={'14px'}
            fontWeight="500"
            color="#3d3d3d"
          >
            By creating an account you agree to accept our{' '}
            <Link
              textDecor="underline"
              color="#3d3d3d"
              href="https://veerge-support.myxellia.io/privacy"
              isExternal
              display="inline-block"
            >
              privacy-policy
            </Link>{' '}
            <Text color="#3d3d3d" as="span">
              &
            </Text>{' '}
            <Link
              textDecor="underline"
              color="#3d3d3d"
              href="https://veerge-support.myxellia.io/terms"
              isExternal
              display="inline-block"
            >
              terms of use
            </Link>
          </Text>
        </HStack>

        <Button
          isLoading={isLoading}
          isDisabled={!isFormValid}
          variant="filled-radius"
          type="submit"
        >
          Proceed
        </Button>

        <Text
          fontFamily="Neue Haas Grotesk Display Pro"
          textAlign="center"
          lineHeight="16.8px"
          fontSize="14px"
          fontWeight="500"
          color="#3d3d3d"
        >
          Already have an account?
        </Text>
        <Button variant="outline-radius" onClick={() => router.push('/account')}>
          Log In!
        </Button>
      </Stack>
    </Stack>
  );
};

export default PersonalInfo;
