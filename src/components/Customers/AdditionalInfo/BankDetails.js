import {HStack, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {CUSTOMER_ADDITIONAL_INFO} from '../../../constants/customersProfile';
import {BsDashLg} from 'react-icons/bs';

export const BankDetails = ({data}) => {
  return (
    <Stack w="full" my={8}>
      <Text color="#4545FE" fontSize="24px" fontWeight={500}>
        Bank Details
      </Text>

      <HStack
        justify="space-between"
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text fontSize="18px" fontWeight="400">
          Bank
        </Text>
        <Text fontSize="18px" fontWeight={500}>
          {data?.bank || <BsDashLg />}
        </Text>
      </HStack>
      <HStack
        justify="space-between"
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text fontSize="18px" fontWeight="400">
          Account Number
        </Text>
        <Text fontSize="18px" fontWeight={500}>
          {data?.account_number || <BsDashLg />}
        </Text>
      </HStack>
    </Stack>
  );
};
