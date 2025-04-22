import React, {useEffect, useState} from 'react';
import {
  FormControl,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Image,
  useToast,
  Flex,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  HStack,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Input, Popup2, Select} from 'ui-lib/ui-lib.components';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Auth2FA, fetchAuthQR} from '/src/apis/settings';
import {OTPInput} from 'chakra-otp-input';
import AnimateInput from '@/components/AnimateInput';
import Intro from './drawers/twofa/screens/intro';
import VerifyEmailScreen from './drawers/twofa/screens/verifyEmailScreen';
import Otpverification from './drawers/twofa/screens/otpverification';
import ScanQrcode from './drawers/twofa/screens/scanQrcode';
import VerifyTwoFa from './drawers/twofa/screens/verifyTwoFa';

// const DEFAULTSCREEN = 'scanqrcode';
const DEFAULTSCREEN = 'intro';

export const AuthModal = ({refetch, isModalOpen, onModalClose}) => {
  const [screen, setScreen] = useState(DEFAULTSCREEN);

  const toast = useToast();

  const handleClose = () => {
    setScreen(DEFAULTSCREEN);
    return onModalClose();
  };

  const handleScreen = screen => () => {
    return setScreen(screen);
  };
  const handed = screen => () => {
    return console.log(screen);
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const [shouldFetch, setShouldFetch] = useState(false);
  // const [shouldFetch, setShouldFetch] = useState(false);
  // const [shouldFetch, setShouldFetch] = useState(false);

  const displayTwoFaScreens = key => {
    switch (key) {
      case 'intro':
        return (
          <Intro
            handleClose={handleClose}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );
        break;
      case 'emailotp':
        return (
          <VerifyEmailScreen
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            handleClose={handleClose}
          />
        );
        break;
      // case 'phoneotp':
      //   return (
      //     <Otpverification
      //       customScrollbarStyles={customScrollbarStyles}
      //       handleClose={handleClose}
      //       handleScreen={setScreen}
      //     />
      //   );
      //   break;
      case 'scanqrcode':
        return (
          <ScanQrcode
            handleClose={handleClose}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );
        break;
      case 'verifyauthcode':
        return (
          <VerifyTwoFa
            handleClose={handleClose}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            refetch={refetch}
          />
        );
        break;

      default:
        return <Intro customScrollbarStyles={customScrollbarStyles} handleScreen={handleScreen} />;

        break;
    }
  };

  return (
    <Drawer isOpen={isModalOpen} onClose={handleClose} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent minW="400px" maxW="400px" w="400px" pt="67px">
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          bg="#F5F5F5"
          minW="400px"
          w="400px"
        >
          <HStack spacing="8px">
            <Text textTransform={'capitalize'} fontSize="20px" fontWeight={600} color="#191919">
              {/* {screen || 'Enable 2-Factor Authentication'} */}
              2-Factor Authenticator
            </Text>
          </HStack>
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
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        {displayTwoFaScreens(screen)}
      </DrawerContent>
    </Drawer>
  );
};
export default AuthModal;
