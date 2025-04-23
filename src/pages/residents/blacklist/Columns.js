import {Text} from '@chakra-ui/react';
import {truncateLongText} from 'utils';
import {BsDashLg} from 'react-icons/bs';
import RemoveUserFromBlacklist from './RemoveUserFromBlacklist';
import ColumnsCustomerDrawer from '../customer_overview/CustomersTable/Table/columns_with_drawer';

export const BLACKLIST_COLUMNS = refetch => [
  {
    Header: 'Name',
    accessor: row => {
      return <ColumnsCustomerDrawer user={row} />;
    },
  },

  {
    Header: 'Email address',
    accessor: row => {
      return (
        <Text cursor={'pointer'} color={'#4545FE'} textAlign={'left'} fontSize={'14px'}>
          <a href={`mailto:${row?.email}`}> {truncateLongText(row?.email, 29)?.truncatedText} </a>
        </Text>
      );
    },
  },
  {
    Header: 'Phone',
    accessor: row => {
      return <Text fontSize={'14px'}>{row?.phone}</Text>;
    },
  },
  {
    Header: 'Referral',
    accessor: row => {
      return (
        <Text w="full" fontSize={'14px'}>
          {row?.referral || <BsDashLg />}
        </Text>
      );
    },
  },

  {
    Header: 'Remove',
    hideHeader: true,
    accessor: row => {
      return <RemoveUserFromBlacklist refetch={refetch} row={row} />;
    },
  },
];

export default BLACKLIST_COLUMNS;
