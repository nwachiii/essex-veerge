import Link from 'next/link';
import {themeStyles} from '/src/theme';
import {CustomTag} from 'ui-lib';
import {handleDateFormat} from '/src/utils/formatDate';
import defaultImage from '/src/images/image-fallback.png';
import ViewWithdrawalDetails from './withdrawal_detail_modal';
import {formatAmountWithDecimal} from '/src/utils/formatAmount';
import {Box, Button, Center, HStack, Image, Tag, TagLabel, Text} from '@chakra-ui/react';
import TransactionDrawerContainer from '@/components/Drawers/transactionDetails/TransactionDrawerContainer';
import avatarFallback from '/src/images/avatar.svg';
import UserWalletCustomerDrawer from './store_wallet/users_txns_customer_drawer';
import {truncateLongText} from 'utils';

export const ACCOUNTS_DEPOSITS_COLUMN = (router, limit) => [
  {
    Header: 'Depositor',
    accessor: row => {
      return (
        <HStack textAlign={'left'} spacing="11px">
          <Image
            alt=""
            height="48px"
            width="47.29px"
            borderRadius="12px"
            src={row?.equity?.customer?.avatar ?? defaultImage?.src}
          />
          <Text pr="7px" fontSize={'14px'}>
            {`${row?.equity?.customer?.first_name} ${row?.equity?.customer?.last_name}`}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize="14px" fontWeight={'500'}>
          {formatAmountWithDecimal(row.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize="14px" fontWeight={'500'}>
          {handleDateFormat(row.created_at)}
        </Text>
      );
    },
  },
  {
    Header: 'Listing name',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize="14px" fontWeight={'500'}>
          {row?.equity?.project?.name}
        </Text>
      );
    },
  },
  {
    Header: 'Payment type',
    accessor: row => {
      let type = row?.connected_transaction?.transaction_action_type?.toLowerCase();
      switch (type) {
        case 'equity_outright':
          return (
            <Tag w="130px" colorScheme="green" borderRadius="full" h="36px">
              <TagLabel mx="auto">full payment</TagLabel>
            </Tag>
          );
          break;
        case 'equity_plan_initial':
          return (
            <Tag w="130px" colorScheme="purple" borderRadius="full" h="36px">
              <TagLabel mx="auto">initial deposit</TagLabel>
            </Tag>
          );
          break;
        case 'installment':
          return (
            <Tag w="130px" colorScheme="blue" borderRadius="full" h="36px">
              <TagLabel mx="auto">top up</TagLabel>
            </Tag>
          );
          break;

        default:
          break;
      }
    },
  },
];

export const ACCOUNTS_UPCOMING_PAYMENTS_COLUMN = () => [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <UserWalletCustomerDrawer prop_user_id={row?.equity?.customer?.user}>
          <HStack textAlign={'left'} spacing="11px">
            <Center
              w="48px"
              h="48px"
              borderRadius={'50%'}
              overflow={'hidden'}
              position={'relative'}
            >
              <Image
                alt="Profile Photo"
                minH={'100%'}
                minW={'100%'}
                objectFit={'cover'}
                // src={row?.equity?.customer?.avatar ?? defaultImage?.src}
                src={row?.equity?.customer?.avatar || avatarFallback.src}
              />
            </Center>
            <Text pr="2px" fontSize={'14px'}>
              {`${row?.equity?.customer?.first_name} ${row?.equity?.customer?.last_name}`}
            </Text>
          </HStack>
        </UserWalletCustomerDrawer>
      );
    },
  },

  {
    Header: 'Property',
    accessor: row => {
      const propertyValue = `${row?.equity?.project?.name}, ${row?.equity?.unit?.unit_title}`;
      return (
        <Box display={'flex'} flexWrap={'wrap'}>
          <Text
            textTransform={'capitalize'}
            wordBreak={'break-word'}
            textAlign={'left'}
            fontSize="14px"
            fontWeight={'500'}
          >
            {row?.equity
              ? truncateLongText(propertyValue?.toLowerCase(), 25).truncatedText
              : 'no equity'}
          </Text>
        </Box>
      );
    },
  },
  {
    Header: 'Payment type',
    accessor: row => (
      <Text
        bg={
          row?.payment_type.toLowerCase() == 'equity'
            ? 'rgba(255, 106, 106, 0.10)'
            : 'rgba(0, 0, 0, 0.10)'
        }
        py="13px"
        borderRadius={'48px'}
        textAlign={'center'}
        fontSize="14px"
        fontWeight={'500'}
        color={row?.payment_type.toLowerCase() == 'equity' ? '#FF6A6A' : '#000'}
        w="120px"
        px="8px"
      >
        {row?.payment_type.toLowerCase() == 'equity'
          ? 'Due payment'
          : row?.payment_type.toLowerCase() == 'equity_auto'
            ? 'Auto-pay'
            : ''}
      </Text>
    ),
  },
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize="16px" fontWeight={'600'}>
          {formatAmountWithDecimal(row.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize="14px" fontWeight={'500'}>
          {handleDateFormat(row.due_date)}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        // <Link href={`/dashboard/outstanding-balance/user_payment/?equityId=${row?.equity?.id}`}>
        <TransactionDrawerContainer user_id={row?.owner?.user?.id} row={row}>
          <Button
            borderRadius="72px"
            w="115px"
            h="40px"
            color={themeStyles.color.primary}
            fontWeight={'400'}
            fontSize="16px"
            borderColor={themeStyles.color.primary}
            variant="outline"
          >
            View
          </Button>

          {/* <Button
          mt={0}
          variant="normal"
          color={'#4545FE'}
          border="1.6px solid #4545FE"
          borderRadius="12px"
          // w="auto"
          w="143px"
          px={3}
          h="40px"
          fontWeight={'400'}
        >
          View
        </Button> */}
        </TransactionDrawerContainer>
      );
    },
  },
];

export const ACCOUNTS_WITHDRAWAL_COLUMN = data => [
  // {
  //   Header: 'No.',
  //   accessor: row => {
  //     const position = 1 + data.indexOf(row);
  //     return <Text w="18px">{position}</Text>;
  //   },
  // },
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text
          color={themeStyles?.color?.matador__red}
          textAlign={'left'}
          fontSize="14px"
          fontWeight={'500'}
        >
          {formatAmountWithDecimal(row?.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Type',
    accessor: row => {
      return (
        <CustomTag
          variant={`${
            row?.transaction_type == 'commission'
              ? 'orange'
              : row?.transaction_type == 'withdrawal'
                ? 'green'
                : row?.transaction_type == 'settlement'
                  ? 'purple'
                  : null
          }`}
          text={`${
            row?.transaction_type == 'commission'
              ? 'Commission'
              : row?.transaction_type == 'withdrawal'
                ? 'Withdrawal'
                : row.transaction_type == 'settlement'
                  ? 'Settlement'
                  : null
          }`}
        />
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize="14px" fontWeight={'500'}>
          {handleDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return <ViewWithdrawalDetails type={row?.transaction_type} id={row.id} />;
    },
  },
];
