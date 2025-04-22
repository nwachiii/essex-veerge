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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {MdBlock} from 'react-icons/md';
import {TerminateTabs} from './TerminateTabs';
import {
  fetchCustomersFractionalTxns,
  terminateFractionalTransaction,
  terminateTransaction,
} from 'apis/customers';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {InputRefundAmount} from './screens/inputRefundAmount';
import TwoFaVerifcation from '../transferownership/screens/verify2fa';
import {DecisionConfirmation} from './screens/decisionConfirmation';
import SelectFractionalTransactionToBeTerminated from './screens/selectFractionalTransactionToBeTerminated';

export const TerminateDrawer = ({
  equity_id,
  isFractional,
  mainRefetch,
  userId,
  leadDrawerHandleClose,
  terminateDrawerDisclosure,
}) => {
  const terminateTabs = useDisclosure();
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(null);
  const [screen, setScreen] = useState('');

  const handleProceed = () => {
    const payload = {
      equity_id,
      // amount,
    };
    const fractionalPayload = {
      fractional_purchase_id: id,
    };

    mutate(isFractional ? fractionalPayload : payload);
  };

  const {mutate, isLoading} = useMutation(
    values => {
      return isFractional ? terminateFractionalTransaction(values) : terminateTransaction(values);
    },
    {
      onSuccess: async res => {
        await mainRefetch();
        leadDrawerHandleClose();
        toast({
          title: `Transaction terminated successfully`,
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

  const FRACTIONALTXN = useQuery(
    ['fractional-transaction-details', equity_id, userId],
    async () => await fetchCustomersFractionalTxns(equity_id, userId),
    {
      enabled: terminateDrawerDisclosure.isOpen,
    }
  );

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };
  const handleClose = () => {
    setAmount('');
    setScreen('confirm request');
    terminateDrawerDisclosure.onClose();
  };
  const displayTerminateTransactionScreens = scrn => {
    switch (scrn) {
      case 'confirm request':
        return (
          <DecisionConfirmation
            isFractional={isFractional}
            handleScreen={handleScreen}
            terminateDrawerDisclosure={terminateDrawerDisclosure}
          />
        );

      case 'select fractional transaction':
        return (
          <SelectFractionalTransactionToBeTerminated
            FRACTIONALTXN={FRACTIONALTXN}
            setId={setId}
            navigateBack={handleScreen}
            handleScreen={setScreen}
          />
        );
      case 'input refund value':
        return (
          <InputRefundAmount
            navigateBack={handleClose}
            amount={amount}
            setAmount={setAmount}
            handleScreen={handleScreen}
          />
        );

      case '2fa':
        return (
          <TwoFaVerifcation
            navigateBack={handleScreen(
              isFractional ? 'select fractional transaction' : 'confirm request'
            )}
            header="Terminate"
            handleVerify={handleProceed}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <DecisionConfirmation
            isFractional={isFractional}
            handleScreen={handleScreen}
            terminateDrawerDisclosure={terminateDrawerDisclosure}
          />
        );
    }
  };

  return (
    <Drawer isOpen={terminateDrawerDisclosure?.isOpen} onClose={handleClose}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent mt="65px" maxW="450px" bg="#fff" py="15.23px" pt="0px">
        {/* <HStack
          pt="15.23px"
          pb="14.47px"
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          pl="23.25px"
          pr="15.23px"
          w="full"
          justify="space-between"
        >
          <HStack gap={1} alignItems={'center'}>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={terminateDrawerDisclosure.onClose}
            />
            <Heading p="0px" fontSize="16px" fontWeight="600" borderBottom="none" color="#191919">
              Terminate
            </Heading>
          </HStack>
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
        </HStack> */}

        {displayTerminateTransactionScreens(screen)}

        <TerminateTabs terminateTabs={terminateTabs} />
      </DrawerContent>
    </Drawer>
  );
};
