import React from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  StackDivider,
  Flex,
  Text,
  VStack,
  useClipboard,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {initiateWithdrawal} from '../../../apis/account';
import {fetchAccountList} from '../../../apis/settings';
import {useEffect} from 'react';
import withdrawIcon from '/src/images/icons/withdraw.png';
import WithDrawalScreen from './screens/WithDrawalScreen';
import ConfirmTransactionScreen from './screens/ConfirmTransactionScreen';
import ProcessingToSuccess from './screens/ProcessingToSuccess';
import {toastForError} from '../../../utils/toastForErrors';

export const WithDrawalDrawer = () => {
  const [screen, setScreen] = useState('withdrawal');
  const [withdrawalObj, setWithDrawalObj] = useState({});

  const [shouldFetch, setShouldFetch] = useState(false);

  const toast = useToast();
  const withDrawDrawerDisclosure = useDisclosure();

  const FETCH_ACCOUNT_DETAILS = useQuery(['fetchAccountList'], () => fetchAccountList(), {
    enabled: shouldFetch,
  });
  const [recipient, setRecipient] = useState(null);
  const handleClose = () => () => {
    setScreen('withdrawal');
    setRecipient(null);
    return withDrawDrawerDisclosure.onClose();
  };

  const mutation = useMutation(formData => initiateWithdrawal(formData), {
    onSuccess: res => {
      onClose();

      setRecipient(null);
    },
    onError: err => {},
  });

  let bankData = FETCH_ACCOUNT_DETAILS?.data?.data?.data || [];

  const handleChangeRecipient = idx => {
    setRecipient(bankData[idx]);
    // CHANGE_RECIPIENT_MODAL.onClose();
  };

  useEffect(() => {
    setShouldFetch(true);
  }, []);

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
  const displayWithDrawalScreens = key => {
    switch (key) {
      case 'withdrawal':
        return (
          <WithDrawalScreen
            customScrollbarStyles={customScrollbarStyles}
            drawerDisclosure={withDrawDrawerDisclosure}
            handleScreen={setScreen}
            bankData={bankData}
            setWithDrawalObj={setWithDrawalObj}
            handleChangeRecipient={handleChangeRecipient}
            recipient={recipient}
          />
        );
        break;
      case 'OTP':
        return (
          <ConfirmTransactionScreen
            withdrawalObj={withdrawalObj}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            mutation={mutation}
          />
        );
        break;
      case 'processingToSuccess':
        return (
          <ProcessingToSuccess
            close={handleClose}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            mutation={mutation}
          />
        );
        break;

      default:
        return (
          <WithDrawalScreen
            modalDisclosure={withDrawDrawerDisclosure}
            handleScreen={setScreen}
            setWithDrawalObj={setWithDrawalObj}
          />
        );

        break;
    }
  };
  return (
    <>
      <Button
        border="1px solid #4545FE"
        py={0}
        h="38px"
        mt={0}
        // w="120px"
        px="13px"
        borderRadius="8px"
        variant="secondary"
        onClick={withDrawDrawerDisclosure.onOpen}
        color="#4545FE"
        fontSize="14px"
        fontWeight="400"
      >
        <Flex w="full" align="center" gap="5px" justify="space-around">
          <Image alt="" src={withdrawIcon.src} className="w-4 mr-2 h-4" /> Withdraw
        </Flex>
      </Button>
      <Drawer isOpen={withDrawDrawerDisclosure.isOpen} placement="right" onClose={handleClose()}>
        <DrawerOverlay />
        <DrawerContent mt="65px" maxW="400px" p="0px">
          <HStack
            boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
            py="12px"
            bg="#F5F5F5"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Withdrawal
            </Text>

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
          <DrawerBody sx={customScrollbarStyles} m="0px" px="10px" py="20px">
            {displayWithDrawalScreens(screen)}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default WithDrawalDrawer;
