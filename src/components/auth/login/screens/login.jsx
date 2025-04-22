import AnimateInput from '@/components/AnimateInput';
import AuthTermsCheck from '@/components/assets/authTermsCheck';
import ClosedEyeIcon from '@/components/assets/closedEyeIcon';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import React from 'react';
import {validateSpecificFields} from 'utils/validateFormikFields';

const Login = ({formik, mutation, setFormSubmitted}) => {
  const eyeForPwd = useDisclosure();
  const {isOpen, onToggle} = useDisclosure();
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
      spacing={'16px'}
      w="max-content"
    >
      <Heading
        textAlign="center"
        fontSize="48px"
        fontWeight="600"
        color="#141414"
        fontFamily="Neue Haas Grotesk Display Pro"
      >
        Login
      </Heading>

      <Stack
        maxW="400px"
        w="full"
        as="form"
        onSubmit={async e => {
          e.preventDefault();
          const isValid = await validateSpecificFields(['email', 'password'], formik);

          if (isValid) {
            formik.setErrors({});
            formik.setTouched({});
            setFormSubmitted(false);

            formik.handleSubmit();
          } else {
            setFormSubmitted(true);
          }
        }}
        spacing="24px"
      >
        <FormControl isInvalid={formik.errors.email && formik.touched.email}>
          <AnimateInput
            w="full"
            type="email"
            required
            id="email"
            name="email"
            borderColor={'#E5E5E5'}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="auth"
            placeholder="Email Address"
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.errors.password && formik.touched.password}>
          <InputGroup>
            <AnimateInput
              type={eyeForPwd.isOpen ? 'text' : 'password'}
              variant="auth"
              required
              w="full"
              id="password"
              name="password"
              borderColor={'#E5E5E5'}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter Password"
            />
            <InputRightElement cursor="pointer" onClick={eyeForPwd.onToggle} h="full" mr="18.667px">
              <ClosedEyeIcon
                cursor="pointer"
                onClick={eyeForPwd.onToggle}
                isOpen={eyeForPwd.isOpen}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <HStack fontFamily="Neue Haas Grotesk Display Pro" w="full" justify="space-between">
          <Flex onClick={onToggle} cursor="pointer" align="center" gap="7px">
            <AuthTermsCheck isOpen={isOpen} />
            <Text fontSize={'14px'} fontWeight="500" lineHeight="16.8px" color="#191919">
              Remember me
            </Text>
          </Flex>
          <Text
            cursor="pointer"
            _hover={{
              textDecor: 'underline',
            }}
            onClick={() => router.push('/auth/forgot_password')}
            fontSize={'14px'}
            fontWeight="500"
            lineHeight="16.8px"
            color="#191919"
          >
            Forgot password?
          </Text>
        </HStack>

        <Button
          isLoading={mutation.isLoading}
          isDisabled={formik.isInvalid}
          variant="filled-radius"
          type="submit"
        >
          Login
        </Button>

        <Text
          textAlign="center"
          fontFamily="Neue Haas Grotesk Display Pro"
          fontSize="14px"
          fontWeight="500"
          color="#606060"
        >
          Oops! Don&apos;t have an account?
        </Text>
        <Button variant="outline-radius" onClick={() => router.push('/auth/onboarding')}>
          Create an account
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
