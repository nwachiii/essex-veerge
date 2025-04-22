import {Text} from '@chakra-ui/react';
import React from 'react';
import {formatAmount} from './formatAmount';

export const handleLastTwoDigits = amount => {
  const getLastTwoDigits = amount?.toFixed(2)?.toString()?.slice(-3);
  return (
    <Text as="span" color="lightgrey">
      {getLastTwoDigits}
    </Text>
  );
};
export const removeLasttTwoDigits = amount => {
  return amount.toString().search('.') > -1
    ? formatAmount(amount?.toString()?.slice(0, -3))
    : formatAmount(amount?.toFixed(2)?.toString()?.slice(0, -3));
};
export const removeLastTwoDigits = amount => {
  return amount.toString().search('.') > -1
    ? formatAmount(amount?.toFixed(2)?.toString()?.slice(0, -3))
    : formatAmount(amount);
};
