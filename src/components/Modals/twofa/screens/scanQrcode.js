import React from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  Stack,
} from '@chakra-ui/react';
import {OTPInput} from 'chakra-otp-input';

export const ScanQrcode = ({qr, customScrollbarStyles, handleClose, handleScreen}) => {
  return (
    <>
      <HStack mt="26px" justify="space-between" px="21px" align="center" position="relative">
        <Heading fontWeight="600" fontSize="24px" color="#191919">
          Two factor authentication
        </Heading>
        <ModalCloseButton onClick={handleClose} position="initial" />
      </HStack>
      <ModalBody sx={customScrollbarStyles} mt="24px" w="467px" px="21px" py="0px">
        <VStack gap={'12px'} w={'100%'}>
          <Text
            fontWeight={'300'}
            fontSize={'14px'}
            lineHeight={'18px'}
            color={'#3D3D3D'}
            alignSelf={'start'}
          >
            1. Install Google or Microsoft Authenticator app on your mobile device.
          </Text>
          <Text
            fontWeight={'300'}
            fontSize={'14px'}
            lineHeight={'18px'}
            color={'#3D3D3D'}
            alignSelf={'start'}
          >
            2. In the app select <b>Set up account</b>.
          </Text>
          <Text
            fontWeight={'300'}
            fontSize={'14px'}
            lineHeight={'18px'}
            color={'#3D3D3D'}
            alignSelf={'start'}
          >
            3. Choose Scan a <b>QR code</b>.
          </Text>

          <Image alt="" src={qr} boxSize={'240px'} />
        </VStack>
        {/* <Button w="350px" alignSelf="strech" variant="dark" onClick={() => setStep(step + 1)}>
          Proceed
        </Button> */}
      </ModalBody>
      <ModalFooter p="0px" px="29px" mb="26px">
        <Button
          h="55px"
          color="#fff"
          w="full"
          bg="#4545FE"
          borderRadius="12px"
          fontSize="18px"
          fontWeight="400"
          _hover={{
            opacity: 1,
          }}
          _active={{
            opacity: 1,
          }}
          onClick={handleScreen('verifyauthcode')}
        >
          Verify
        </Button>
      </ModalFooter>
    </>
  );
};

export default ScanQrcode;
