import {Flex, Icon, Text} from '@chakra-ui/react';
import React from 'react';
import {IoArrowDown} from 'react-icons/io5';

const ProgressIndicator = ({hasGained}) => {
  return (
    <Flex gap="2px" bg={hasGained ? '#ecfdf3' : '#fef3f2'} borderRadius="24px" h="36px" p="8px">
      <Icon
        as={IoArrowDown}
        boxSize="20px"
        transform={hasGained ? 'rotate(180deg)' : ''}
        color={hasGained ? '#064b38' : '#f04438'}
      />
      <Text fontSize="14px" fontWeight="500" color={'#292929'} lineHeight="20px">
        <Text as="span" color={hasGained ? '#064b38' : '#f04438'}>
          0%
        </Text>{' '}
        vs last month
      </Text>
    </Flex>
  );
};

export default ProgressIndicator;
