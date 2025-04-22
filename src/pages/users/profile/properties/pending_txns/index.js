import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useDisclosure,
  Button as ChakraBtn,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../../../theme';
import {formatAmountWithDecimal} from '../../../../../utils/formatAmount';
import {demarcatedDateTime} from 'utils/formatDate';
import Image from 'next/image';
import {EmptyState} from '@/components/common/Table';

export const PendingTxns = ({data}) => {
  const PENDING_TXNS_DRAWER = useDisclosure();
  // console.log('Pending Txns', data);
  return (
    <div style={{position: 'relative'}}>
      <Text fontSize="18px" fontStyle="normal" fontWeight="500" lineHeight="normal" mb="19px">
        Pending Transactions
      </Text>
      <Box
        padding={'17px 24px'}
        color="#191919"
        fontFamily="Euclid Circular B"
        w="full"
        maxH="82px"
        h="fit-content"
        // flexShrink="0"
        borderRadius="16px"
        background="#FFF"
        border="0.5px solid #E4E4E4"
        // boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
      >
        <Flex w="full" justify={'space-between'} align={`center`}>
          <Text fontSize={data?.length ? '28px' : `16px`} fontWeight={data?.length ? '700' : `500`}>
            {data?.length || 'No pending transactions'}
          </Text>
          <ChakraBtn
            onClick={PENDING_TXNS_DRAWER.onOpen}
            variant="outline"
            h="48px"
            border="1px solid #D0D5DD"
            borderRadius="12px"
            _hover={{bg: 'transparent'}}
            _focus={{bg: 'transparent'}}
            _active={{bg: 'transparent'}}
            w="161px"
            fontSize="16px"
            fontWeight="400"
            color="#3D3D3D"
          >
            View
          </ChakraBtn>
        </Flex>
      </Box>
      <Drawer
        size={'sm'}
        isOpen={PENDING_TXNS_DRAWER.isOpen}
        placement="right"
        onClose={PENDING_TXNS_DRAWER.onClose}
      >
        <DrawerOverlay />
        <DrawerContent mt="65.12px" color="#191919" fontFamily="Euclid Circular B">
          <DrawerCloseButton />
          <DrawerHeader borderBottom={'1px solid lightgray'} bg="#F5F5F5">
            Pending Transactions
          </DrawerHeader>

          <DrawerBody p={{base: `10px 24px`}}>
            <Stack w="full" gap="12px">
              {data?.length <= 0 ? (
                <EmptyState
                  title={`No Pending Transactions`}
                  description={`There are currently no pending transactions`}
                />
              ) : (
                data?.map((item, i) => (
                  <Box key={i} w="full" position={'relative'}>
                    <Flex
                      gap="8px"
                      background={`#F9FAFB`}
                      border={`0.5px solid #E4E4E4`}
                      p={`8px 12px`}
                      align={`center`}
                      borderRadius={`4px`}
                    >
                      <Center
                        h="86px"
                        w={'86px'}
                        minW={'86px'}
                        borderRadius={'6px'}
                        overflow={'hidden'}
                        position="relative"
                        bg={`#cccccc`}
                      >
                        <Image
                          src={item?.images?.[0]?.photo}
                          fill
                          style={{objectFit: 'cover'}}
                          alt=""
                        />
                      </Center>
                      <Stack gap={'4px'}>
                        <Text
                          w="185px"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="100%"
                          color={'#191919'}
                        >
                          {`${item?.listing_name}, ${item?.unit_type}`}
                        </Text>
                        <Text
                          fontSize={'12px'}
                          fontWeight="500"
                          color={'#3d3d3d'}
                          lineHeight="100%"
                        >
                          {formatAmountWithDecimal(item?.amount)}
                        </Text>
                        <Text
                          fontSize={'10px'}
                          fontWeight={'400'}
                          color={'#606060'}
                          lineHeight="100%"
                        >
                          {item?.payment_type}
                        </Text>
                      </Stack>
                    </Flex>

                    <Text
                      fontSize={'9px'}
                      py="7px"
                      fontWeight={'500'}
                      borderRadius={'15px'}
                      position={'absolute'}
                      top={'4px'}
                      // w="fit-content"
                      right="8px"
                      color={themeStyles.color.matador__red}
                      p={'4px 7px'}
                      bg="#FDD"
                    >
                      Expires: {demarcatedDateTime(item?.exp_date).split('|')[0] || item?.exp_date}
                    </Text>
                  </Box>
                ))
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PendingTxns;
