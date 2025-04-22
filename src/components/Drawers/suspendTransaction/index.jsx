import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {MdBlock} from 'react-icons/md';
import {useMutation} from '@tanstack/react-query';
import {suspendTransaction} from 'apis/customers';
import TwoFaVerifcation from '../transferownership/screens/verify2fa';
import {SuspendTransactionDecisionConfirmation} from './screens/SuspendTransactionDecisionConfirmation';
import {useState} from 'react';

export const SuspendDrawer = ({
  equity_id,
  mainRefetch,
  equityRefetch,
  isSuspended,
  leadDrawerHandleClose,
  suspendDisclosure,
}) => {
  const defaultScreen = isSuspended ? '2fa' : 'confirm request';
  const toast = useToast();
  const [screen, setScreen] = useState(defaultScreen);
  const handleProceed = () => {
    const payload = {
      equity_id,
    };
    mutate(payload);
  };

  const {mutate, isLoading} = useMutation(
    values => {
      return suspendTransaction(values);
    },
    {
      onSuccess: async res => {
        await mainRefetch();
        await equityRefetch();
        leadDrawerHandleClose();
        toast({
          title: `Transaction ${isSuspended ? 'reactivated' : 'suspended'} successfully`,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: error => {
        return toast({
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

  const displaySuspendTransactionScreens = scrn => {
    switch (scrn) {
      case 'confirm request':
        return (
          <SuspendTransactionDecisionConfirmation
            handleScreen={handleScreen}
            suspendDisclosure={suspendDisclosure}
          />
        );

      case '2fa':
        return (
          <TwoFaVerifcation
            navigateBack={handleScreen('confirm request')}
            header={isSuspended ? 'Reactivate Transaction' : 'Suspend'}
            handleVerify={handleProceed}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <SuspendTransactionDecisionConfirmation
            handleScreen={handleScreen}
            suspendDisclosure={suspendDisclosure}
          />
        );
    }
  };

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  return (
    <Drawer isOpen={suspendDisclosure?.isOpen} onClose={suspendDisclosure?.onClose}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent mt="65px" maxW="450px" bg="#fff" py="15.23px" pt="0px">
        {displaySuspendTransactionScreens(screen)}
      </DrawerContent>
    </Drawer>
  );
};
