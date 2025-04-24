import React from 'react';
import {Text} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';
import {formatAmountWithDecimal} from '../../../../utils';
import { formatTimestamp } from 'utils/formatDate';

const TransactionsColumn = data => [
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign={'center'} fontSize="14px" fontWeight={500}>
          {formatTimestamp(row?.created_at)}
        </Text>
      );
    },
  },
  {
    Header: 'Description',
    accessor: row => {
      return (
        <Text textTransform={'capitalize'} textAlign={'center'} fontSize={'14px'}>
          {row?.description?.replace(/\_/g, ' ')}
        </Text>
      );
    },
  },
  {
    Header: 'Status',
    accessor: row => {
      return (
        <Text textTransform={'capitalize'} textAlign={'center'} fontSize={'14px'}>
          {row?.status}
        </Text>
      );
    },
  },
  {
    Header: 'Reference',
    accessor: row => {
      return (
        <Text textAlign={'center'} fontSize={'14px'}>
          {row?.reference || ' - '}
        </Text>
      );
    },
  },

  {
    Header: 'Debit',
    accessor: row => {
      return (
        <Text
          color={themeStyles.color.matador__red}
          textAlign={'center'}
          fontSize="14px"
          fontWeight={600}
        >
          {row?.debit ? formatAmountWithDecimal(row?.debit) : ' - '}
        </Text>
      );
    },
  },
  {
    Header: 'Credit',
    accessor: row => {
      return (
        <Text
          color={themeStyles.color.matador__green}
          textAlign={'center'}
          fontSize="14px"
          fontWeight={600}
        >
          {row?.deposit ? formatAmountWithDecimal(row?.deposit) : ' - '}
        </Text>
      );
    },
  },
  {
    Header: 'Balance',
    accessor: row => {
      return (
        <Text textAlign={'center'} fontSize="14px" fontWeight={600}>
          {row?.balance ? formatAmountWithDecimal(row?.balance) : ' - '}
        </Text>
      );
    },
  },
];

export default TransactionsColumn;
