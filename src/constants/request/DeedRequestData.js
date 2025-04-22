import avatar from '../../images/avatar.svg';
import uploadIcon from '../../images/icons/upload-icon.png';
import {HStack, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import {Button} from '../../ui-lib';
import UploadDoc from '../../pages/request/deed_request/upload_doc';
import {changeDateFormat} from '../../utils/formatDate';
import HoverListingName from '../../components/dashboard/table/HoverListingName';

export const DEED_REQUEST_DATA = [
  {
    id: 1,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 2,
    image: avatar,
    name: 'Albert Flores',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 3,
    image: avatar,
    name: 'Guy Hawkins',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 4,
    image: avatar,
    name: 'Jerome Bell',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 5,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 6,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 7,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 8,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 9,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 10,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 11,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 12,
    image: avatar,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
];

export const DEED_REQUEST_COLUMN = refetch => [
  // {
  //   Header: "No.",
  //   accessor: (_, indx) => {
  //     return `${indx <= 9 ? 0 : ""}${indx + 1}`;
  //   },
  // },

  {
    Header: 'Name',
    accessor: row => {
      return (
        <HStack spacing="10px">
          <Image
            alt=""
            borderRadius="full"
            objectFit="cover"
            boxSize="47.29px"
            src={row?.owner?.avatar ?? avatar.src}
          />
          <Text
            as="span"
            maxW="156px"
            whiteSpace="break-spaces"
            wordBreak="break-all"
            color="#191919"
            fontSize="16px"
            fontWeight="400"
          >
            {`${row?.owner?.first_name} ${row?.owner?.last_name} `}
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
          {/* {changeDateFormat(row.created_at, "monthFirst")} */}
          Jul 30, 2022
          <Text
            as="span"
            textAlign="start"
            color="#606060"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            | 06:00PM
          </Text>
        </Text>
      );
    },
  },
  {
    Header: 'Property',
    accessor: row => (
      // <VStack maxW="250px" align="flex-start">
      //   <Text as="span" maxW="250px" textAlign="left" whiteSpace="break-spaces">
      //     {/*  */}
      //   </Text>
      // </VStack>
      <HoverListingName
        // text={`${row.unit_title}, ${row.listing_name}`}
        text={'3 Bedroom, Astrid 2.0 '}
      />
    ),
  },
  {
    Header: 'Date Purchased',
    accessor: row => (
      <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
        {/* {changeDateFormat(row.created_at, "monthFirst")} */}
        Jul 28, 2022
      </Text>
    ),
  },

  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        // <Link prefetch={false} href="/request/deed_request/upload_doc">
        //   <Button variant="primary" w="149px">
        //     <Image h="20px" src={uploadIcon.src} mr={2} /> Upload
        //   </Button>
        // </Link>
        <UploadDoc id={row.id} refetch={refetch} />
      );
    },
  },
];
