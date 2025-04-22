import InspectionApprovalAndRescheduling from '@/components/Modals/inspectionRequest';
import {Box, HStack, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';
import HistoryDrawerClosed from 'constants/request/request_history/Drawer.with.history';
import View from 'pages/request/inspection_request/View';
import React from 'react';
import {Button} from 'ui-lib';
import {dateOrTimeAgo} from 'utils/formatDate';

export const InspectionHistoryComponent = ({info, refetch, roles}) => {
  let status = info?.tour_method?.toLowerCase();
  const modalDisclosure = useDisclosure();
  const tagObj = {
    'in-person': {text: 'In person'},
    video: {
      text: 'Virtual',
    },
    virtual: {
      text: 'Virtual',
    },
  };

  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info?.customer?.avatar}
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
            {`${info?.approved_by?.first_name ?? '-'} ${info?.approved_by?.last_name ?? '-'}`} has
            approved <HistoryDrawerClosed row={info} /> scheduled{' '}
            <Text as="span" fontWeight="600" color="#475467">
              {tagObj[status].text}
            </Text>{' '}
            inspection for{' '}
            <Text as="span" fontWeight="600" color="#475467">
              {info?.project}
            </Text>{' '}
            on{' '}
            <Text as="span" fontWeight="600" color="#475467">
              {`${info?.request_time.split(' ')[1]} ${info?.request_time.split(' ')[2]} ${
                info?.request_time.split(' ')[3]
              }`}
            </Text>{' '}
            at
            <Text as="span" fontWeight="600" color="#475467">
              {`${info?.request_time.split(' ')[0]} ${info?.request_time.split(' ')[4]} ${info?.request_time.split(' ')[5]}`}
            </Text>
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400">
              {dateOrTimeAgo(info?.created_at)}
            </Text>
          </HStack>
        </Stack>
      </HStack>

      {/* <View refetch={refetch} row={info} roles={roles} requestId={info?.id} /> */}
      <InspectionApprovalAndRescheduling
        history={true}
        refetch={refetch}
        defaultScreen="summary"
        row={info}
        roles={roles}
        requestId={info?.id}
        modalDisclosure={modalDisclosure}
      >
        <Button
          onClick={modalDisclosure.onOpen}
          mt="0"
          type="button"
          border="1px solid #4545FE"
          notes
          bg="transparent"
          color="#4545FE"
          fontSize="14px"
          fontWeight="500"
          borderRadius="72px"
          w="80px"
          h="30px"
        >
          View
        </Button>
      </InspectionApprovalAndRescheduling>
    </HStack>
  );
};

export default InspectionHistoryComponent;
