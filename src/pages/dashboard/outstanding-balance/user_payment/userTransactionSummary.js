import {Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {formatAmountWithDecimal} from '../../../../utils/formatAmount';
import {themeStyles} from '../../../../theme';
import {handleDateFormat} from '../../../../utils/formatDate';

export const UserTransactionSummary = ({pastPayment}) => {
  return (
    <Stack
      mb="50px"
      direction={{base: 'column', md: 'row'}}
      justifyContent="space-around"
      spacing="35px"
      w="full"
    >
      <VStack
        py="23px"
        px="19px"
        h="full"
        spacing="13px"
        w="25%"
        border="1px solid lightgray"
        borderRadius="14px"
      >
        <Text fontWeight={600} fontSize="24px" color={themeStyles.color.primary}>
          {pastPayment[0]?.equity?.type == 'FRACTIONAL'
            ? formatAmountWithDecimal(pastPayment[0]?.equity?.unit?.price_per_fraction)
            : formatAmountWithDecimal(pastPayment[0]?.equity?.total_unit_price)}
        </Text>
        <Text fontSize="14px" fontWeight={400} color="#606060">
          {pastPayment[0]?.equity?.type == 'FRACTIONAL' ? 'Price per fraction' : 'Purchase price'}
        </Text>
      </VStack>
      <VStack
        py="23px"
        px="19px"
        h="full"
        spacing="13px"
        w="25%"
        border="1px solid lightgray"
        borderRadius="14px"
      >
        <Text fontWeight={600} fontSize="24px" color={themeStyles.color.matador__green}>
          {formatAmountWithDecimal(pastPayment[0]?.equity?.amount_paid)}
        </Text>
        <Text fontSize="14px" fontWeight={400} color="#606060">
          Total amount paid
        </Text>
      </VStack>
      <VStack
        py="23px"
        px="19px"
        h="full"
        spacing="13px"
        w="25%"
        border="1px solid lightgray"
        borderRadius="14px"
      >
        <Text fontWeight={600} fontSize="24px" color={themeStyles.color.matador__red}>
          {formatAmountWithDecimal(pastPayment[0]?.equity?.current_outstanding_balance)}
        </Text>
        <Text fontSize="14px" fontWeight={400} color="#606060">
          Outstanding balance
        </Text>
      </VStack>
      <VStack
        pt="23px"
        pb="13px"
        px="19px"
        h="118px"
        spacing="7px"
        w="25%"
        border="1px solid lightgray"
        borderRadius="14px"
        justify={'stretch'}
      >
        <Text fontWeight={600} fontSize="24px" color={themeStyles.color.matador__red}>
          {formatAmountWithDecimal(pastPayment[0]?.equity?.next_due_balance)}
        </Text>
        <Text textAlign={'center'} fontSize="12px" fontWeight={400} color="#606060">
          Due Balance
          {pastPayment[0]?.equity?.next_due_date ? (
            <>
              {' '}
              <br />
              {handleDateFormat(pastPayment[0]?.equity?.next_due_date)}
            </>
          ) : null}
        </Text>
      </VStack>
    </Stack>
  );
};

export default UserTransactionSummary;
