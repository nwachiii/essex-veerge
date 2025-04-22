import {MatadorCustomDatePicker} from '@/components/common/Calendar/DatePicker';
import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';
import {AgentApprovalModal} from 'constants/request/AgentRequestData';
import {HandleInspectionRequestApproval} from 'constants/request/HandleInspectionRequestApproval';
import UserDrawerRequestData from 'constants/request/UserDrawerRequestData';
import View from 'pages/request/inspection_request/View';
import React from 'react';
import {dateOrTimeAgo} from 'utils/formatDate';

export const PendingAgentComponent = ({info, refetch}) => {
  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info?.avatar ?? ''}
          fontSize="7px"
          boxSize="48px"
          objectFit="cover"
          borderRadius="full"
          bg="#f5f5f5"
          alt="customer profile picture"
        />
        <Stack spacing="3px">
          <Text w="full" color="#475467" fontSize="14px" textAlign="start" fontWeight="400">
            <Text as="span" textTransform="capitalize">
              {' '}
              {`${info?.first_name} ${info?.last_name} `}
            </Text>
            has submitted an account application
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400" color="#475467">
              {info?.sign_up_time ? dateOrTimeAgo(info?.sign_up_time) : '-'}
            </Text>
          </HStack>
        </Stack>
      </HStack>

      <AgentApprovalModal refetch={refetch} accountId={info?.id} />
    </HStack>
  );
};

export default PendingAgentComponent;
