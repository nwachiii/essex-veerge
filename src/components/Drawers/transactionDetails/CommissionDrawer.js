import React from 'react';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  Spinner,
  Image,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {IoArrowBackSharp} from 'react-icons/io5';

import {fetchCommission} from 'apis/customers';

import emptyIcon from '/src/images/icons/emptyIcon.png';
import { formatToCurrency } from 'utils/formatAmount';
import { formatDate, formatDateString, formatTimestamp } from 'utils/formatDate';

const EmptyState = () => {
  return (
    <VStack spacing="none" mx="auto" w="full" h="full" py="100px">
      <Image alt="empty table icon" src={emptyIcon.src} />
      <Text fontSize={'20px'} mt="16px" color="#3D3D3D" fontWeight={'700'}>
        Nothing Found
      </Text>
      <Text
        w="full"
        textAlign="center"
        fontSize="14px"
        fontWeight="400"
        mx="auto"
        color="#919191"
        mt="12px"
      >
        No commission has been paid yet.
      </Text>
    </VStack>
  );
};

const CommissionDrawer = ({modalDisclosure, equityId, startQuery}) => {
  const handleClose = () => {
    return modalDisclosure.onClose();
  };

  const {data, isError, isLoading, error} = useQuery(
    ['commission', equityId],
    async () => await fetchCommission(equityId),
    {
      enabled: startQuery,
    }
  );

  return (
    <Drawer isOpen={modalDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />

      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
      >
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="20px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
        >
          <Flex alignItems="center" gap={2}>
            <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={handleClose} />
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Commission
            </Text>
          </Flex>
          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>

        <Box
          display="flex"
          flexDirection="column"
          gap="16px"
          py="0px"
          px="25px"
          overflowY={'scroll'}
        >
          {isLoading ? (
            <VStack w="full" justify="center" align="center" h="20vh">
              <Spinner />
            </VStack>
          ) : data?.data?.data?.length === 0 ? (
            <EmptyState />
          ) : data?.data?.data?.map(comm => (
            <Box bg="#F5F5F5" p="12px" width="full" borderRadius="12px" key={comm}>
              <Flex width="full" justifyContent="space-between" alignItems="center">
                <Box display="flex" flexDirection="column" gap="4px">
                  <Text color="#191919" fontSize="14px" fontWeight="400">
                    {formatToCurrency(comm?.amount_paid)}
                  </Text>
                  <Text color="#606060" fontSize="10px" fontWeight="400" textAlign="start">
                    {comm?.percentage_paid}%
                  </Text>
                </Box>
                <Box display="flex" flexDirection="column" gap="4px">
                  <Text color="#4545FE" fontSize="14px" fontWeight="400" textAlign="end">
                    Paid
                  </Text>
                  <Text color="#606060" fontSize="10px" fontWeight="400">
                    {formatTimestamp(comm?.responded_at)}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default CommissionDrawer;
