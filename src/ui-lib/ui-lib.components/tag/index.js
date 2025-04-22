import {Box, Tag, TagLabel} from '@chakra-ui/react';
import React from 'react';
import {truncateLongText} from 'utils';

const TransactionTypeTags = ({type, tagStyle}) => {
  const transactionType = [
    {case: 'outright', text: 'Outright', colorScheme: 'green'},
    {case: 'shared_outright', text: 'Co-Outright', colorScheme: 'green'},
    {case: 'initial_deposit', text: 'Initial deposit', colorScheme: 'purple'},
    {case: 'shared_initial_deposit', text: 'Co-Initial deposit', colorScheme: 'purple'},
    {case: 'installment', text: 'Installment', colorScheme: 'blue'},
    {case: 'shared_installment', text: 'Co-Top up', colorScheme: 'blue'},
    {case: 'recurring', text: 'Recurring', colorScheme: 'yellow'},
    {case: 'fraction', text: 'Fractional', colorScheme: 'yellow'},
  ];

  const displayTag = () => {
    const tagObj = transactionType.find(item => item.case === type);

    if (tagObj) {
      return (
        <Box display={'flex'} {...tagStyle?.box}>
          <Tag
            minW="130px"
            colorScheme={tagObj.colorScheme}
            borderRadius="full"
            h="36px"
            px="6px"
            {...tagStyle?.tag}
          >
            <TagLabel mx="auto" {...tagStyle?.label}>
              {tagObj.text}
            </TagLabel>
          </Tag>
        </Box>
      );
    } else {
      return (
        <Box display={'flex'} {...tagStyle?.box}>
          <Tag w="130px" colorScheme="green" borderRadius="full" h="36px" {...tagStyle?.tag}>
            <TagLabel mx="auto" {...tagStyle?.label}>
              Deposit
            </TagLabel>
          </Tag>
        </Box>
      );
    }
  };

  return displayTag();
};

export default TransactionTypeTags;
