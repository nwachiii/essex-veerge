import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import historyIcon from '/src/images/icons/historyIcon.svg';
import InputTransactionInfo from './screens/inputTransactionInfo';
import TwoFaVerifcation from './screens/twoFaVerifcation';
import UpdateDepositHistory from './screens/updateDepositHistory';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchManualDepositTransactions, updateDeposit} from 'apis/customers';

const UpdateDeposit = ({drawerDisclosure, mainRefetch, equityId}) => {
  const [screen, setScreen] = useState('input transaction info');

  const [payloadObj, setPayLoadObj] = useState({
    amount: '',
    depositDate: '',
    doc: '',
  });

  const toast = useToast();

  const clearPayload = () => {
    return setPayLoadObj({
      amount: '',
      depositDate: '',
      doc: '',
    });
  };

  const {data, isError, error, isLoading, refetch} = useQuery(
    ['manual deposit history', equityId],
    async () => await fetchManualDepositTransactions(equityId),
    {
      enabled: !!equityId,
    }
  );

  const manualTransactions = data?.data?.data;

  const mutationForManualDeposit = useMutation(
    formData => {
      return updateDeposit(formData);
    },
    {
      onSuccess: res => {
        mainRefetch();
        refetch();
        clearPayload();
        toast({
          title: `Payment Updated successfully`,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });

        setScreen('input transaction info');
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
    setScreen('input transaction info');
    clearPayload();
    return drawerDisclosure.onClose();
  };

  const submitManualDeposit = twoFa => {
    mutationForManualDeposit.mutate({
      equity: equityId,
      amount: payloadObj?.amount,
      date_paid: payloadObj?.depositDate,
      doc: payloadObj?.doc,
      code: Number(twoFa),
    });
  };

  const displayUpdateDepositScreens = scrn => {
    switch (scrn) {
      case 'input transaction info':
        return (
          <InputTransactionInfo
            payloadObj={payloadObj}
            handleClose={handleClose}
            handleScreen={handleScreen}
            setPayLoadObj={setPayLoadObj}
            manualTransactions={manualTransactions}
          />
        );
      case '2fa':
        return (
          <TwoFaVerifcation
            handleClose={handleClose}
            clearPayload={clearPayload}
            handleScreen={handleScreen}
            submitManualDeposit={submitManualDeposit}
            isLoading={mutationForManualDeposit.isLoading}
          />
        );
      case 'update deposit history':
        return (
          <UpdateDepositHistory
            error={error}
            isError={isError}
            isLoading={isLoading}
            handleScreen={handleScreen}
            manualTransactions={manualTransactions}
          />
        );
      default:
        return (
          <InputTransactionInfo
            payloadObj={payloadObj}
            handleClose={handleClose}
            handleScreen={handleScreen}
            setPayLoadObj={setPayLoadObj}
            manualTransactions={manualTransactions}
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

export default UpdateDeposit;
