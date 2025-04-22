import {Drawer, DrawerContent, DrawerOverlay, useToast} from '@chakra-ui/react';
import React, {useState} from 'react';

import {useMutation} from '@tanstack/react-query';
import {createCustomerEquity} from 'apis/customers';
import {InputAssignmentDetails} from './screens/inputTransferDetails';
import TwoFaVerifcation from '../../transferownership/screens/verify2fa';

const AssignFractionalEquity = ({mainRefetch, unitInfo, drawerDisclosure}) => {
  const [screen, setScreen] = useState('input assignment Details');
  const [customerId, setCustomerId] = useState(null);
  const no_of_fractions_available = unitInfo?.total_fractions;
  // recam72711@alientex.com
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

  const mutationForFractionalEquityAssignment = useMutation(
    formData => {
      return createCustomerEquity(formData);
    },
    {
      onSuccess: async res => {
        await mainRefetch();

        handleClose();
        clearPayload();
        toast({
          title: `Successfully updated`,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        return setScreen('input assignment Details');
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
    setScreen('input assignment Details');
    clearPayload();
    return drawerDisclosure.onClose();
  };

  const submitFractionalEquityForm = () => {
    const payload = {
      customer_id: customerId,
      equities: [
        {
          project_id: unitInfo?.project?.id,
          bundle: {
            id: unitInfo?.id,
            fractions: Number(payloadObj.no_of_fraction),
            price_per_fraction: Number(payloadObj.amount),
          },
        },
      ],
    };

    mutationForFractionalEquityAssignment.mutate(payload);
  };

  const navigateBack = () => {
    setScreen('input assignment Details');

    clearPayload();
  };

  const displayFractionalEquityAssignment = scrn => {
    switch (scrn) {
      case 'input assignment Details':
        return (
          <InputAssignmentDetails
            no_of_fractions_available={no_of_fractions_available}
            payloadObj={payloadObj}
            setCustomerId={setCustomerId}
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
            handleVerify={submitFractionalEquityForm}
            isLoading={mutationForFractionalEquityAssignment.isLoading}
          />
        );

      default:
        return (
          <InputAssignmentDetails
            no_of_fractions_available={no_of_fractions_available}
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
        maxW="402px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
      >
        {displayFractionalEquityAssignment(screen)}
      </DrawerContent>
    </Drawer>
  );
};

export default AssignFractionalEquity;
