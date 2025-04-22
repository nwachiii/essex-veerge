import React, {useState} from 'react';
import {Flex, HStack, Image, SimpleGrid, Text, VStack, useDisclosure} from '@chakra-ui/react';
import avatar from '/src/images/avatar.svg';
import {useRouter} from 'next/router';
import {formatAmountWithDecimal} from '../../utils/formatAmount';
import Link from 'next/link';
import {themeStyles} from '../../theme';
import emptyIcon from '/src/images/icons/moneyEmptyIcon.svg';
import CustomerDrawer from '../Drawers/customerDrawer';
import UpcomingPayments from '../Drawers/upcomingPayments';
import HoverText from '@/components/common/Hovertext/HoverText';
import {truncateLongText} from 'utils';

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
    <SimpleGrid templateColumns="repeat(3,1fr)" w="full" gap={8}>
      <VStack
        spacing={4}
        p={6}
        minH="157px"
        bg="#FFFFFF"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        border="1px solid #e4e4e4"
        borderRadius="16px"
        className="cols-span-1 flex flex-col items-start justify-start"
      >
        <div className="w-full flex flex-row justify-between items-center">
          <div className="font-bold">Payout</div>
          {withdrawalsData && !withdrawalsData?.length == 0 ? (
            <Link href={'account/transactions/withdrawals'}>
              <Text fontSize={'14px'} color="#4545FE" className="cursor-pointer py-1">
                {`View all >`}
              </Text>
            </Link>
          ) : (
            <Text
              opacity={0.5}
              cursor={'not-allowed'}
              fontSize={'14px'}
              color="#606060"
              className="cursor-pointer py-1"
            >
              {`View all >`}
            </Text>
          )}
        </div>

        {!withdrawalsData || withdrawalsData?.length == 0 ? (
          <VStack spacing="8px" mx="auto" w={{base: '400px', xl: 'full'}} h="full" py="70px">
            <Image alt="empty table icon" src={emptyIcon.src} />
            <Text fontSize={'16px'} color="#3D3D3D" fontWeight={'700'}>
              NOTHING FOUND
            </Text>
            <Text
              w="full"
              textAlign="center"
              fontSize="14px"
              fontWeight="400"
              mx="auto"
              color="#919191"
            >
              {"You haven't made any withdrawal yet"}
            </Text>
          </VStack>
        ) : (
          withdrawalsData?.slice(0, 7)?.map((item, index) => (
            <HStack w={{base: '400px', xl: 'full'}} key={index} justifyContent={'space-between'}>
              <Text w="26%" color={themeStyles.color.matador__red}>
                <b>{formatAmountWithDecimal(item?.amount)}</b>
              </Text>

              <Text>
                {item?.bank_name ?? (
                    <p style={{fontSize: '18px', textTransform: 'capitalize'}}>
                      {item?.transaction_type}
                    </p>
                  ) ??
                  'NIL'}
              </Text>

              <Text>{item && new Date(item?.created_at)?.toDateString()?.slice(3, 10)}</Text>
            </HStack>
          ))
        )}
      </VStack>
      <VStack
        spacing={4}
        p={6}
        minH="157px"
        bg="#FFFFFF"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        border="1px solid #e4e4e4"
        borderRadius="16px"
        className="cols-span-1 flex flex-col items-start justify-start"
      >
        <div className="w-full flex flex-row justify-between items-center">
          <div className="font-bold ">Recent transactions</div>

          {!depositsData || !depositsData?.length ? (
            <Text
              opacity={0.5}
              cursor={'not-allowed'}
              fontSize={'14px'}
              color="#606060"
              className="cursor-pointer py-1"
            >
              {`View all >`}
            </Text>
          ) : (
            <Text
              color="#4545FE"
              fontSize={'14px'}
              onClick={() => router.push(`account/transactions/deposits`)}
              className="cursor-pointer py-1"
            >
              {`View all >`}
            </Text>
          )}
        </div>
        {!depositsData || !depositsData?.length ? (
          <VStack spacing="8px" mx="auto" w={{base: '400px', xl: 'full'}} h="full" py="70px">
            <Image alt="empty table icon" src={emptyIcon.src} />
            <Text fontSize={'16px'} color="#3D3D3D" fontWeight={'700'}>
              NOTHING FOUND
            </Text>
            <Text
              w="full"
              textAlign="center"
              fontSize="14px"
              fontWeight="400"
              mx="auto"
              color="#919191"
            >
              {"You haven't made any withdrawal yet"}
            </Text>
          </VStack>
        ) : (
          depositsData?.slice(0, 5)?.map((item, index) => {
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
              >
                <Flex
                  gap="5px"
                  align="center"
                  className="cursor-pointer"
                  onClick={() => OpenCustomerModal(item?.connected_transaction?.customer?.user?.id)}
                >
                  <Image
                    w="40px"
                    h="40px"
                    alt=""
                    className="rounded-full cursor-pointer"
                    src={item?.connected_transaction?.customer?.avatar ?? avatar.src}
                  />
                  <Text fontSize="12px" fontWeight={500} _hover={{textDecoration: 'underline'}}>
                    <HoverText
                      isTruncated={customerName.isTruncated}
                      displayText={customerName.originalText}
                    >
                      {customerName?.truncatedText}
                    </HoverText>
                  </Text>
                </Flex>

                <Text textAlign={''} color={themeStyles.color.matador__green}>
                  <b>{formatAmountWithDecimal(item?.amount)}</b>
                </Text>

                <div>{item && new Date(item?.created_at)?.toDateString()?.slice(3, 10)}</div>
              </HStack>
            );
          })
        )}
      </VStack>
      <VStack
        spacing={4}
        p={6}
        minH="157px"
        bg="#FFFFFF"
        borderRadius="16px"
        border="1px solid #e4e4e4"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        className="cols-span-1 flex flex-col items-start justify-start"
      >
        <div className="textsm w-full flex flex-row justify-between items-center">
          <div
            className="flex items-center gap-1 font-bold cursor-pointer"
            onClick={upcomingModal.onOpen}
          >
            Upcoming payments
          </div>

          {!upcomingDeposits || !upcomingDeposits?.length ? (
            <Text
              opacity={0.5}
              cursor={'not-allowed'}
              fontSize={'14px'}
              color="#606060"
              className="cursor-pointer py-1"
            >
              {`View all >`}
            </Text>
          ) : (
            <Text
              color="#4545FE"
              fontSize={'14px'}
              onClick={() => router.push(`account/transactions/upcoming_deposit`)}
              className="cursor-pointer py-1"
            >
              {`View all >`}
            </Text>
          )}
        </div>
        {!upcomingDeposits || !upcomingDeposits?.length ? (
          <VStack spacing="8px" mx="auto" w={{base: '400px', xl: 'full'}} h="full" py="70px">
            <Image alt="empty table icon" src={emptyIcon.src} />
            <Text fontSize={'16px'} color="#3D3D3D" fontWeight={'700'}>
              NOTHING FOUND
            </Text>
            <Text
              w="full"
              textAlign="center"
              fontSize="14px"
              fontWeight="400"
              mx="auto"
              color="#919191"
            >
              {'No Upcoming Payment at this time'}
            </Text>
          </VStack>
        ) : (
          upcomingDeposits?.slice(0, 5)?.map((item, index) => {
            const customerName = truncateLongText(
              item?.equity?.customer?.first_name +
                ' ' +
                `${item?.equity?.customer?.last_name?.split('')?.[0] ?? ''}.`,
              10
            );
            return (
              <HStack key={index} justify={'space-between'} w={{base: '400px', xl: 'full'}}>
                <Flex
                  gap="5px"
                  align="center"
                  className="cursor-pointer"
                  onClick={() => OpenCustomerModal(item?.owner?.user?.id)}
                >
                  <Image
                    w="40px"
                    h="40px"
                    alt=""
                    className="rounded-full cursor-pointer"
                    src={item?.equity?.customer?.avatar ?? avatar.src}
                  />
                  <Text fontSize="12px" fontWeight={500} _hover={{textDecoration: 'underline'}}>
                    <HoverText
                      isTruncated={customerName.isTruncated}
                      displayText={customerName.originalText}
                    >
                      {customerName?.truncatedText}
                    </HoverText>
                  </Text>
                </Flex>

                <Text color={themeStyles.color.matador__yellow}>
                  <b>{formatAmountWithDecimal(item.amount)}</b>
                </Text>

                <div>{item && new Date(item?.due_date)?.toDateString()?.slice(3, 10)}</div>
              </HStack>
            );
          })
        )}
      </VStack>
      <UpcomingPayments drawerModal={upcomingModal} />
      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </SimpleGrid>
  );
};

export default AccountTransactionDetails;
