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

export const PendingInspectionComponent = ({info, dataKey}) => {
  const modalDisclosure = useDisclosure();

  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info.image}
          fontSize="7px"
          boxSize="48px"
          objectFit="cover"
          borderRadius="full"
          bg="#f5f5f5"
          alt="customer profile picture"
        />
        <Stack spacing="3px">
          {dataKey === 'payment_plan' ? (
            <Text
              maxW="611px"
              w="full"
              color="#27272A"
              fontSize="14px"
              textAlign="start"
              fontWeight="400"
            >
              <Text as="span" fontWeight="700">
                {`${info?.name} (${info?.project})`}
              </Text>{' '}
              requested to settle a balance of{' '}
              <Text as="span" fontWeight="700">
                {info?.first_amount}
              </Text>{' '}
              in <Text as="span">{info?.periodic}</Text> payments of{' '}
              <Text as="span" fontWeight="700">
                {info?.second_amount}
              </Text>{' '}
              , starting{' '}
              <Text as="span" fontWeight="700">
                {info?.date}
              </Text>
            </Text>
          ) : (
            <Text
              maxW="611px"
              w="full"
              color="#27272A"
              fontSize="14px"
              textAlign="start"
              fontWeight="400"
            >
              <Text as="span" fontWeight="700">
                {`${info?.name} (${info?.project})`}
              </Text>{' '}
              scheduled access to <Text as="span">{info?.access}</Text> on{' '}
              <Text as="span" fontWeight="700">
                {info?.date}
              </Text>{' '}
              from{' '}
              <Text as="span" fontWeight="700">
                {info?.from}
              </Text>{' '}
              for <Text as="span">{info?.for}</Text>
              {info?.request ? `and request for ${info?.request}` : ''}
            </Text>
          )}
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400">
              {info?.time}
            </Text>
          </HStack>
        </Stack>
      </HStack>
      {/* <ActionComponentForPendingInspectionRequest info={info} roles={roles} refetch={refetch} /> */}
      <InspectionApprovalAndRescheduling
        dataKey={dataKey}
        info={info}
        modalDisclosure={modalDisclosure}
      />
    </HStack>
  );
};

export default PendingInspectionComponent;
