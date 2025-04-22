import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';

import React from 'react';
import {dateOrTimeAgo} from 'utils/formatDate';
import RejectionReason from './rejectionReason';

export const AgentHistoryComponent = ({info}) => {
  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info?.avatar}
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
              {`${info?.approved_by?.first_name ?? '-'} ${info?.approved_by?.last_name ?? ''}`}
            </Text>{' '}
            {!info?.status ? 'rejected' : 'approved'}{' '}
            <Text as="span" color="#4545FE" textTransform="capitalize">
              {' '}
              {`${info?.first_name} ${info?.last_name}'s`}
            </Text>{' '}
            account application
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400">
              {info?.approved_at ? dateOrTimeAgo(info?.approved_at) : '-'}
            </Text>
          </HStack>
        </Stack>
      </HStack>
      {info?.rejection_reason && !info?.status ? (
        <RejectionReason rejectionReason={info?.rejection_reason} />
      ) : null}
    </HStack>
  );
};

export default AgentHistoryComponent;
