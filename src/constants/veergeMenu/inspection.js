import avatar from '/src/images/avatar.svg';

import {HStack, Image, Tag, TagLabel, Text, useToast, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';

import {changeDateFormat} from '../../utils/formatDate';
import CheckoutButton from '../../components/veergeMenu/inspection/checkoutButton';
import FeedbackDrawer from '../../components/veergeMenu/inspection/feedbackDrawer';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import InspectionNameRow from './inspection_name_drawer';

export const INSPECTION_COLUMNS_FOR_UPCOMING = refetch => [
  // {
  //   Header: "No.",
  //   accessor: (_, indx) => {
  //     return `${indx <= 9 ? 0 : ""}${indx + 1}`;
  //   },
  // },
  {
    Header: 'Client',
    accessor: row => {
      return <InspectionNameRow row={row} />;
    },
  },
  {
    Header: 'Listing',
    accessor: row => {
      return (
        <HStack justify="start">
          <HoverText text={row?.project?.name} fontSize="16px" fontWeight="400" color="#606060" />
        </HStack>
      );
    },
  },
  {
    Header: 'Check-in Time',
    accessor: row => {
      const displayTime = row?.schedule_date.split('|');

      return (
        <HStack justify="start">
          <Text
            as="span"
            textAlign="start"
            color="#191919"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {displayTime?.[0]}
            <Text as="span" color="#606060">
              {`  ${displayTime?.[1]}`}
            </Text>
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Assignee',
    accessor: row => {
      return (
        <HStack justify="start">
          <Text
            maxW="156px"
            whiteSpace="break-spaces"
            as="span"
            textAlign="start"
            w="full"
            color="#191919"
            fontSize="16px"
            fontWeight="400"
            textTransform="capitalize"
          >
            {row?.supervisor_full_name ||
              `${row?.assigned_to?.first_name} ${row?.assigned_to?.last_name}`}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Inspection type',
    headerSpace: 'center',
    accessor: row => {
      let status = row?.tour_method?.toLowerCase() ?? 'in-person';

      const color = {
        'in-person': {color: '#4545FE', bg: '#7255CB1A', text: 'In Person'},
        video: {
          color: '#064B38',
          bg: '#12D8A01A',
          text: 'Virtual',
        },
      };
      return (
        <HStack justify="center" w="full">
          <Tag
            w="95px"
            h="36px"
            fontSize="16px"
            fontWeight="400"
            size="lg"
            bg={color[status].bg}
            color={color[status].color}
            borderRadius="full"
          >
            <TagLabel mx="auto">{color[status].text}</TagLabel>
          </Tag>
        </HStack>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    headerSpace: 'center',

    accessor: row => {
      return (
        <HStack spacing="24px" h="40px">
          <CheckoutButton refetch={refetch} REQUESTID={row?.id} />
        </HStack>
      );
    },
  },
];

export const INSPECTION_COLUMNS_FOR_COMPLETED = refetch => [
  // {
  //   Header: "No.",
  //   accessor: (_, indx) => {
  //     return `${indx <= 9 ? 0 : ""}${indx + 1}`;
  //   },
  // },
  {
    Header: 'Client',
    accessor: row => {
      return <InspectionNameRow row={row} />;
    },
  },
  {
    Header: 'Listing',
    accessor: row => {
      return (
        <HStack justify="start">
          <HoverText text={row?.project?.name} fontSize="16px" fontWeight="400" color="#606060" />
        </HStack>
      );
    },
  },
  {
    Header: 'Check-in Time',
    accessor: row => {
      const displayTime = row?.schedule_date.split('|');
      return (
        <HStack justify="start">
          <Text
            as="span"
            textAlign="start"
            color="#191919"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {/* {changeDateFormat(row?.created_at, "add_time")} */}
            {displayTime?.[0]}
            <Text as="span" color="#606060">
              {`  ${displayTime?.[1]}`}
            </Text>
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Assignee',
    accessor: row => {
      return (
        <HStack justify="start">
          <Text
            maxW="256px"
            // w='98px'
            whiteSpace="break-spaces"
            textTransform="capitalize"
            as="span"
            // wordBreak="break-all"
            textAlign="start"
            w="full"
            color="#191919"
            fontSize="1px"
            fontWeight="400"
          >
            {row?.supervisor_full_name ||
              `${row?.assigned_to?.first_name} ${row?.assigned_to?.last_name}`}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Inspection type',
    headerSpace: 'center',
    accessor: row => {
      let status = row?.tour_method?.toLowerCase() ?? 'in-person';

      const color = {
        'in-person': {color: '#4545FE', bg: '#7255CB1A', text: 'In Person'},
        video: {
          color: '#064B38',
          bg: '#12D8A01A',
          text: 'Virtual',
        },
      };
      return (
        <HStack justify="center" w="full">
          <Tag
            w="95px"
            h="36px"
            size="lg"
            fontSize="16px"
            fontWeight="400"
            bg={color[status].bg}
            color={color[status].color}
            borderRadius="full"
          >
            <TagLabel mx="auto">{color[status].text}</TagLabel>
          </Tag>
        </HStack>
      );
    },
  },
  {
    Header: 'Action',
    headerSpace: 'center',

    hideHeader: true,
    accessor: row => {
      return (
        <HStack spacing="24px" h="40px">
          <FeedbackDrawer refetch={refetch} info={row} />
        </HStack>
      );
    },
  },
];
