import {HStack, Image, Text} from '@chakra-ui/react';
import {priceString} from '/src/utils/formatAmount';
import {handleDateFormat} from '../../utils/formatDate';
import UserWalletCustomerDrawer from 'constants/accounts/store_wallet/users_txns_customer_drawer';

export const FRACTIONAL_TXNS_COLUMNS = data => [
  // {
  //   Header: 'No.',
  //   accessor: row => {
  //     const position = 1 + data.indexOf(row);
  //     return (
  //       <Text w="18px" px={0}>
  //         {position}
  //       </Text>
  //     );
  //   },
  // },

  {
    Header: 'Name',
    accessor: row => {
      const user = row?.owner || row?.customer_info;

      return (
        <UserWalletCustomerDrawer row={row} user={user}>
          <HStack textAlign={'left'} spacing="10px" cursor="pointer">
            <Image
              alt="avatar"
              borderRadius="full"
              height="48px"
              width="48px"
              objectFit="cover"
              src={row?.owner?.avatar}
            />
            <Text
              pr="7px"
              fontSize="16px"
              wordWrap={'break-word'}
              textTransform="capitalize"
              // _hover={{textDecoration: 'underline'}}
            >
              {`${row?.owner?.first_name} ${row?.owner?.last_name}`}
            </Text>
          </HStack>
        </UserWalletCustomerDrawer>
      );
    },
  },

  {
    Header: 'Total Fractions',
    accessor: row => {
      return (
        <Text
          fontSize={'16px'}
          textAlign={'left'}
          // pl="7px"
          wordWrap="break-word"
        >
          {row?.amount}
        </Text>
      );
    },
  },
  {
    Header: 'Purchase price',
    accessor: row => {
      return (
        <Text
          textAlign={'left'}
          // pl={2}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
        >
          {priceString('naira', row?.purchase_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Fractional value',
    accessor: row => {
      return (
        <Text
          textAlign={'left'}
          // pl={2}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
        >
          {priceString('naira', row?.equity_value)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontWeight="400" fontSize="14px" lineHeight="18px" color="#191919">
          {handleDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
];
