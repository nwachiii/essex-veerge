import React, {useEffect, useState} from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {CallIcon} from '@/components/assets/callIcon';
import {motion} from 'framer-motion';

const inputStyles = {
  fontSize: '35.62px',
  lineHeight: '31.17px',
  color: '#3d3d3d',
  fontWeight: '500',
  border: '1px solid #e5e5e5',
  borderRadius: '11.13px',
  bg: '#fafafa',
  // w: "60px",
  // h: "60px",
  w: '61.22px',

  h: '55.66px',
  textAlign: 'center',
  _focusVisible: {
    outline: 'none',
  },
  _placeholder: {
    color: '#E5E5E5',
  },
};

const DEFAULTIMER = 30;

const AuthEmailVerification = ({
  email,
  mutation,
  header,
  resendOtp,
  subText,
  nextScreen,
  handleVerify,
  ...rest
}) => {
  const [emailOTP, setEmailOTP] = useState('');
  const [shouldCount, setShouldCount] = useState(true);

  const [count, setCount] = useState(30);

  useEffect(() => {
    let timer;

    if (shouldCount) {
      if (count < 1) {
        setShouldCount(false);
        setCount(DEFAULTIMER);
      } else {
        timer = setInterval(() => {
          setCount(prev => prev - 1);
        }, 1000);
      }
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCount, count]);

  const isValid = emailOTP.length === 6;

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
      spacing={'32px'}
      w="full"
      justify="center"
      maxW="480px"
      {...rest}
    >
      <Stack spacing="4px">
        <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
          <Heading
            textAlign={{base: 'start', md: 'center'}}
            fontSize="48px"
            fontWeight="600"
            color="#191919"
            fontFamily="Neue Haas Grotesk Display Pro"
          >
            {header}
          </Heading>
        </HStack>
        <Text
          textAlign={{base: 'start', md: 'center'}}
          fontSize="18px"
          fontWeight="500"
          color="#424242"
          fontFamily="Neue Haas Grotesk Display Pro"
        >
          {subText}
        </Text>
      </Stack>
      <Stack
        w="full"
        as="form"
        align="center"
        onSubmit={e => (
          e.preventDefault(), handleVerify({screen: nextScreen, email_verification_code: emailOTP})
        )}
        spacing="32px"
      >
        <HStack spacing="12.24px">
          <PinInput value={emailOTP} onChange={value => setEmailOTP(value)} placeholder="0">
            <PinInputField {...inputStyles} />
            <PinInputField {...inputStyles} />
            <PinInputField {...inputStyles} />

            <PinInputField {...inputStyles} />
            <PinInputField {...inputStyles} />
            <PinInputField {...inputStyles} />
          </PinInput>
        </HStack>

        <Stack w="full" align="center" spacing="12px">
          <Text
            position={{base: 'fixed', md: 'initial'}}
            bottom="86px"
            left="0px"
            w="full"
            justify="center"
            fontSize="12px"
            color="#606060"
            textAlign="center"
            fontFamily="Neue Haas Grotesk Display Pro"
            fontWeight="500"
          >
            {"Didn't receive an OTP ?"}
            <Box as="br" display={{base: 'initial', md: 'none'}} />
            <Box as="br" display={{base: 'initial', md: 'none'}} />
            <Text
              as="span"
              pos={{base: 'relative', md: 'initial'}}
              top="-10px"
              color={'#606060'}
              cursor={shouldCount ? 'default' : 'pointer'}
              onClick={() => (shouldCount ? null : resendOtp(setShouldCount))}
            >
              {' '}
              {shouldCount ? (
                <>
                  {`resend in `}{' '}
                  <Text as="span" color="#4545fe">
                    {' '}
                    {`0:${count} Sec`}{' '}
                  </Text>
                </>
              ) : (
                `Resend Code `
              )}
            </Text>{' '}
          </Text>
        </Stack>

        <Button
          variant="filled-radius"
          type="submit"
          isDisabled={!isValid}
          isLoading={mutation.isLoading}
        >
          Verify
        </Button>
      </Stack>
    </Stack>
  );
};

export default AuthEmailVerification;
