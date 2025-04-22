import React from 'react';
import {BsDashLg} from 'react-icons/bs';
import {Box, Stack, Text} from '@chakra-ui/react';

import {formatAmountWithDecimal} from 'utils';
import {monthDayYear} from 'utils/formatDate';

const NumbersPart = ({data, isFractional, FRACTIONAL_DATA, COOWNERSHIP_DATA}) => {
  const equityInfo = isFractional
    ? FRACTIONAL_DATA?.data?.overview
    : COOWNERSHIP_DATA
      ? COOWNERSHIP_DATA
      : data?.equity_info;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="start"
      justifyItems="start"
      gap="16px"
      width="full"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        gap="16px"
        alignItems="stretch"
        width="full"
        alignSelf="flex-start"
        justifySelf="start"
      >
        <Stack
          p="16px"
          alignContent="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="12px"
          border="1px solid #E4E4E4"
          width="50%"
        >
          <Text
            color="#4545FE"
            fontSize="14px"
            fontWeight="600"
            alignItems="center"
            textAlign="center"
            mx="auto"
          >
            {equityInfo?.total_purchase_price ? (
              formatAmountWithDecimal(equityInfo?.total_purchase_price)
            ) : equityInfo?.offer_price ? (
              formatAmountWithDecimal(equityInfo?.offer_price)
            ) : COOWNERSHIP_DATA ? (
              equityInfo?.user_total_share
            ) : (
              <BsDashLg />
            )}
          </Text>
          <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
            Purchase Price
          </Text>
        </Stack>

        {isFractional ? (
          <Stack
            p="16px"
            alignContent="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            width="50%"
          >
            <Text
              color="#12D8A0"
              fontSize="14px"
              fontWeight="600"
              alignItems="center"
              textAlign="center"
              mx="auto"
            >
              {equityInfo?.total_value ? (
                formatAmountWithDecimal(Number(equityInfo?.total_value))
              ) : (
                <BsDashLg />
              )}
            </Text>
            <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
              Total Fractional value
            </Text>
          </Stack>
        ) : (
          <Stack
            p="16px"
            alignContent="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            width="50%"
          >
            <Text
              color="#12D8A0"
              fontSize="14px"
              fontWeight="600"
              alignItems="center"
              textAlign="center"
              mx="auto"
            >
              {equityInfo?.amount_paid ? (
                formatAmountWithDecimal(equityInfo?.amount_paid)
              ) : COOWNERSHIP_DATA ? (
                formatAmountWithDecimal(equityInfo?.user_amount_paid)
              ) : (
                <BsDashLg />
              )}
            </Text>
            <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
              Total Amount Paid
            </Text>
          </Stack>
        )}
      </Box>
      {isFractional ? null : (
        <Box
          gap="16px"
          width="full"
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          justifyContent="space-between"
        >
          <Stack
            p="16px"
            alignContent="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            width="50%"
          >
            <Text
              color="#FF6A6A"
              fontSize="14px"
              fontWeight="600"
              alignItems="center"
              textAlign="center"
              mx="auto"
            >
              {equityInfo?.current_outstanding_balance ? (
                formatAmountWithDecimal(equityInfo?.current_outstanding_balance)
              ) : COOWNERSHIP_DATA ? (
                formatAmountWithDecimal(equityInfo?.individual_outstanding_balance)
              ) : (
                <BsDashLg />
              )}
            </Text>
            <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
              Outstanding Balance
            </Text>
          </Stack>

          <Stack
            p="16px"
            alignContent="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            width="50%"
          >
            <Text
              color="#FF6A6A"
              fontSize="14px"
              fontWeight="600"
              alignItems="center"
              textAlign="center"
              mx="auto"
            >
              {equityInfo?.next_due_balance ? (
                formatAmountWithDecimal(equityInfo?.next_due_balance)
              ) : COOWNERSHIP_DATA ? (
                formatAmountWithDecimal(Number(equityInfo?.next_due_payment?.amount))
              ) : (
                <BsDashLg />
              )}
            </Text>
            <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
              Due Balance
            </Text>
            <Text fontSize="8px" fontWeight="300" alignItems="center" textAlign="center" mx="auto">
              {equityInfo?.next_due_date ? (
                monthDayYear(equityInfo?.next_due_date)
              ) : COOWNERSHIP_DATA ? (
                monthDayYear(equityInfo?.next_due_payment?.due_date)
              ) : (
                <BsDashLg />
              )}
            </Text>
          </Stack>
        </Box>
      )}
      {!isFractional ? null : (
        <Box
          gap="16px"
          width="full"
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          justifyContent="center"
        >
          <Stack
            p="16px"
            alignContent="center"
            justifyContent="center"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            width="50%"
          >
            <Text
              color="#12D8A0"
              fontSize="14px"
              fontWeight="600"
              alignItems="center"
              textAlign="center"
              mx="auto"
            >
              {equityInfo?.total_fractions ? equityInfo?.total_fractions : <BsDashLg />}
            </Text>
            <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
              Total Fractions
            </Text>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default NumbersPart;
