import {HStack, Image, Text} from '@chakra-ui/react';
import fallback from '/src/images/avatar.svg';
import {themeStyles} from '/src/theme';
import {priceString} from '../../../utils/formatAmount';
import Link from 'next/link';
import {Button} from '../../../ui-lib';

export const OUSTANDING_BALANCE_COLUMN = data => [
  // {
  //   Header: 'No.',
  //   accessor: row => {
  //     const position = 1 + data?.indexOf(row);
  //     return <Text w="18px">{position}</Text>;
  //   },
  // },
  // {
  // 	Header: 'Image',
  // 	accessor: (row) => {
  // 		return <Image borderRadius='full' width='47.29px' src={row?.owner?.avatar ?? fallback.src} />;
  // 	},
  // },
  {
    Header: 'Name',
    accessor: row => {
      return (
        <HStack spacing={'11px'}>
          <Image
            alt=""
            borderRadius="full"
            h="47px"
            width="47.29px"
            src={row?.owner?.avatar ?? fallback.src}
          />
          <Text color="#191919" fontSize="16px" lineHeight="25px">
            {`${row?.owner?.first_name} ${row?.owner?.last_name} `}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Listing name',
    accessor: row => {
      return <Text>{row?.project?.name}</Text>;
    },
  },
  {
    Header: 'Unit type',
    accessor: row => {
      return <Text>{row?.unit?.unit_title}</Text>;
    },
  },
  {
    Header: 'Purchase price',
    accessor: row => {
      return (
        <Text fontSize="16px" fontWeight={500}>
          {priceString('naira', row?.total_unit_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    accessor: row => {
      return (
        <Text fontSize="16px" fontWeight={500}>
          {priceString('naira', row?.current_outstanding_balance)}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <Link href={`/account/payment_details/${row?.id}`}>
          <Button mt={0} variant="secondary" borderRadius="12px" w="auto" px={3} h="40px">
            View breakdown
          </Button>
        </Link>
      );
    },
  },
];
