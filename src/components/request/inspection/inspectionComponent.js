import {MatadorCustomDatePicker} from '@/components/common/Calendar/DatePicker';
import {Box, HStack, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';
import {HandleInspectionRequestApproval} from 'constants/request/HandleInspectionRequestApproval';
import UserDrawerRequestData from 'constants/request/UserDrawerRequestData';
import View from 'pages/request/inspection_request/View';
import React, {useEffect} from 'react';
import {dateOrTimeAgo} from 'utils/formatDate';
import ActionComponentForPendingInspectionRequest from './components/actionComponentForPendingInspectionRequest';
import InspectionApprovalAndRescheduling from '@/components/Modals/inspectionRequest';
import {formatInTimeZone, format} from 'date-fns-tz';

export const PendingInspectionComponent = ({info, refetch, roles}) => {
  let status = info?.tour_method?.toLowerCase();
  const modalDisclosure = useDisclosure();

  const tagObj = {
    'in-person': {text: 'in-person'},
    video: {
      text: 'virtual',
    },
    virtual: {
      text: 'virtual',
    },
  };

  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info?.customer?.avatar ?? ''}
          fontSize="7px"
          boxSize="48px"
          objectFit="cover"
          borderRadius="full"
          bg="#f5f5f5"
          alt="customer profile picture"
        />
        <Stack spacing="3px">
          <Text
            maxW="611px"
            w="full"
            color="#475467"
            fontSize="14px"
            textAlign="start"
            fontWeight="400"
          >
            <UserDrawerRequestData row={info} /> scheduled{' '}
            {tagObj[status]?.text === 'virtual' ? 'a' : 'an'}{' '}
            <Text as="span" color="#475467">
              {tagObj[status]?.text}
            </Text>{' '}
            inspection for{' '}
            <Text as="span" fontWeight="600" color="#475467">
              {info?.project}
            </Text>{' '}
            for{' '}
            <Text as="span" fontWeight="600" color="#475467">
              {`${info?.request_time.split(' ')[1]} ${info?.request_time.split(' ')[2]} ${
                info?.request_time.split(' ')[3]
              }`}
            </Text>{' '}
            at
            <Text as="span" fontWeight="600" color="#475467">
              {' '}
              {`${info?.request_time.split(' ')[0]} ${info?.request_time.split(' ')[4]} ${info?.request_time.split(' ')[5]}`}
            </Text>
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400" color="#475467">
              {info?.created_at ? dateOrTimeAgo(info?.created_at) : '-'}
            </Text>
          </HStack>
        </Stack>
      </HStack>
      {/* <ActionComponentForPendingInspectionRequest info={info} roles={roles} refetch={refetch} /> */}
      <InspectionApprovalAndRescheduling
        requestId={info?.id}
        modalDisclosure={modalDisclosure}
        row={info}
        roles={roles}
        refetch={refetch}
      />
    </HStack>
  );
};

export default PendingInspectionComponent;
