import avatar from '/src/images/avatar.svg';

import {HStack, Image, Tag, TagLabel, Text, useToast, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';
import {MatadorCustomDatePicker} from '../../components/common/Calendar/DatePicker';

import {HandleInspectionRequestApproval} from './HandleInspectionRequestApproval';
import {changeDateFormat} from '../../utils/formatDate';
import HoverListingName from '../../components/dashboard/table/HoverListingName';
import UserDrawerRequestData from './UserDrawerRequestData';

export const INSPECTION_REQUEST_COLUMNS = (refetch, roles) => [
  // {
  //   Header: "No.",
  //   accessor: (_, indx) => {
  //     return `${indx <= 9 ? 0 : ""}${indx + 1}`;
  //   },
  // },
  {
    Header: 'Name',
    accessor: row => {
      return <UserDrawerRequestData row={row} />;
    },
  },
  // {
  //   Header: 'Request Date',
  //   accessor: row => {
  //     return (
  //       <Text as="span" textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
  //         {changeDateFormat(row.created_at, 'monthFirst')}
  //       </Text>
  //     );
  //   },
  // },
  {
    Header: 'Listing',
    accessor: row => {
      return <HoverListingName text={row?.project?.name ?? ''} />;
    },
  },
  {
    Header: 'Schedule Date',
    accessor: row => {
      return (
        <HStack spacing="none" justify="start">
          <Text
            as="span"
            textAlign="start"
            color="#191919"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {`${row?.request_time.split(' ')[1]} ${row?.request_time.split(' ')[2]} ${
              row?.request_time.split(' ')[3]
            }`}
            <Text
              as="span"
              textAlign="start"
              color="#606060"
              fontSize="16px"
              w="full"
              fontWeight="400"
            >
              {' '}
              {row?.request_time.split(' ')[0]}
            </Text>
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Type',
    accessor: row => {
      let status = row?.tour_method?.toLowerCase();

      const tagObj = {
        'in-person': {color: '#4545FE', bg: '#7255CB1A', text: 'In person'},
        video: {
          color: '#064B38',
          bg: '#E7FBF5',
          text: 'Virtual',
        },
      };
      return (
        <HStack justify="start" w="full">
          <Tag
            px="13px"
            py="8px"
            bg={tagObj[status].bg}
            fontSize="16px"
            fontWeight="400"
            color={tagObj[status].color}
            borderRadius="48px"
          >
            <TagLabel mx="auto">{tagObj[status].text}</TagLabel>
          </Tag>
        </HStack>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <HStack spacing="24px" h="40px">
          <HandleInspectionRequestApproval
            requestId={row?.id}
            supervisorId={row?.supervisor}
            row={row}
            refetch={refetch}
            roles={roles}
          />

          <MatadorCustomDatePicker refetch={refetch} id={row?.id} />
        </HStack>
      );
    },
  },
];
