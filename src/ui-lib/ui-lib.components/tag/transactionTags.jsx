import {Box, Tag, TagLabel} from '@chakra-ui/react';
import React from 'react';
import {truncateLongText} from 'utils';

const TransactionTags = ({type, tagStyle}) => {
  const transactionType = key => {
    switch (key) {
      case 'outright':
        return {case: 'outright', text: 'Outright Payment', bg: '#E4EFFF', color: '#5451FF'};
      case 'shared_equity_outright':
        return {
          case: 'shared_equity_outright',
          text: 'Outright Payment',

          bg: '#E4EFFF',
          color: '#5451FF',
        };
      case 'shared_outright':
        return {
          case: 'shared_equity_outright',
          text: 'Outright Payment',

          bg: '#E4EFFF',
          color: '#5451FF',
        };
      case 'equity_outright':
        return {
          case: 'shared_equity_outright',
          text: 'Outright Payment',

          bg: '#E4EFFF',
          color: '#5451FF',
        };
      case 'initial_deposit':
        return {
          case: 'initial_deposit',
          text: 'Initial deposit',

          bg: '#F9F5FF',
          color: '#6941C6',
        };
      case 'equity_plan_initial':
        return {
          case: 'initial_deposit',
          text: 'Initial deposit',

          bg: '#F9F5FF',
          color: '#6941C6',
        };
      case 'shared_equity_plan_initial':
        return {
          case: 'shared_equity_initial_deposit',
          text: 'Initial deposit',

          bg: '#F9F5FF',
          color: '#6941C6',
        };
      case 'installment':
        return {case: 'installment', text: 'Deposit', color: 'green.800', bg: 'green.50'};

      case 'equity_plan_deposit':
        return {
          case: 'shared_installment',
          text: 'Deposit',

          color: 'green.800',
          bg: 'green.50',
        };
      case 'recurring':
        return {
          case: 'recurring',
          text: 'Recurring',

          bg: '#E4EFFF',
          color: '#5451FF',
        };
      case 'equity_fractions':
        return {case: 'fraction', text: 'Fractional', colorScheme: 'yellow'};
      case 'fraction':
        return {case: 'fraction', text: 'Fractional', colorScheme: 'yellow'};

      default:
        return {case: 'default', text: 'Deposit', color: 'green.800', bg: 'green.50'};
    }
  };

  const displayTag = () => {
    return (
      <Box display={'flex'} w="fit-content" mx="auto" {...tagStyle?.box}>
        <Tag
          minW="130px"
          bg={transactionType(type)?.bg}
          colorScheme={transactionType(type)?.colorScheme}
          px="16px"
          h="36px"
          py="8px"
          borderRadius="full"
          {...tagStyle?.tag}
        >
          <TagLabel
            mx="auto"
            color={transactionType(type)?.color}
            fontSize="16px"
            fontWeight="500"
            {...tagStyle?.label}
          >
            {transactionType(type).text}
          </TagLabel>
        </Tag>
      </Box>
    );
  };

  return displayTag();
};

export default TransactionTags;
