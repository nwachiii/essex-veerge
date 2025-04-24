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
import {loggedinUserStatic} from 'apis/requests';

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
          src={loggedinUserStatic.avatar}
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
            color="#27272A"
            fontSize="14px"
            textAlign="start"
            fontWeight="400"
          >
            {/* <UserDrawerRequestData row={info} /> scheduled{' '} */}
            <Text as="span" fontWeight="700">
              {`${info?.customer.first_name} ${info?.customer.last_name} `}
            </Text>
            requested to settle a balance of{' '}
            <Text as="span" fontWeight="700">
              $420.80{' '}
            </Text>
            in three monthly payments of{' '}
            <Text as="span" fontWeight="700">
              $140.29
            </Text>
            , starting{' '}
            <Text as="span" fontWeight="700">
              01 May 2025
            </Text>
            , due to job hours.
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400">
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
