import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';

import React from 'react';
import {dateOrTimeAgo} from 'utils/formatDate';

import CommissionAgentDrawer from 'constants/request/request_history/Drawer.for.commission.agents';
import RejectionReason from '../agent/rejectionReason';
import {formatToCurrency} from 'utils/formatAmount';

export const CommissionHistoryComponent = ({info}) => {
  console.log('commission request:', info);
  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info?.agent?.avatar}
          fontSize="7px"
          boxSize="48px"
          objectFit="cover"
          borderRadius="full"
          bg="#f5f5f5"
          alt="customer profile picture"
        />
        <Stack spacing="3px">
          <Text
            textAlign="start"
            maxW="675px"
            w="full"
            color="#475467"
            fontSize="14px"
            fontWeight="400"
          >
            <Text as="span" textTransform="capitalize">
              {' '}
              {`${info?.paid_by?.first_name ?? 'Someone'} ${info?.paid_by?.last_name ?? ''}`}
            </Text>{' '}
            {info?.status === 'rejected' ? 'rejected' : 'paid'}{' '}
            {
              <CommissionAgentDrawer
                info={info}
                text={`${info?.agent?.first_name} ${info?.agent?.last_name}`}
              />
            }
            {info?.status === `rejected` ? "'s request for " : ` `}a commission{' '}
            {info?.status !== `rejected` &&
              `of
            ${formatToCurrency(info?.amount || `0`)} `}{' '}
            for a {info?.unit_name || 'unit'} in {info?.listing_name || 'a listing'}
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400">
              {info?.responded_at ? dateOrTimeAgo(info?.responded_at) : '-'}
            </Text>
          </HStack>
        </Stack>
      </HStack>
      {info?.response_note && info?.status === 'rejected' ? (
        <RejectionReason rejectionReason={info?.response_note} />
      ) : null}
    </HStack>
  );
};

export default CommissionHistoryComponent;
