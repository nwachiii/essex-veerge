import React from 'react';
import {Box, SimpleGrid, VStack, Stack, Text} from '@chakra-ui/react';

const TransactionForGraphState = () => {
  return (
    <SimpleGrid w="full" h="full" columns={2} spacingY="10px" spacingX="10px">
      <Stack
        borderRadius="12px"
        w="189px"
        border="solid 1px #E4E4E4"
        spacing="8px"
        px="15px"
        py="13px"
      >
        <Text color="#CBCBCB">₦ 0.00</Text>
        <Text color="#3D3D3D" fontSize="10px" fontWeight="500">
          Balance
        </Text>
      </Stack>
      <Stack
        borderRadius="12px"
        w="189px"
        border="solid 1px #E4E4E4"
        spacing="8px"
        px="15px"
        py="13px"
      >
        <Text color="#CBCBCB">₦ 0.00</Text>
        <Text color="#3D3D3D" fontSize="10px" fontWeight="500">
          Income
        </Text>
      </Stack>
      <Stack
        borderRadius="12px"
        w="189px"
        border="solid 1px #E4E4E4"
        spacing="8px"
        px="15px"
        py="13px"
        h="full"
      ></Stack>
      <Stack
        w="189px"
        border="solid 1px #E4E4E4"
        borderRadius="12px"
        spacing="8px"
        px="15px"
        py="13px"
      >
        <Text color="#CBCBCB">₦ 0.00</Text>
        <Text color="#3D3D3D" fontSize="10px" fontWeight="500">
          Withdrawal
        </Text>
      </Stack>
    </SimpleGrid>
  );
};

export default TransactionForGraphState;
