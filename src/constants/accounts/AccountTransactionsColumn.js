import React from 'react';
import {handleDateFormat} from '../../utils/formatDate';
import {formatAmount, formatAmountWithDecimal, priceString} from '../../utils/formatAmount';
import {Text} from '@chakra-ui/react';
import {themeStyles} from '../../theme';

export const AccountTransactionsColumn = data => [
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign={'center'} fontSize="14px" fontWeight={500}>
          {row?.date}
        </Text>
      );
    },
  },
  {
    Header: 'Description',
    accessor: row => {
      return (
        <Text textTransform={'capitalize'} textAlign={'center'} fontSize={'14px'}>
          {row?.description.replace(/\_/g, ' ')}
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
          {row?.debits ? formatAmountWithDecimal(row?.debits) : ' - '}
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
          {row?.deposits ? formatAmountWithDecimal(row?.deposits) : ' - '}
        </Text>
      );
    },
  },
  {
    Header: 'Net Transaction',
    accessor: row => {
      return (
        <Text textAlign={'center'} fontSize="14px" fontWeight={600}>
          {row?.balance ? formatAmountWithDecimal(row?.balance) : ' - '}
        </Text>
      );
    },
  },
];
