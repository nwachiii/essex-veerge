import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchCustomPlanSummary} from 'apis/customers';
import React from 'react';
import {themeStyles} from 'theme';

import {getOrdinal} from 'utils/getOrdinal';
import {BreakdownItem, FeeItem, Header} from './components';

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
  },
};

const EquityPaymentBreakdownDrawer = ({equityInfo, drawerDisclosure}) => {
  const {
    initial_deposit_in_value,

    payment_period_in_months,
    periodic_payment,
    payment_frequency,
    plan_type,
  } = equityInfo?.payment_plan || {};

  const customPlanBreakDown = useQuery(
    ['customPlanSummary', equityInfo?.payment_plan?.id],
    () => fetchCustomPlanSummary(equityInfo?.payment_plan?.id),
    {enabled: !!equityInfo?.payment_plan}
  );

  const customBreakDown = customPlanBreakDown.data?.data?.data || [];

  const breakdown = equityInfo?.payment_plan
    ? plan_type === 'manual' && payment_frequency !== 'flexible'
      ? [
          {amount: initial_deposit_in_value, label: 'Initial Deposit'},
          {
            amount: periodic_payment,
            label: `${payment_frequency?.charAt(0).toUpperCase() + payment_frequency.slice(1)} Payment`,
          },
        ]
      : [
          {amount: initial_deposit_in_value, label: 'Initial Deposit'},
          ...customBreakDown.map((item, i) => ({
            amount: item.amount,
            label:
              // i === 0 ? 'Initial Deposit' :
              `${getOrdinal(i + 2)} Payment `,
            date: `Due After ${item?.period_in_months} month${item?.period_in_months === 1 ? '' : 's'}`,
          })),
        ]
    : [{amount: equityInfo?.offer_price, label: 'Unit price'}];

  const headerText = equityInfo?.payment_plan
    ? payment_period_in_months
      ? `${payment_period_in_months} Month${payment_period_in_months === 1 ? '' : 's'} Plan`
      : 'Payment Summary'
    : 'Outright Purchase';

  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={drawerDisclosure.onClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        boxShadow="none"
      >
        <Header headerText="Payment Breakdown" onClose={drawerDisclosure.onClose} />
        <DrawerBody
          pb="10px"
          pt="20px"
          mb="10px"
          sx={customScrollbarStyles}
          px="25px"
          pr="17px"
          mr="8px"
        >
          <Stack w="full" spacing="16px">
            <HStack
              maxH="47px"
              w="full"
              border="#e4e4e4 1px solid"
              bg="#f9fafb"
              p="16px"
              borderRadius="8px"
            >
              <Text fontSize="12px" fontWeight="600">
                {headerText}
              </Text>
            </HStack>
            {breakdown.map((item, i) => (
              <BreakdownItem
                key={i}
                amount={item.amount}
                label={item.label}
                date={
                  // item.date
                  //
                  null
                }
                color={i > 0 ? themeStyles.color.matador__green : '#4545FE'}
              />
            ))}
            {!!equityInfo?.equity_fees?.length && (
              <Stack spacing="8px">
                <Text fontSize="12px" fontWeight="500" color="#3d3d3d">
                  Closing cost
                </Text>
                <Stack
                  w="full"
                  border="#e4e4e4 0.5px solid"
                  borderRadius="4px"
                  p="12px"
                  spacing="24px"
                  bg="#f9fafb"
                >
                  {equityInfo.equity_fees.map((item, i) => (
                    <FeeItem key={i} name={item.name} amount={item.amount} />
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default EquityPaymentBreakdownDrawer;
