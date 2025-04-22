import {HStack, Heading, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import femaleImg from '../../../images/avatar.svg';
import {Button} from '../../../ui-lib';
import {changeDateFormat} from '../../../utils/formatDate';
import HoverListingName from '../../../components/dashboard/table/HoverListingName';
import HoverText from '../../../ui-lib/ui-lib.components/hoverOnText/hoverOnText';

export const AGENT_REQUEST_DATA_HISTORY = [
  {
    id: 1,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 2,
    image: femaleImg,
    name: 'Albert Flores',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 3,
    image: femaleImg,
    name: 'Guy Hawkins',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 4,
    image: femaleImg,
    name: 'Jerome Bell',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 5,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 6,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 7,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 8,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 9,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 10,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 11,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 12,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
];

export const AGENT_REQUEST_COLUMN_HISTORY = [
  // {
  //   Header: "No.",
  //   accessor: (row, idx) => {
  //     // const position = 1 + data.indexOf(row);
  //     const position = `${idx <= 9 ? 0 : ""}${idx + 1}`;
  //     return <Text w="18px">{position}</Text>;
  //   },
  // },
  {
    Header: 'Name',
    accessor: row => {
      // return <Image borderRadius='full' height='48px' width='47.29px' src={row.avatar ?? defaultImg.src} />;
      return (
        <HStack maxW="250px" justify="start" spacing="10px">
          <Image alt="" borderRadius="full" boxSize="47.29px" src={row?.avatar ?? femaleImg.src} />
          <Text
            textTransform="capitalize"
            as="span"
            color="#191919"
            w="164px"
            textAlign="start"
            whiteSpace="break-spaces"
            fontSize="16px"
            fontWeight="400"
          >
            {`${row?.first_name} ${row?.last_name} `}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Request Date',
    accessor: row => {
      return (
        <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {changeDateFormat(row.sign_up_time, 'monthFirst')}
        </Text>
      );
    },
  },
  {
    Header: 'Phone number',
    accessor: row => {
      return (
        <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {row.phone}
        </Text>
      );
    },
  },
  {
    Header: 'Email Address',
    accessor: row => <HoverListingName text={row.email} color="#4545fe" />,
  },
  {
    Header: 'Date Accepted',
    headerSpace: 'center',
    accessor: row => {
      return (
        <Text textAlign="center" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {row?.approved_at ? changeDateFormat(row.approved_at, 'monthFirst') : '-'}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <HoverText
          pContentStyle={{mr: '4px'}}
          text={
            row?.status
              ? `${row?.approved_by?.first_name ?? '-'} ${row?.approved_by?.last_name ?? ''}`
              : `${row?.rejection_reason ?? ''}`
          }
          component={Comprops => (
            <HStack
              justify="center"
              borderRadius="12px"
              cursor="default"
              border={row.status ? null : 'solid 1px #FF6A6A'}
              color={row.status ? '#ffffff' : '#FF6A6A'}
              bg={row.status ? '#242526' : 'transparent'}
              fontSize="18px"
              fontWeight="400"
              w="149px"
              h="40px"
              {...Comprops}
            >
              <Text> {row.status ? 'Approved' : 'Rejected'}</Text>
            </HStack>
          )}
          popUpCom={
            row.rejection_reason && !row?.status ? (
              <VStack justify="start" p="20px" px="4px" bg="#ffffff">
                <Heading w="full" textAlign="start" as="h1" fontSize="18px" fontWeight="700">
                  Reason for rejection
                </Heading>
                <Text
                  textAlign="start"
                  maxW="340px"
                  w="full"
                  whiteSpace="break-spaces"
                  fontSize="16px"
                  fontWeight="400"
                >
                  {row.rejection_reason}
                </Text>
              </VStack>
            ) : null
          }
        />
      );
    },
  },
];
