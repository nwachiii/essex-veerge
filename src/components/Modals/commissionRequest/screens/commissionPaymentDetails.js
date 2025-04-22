import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  HStack,
  Heading,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Stack,
  Text,
} from '@chakra-ui/react';
import EquityInfo from '../components/equityInfo';
import CommissionForm from '../components/commissionForm';
import selectedIcon from '/src/images/icons/mark_icon.svg';
import AgentsNameDrawer from 'constants/agents/AgentsNameDrawer';
import UserDrawerRequestData from 'constants/request/UserDrawerRequestData';

export const CommissionPaymentDetails = ({
  handleScreen,
  customScrollbarStyles,
  handleClose,
  clientData,
  submitInfo,
  setSubmitInfo,
  pastPaymentObj,
  incomingPaymentObj,
  commissionRequestObj,
}) => {
  const defaultGiveAccessValue = true;
  const [amount, setAmount] = useState();
  const [note, setNote] = useState('');
  const [giveAccess, setGiveAccess] = useState(defaultGiveAccessValue);
  const [commissionAmountError, setCommissionAmountError] = useState('');
  const [receipt, setReceipt] = useState({name: '', val: ''});

  const isValid = note.trim() && Number(amount) && !commissionAmountError;

  const nextScreenIs = scrn => () => {
    setSubmitInfo({
      ...submitInfo,
      amount,
      note,
      receipt: receipt.val,
      give_equity_access: giveAccess,
    });
    return handleScreen(scrn);
  };
  return (
    <Flex direction={`column`} gap={`12px`}>
      <HStack justify="space-between" align="center" position="relative">
        <Heading fontSize="20px" fontWeight="600" color="#191919">
          Commission Payment
        </Heading>

        <ModalCloseButton position="initial" />
      </HStack>
      <ModalBody sx={customScrollbarStyles} p={`0px`}>
        <HStack w="full" spacing="21px" align={`stretch`}>
          <EquityInfo
            customScrollbarStyles={customScrollbarStyles}
            viewInfo={commissionRequestObj}
            clientData={clientData}
            pastPaymentObj={pastPaymentObj}
            incomingPaymentObj={incomingPaymentObj}
          />
          <CommissionForm
            setAmount={setAmount}
            setReceipt={setReceipt}
            setGiveAccess={setGiveAccess}
            pastPayment={pastPaymentObj?.data}
            setNote={setNote}
            commissionAmountError={commissionAmountError}
            setCommissionAmountError={setCommissionAmountError}
            note={note}
            giveAccess={giveAccess}
            viewInfo={commissionRequestObj}
            amount={amount}
          />
        </HStack>
      </ModalBody>
      {/* <HStack spacing="8.157px" align="start">
        <Checkbox
          onChange={() => setGiveAccess(!giveAccess)}
          _focus={{border: 'none', outline: 'none'}}
          _active={{border: 'none', outline: 'none'}}
          border="none"
          icon={
            <HStack align="center" justify="center" borderRadius="3px" p="1px" bg="#D9D9D9">
              <Center w="12x" h="12px" minW={`12px`} overflow="hidden">
                <Image
                  src={selectedIcon.src}
                  alt="selected equity icon "
                  minW="200%"
                  minH="200%"
                  sx={{transition: 'ease-in-out 0.5s'}}
                  opacity={giveAccess ? '1' : '0'}
                  filter={`brightness(0) invert(0)`}
                  outline={`none`}
                  _focus={{outline: `none`}}
                  _focusVisible={{outline: `none`}}
                  _active={{outline: `none`}}
                />
              </Center>
            </HStack>
          }
          value={giveAccess}
        />{' '}
        <Text fontSize="11.419px" fontWeight="400">
          By checking this box,{' '}
          <AgentsNameDrawer id={commissionRequestObj?.data?.agent?.id}>
            <Text as="span" textTransform="capitalize" color="#4545FE">
              {commissionRequestObj?.data?.agent?.first_name ?? '-'}{' '}
              {commissionRequestObj?.data?.agent?.last_name ?? '-'}
            </Text>
          </AgentsNameDrawer>{' '}
          will be granted access to view the transaction details, and she will receive notifications
          whenever{' '}
          <UserDrawerRequestData id={commissionRequestObj?.data?.customer?.id}>
            <Text as="span" color="#4545FE" textTransform="capitalize">
              {`${commissionRequestObj?.data?.customer?.first_name ?? '-'} ${commissionRequestObj?.data?.customer?.last_name ?? '-'} `}
            </Text>
          </UserDrawerRequestData>
          makes a payment or defaults.
        </Text>
      </HStack> */}
      <ModalFooter p="0px">
        <HStack justify="end" gap="15px" w="full">
          <Button
            bg="transparent"
            border="1px solid #FF3636"
            color="#FF3636"
            borderRadius="72px"
            w="164px"
            _hover={{opacity: '1'}}
            h="100%"
            p={`12.5px`}
            fontSize="14.8px"
            fontWeight="400"
            onClick={handleClose}
          >
            Discard
          </Button>
          <Button
            borderRadius="72px"
            bg={'#242526'}
            color={'#FFFFFF'}
            fontWeight={'400'}
            fontSize={'18px'}
            _hover={{opacity: 0.9}}
            _active={{opacity: 0.9}}
            h={'100%'}
            p={`12.5px`}
            isDisabled={!isValid}
            onClick={nextScreenIs('commission payment summary')}
            w="181.892px"
          >
            Proceed
          </Button>
        </HStack>
      </ModalFooter>
    </Flex>
  );
};

export default CommissionPaymentDetails;
