import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  SlideFade,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {Auth2FA} from 'apis/settings';
import {OTPInput} from 'chakra-otp-input';
import React, {useState} from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';

const TwoFaVerifcation = ({handleScreen, clearPayload, isLoading, submitManualDeposit}) => {
  const toast = useToast();

  const [twoFaOtp, setTwoFaOtp] = useState(null);
  const mutationForVerification = useMutation(
    formData => {
      return Auth2FA(formData);
    },
    {
      onSuccess: res => {
        setTwoFaOtp(null);
      },
      onError: error => {
        toast({
          title: 'Oops ...',
          description: `${
            error?.response?.status === 500
              ? "Apologies for the inconvenience. We're working on it. Please try again later."
              : error?.response?.status === 401
                ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                : (error?.response?.data?.message ??
                  error?.response?.message ??
                  error?.message ??
                  'Something went wrong')
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const handleOtpInput = value => {
    if (value.length === 6) {
      handleVerify(value);
    }
    setTwoFaOtp(value);
  };
  const handleVerify = twoFa => {
    return submitManualDeposit(twoFa);
  };

  const navigateBack = () => {
    const navigate = handleScreen('input transaction info');
    navigate();
    clearPayload();
  };

  return (
    <>
      <HStack
        boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
        mb="10px"
        py="12px"
        bg="#F5F5F5"
        h="49.7px"
        px="23.2px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap={2}>
          <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={navigateBack} />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Update Deposit
          </Text>
        </Flex>
        <HStack spacing="15px">
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton position="initial" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody px="28.9px">
        <Stack spacing="244.6px" w="full" align="center">
          <Stack align="center" spacing="12px">
            <Text fontSize="16px" textAlign="start" w="full" color="#0D0D0D" fontWeight="500">
              Verify it&apos;s you
            </Text>
            <Text
              fontSize="14px"
              alignSelf="start"
              w="349px"
              fontWeight="300"
              textAlign="start"
              color="#3D3D3D"
            >
              We have sent a 6 digit OTP code from your authenticator app. Kindly input to verify
              and continue.
            </Text>
            <OTPInput
              w="full"
              alignSelf="center"
              justifyContent="center"
              mt="12px"
              h="61.224px"
              value={twoFaOtp}
              isDisabled={isLoading}
              type="number"
              noInputs={6}
              bg="#E5E5E5"
              boxShadow="none"
              color="#333"
              fontSize="35.621px"
              fontWeight="300"
              borderRadius="8px"
              onChange={handleOtpInput}
            />
          </Stack>
          {/* <Button
            w="full"
            h="45px"
            borderRadius="9.74px"
            bg="#191919"
            color="#fff"
            fontSize="14.617px"
            fontWeight="400"
            _hover={{
              opacity: '1',
            }}
            isLoading={mutationForVerification.isLoading}
            _focus={{opacity: '1'}}
            _active={{opacity: '1'}}
          >
            Proceed
          </Button> */}
          <SlideFade in={isLoading}>
            <Spinner />
          </SlideFade>
        </Stack>
      </DrawerBody>
    </>
  );
};

export default TwoFaVerifcation;
