import React from 'react';
import {Image, Text, VStack} from '@chakra-ui/react';
import emptyIcon from '/src/images/icons/emptyIcon.png';

export const EmptyStateView = ({text}) => {
  return (
    <VStack
      align="center"
      justify="center"
      width="888px"
      height="276px"
      background="#FFFFFF"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      borderRadius="16px"
    >
      <Image src={emptyIcon?.src} alt="empty_state" />
      <Text pt="20px" fontWeight="400" fontSize="14px" lineHeight="18px" color="#606060">
        {text ?? 'Empty data'}
      </Text>
    </VStack>
  );
};

export default EmptyStateView;
