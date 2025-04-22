import {Flex, Text} from '@chakra-ui/react';
import React, {useState} from 'react';

const Range = () => {
  const [range, setRange] = useState('all');

  const getProps = time => {
    if (time === range) {
      return {
        fontWeight: '600',
        color: 'white',
        bg: '#4545FE',
        borderRadius: '8px',
        px: '7px',
        py: '3px',
        cursor: 'pointer',
      };
    } else {
      return {
        fontWeight: '400',
        px: '7px',
        py: '3px',
        color: '#4545FE',
        cursor: 'pointer',
      };
    }
  };

  return (
    <Flex mb={6} direction="row" alignItems="center" w="100%" justifyContent="center">
      <Text color="#191919" mx="15px">
        View Method
      </Text>
      <Text onClick={() => setRange('all')} {...getProps('all')} mx="15px">
        All Time
      </Text>
      <Text onClick={() => setRange('tomorrow')} {...getProps('tomorrow')} mx="8px" fontSize="14px">
        By Tomorrow
      </Text>
      <Text onClick={() => setRange('3days')} {...getProps('3days')} mx="8px" fontSize="14px">
        In 3 Days
      </Text>
      <Text onClick={() => setRange('1week')} {...getProps('1week')} mx="8px" fontSize="14px">
        In 1 Week
      </Text>
      <Text onClick={() => setRange('1month')} {...getProps('1month')} mx="8px" fontSize="14px">
        In 1 Month
      </Text>
      <Text onClick={() => setRange('date')} {...getProps('date')} mx="8px" fontSize="14px">
        Date Range
      </Text>
    </Flex>
  );
};

export default Range;
