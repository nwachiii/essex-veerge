import React, {useEffect, useState} from 'react';
import {DrawerFooter, DrawerBody, Text, Button, Image, VStack} from '@chakra-ui/react';
import {OTPInput} from 'chakra-otp-input';
import {useMutation} from '@tanstack/react-query';
import {fetchAuthQR} from 'apis/settings';

export const ScanQrcode = ({customScrollbarStyles, handleClose, handleScreen}) => {
  const [qr, setQr] = useState();

  const {mutate: mutateQR, isLoading: isLoadingQR} = useMutation(
    () => {
      return fetchAuthQR();
    },
    {
      onSuccess: res => {
        // setStep(step + 1);
        setQr(res?.data?.message);
      },
    },
    {
      onError: res => {
        console.log('failed');
      },
    }
  );

  useEffect(() => {
    mutateQR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <DrawerBody sx={customScrollbarStyles} mt="24px" px="21px" py="0px">
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
      </DrawerBody>
      <DrawerFooter p="0px" px="29px" mb="26px">
        <Button
          h="55px"
          color="#fff"
          w="full"
          // bg="#4545FE"
          bg="#191919"
          variant="filled-radius"
          // borderRadius="12px"
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
      </DrawerFooter>
    </>
  );
};

export default ScanQrcode;
