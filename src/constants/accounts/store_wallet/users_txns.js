import {Text} from '@chakra-ui/react';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';
import UserWalletCustomerDrawer from './users_txns_customer_drawer';
import UserActionCustomerDrawer from './action_users_txns_drawer';

export const USERS_TXNS_COLUMNS = () => [
  {
    Header: 'Name',
    accessor: row => {
      const user = row?.customer_info || row?.owner;
      return <UserWalletCustomerDrawer user={user} row={row} />;
    },
  },

  {
    Header: 'Email',
    accessor: row => {
      const user = row?.customer_info || row?.owner;
      return (
        <Text cursor={'pointer'} color={'#4545FE'} textAlign={'left'} fontSize={'14px'}>
          <a href={`mailto:${user?.email}`}> {user?.email} </a>
        </Text>
      );
    },
  },
  {
    Header: 'Phone No.',
    accessor: row => {
      const user = row?.customer_info || row?.owner;
      return (
        <Text fontSize={'14px'} textAlign={'left'}>
          {user?.phone}
        </Text>
      );
    },
  },

  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text fontSize="16px" fontWeight={700} textAlign={'left'}>
          {row.naira_balance == '0.00' ? '-' : formatAmountWithDecimal(row.naira_balance)}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return <UserActionCustomerDrawer row={row} />;
    },
  },
];
