import {HStack, Image, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {Button} from '../../ui-lib';
import avatar from '/src/images/avatar.svg';

export const BLACKLIST_COLUMN = [
  // {
  //   Header: 'No.',
  //   accessor: (_, indx) => (
  //     <HStack justify="start" w="full">
  //       <Text
  //         as="span"
  //         wordBreak="break-all"
  //         color="#191919"
  //         fontSize="16px"
  //         fontWeight="400"
  //         textTransform="capitalize"
  //       >
  //         {indx <= 9 ? 0 : ''}
  //         {indx + 1}.
  //       </Text>
  //     </HStack>
  //   ),
  // },
  {
    Header: 'Name',
    accessor: row => {
      console.log('history', row);
      return (
        <HStack spacing="10px">
          <Image
            alt=""
            borderRadius="full"
            boxSize="47.29px"
            objectFit="cover"
            src={row?.img ?? avatar.src}
          />
          <Text
            as="span"
            wordBreak="break-all"
            color="#191919"
            fontSize="16px"
            fontWeight="400"
            textTransform="capitalize"
          >
            {row?.name}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Location',
    accessor: row => (
      <HStack justify="start" w="full">
        <Text
          as="span"
          wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          textTransform="capitalize"
        >
          {row?.location}
        </Text>
      </HStack>
    ),
  },
  {
    Header: 'Phone',
    accessor: row => (
      <HStack justify="start" w="full">
        <Text
          as="span"
          wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          textTransform="capitalize"
        >
          {row?.phone}
        </Text>
      </HStack>
    ),
  },
  {
    Header: 'Joined Date',
    accessor: row => (
      <HStack justify="start" w="full">
        <Text
          w="full"
          as="span"
          wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          textTransform="capitalize"
        >
          {row?.date_joined}
        </Text>
      </HStack>
    ),
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => (
      <HStack justify="start" w="full">
        <Link prefetch={false} href={`/users/manage_agents/${row.id} `}>
          <Button mt={0} variant="outline" border="1px solid #4545FE" color="#4545FE" w="139px">
            View
          </Button>
        </Link>
      </HStack>
    ),
  },
];
