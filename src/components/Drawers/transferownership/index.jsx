import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {InputTransferDetails} from './screens/inputTransferDetails';

import {useMutation, useQuery} from '@tanstack/react-query';
import {
  fetchCustomerFractionalInfo,
  transferFractionalOwnership,
  updateDeposit,
} from 'apis/customers';
import TwoFaVerifcation from './screens/verify2fa';

const TransFerOwnershipDrawer = ({
  customerInfo,
  leadDrawerHandleClose,
  equityId,
  mainRefetch,
  drawerDisclosure,
}) => {
  const [screen, setScreen] = useState('input transfer Details');
  const customerEmail = customerInfo?.email;

  const [payloadObj, setPayLoadObj] = useState({
    amount: '',
    no_of_fraction: '',
    email: '',
  });

  const toast = useToast();

  const clearPayload = () => {
    return setPayLoadObj({
      amount: '',
      no_of_fraction: '',
      email: '',
    });
  };

  const customerFractionalInfo = useQuery(
    ['customer fractional info', customerEmail],
    () => fetchCustomerFractionalInfo(equityId, customerEmail),
    {enabled: drawerDisclosure.isOpen}
  );

  const no_of_paid_fraction = customerFractionalInfo?.data?.data?.total_fractional_owned;

  const mutationForFractionalTransferOfOwnership = useMutation(
    formData => {
      return transferFractionalOwnership(formData);
    },
    {
      onSuccess: async res => {
        await mainRefetch();
        leadDrawerHandleClose();
        handleClose();
        clearPayload();
        // toast({
        //   title: `Equity transferred successfully`,
        //   status: 'success',
        //   duration: 8000,
        //   isClosable: true,
        //   position: 'top-right',
        // });

        return setScreen('input transfer Details');
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

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };
  const handleClose = () => {
    setScreen('input transfer Details');
    clearPayload();
    return drawerDisclosure.onClose();
  };

  const submitManualDeposit = () => {
    mutationForFractionalTransferOfOwnership.mutate({
      equity_id: equityId,
      new_owner_email: payloadObj.email,
      current_owner_mail: customerEmail,
      price_per_fraction: payloadObj.amount,
      fractions_to_transfer: payloadObj.no_of_fraction,
    });
  };

  const navigateBack = () => {
    setScreen('input transfer Details');

    clearPayload();
  };

  const displayUpdateDepositScreens = scrn => {
    switch (scrn) {
      case 'input transfer Details':
        return (
          <InputTransferDetails
            no_of_paid_fraction={no_of_paid_fraction}
            payloadObj={payloadObj}
            handleClose={handleClose}
            handleScreen={handleScreen}
            setPayLoadObj={setPayLoadObj}
          />
        );
      case '2fa':
        return (
          <TwoFaVerifcation
            navigateBack={navigateBack}
            header="2FA"
            handleVerify={submitManualDeposit}
            isLoading={mutationForFractionalTransferOfOwnership.isLoading}
          />
        );

      default:
        return (
          <InputTransferDetails
            no_of_paid_fraction={no_of_paid_fraction}
            payloadObj={payloadObj}
            handleClose={handleClose}
            handleScreen={handleScreen}
            setPayLoadObj={setPayLoadObj}
          />
        );
    }
  };
  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />

      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
      >
        {displayUpdateDepositScreens(screen)}
      </DrawerContent>
    </Drawer>
  );
};

export default TransFerOwnershipDrawer;
