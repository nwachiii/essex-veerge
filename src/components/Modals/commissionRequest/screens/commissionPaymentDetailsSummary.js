import React, {useState} from 'react';
import {
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Stack,
} from '@chakra-ui/react';
import SettlementSummary from '../components/settlementSummary';
import RealtorClientInfoAndRequestSummary from '../components/realtorClientInfoAndRequestSummary';
import CheckToAutomatePayment from '../components/checkToAutomatePayment';
import {CreateToast} from '../../../../ui-lib';

export const CommissionPaymentDetailsSummary = ({
  customScrollbarStyles,
  handleClose,
  handleScreen,
  submitInfo,
  setSubmitInfo,
  pastPaymentObj,
  incomingPaymentObj,
  clientData,
  commissionRequestObj,
}) => {
  const toast = CreateToast();
  const [giveAccess, setGiveAccess] = useState(false);

  const isValid = giveAccess;
  const nextScreenIs = scrn => () => {
    setSubmitInfo({
      ...submitInfo,
      automate: giveAccess,
    });
    return handleScreen(scrn);
    // toast('Transaction Successful');
  };
  return (
    <Flex direction={`column`} gap={`12px`}>
      <HStack
        justify="space-between"
        // px="48px"
        align="center"
        m="0px"
        position="relative"
      >
        <HStack spacing="8px">
          <Heading fontSize="18px" fontWeight="600" color="#191919" m={`0px`}>
            Commission Payment Summary
          </Heading>
        </HStack>
        <ModalCloseButton position="initial" h={`20px`} w={`20px`} />
      </HStack>
      <ModalBody sx={customScrollbarStyles} p={`0px`}>
        <Stack w="full" spacing="21px" align={`stretch`}>
          <RealtorClientInfoAndRequestSummary
            commissionRequestObj={commissionRequestObj}
            handleScreen={handleScreen}
            submitInfo={submitInfo}
            customScrollbarStyles={customScrollbarStyles}
            pastPaymentObj={pastPaymentObj}
            incomingPaymentObj={incomingPaymentObj}
            clientData={clientData}
          />
          <SettlementSummary
            commissionRequestObj={commissionRequestObj}
            submitInfo={submitInfo}
            customScrollbarStyles={customScrollbarStyles}
          />
          {/* <CheckToAutomatePayment setGiveAccess={setGiveAccess} giveAccess={giveAccess} /> */}
        </Stack>
      </ModalBody>
      <ModalFooter p="0px">
        <HStack justify="end" gap="15px" w="full">
          <Button
            bg="transparent"
            border="1px solid #FF3636"
            color="#FF3636"
            borderRadius="72px"
            w="164px"
            _hover={{
              opacity: '1',
            }}
            h="100%"
            p={`12.5px`}
            fontSize="14.8px"
            fontWeight="500"
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
            _hover={{
              opacity: 0.9,
            }}
            _active={{
              opacity: 0.9,
            }}
            h={'100%'}
            p={`12.5px`}
            // isDisabled={!isValid}
            onClick={nextScreenIs('verify 2fa')}
            w="181.892px"
          >
            Proceed
          </Button>
        </HStack>
      </ModalFooter>
    </Flex>
  );
};

export default CommissionPaymentDetailsSummary;
