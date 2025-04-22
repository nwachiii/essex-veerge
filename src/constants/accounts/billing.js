import {Box, HStack, Image, Tag, TagLabel, Text} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import {formatAmountWithDecimal, priceString} from '../../utils/formatAmount';
import ViewWithdrawalDetails from './withdrawal_detail_modal';
import {CustomTag} from '../../ui-lib';
import {handleDateFormat} from '/src/utils/formatDate';
import defaultImage from '../../images/image-fallback.png';
import {handleDateTime} from '../../utils/formatDate';

export const BASIC_PLAN = {
  price: '$ 10.00/month',
  team_access: '1 Admin access',
  data_storage: '5 GB',
  veerge_intelligence: false,
  calendar: false,
  priority_support: false,
  dedicated_account_manager: false,
  customer_support: false,
  unlimited_messages: false,
  tailored: false,
  migration_assistant: false,
  secured_cloud_storage: false,
};

export const STANDARD_PLAN = {
  price: '$ 99.99/month',
  team_access: '3 Admin access',
  data_storage: '50 GB',
  veerge_intelligence: false,
  calendar: true,
  priority_support: true,
  dedicated_account_manager: false,
  customer_support: false,
  unlimited_messages: true,
  tailored: false,
  migration_assistant: true,
  secured_cloud_storage: true,
};

export const PREMIUM_PLAN = {
  price: '$ 200.00/month',
  team_access: 'Unlimited team access',
  data_storage: '150 GB',
  veerge_intelligence: true,
  calendar: true,
  priority_support: true,
  dedicated_account_manager: false,
  customer_support: true,
  unlimited_messages: true,
  tailored: false,
  migration_assistant: true,
  secured_cloud_storage: true,
};
export const EXCLUSIVE_PLAN = {
  price: `Let's Talk`,
  team_access: 'Unlimited team access',
  data_storage: 'Unlimited',
  veerge_intelligence: true,
  calendar: true,
  priority_support: true,
  dedicated_account_manager: false,
  customer_support: true,
  unlimited_messages: true,
  tailored: false,
  migration_assistant: true,
  secured_cloud_storage: true,
};

export const BILLING_HISTORY_COLUMN = (router, limit) => [
  // {
  // 	Header: 'No.',
  // 	accessor: (_, indx) => {
  // 		const page = router?.query?.page ?? '1';
  // 		return `${~~page * ~~limit - ~~limit + (indx + 1)}`;
  // 	},
  // },
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text
          color={themeStyles.color.matador__green}
          textAlign={'center'}
          fontSize="14px"
          fontWeight={'700'}
        >
          {formatAmountWithDecimal(row.amount, '$')}
        </Text>
      );
    },
  },
  {
    Header: 'Type',
    accessor: row => {
      let type = row?.billing_frequency?.toLowerCase();

      return (
        <Tag ml="auto" w="fit-content" px={'1.2em'} colorScheme="gray" borderRadius="full" h="36px">
          <TagLabel mx="auto" textTransform={'capitalize'}>
            {type}
          </TagLabel>
        </Tag>
      );
    },
  },
  {
    Header: 'Rate /$1',
    accessor: row => {
      let dollarRate = formatAmountWithDecimal(row?.dollar_rate);
      return (
        <Text color={'#191919'} textAlign={'center'} fontSize="14px" fontWeight={'700'}>
          {dollarRate}
        </Text>
      );
    },
  },
  {
    Header: 'Naira Equivalent',
    accessor: row => {
      return (
        <Text color={'#191919'} textAlign={'center'} fontSize="14px" fontWeight={'700'}>
          {formatAmountWithDecimal(row?.naira_equivalent)}
        </Text>
      );
    },
  },
  {
    Header: 'Balance before payout',
    accessor: row => {
      return (
        <Text color={'#191919'} textAlign={'center'} fontSize="14px" fontWeight={'700'}>
          {formatAmountWithDecimal(row?.balance_before_payout)}
        </Text>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign={'center'} fontSize="14px" fontWeight={'500'}>
          {`${handleDateFormat(row?.created_at)}`}
        </Text>
      );
    },
  },
];
