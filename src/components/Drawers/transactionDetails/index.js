import React, {useEffect, useState} from 'react';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  Image,
  Spinner,
  Tooltip,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import {useQuery, useQueryClient} from '@tanstack/react-query';

import {
  fetchCustomerCoOwnershipTxns,
  fetchCustomersFractionalTxns,
  fetchEquityDetails,
  fetchPreviousPaymentsForIndividualOwnership,
} from 'apis/customers';

import commission_icon from '/src/images/icons/commission_icon.svg';
import more_options from '/src/images/icons/menu_alt.svg';
import AccountDetailsPart from './AccountDetailsPart';
import CoOwners from './CoOwners';
import NumbersPart from './NumbersPart';
import PrevPayment from './prevPayment';
import UpcomingPayment from './UpcomingPayment';
import CommissionDrawer from './CommissionDrawer';
import MoreOptionsDrawer from './moreOptionsDrawer';
import AgentInfo from './agentInfo';
import {usePathname, useSearchParams} from 'next/navigation';

const TransactionDetailsDrawer = ({
  modalDisclosure,
  unit,
  equityId,
  runQuery,
  userId,
  mainRefetch,
  isFractionalTxn,
  isCoownership,
}) => {
  const [coOwnerId, setCoOwnerId] = useState(userId);
  const [showIndividualCo_owner, setShowIndividualCo_owner] = useState(isCoownership);

  const commission_drawer = useDisclosure();
  const more_options_drawer = useDisclosure();
  const [startQuery, setStartQuery] = useState(false);

  const pathname = usePathname();

  const handleClose = () => {
    more_options_drawer.onClose();
    return modalDisclosure.onClose();
  };

  const {data, isError, isLoading, refetch, error} = useQuery(
    ['transaction-details', equityId, userId],
    async () => await fetchEquityDetails(equityId, userId),
    {
      enabled: runQuery,
    }
  );

  const FRACTIONALTXN = useQuery(
    ['fractional-transaction-details', equityId, userId],
    async () => await fetchCustomersFractionalTxns(equityId, userId),
    {
      enabled: runQuery,
    }
  );
  const CoownershipIndividualMetaQuery = useQuery(
    ['coownership-transactions', equityId, coOwnerId],
    async () => await fetchCustomerCoOwnershipTxns(equityId, coOwnerId),
    {
      enabled: !!(runQuery && isCoownership && data?.data?.equity_info),
    }
  );
  const previousPaymentsForIndividualOwnership = useQuery(
    ['individual-coownership-transactions', equityId, coOwnerId],
    async () => await fetchPreviousPaymentsForIndividualOwnership(equityId, coOwnerId),
    {
      enabled: !!(runQuery && isCoownership),
    }
  );

  const refetchOwnershipData = () => {
    CoownershipIndividualMetaQuery.refetch();
    previousPaymentsForIndividualOwnership.refetch();
    refetch();
  };
  const refetchTransactionDetails = () => {
    refetch();
    mainRefetch ? mainRefetch() : null;
  };

  const toggleView = () => {
    setShowIndividualCo_owner(!showIndividualCo_owner);
  };

  const handleUserIdSwitch = arg => {
    setCoOwnerId(Number(arg));
    refetchOwnershipData();
  };

  const handleOpenDrawer = () => {
    commission_drawer.onOpen();
    setStartQuery(true);
  };
  const handleMoreOptions = () => {
    more_options_drawer.onOpen();
    setStartQuery(true);
  };

  const EQUITY_INFO = data?.data?.equity_info;

  useEffect(() => {
    if (isCoownership && EQUITY_INFO) {
      setCoOwnerId(EQUITY_INFO?.co_owners?.[0]?.id);
    }
    // eslint-disable-next-line no-unused-vars
  }, [EQUITY_INFO]);

  const isFractional = EQUITY_INFO?.type == 'FRACTIONAL' || isFractionalTxn;

  const PREVIOUS_PAYMENTS = isFractional
    ? FRACTIONALTXN?.data?.data?.data?.fractional_history_data
    : data?.data?.previous_payments;

  const COOWNERSHIP_DATA = CoownershipIndividualMetaQuery?.data
    ? CoownershipIndividualMetaQuery?.data?.data
    : null;

  const INDV_PREV_TXNs = previousPaymentsForIndividualOwnership?.data?.data?.data ?? null;

  const PREV_TXNS_TOGGLED_DATA =
    isCoownership && showIndividualCo_owner ? INDV_PREV_TXNs : PREVIOUS_PAYMENTS;

  const isRealtorSubscriber = pathname.includes('manage_agents');

  return (
    <Drawer isOpen={modalDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
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
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
        >
          <Flex width="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Transaction Details
            </Text>

            <Box display="flex" flexDirection="row" alignItems="center" gap="16px">
              <Tooltip label="Commission">
                <Box
                  border="0.68px solid #191919"
                  p="10px"
                  borderRadius="8.12px"
                  _hover={{
                    background: 'rgba(25, 25, 25, 0.10)',
                  }}
                  cursor="pointer"
                  onClick={handleOpenDrawer}
                >
                  <Image src={commission_icon.src} alt="log" w="16px" h="16px" alignSelf="center" />
                </Box>
              </Tooltip>
              {isRealtorSubscriber ? null : (
                <Tooltip label="More Options">
                  <Box
                    border="0.68px solid #191919"
                    p="10px"
                    borderRadius="8.12px"
                    _hover={{
                      background: 'rgba(25, 25, 25, 0.10)',
                    }}
                    cursor="pointer"
                    onClick={handleMoreOptions}
                  >
                    <Image src={more_options.src} alt="log" w="16px" h="16px" alignSelf="center" />
                  </Box>
                </Tooltip>
              )}
              <CommissionDrawer
                modalDisclosure={commission_drawer}
                equityId={equityId}
                startQuery={startQuery}
              />
              {isRealtorSubscriber ? null : (
                <MoreOptionsDrawer
                  customerInfo={data?.data?.customer_info}
                  unit={unit}
                  equityRefetch={refetch}
                  userId={userId}
                  isFractional={isFractional}
                  mainRefetch={refetchTransactionDetails}
                  leadDrawerHandleClose={handleClose}
                  equityId={equityId}
                  equityInfo={EQUITY_INFO}
                  projectId={EQUITY_INFO?.project?.id}
                  modalDisclosure={more_options_drawer}
                />
              )}
            </Box>
          </Flex>
          <HStack spacing="15px">
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
        </HStack>

        <Box
          display="flex"
          flexDirection="column"
          gap="16px"
          pt="0px"
          pb="20px"
          px="25px"
          overflowY={'scroll'}
        >
          {isLoading ||
          (isCoownership && CoownershipIndividualMetaQuery?.isLoading) ||
          (isCoownership && previousPaymentsForIndividualOwnership?.isLoading) ? (
            <VStack w="full" justify="center" align="center" h="20vh">
              <Spinner />
            </VStack>
          ) : (
            <>
              <AccountDetailsPart
                data={data?.data}
                hasCo_owners={isCoownership}
                isFractional={EQUITY_INFO?.type == 'FRACTIONAL'}
              />
              {EQUITY_INFO?.approved_agent ? (
                <AgentInfo agentInfo={EQUITY_INFO?.approved_agent} />
              ) : null}

              {isCoownership ? (
                <CoOwners
                  equityInfo={EQUITY_INFO}
                  toggleView={toggleView}
                  handleUserIdSwitch={handleUserIdSwitch}
                  equityVal={COOWNERSHIP_DATA?.equity_value}
                  showIndividualCo_owner={showIndividualCo_owner}
                />
              ) : null}

              <NumbersPart
                data={data?.data}
                isFractional={isFractional}
                FRACTIONAL_DATA={FRACTIONALTXN?.data?.data}
                COOWNERSHIP_DATA={
                  (isCoownership && showIndividualCo_owner == true && COOWNERSHIP_DATA) ?? null
                }
              />

              {PREV_TXNS_TOGGLED_DATA?.length > 0 ? (
                previousPaymentsForIndividualOwnership.isRefetching && isCoownership ? (
                  <Center mt="20px">
                    <Spinner />
                  </Center>
                ) : (
                  <PrevPayment
                    fracRefetch={FRACTIONALTXN.refetch}
                    payment={PREV_TXNS_TOGGLED_DATA}
                    isFractional={isFractional}
                  />
                )
              ) : null}

              {!showIndividualCo_owner && data?.data?.upcoming_payments?.length > 0 ? (
                <UpcomingPayment payment={data?.data?.upcoming_payments} equityInfo={EQUITY_INFO} />
              ) : null}
            </>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default TransactionDetailsDrawer;
