import React, {useEffect} from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  StackDivider,
  Flex,
  Text,
  VStack,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import {CopyIcon} from '@chakra-ui/icons';
import {BiInfoCircle} from 'react-icons/bi';
import {useQuery} from '@tanstack/react-query';
import downloadIcon from '/public/public_image/download.png';
import {fetchDeveloperVirtualAccount} from '../../apis/account';
import {AnimatedLoader} from '../common/loaders';

const DepositDrawer = ({DepositDrawer}) => {
  const DEPOSIT_VIRTUAL_ACCOUNT_QUERY = useQuery(
    ['deposit-virtual-account'],
    fetchDeveloperVirtualAccount,
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
    }
  );
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      outline: '1px solid slategrey',
    },
  };

  const DEPOSIT_VIRTUAL_ACCOUNT = DEPOSIT_VIRTUAL_ACCOUNT_QUERY?.data?.data?.data?.details;

  const {hasCopied, onCopy} = useClipboard(DEPOSIT_VIRTUAL_ACCOUNT?.account_number);

  useEffect(() => {
    DepositDrawer.isOpen ? DEPOSIT_VIRTUAL_ACCOUNT_QUERY?.refetch() : console.log('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DepositDrawer.isOpen]);

  return (
    <>
      <Drawer isOpen={DepositDrawer.isOpen} placement="right" onClose={DepositDrawer.onClose}>
        <DrawerOverlay />
        <DrawerContent mt="65px" maxW="400px" p="0px">
          <HStack
            boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
            py="12px"
            bg="#F5F5F5"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Deposit
            </Text>

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
          {DEPOSIT_VIRTUAL_ACCOUNT_QUERY?.isLoading ? (
            <AnimatedLoader />
          ) : (
            <>
              {' '}
              <DrawerBody sx={customScrollbarStyles} m="0px" px="10px" py="20px">
                <VStack
                  w="full"
                  border="1px solid #E4E4E4"
                  borderRadius="5px"
                  px="10px"
                  spacing="18px"
                  fontFamily="Euclid Circular B"
                  py="16.7px"
                >
                  <Text
                    w="full"
                    borderRadius="10px"
                    background="rgba(69, 69, 254, 0.05)"
                    py="20px"
                    px="10px"
                    fontSize="12px"
                    fontWeight="300"
                    color="#3D3D3D"
                  >
                    Kindly proceed with the payment to the provided account number , and please be
                    aware that there is a fee associated with transfer.
                  </Text>
                  <Box position={'relative'}>
                    {DEPOSIT_VIRTUAL_ACCOUNT?.name ? (
                      <HStack
                        justify={'center'}
                        gap="5px"
                        mt={'17px'}
                        mb={'9px'}
                        mx="auto"
                        w="full"
                      >
                        <Text
                          color="#3D3D3D"
                          textAlign="center"
                          fontFamily="Euclid Circular B"
                          fontSize="11.125px"
                          fontStyle="normal"
                          fontWeight="400"
                          lineHeight="normal"
                        >
                          Account Name:
                        </Text>
                        <Text
                          color="#3D3D3D"
                          fontFamily="Euclid Circular B"
                          fontSize="11.125px"
                          fontStyle="normal"
                          fontWeight="400"
                          lineHeight="normal"
                        >
                          {' '}
                          {DEPOSIT_VIRTUAL_ACCOUNT?.name}
                        </Text>
                      </HStack>
                    ) : null}

                    <Flex
                      direction={'column'}
                      position="relative"
                      justify={'center'}
                      align="center"
                      h="57"
                      //   w="349px"
                      w="242.668px"
                      border="1px solid #E4E4E4"
                      borderRadius={'8.34px'}
                    >
                      <Text
                        color="#0D0D0D"
                        fontSize="11.125px"
                        fontStyle="normal"
                        fontWeight="600"
                        lineHeight="normal"
                      >
                        {DEPOSIT_VIRTUAL_ACCOUNT?.bank_name}
                      </Text>
                      <Text mt="3.48px" textAlign={'center'} fontSize={'19.469px'} fontWeight={600}>
                        {DEPOSIT_VIRTUAL_ACCOUNT?.account_number}
                      </Text>

                      <Box
                        position={'absolute'}
                        right={'5%'}
                        my="auto"
                        variant="default"
                        onClick={onCopy}
                      >
                        {hasCopied ? (
                          <Text fontSize="10px" color="#606060">
                            copied
                          </Text>
                        ) : (
                          <CopyIcon
                            onClick={() => onCopy()}
                            cursor="pointer"
                            color="#191919"
                            h={'24px'}
                            w={'24px'}
                          />
                        )}
                      </Box>
                    </Flex>
                  </Box>
                  <HStack align={'flex-start'}>
                    <BiInfoCircle size={'18px'} style={{marginTop: '.2em'}} color="#606060" />
                    <Text
                      //   w="389px"
                      w="full"
                      color="#606060"
                      fontFamily="Euclid Circular B"
                      fontSize="12px"
                      fontStyle="normal"
                      fontWeight="300"
                      lineHeight="normal"
                    >
                      While most transfers are processed almost immediately, please note that it may
                      take longer in some cases. Be rest assured that we will notify you via email
                      as soon as the transfer is complete.
                    </Text>
                  </HStack>
                </VStack>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DepositDrawer;
