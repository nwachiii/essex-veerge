import {HStack, Image, Tag, TagLabel, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {MatadorCustomDatePicker} from '../../../components/common/Calendar/DatePicker';
import femaleImg from '../../../images/avatar.svg';
import View from '../../../pages/request/inspection_request/View';
import {Button} from '../../../ui-lib';
import {changeDateFormat} from '../../../utils/formatDate';
import HoverListingName from '../../../components/dashboard/table/HoverListingName';
import HoverText from '../../../ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import HistoryDrawerClosed from './Drawer.with.history';

export const INSPECTION_REQUEST_DATA_HISTORY = [
  {
    id: 1,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 2,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Daniel Steward',
    date: '6th August',
    time: '08:00am',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 3,
    image: femaleImg,
    name: 'Ariene McCay',
    date: '6th August',
    time: '11:00am',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 4,
    image: femaleImg,
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 5,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 6,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 7,
    image: femaleImg,
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 8,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 9,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 10,
    image: femaleImg,
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 11,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 12,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 13,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
];

export const INSPECTION_REQUEST_COLUMNS_HISTORY = (refetch, roles) => [
  // {
  //   Header: "No.",
  //   accessor: (_, indx) => {
  //     return `${indx <= 9 ? 0 : ""}${indx + 1}`;
  //   },
  // },
  {
    Header: 'Name',
    accessor: row => {
      return <HistoryDrawerClosed row={row} />;
    },
  },
  {
    Header: 'Request Date',
    accessor: row => (
      <HStack justify="start" pl="10px" w="full">
        <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {changeDateFormat(row.created_at, 'monthFirst')}
        </Text>
      </HStack>
    ),
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
    Header: 'Property',
    accessor: row => {
      return <HoverListingName text={row?.project?.name} />;
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
        <Tag
          w="95px"
          h="36px"
          size="lg"
          fontSize="16px"
          fontWeight="400"
          bg={tagObj[status].bg}
          color={tagObj[status].color}
          borderRadius="full"
        >
          <TagLabel mx="auto">{tagObj[status].text}</TagLabel>
        </Tag>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <HStack spacing="24px" h="40px">
          {
            <HoverText
              text={
                row?.approved_by?.first_name && row?.approved_by?.last_name
                  ? `${row?.approved_by?.first_name} ${row?.approved_by?.last_name}`
                  : null
              }
              component={Comprops => (
                <HStack
                  justify="center"
                  borderRadius="12px"
                  bg="#242526"
                  color="#ffffff"
                  fontSize="18px"
                  fontWeight="400"
                  w="149px"
                  h="40px"
                  {...Comprops}
                >
                  <Text>Approved</Text>
                </HStack>
              )}
            />
          }

          <View refetch={refetch} row={row} roles={roles} requestId={row?.id} />
        </HStack>
      );
    },
  },
];
