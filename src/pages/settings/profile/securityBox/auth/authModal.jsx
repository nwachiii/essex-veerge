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
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Input, Popup2, Select} from '../../../../../ui-lib/ui-lib.components';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Auth2FA, fetchAuthQR} from '../../../../../apis/settings';
import {OTPInput} from 'chakra-otp-input';
import AnimateInput from '../../../../../components/AnimateInput';
import Intro from '../../../../../components/Modals/twofa/screens/intro';
import VerifyEmailScreen from '../../../../../components/Modals/twofa/screens/verifyEmailScreen';
import Otpverification from '../../../../../components/Modals/twofa/screens/otpverification';
import ScanQrcode from '../../../../../components/Modals/twofa/screens/scanQrcode';
import VerifyTwoFa from '../../../../../components/Modals/twofa/screens/verifyTwoFa';

const DEFAULTSCREEN = 'intro';

export const AuthModal = ({refetch, isModalOpen, onModalClose}) => {
  const [screen, setScreen] = useState(DEFAULTSCREEN);

  const [qr, setQr] = useState();

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
            qr={qr}
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
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      // h={"660px"}
      mt="15vh"
      h="fit-content"
    >
      <ModalOverlay />
      <ModalContent borderRadius="16px" p="0" mt="18vh" minW="fit-content">
        {displayTwoFaScreens(screen)}
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
