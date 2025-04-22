import {HStack, Text} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from 'utils/formatAmount';

const AmountAggregator = ({data, keyToSum}) => {
  if (!data || !Array.isArray(data)) {
    return 0;
  }

  if (!keyToSum || typeof keyToSum !== 'string') {
    return 0;
  }

  const total = data.reduce((accumulator, currentItem) => {
    const amount = Number(currentItem[keyToSum]);
    return accumulator + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <HStack
      gap="8px"
      p="8px 14px"
      bg="#f5f5f5"
      border="1px solid #e5e5e5"
      boxShadow="4px 4px 8px 0px #7B9D9D26"
      borderRadius="6.49px"
      maxH="30px"
    >
      <Text fontSize="14px" fontWeight="500" color="#737373" lineHeight="14px">
        Total
      </Text>
      <Text fontSize="14px" fontWeight="400" color="#737373" lineHeight="14px">
        {formatToCurrency(total)}
      </Text>
    </HStack>
  );
};

export default AmountAggregator;
