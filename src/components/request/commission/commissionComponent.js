import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';
import {HandleCommissionRequest} from 'constants/request/HandleCommissionRequest';
import CommissionAgentDrawer from 'constants/request/request_history/Drawer.for.commission.agents';
import React from 'react';
import {dateOrTimeAgo} from 'utils/formatDate';

export const PendingCommissionsComponent = ({info, refetch}) => {
  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info?.agent?.avatar ?? ''}
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
            {
              <CommissionAgentDrawer
                info={info}
                text={`${info?.agent?.first_name} ${info?.agent?.last_name}`}
              />
            }{' '}
            sent a commission request
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400" color="#475467">
              {info?.created_at ? dateOrTimeAgo(info?.created_at) : '-'}
            </Text>
          </HStack>
        </Stack>
      </HStack>

      <HandleCommissionRequest agentId={info?.agent?.id} refetch={refetch} requestId={info?.id} />
    </HStack>
  );
};

export default PendingCommissionsComponent;
