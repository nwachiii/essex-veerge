import { Text, useDisclosure} from '@chakra-ui/react';
import ColumnsCustomerDrawer from './columns_with_drawer';
import ColumnsActionCustomerDrawer from './columns_action_drawer';
import {truncateLongText} from 'utils';
import {BsDashLg} from 'react-icons/bs';

export const COLUMNS = (router, limit) => {
  const PENDING_DISCLOSURE = useDisclosure();

  return [
    {
      Header: 'Resident',
      accessor: row => {
        return <ColumnsCustomerDrawer row={row} />;
      },
    },

    // {
    //   Header: 'Email',
    //   accessor: row => {
    //     return (
    //       <Text cursor={'pointer'} color={'#4545FE'} textAlign={'left'} fontSize={'14px'}>
    //         <a href={`mailto:${row?.response?.email}`}>
    //           {' '}
    //           {truncateLongText(row?.response?.email, 29).truncatedText}{' '}
    //         </a>
    //       </Text>
    //     );
    //   },
    // },
    {
      Header: 'Phone',
      accessor: row => {
        return <Text fontSize={'14px'}>{row?.response.phone}</Text>;
      },
    },

    {
      Header: 'Community',
      accessor: row => {
        
        return (
         <Text fontSize={'14px'}>{row?.response?.community}</Text>
        );
      },
    },

    {
      Header: 'Action',
      hideHeader: true,
      accessor: row => {
        return <ColumnsActionCustomerDrawer row={row} />;
      },
    },
  ];
};

export default COLUMNS;
