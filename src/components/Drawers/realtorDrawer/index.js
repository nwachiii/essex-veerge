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
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchAgentsDrawer} from '../../../apis/manageAgent';
import Property from './Property';
import {ContactCard} from './ContactCard';

const RealtorDrawer = ({modalDisclosure, agentId, runQuery, children}) => {
  const handleClose = () => {
    return modalDisclosure.onClose();
  };

  const {data, isError, isLoading, error} = useQuery(
    ['individual-customer-profile', agentId],
    async () => await fetchAgentsDrawer(agentId),
    {
      enabled: runQuery,
    }
  );

  return (
    <>
      {children && (
        <Box as="span" cursor={'pointer'} onClick={() => modalDisclosure.onOpen()}>
          {children}
        </Box>
      )}
      <Drawer isOpen={modalDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
        <DrawerOverlay bg="rgba(0,0,0,0.07)" />

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
            mb="10px"
            py="12px"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
            width="full"
          >
            <Flex width="full" justifyContent="space-between" alignItems="center">
              <Text fontSize="20px" fontWeight={600} color="#191919">
                Profile
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
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>

          <Box
            display="flex"
            flexDirection="column"
            gap="14px"
            py="0px"
            px="26px"
            overflowY={'scroll'}
          >
            {isLoading ? (
              <VStack w="full" justify="center" align="center" h="20vh">
                <Spinner />
              </VStack>
            ) : isError ? (
              <VStack w="full" justify="center" align="center" h="40vh">
                <Text fontSize="14px" fontWeight="400" textAlign="center" w="300px" color="#000">
                  {`${
                    error?.response?.status === 500
                      ? "Apologies for the inconvenience. We're working on it. Please try again later."
                      : error?.response?.status === 401
                        ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                        : (error?.response?.data?.message ??
                          error?.response?.message ??
                          error?.message ??
                          'Something went wrong')
                  }`}
                </Text>
              </VStack>
            ) : (
              <>
                <ContactCard data={data} agentId={agentId} />
                <Property data={data} />
              </>
            )}
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RealtorDrawer;
