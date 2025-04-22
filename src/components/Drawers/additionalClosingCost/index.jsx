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
import {additionalClosingCost, suspendTransaction} from 'apis/customers';
import TwoFaVerifcation from '../transferownership/screens/verify2fa';

import {useState} from 'react';
import {InputClosingCost} from './screens/inputClosingCost';

export const AdditionalClosingCostDrawer = ({
  equity_id,
  mainRefetch,
  leadDrawerHandleClose,
  addClosingCostDisclosure,
}) => {
  const toast = useToast();
  const [screen, setScreen] = useState('input closing cost');
  const [values, setValues] = useState({name: '', amount: 0, extra_reason: ''});

  const handleProceed = () => {
    const payload = {equity: equity_id, closing_costs: [values]};
    mutate(payload);
  };

  const {mutate, isLoading} = useMutation(
    values => {
      return additionalClosingCost(values);
    },
    {
      onSuccess: async res => {
        await mainRefetch();
        leadDrawerHandleClose();
        toast({
          title: `Closing cost added successfully`,
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

  const handleClose = () => {
    setValues({
      name: '',
      amount: 0,
      extra_reason: '',
    });
    setScreen('input closing cost');
    addClosingCostDisclosure.onClose();
  };

  const displayAddClosingCostScreen = scrn => {
    switch (scrn) {
      case 'input closing cost':
        return (
          <InputClosingCost
            setValues={setValues}
            navigateBack={handleClose}
            values={values}
            handleScreen={handleScreen}
            addClosingCostDisclosure={addClosingCostDisclosure}
          />
        );

      case '2fa':
        return (
          <TwoFaVerifcation
            navigateBack={handleScreen('input closing cost')}
            header="Additional Closing Cost"
            handleVerify={handleProceed}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <InputClosingCost
            setValues={setValues}
            navigateBack={handleClose}
            values={values}
            handleScreen={handleScreen}
            addClosingCostDisclosure={addClosingCostDisclosure}
          />
        );
    }
  };

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  return (
    <Drawer isOpen={addClosingCostDisclosure?.isOpen} onClose={handleClose}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent mt="65px" maxW="450px" bg="#fff" py="15.23px" pt="0px">
        {displayAddClosingCostScreen(screen)}
      </DrawerContent>
    </Drawer>
  );
};
