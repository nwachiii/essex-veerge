import React from 'react';
import LevyTags from './levyTags';
import {Box, Flex, Text} from '@chakra-ui/react';

const LevyProgressComponent = ({isCompleted}) => {
  return false ? (
    <LevyTags text="Completed" />
  ) : (
    <Flex alignItems="center" gap="12px" w="full">
      <Text color="#3f3f46" fontSize="14px" fontWeight="500">
        40%
      </Text>
      <Box w="full" bg="#e4e4e7" overflow="hidden" borderRadius="4px" h="8px">
        <Box w="40%" borderRadius="4px" bg="#22c55e" h="full" transition="0.8s ease-in-out" />
      </Box>
    </Flex>
  );
};

export default LevyProgressComponent;
