import {HStack, Image, Text} from '@chakra-ui/react';
import defaultImage from '/src/images/image-fallback.png';
import {priceString} from '/src/utils/formatAmount';
import Link from 'next/link';
import {Button} from 'ui-lib';
import {themeStyles} from '/src/theme';
import {formatAmountWithDecimal} from '../../utils/formatAmount';

export const USER_WALLET_TRANSACTIONS = data => [
  {
    Header: 'Date',
    accessor: row => {
      return row?.date || '-';
      // return row?.created_at.slice(0, 10);
    },
  },
  {
    Header: 'Description',
    accessor: row => {
      return (
        <Text pr="7px" fontSize={'14px'}>
          {row?.description || '-'}
        </Text>
      );
    },
  },
  {
    Header: 'Reference',
    accessor: row => {
      return (
        <Text pr="7px" fontSize={'14px'}>
          {row?.reference || '-'}
        </Text>
      );
    },
  },
  {
    Header: 'Debit',
    accessor: row => {
      return (
        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color={themeStyles.color.matador__red}
        >
          {row?.debit == '0' ? '-' : formatAmountWithDecimal(row?.debit)}
        </Text>
      );
    },
  },
  {
    Header: 'Deposit',
    accessor: row => {
      return (
        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color={themeStyles.color.matador__green}
        >
          {row?.deposit == '0' ? '-' : formatAmountWithDecimal(row?.deposit)}
        </Text>
      );
    },
  },
  {
    Header: 'Previous Balance',
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" lineHeight="18px" color={'#191919'}>
          {row?.balance == '0' ? '-' : formatAmountWithDecimal(row?.balance)}
        </Text>
      );
    },
  },
];
