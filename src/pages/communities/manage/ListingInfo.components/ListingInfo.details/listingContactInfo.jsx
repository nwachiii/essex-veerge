import {Box, Flex, HStack, Stack, Text, Tooltip, VStack} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from 'theme';

const ListingContactInfo = ({listingDetail}) => {
  return (
    <Stack {...themeStyles.card_container} p="16px" spacing="16px" w="full">
      <HStack align="flex-start" justify="space-between">
        <Text
          wordBreak="break-word"
          whiteSpace="break-spaces"
          fontWeight="500"
          fontSize="16px"
          lineHeight="20.29px"
          color="#191919"
        >
          Occupancy
        </Text>
        <Text fontWeight="500" fontSize="14px" lineHeight="17.75px" color="#525252">
          134/180 Units Occupied
        </Text>
      </HStack>
      <HStack align="flex-start" gap="2px">
        <Tooltip label="Owners" rounded='8px'>
          <Box w="60%" bg="#64C6FF" h="52px" />
        </Tooltip>
        <Tooltip label="Tenants">
          <Box w="20%" bg="#06D001" h="52px" />
        </Tooltip>
        <Tooltip label="Vacant">
          <Box w="20%" bg="#E4E4E7" h="52px" />
        </Tooltip>
      </HStack>
      <HStack align="flex-start" gap="16px">
        <Flex align="center" gap="8px">
          <Box boxSize="12px" rounded="full" bg="#64C6FF" />
          <Text color='#52525B' fontWeight={500} fontSize='14px'>Owners</Text>
        </Flex>
        <Flex align="center" gap="8px">
          <Box boxSize="12px" rounded="full" bg="#06D001" />
          <Text color='#52525B' fontWeight={500} fontSize='14px'>Tenants</Text>

        </Flex>
        <Flex align="center" gap="8px">
          <Box boxSize="12px" rounded="full" bg="#E4E4E7" />
          <Text color='#52525B' fontWeight={500} fontSize='14px'>Vacant</Text>

        </Flex>
      </HStack>
    </Stack>
  );
};

export default ListingContactInfo;
