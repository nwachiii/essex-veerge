import React, {useState} from 'react';
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import avatar from '/src/images/avatar.svg';
import {useRouter} from 'next/router';
import {FormatToColorfulCurrency, formatAmountWithDecimal} from '../../utils/formatAmount';
import Link from 'next/link';
import {themeStyles} from '../../theme';
import emptyIcon from '/src/images/icons/moneyEmptyIcon.svg';
import CustomerDrawer from '../Drawers/customerDrawer';
import UpcomingPayments from '../Drawers/upcomingPayments';
import HoverText from '@/components/common/Hovertext/HoverText';
import {truncateLongText} from 'utils';
import {FaAngleRight} from 'react-icons/fa';
import {changeDateFormat} from 'utils/formatDate';
import {demotransactions} from 'constants/DEMODATA/account/transactions';

export const AccountTransactionDetails = ({depositsData, withdrawalsData, upcomingDeposits}) => {
  const router = useRouter();
  const isUpcomingLoading = upcomingDeposits?.isLoading;
  const CustomerDetailsModal = useDisclosure();
  const upcomingModal = useDisclosure();
  const [userId, setUserId] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenCustomerModal = item => {
    CustomerDetailsModal.onOpen();
    setUserId(item);
    setRunQuery(true);
  };

  return (
    <SimpleGrid templateColumns="repeat(3,1fr)" w="full" gap="8px">
      <VStack
        spacing={'none'}
        minH="157px"
        bg="#FFFFFF"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        border="1px solid #e4e4e7"
        borderRadius="16px"
        className="cols-span-1 flex flex-col items-start justify-start"
      >
        <div className="w-full p-[12px] border-b border-[#e4e4e7] rounded-t-[16px] bg-[#fbfcfc] flex flex-row justify-between items-center">
          <Text fontSize="16px" fontWeight="600" color="#27272a">
            Refundable Deposits
          </Text>
          {withdrawalsData && !withdrawalsData?.length == 0 ? (
            <Button
              fontSize="12px"
              fontWeight="500"
              color="#4545fe"
              variant="ghost"
              p="0px"
              h="fit-content"
              _hover={{
                bg: 'transparent',
              }}
              rightIcon={<Icon as={FaAngleRight} color="#4545fe" boxSize="10px" />}
              iconSpacing="0px"
            >
              View All
            </Button>
          ) : (
            <Link prefetch={true} href="/refundableDeposit">
              <Button
                fontSize="12px"
                fontWeight="500"
                color="#4545fe"
                variant="ghost"
                p="0px"
                h="fit-content"
                _hover={{
                  bg: 'transparent',
                }}
                rightIcon={<Icon as={FaAngleRight} color="#4545fe" boxSize="12px" />}
                iconSpacing="5px"
              >
                View All
              </Button>
            </Link>
          )}
        </div>

        {
          // !withdrawalsData || withdrawalsData?.length == 0 ? (
          //   <VStack spacing="8px" mx="auto" w={{base: '400px', xl: 'full'}} h="full" py="70px">
          //     <Image alt="empty table icon" src={emptyIcon.src} />
          //     <Text fontSize={'16px'} color="#3D3D3D" fontWeight={'700'}>
          //       NOTHING FOUND
          //     </Text>
          //     <Text
          //       w="full"
          //       textAlign="center"
          //       fontSize="14px"
          //       fontWeight="400"
          //       mx="auto"
          //       color="#919191"
          //     >
          //       {"You haven't made any withdrawal yet"}
          //     </Text>
          //   </VStack>
          // ) :
          <Stack
            w={{base: '400px', xl: 'full'}}
            spacing="none"
            divider={<StackDivider border="none" my="0px" h="1px" bg="#e4e4e7" />}
          >
            {
              // withdrawalsData
              demotransactions.refundableDeposits?.slice(0, 7)?.map((item, index) => (
                <HStack
                  w={{base: '400px', xl: 'full'}}
                  key={index}
                  p="16px 12px"
                  justifyContent={'space-between'}
                >
                  <Flex gap="12px" alignItems="center">
                    <Avatar src={item?.avatar} boxSize="40px" />
                    <Text fontSize="16px" fontWeight="400" color="#52525b">
                      {item?.name ?? 'Darlene Robertson'}
                    </Text>
                  </Flex>
                  <FormatToColorfulCurrency
                    amount={item?.amount ?? 1200}
                    fontSize="16px"
                    fontWeight="500"
                    color="#22c55e"
                    decimalStyle={{
                      color: '#606060',
                    }}
                  />
                </HStack>
              ))
            }
          </Stack>
        }
      </VStack>
      <VStack
        spacing={'none'}
        minH="157px"
        bg="#FFFFFF"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        border="1px solid #e4e4e4"
        borderRadius="16px"
        className="cols-span-1 flex flex-col items-start justify-start"
      >
        <div className="w-full p-[12px] border-b border-[#e4e4e7] rounded-t-[16px] bg-[#fbfcfc] flex flex-row justify-between items-center">
          <Text fontSize="16px" fontWeight="600" color="#27272a">
            Recent transactions
          </Text>

          {!depositsData || !depositsData?.length ? (
            <Link prefetch={true} href="/recentTransaction">
              <Button
                fontSize="12px"
                fontWeight="500"
                color="#4545fe"
                variant="ghost"
                p="0px"
                h="fit-content"
                _hover={{
                  bg: 'transparent',
                }}
                rightIcon={<Icon as={FaAngleRight} color="#4545fe" boxSize="12px" />}
                iconSpacing="5px"
              >
                View All
              </Button>
            </Link>
          ) : (
            <Button
              fontSize="12px"
              fontWeight="500"
              color="#4545fe"
              variant="ghost"
              p="0px"
              h="fit-content"
              _hover={{
                bg: 'transparent',
              }}
              rightIcon={<Icon as={FaAngleRight} color="#4545fe" boxSize="12px" />}
              iconSpacing="5px"
            >
              View All
            </Button>
          )}
        </div>
        {
          // !depositsData || !depositsData?.length ? (
          //   <VStack spacing="8px" mx="auto" w={{base: '400px', xl: 'full'}} h="full" py="70px">
          //     <Image alt="empty table icon" src={emptyIcon.src} />
          //     <Text fontSize={'16px'} color="#3D3D3D" fontWeight={'700'}>
          //       NOTHING FOUND
          //     </Text>
          //     <Text
          //       w="full"
          //       textAlign="center"
          //       fontSize="14px"
          //       fontWeight="400"
          //       mx="auto"
          //       color="#919191"
          //     >
          //       {"You haven't made any withdrawal yet"}
          //     </Text>
          //   </VStack>
          // ) :
          <Stack
            w={{base: '400px', xl: 'full'}}
            spacing="none"
            divider={<StackDivider border="none" my="0px" h="1px" bg="#e4e4e7" />}
          >
            {demotransactions.recentTransactions?.slice(0, 5)?.map((item, index) => {
              const customerName = truncateLongText(
                item?.connected_transaction?.customer?.first_name ??
                  '' +
                    ' ' +
                    `${item?.connected_transaction?.customer?.last_name?.split('')?.[0] ?? ''}.`,
                13
              );
              return (
                <HStack
                  key={index}
                  justify={'space-between'}
                  w={{base: '400px', xl: 'full'}}
                  gap={`10px`}
                  p="16px 12px"
                >
                  <Flex gap="12px" maxW="169.6px" alignItems="center">
                    <Avatar src={item?.avatar} boxSize="40px" />
                    <Text noOfLines={1} fontSize="16px" fontWeight="400" color="#52525b">
                      {item?.name ?? 'Darlene Robertson'}
                    </Text>
                  </Flex>

                  <FormatToColorfulCurrency
                    amount={item?.amount ?? 1200}
                    fontSize="16px"
                    fontWeight="500"
                    color="#22c55e"
                    decimalStyle={{
                      color: '#606060',
                    }}
                  />

                  <Text fontSize="16px" fontWeight="400" color="#27272a">
                    {changeDateFormat(item?.date ?? '12-02-2025', 'monthandday')}
                  </Text>
                </HStack>
              );
            })}
          </Stack>
        }
      </VStack>
      <VStack
        spacing={'none'}
        minH="157px"
        bg="#FFFFFF"
        borderRadius="16px"
        border="1px solid #e4e4e4"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        className="cols-span-1 flex flex-col items-start justify-start"
      >
        <div className="w-full p-[12px] border-b border-[#e4e4e7] rounded-t-[16px] bg-[#fbfcfc] flex flex-row justify-between items-center">
          <Text fontSize="16px" fontWeight="600" color="#27272a">
            Upcoming payments
          </Text>

          {!upcomingDeposits || !upcomingDeposits?.length ? (
            <Link prefetch={true} href="/upcomingPayments">
              <Button
                fontSize="12px"
                fontWeight="500"
                color="#4545fe"
                variant="ghost"
                p="0px"
                h="fit-content"
                _hover={{
                  bg: 'transparent',
                }}
                rightIcon={<Icon as={FaAngleRight} color="#4545fe" boxSize="12px" />}
                iconSpacing="5px"
              >
                View All
              </Button>
            </Link>
          ) : (
            <Link prefetch={true} href="/upcomingPayments">
              <Button
                fontSize="12px"
                fontWeight="500"
                color="#4545fe"
                variant="ghost"
                p="0px"
                h="fit-content"
                _hover={{
                  bg: 'transparent',
                }}
                rightIcon={<Icon as={FaAngleRight} color="#4545fe" boxSize="12px" />}
                iconSpacing="5px"
              >
                View All
              </Button>
            </Link>
          )}
        </div>
        {
          // !upcomingDeposits || !upcomingDeposits?.length ? (
          //   <VStack spacing="8px" mx="auto" w={{base: '400px', xl: 'full'}} h="full" py="70px">
          //     <Image alt="empty table icon" src={emptyIcon.src} />
          //     <Text fontSize={'16px'} color="#3D3D3D" fontWeight={'700'}>
          //       NOTHING FOUND
          //     </Text>
          //     <Text
          //       w="full"
          //       textAlign="center"
          //       fontSize="14px"
          //       fontWeight="400"
          //       mx="auto"
          //       color="#919191"
          //     >
          //       {'No Upcoming Payment at this time'}
          //     </Text>
          //   </VStack>
          // ) :
          <Stack
            w={{base: '400px', xl: 'full'}}
            spacing="none"
            divider={<StackDivider border="none" my="0px" h="1px" bg="#e4e4e7" />}
          >
            {demotransactions.upcomingPayments?.slice(0, 5)?.map((item, index) => {
              const customerName = truncateLongText(
                item?.equity?.customer?.first_name +
                  ' ' +
                  `${item?.equity?.customer?.last_name?.split('')?.[0] ?? ''}.`,
                10
              );
              return (
                <HStack
                  key={index}
                  justify={'space-between'}
                  w={{base: '400px', xl: 'full'}}
                  p="16px 12px"
                >
                  <Flex gap="12px" w="159.6px" alignItems="center">
                    <Avatar src={item?.avatar} boxSize="40px" />
                    <Text
                      // noOfLines={1}
                      fontSize="16px"
                      fontWeight="400"
                      color="#52525b"
                    >
                      {item?.name ?? 'Darlene Robertson'}
                    </Text>
                  </Flex>

                  <FormatToColorfulCurrency
                    amount={item?.amount ?? 200}
                    fontSize="16px"
                    fontWeight="500"
                    color="#22c55e"
                    decimalStyle={{
                      color: '#606060',
                    }}
                  />

                  <Text fontSize="16px" fontWeight="400" color="#27272a">
                    {changeDateFormat(item?.date ?? '09-02-2025', 'monthandday')}
                  </Text>
                </HStack>
              );
            })}
          </Stack>
        }
      </VStack>
      <UpcomingPayments drawerModal={upcomingModal} />
      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </SimpleGrid>
  );
};

export default AccountTransactionDetails;
