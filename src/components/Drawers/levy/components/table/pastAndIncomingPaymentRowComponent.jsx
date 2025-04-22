import {Avatar, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {FormatToColorfulCurrency} from 'utils/formatAmount';

export const PastPaymentRowComponent = ({props}) => {
  return (
    <Flex justify="space-between" spacing="10px" w="full" p="12px 16px">
      <HStack alignItems="center" spacing="10px">
        <Avatar boxSize="40px" />
        <Text maxW="100px" fontSize="16px" fontWeight={400} color="#27272a">
          Olivia Rhyechukwu
        </Text>
      </HStack>
      <Stack spacing="none" justify="end">
        <FormatToColorfulCurrency
          amount={1200000}
          fontSize="16px"
          fontWeight={600}
          color="#18181b"
          decimalStyle={{
            color: '#919191',
          }}
          wrapper={{alignItem: 'end'}}
        />
        <Text textAlign="end" fontSize="13px" fontWeight={400} color="#52525b">
          {'Security Levy'}
        </Text>
      </Stack>
    </Flex>
  );
};
export const IncomingPaymentRowComponent = ({props}) => {
  return (
    <Flex justify="space-between" spacing="10px" w="full" p="12px 16px">
      <HStack alignItems="center" spacing="10px">
        <Avatar boxSize="40px" />
        <Text maxW="100px" fontSize="16px" fontWeight={400} color="#27272a">
          Olivia Okechunwku
        </Text>
      </HStack>
      <Stack spacing="none" justify="end">
        <FormatToColorfulCurrency
          amount={1200000}
          fontSize="16px"
          fontWeight={600}
          color="#18181b"
          decimalStyle={{
            color: '#919191',
          }}
          wrapper={{alignItem: 'end'}}
        />
        <Text textAlign="end" fontSize="13px" fontWeight={400} color="#52525b">
          {'Security Levy'}
        </Text>
      </Stack>
    </Flex>
  );
};
