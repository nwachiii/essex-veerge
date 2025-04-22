import Head from 'next/head';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {LayoutView} from '/src/components';
import {getUpcomingDeposits} from '/src/apis/account';
import {
  AbsoluteCenter,
  Box,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {MatadorCustomTable} from '/src/components/common/Table';

import {AnimatedLoader} from '/src/components/common/loaders/AnimatedLoader';
import BackBtn from '../components/BackBtn';
import ActionBtns from '../components/ActionBtns';
import {ACCOUNTS_UPCOMING_PAYMENTS_COLUMN} from '../../../constants/accounts/upcoming_deposits_column';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import DateRange from './dateRange';

const Deposits = () => {
  const toast = useToast();
  const router = useRouter();
  const [filterByVal, setFilterByVal] = useState('1');
  const limit = 10;
  const routeQueries = router.query;
  const filterInNumberofDays = convertToDays(filterByVal);
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [date, setDate] = useState(null);

  const dateExist = () => {
    if (date) {
      return date;
    }
    return '';
  };
  const convertToApiQuery = () => {
    const queryParams = Object.entries(routeQueries)
      .map(item =>
        item?.[0] === 'filter'
          ? `${item?.[1]}`
          : item?.[0] === 'sort'
            ? `${item?.[1]}=true`
            : `${item?.[0]}=${item?.[1]}`
      )
      .join('&');

    return queryParams ? `${filterByVal !== '1' || dateExist() ? '&' : '?'}${queryParams}` : '';
  };

  const param =
    (filterByVal === '1' || filterByVal === '7'
      ? ''
      : `?future_value=${Number(filterInNumberofDays)}`) +
    dateExist() +
    convertToApiQuery();

  const ACCOUNT__UPCOMING__TXNS = useQuery(['upcoming-txns', param], () =>
    getUpcomingDeposits(param)
  );

  useEffect(() => {
    const fetch = async () => await ACCOUNT__UPCOMING__TXNS?.refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, filterByVal]);

  const handlePagination = direction => {
    if (direction === 'next') {
      const defaultQuery = {
        page: `${routeQueries?.page ? ~~routeQueries.page + 1 : 2}`,
        limit,
      };

      const mergedQuery = {
        ...router.query,
        ...defaultQuery,
      };
      router.push({
        pathname: router.pathname,
        query: mergedQuery,
      });
    }
    if (direction === 'prev') {
      const defaultQuery = {
        page: `${routeQueries?.page ? ~~routeQueries.page - 1 : 1}`,
        limit,
      };

      const mergedQuery = {
        ...router.query,
        ...defaultQuery,
      };
      router.push({
        pathname: router.pathname,
        query: mergedQuery,
      });
    }
  };
  const number_of_pages = Math.ceil(~~ACCOUNT__UPCOMING__TXNS?.data?.data?.count / ~~10);
  const UPCOMING_DEPOSITS_DATA = ACCOUNT__UPCOMING__TXNS?.data?.data;
  const UPCOMING_PAYMENTS_TOTAL = UPCOMING_DEPOSITS_DATA && UPCOMING_DEPOSITS_DATA?.total;

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      UPCOMING_DEPOSITS_DATA?.data &&
        result.push({
          No: '1 + i',
          Name: `${obj[i]?.equity?.user?.first_name} ${obj[i]?.equity?.user?.last_name}`,
          Amount: obj[i]?.amount,
          // "Payment Type": paymentType,
        });
    }
    return result;
  };

  const handleChange = val => {
    setDate(null);
    const defaultQuery = {
      page: `1`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    setFilterByVal(val);
  };

  return (
    <>
      <Head>
        <title>Veerge | Upcoming payments</title>
        <meta name="description" content="Veerge | Upcoming payments" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage={'account'}
      >
        {ACCOUNT__UPCOMING__TXNS?.isLoading ? (
          <AbsoluteCenter mt="40vh">
            <AnimatedLoader />
          </AbsoluteCenter>
        ) : ACCOUNT__UPCOMING__TXNS?.isError ? (
          toast({
            title: 'An error occured',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          })
        ) : (
          <Box
            mt="clamp(52px,calc(11.4vh + 40px),96px)"
            px={{base: '0px', xl: '30px'}}
            maxW="full"
            w="full"
            mx="auto"
          >
            <BackBtn name="Upcoming payments" />

            <VStack
              justifyContent={'center'}
              gap="19px"
              mt="30px"
              mx="auto"
              w="660px"
              minH="140px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              bg="#fff"
            >
              <Text display="flex" fontSize="24px" fontWeight={600} lineHeight="25px">
                {ACCOUNT__UPCOMING__TXNS?.isLoading
                  ? '--'
                  : formatAmountWithDecimal(UPCOMING_PAYMENTS_TOTAL)}
              </Text>
              <Text fontWeight={'400'} fontSize={'14px'} color="#606060">
                Total upcoming deposits
              </Text>
            </VStack>
            <Flex w="full" justify="space-between" my="20px" gap="20px">
              <HStack
                // w="100%"
                spacing={'0px'}
                my="0px"
                color="#4545FE"
                fontWeight={'500'}
                // overflow={'hidden'}
                border="1px solid #D0D5DD"
                borderRadius={'12px'}
                w="100%"
                minW={'max-content'}
                // minW="100%"
              >
                <Box
                  flex="1"
                  textAlign={'center'}
                  cursor={'pointer'}
                  onClick={() => handleChange('1')}
                  py={'14px'}
                  px={'16px'}
                  borderRadius={'12px 0px 0px 12px'}
                  fontWeight={'600'}
                  bg={filterByVal == '1' ? '#4545FE' : '#ffffff'}
                  minW={'max-content'}
                  borderRight="1px solid #D0D5DD"
                  color={filterByVal == '1' ? '#FFFFFF' : '#344054'}
                >
                  <Text>All time</Text>
                </Box>
                <Box
                  flex="1"
                  textAlign={'center'}
                  cursor={'pointer'}
                  onClick={() => handleChange('2')}
                  py={'14px'}
                  px={'16px'}
                  fontWeight={'600'}
                  bg={filterByVal == '2' ? '#4545FE' : '#ffffff'}
                  minW={'max-content'}
                  borderRight="1px solid #D0D5DD"
                  color={filterByVal == '2' ? '#FFFFFF' : '#344054'}
                >
                  <Text>By tomorrow</Text>
                </Box>
                <Box
                  flex="1"
                  textAlign={'center'}
                  cursor={'pointer'}
                  onClick={() => handleChange('3')}
                  py={'14px'}
                  px={'16px'}
                  fontWeight={'600'}
                  bg={filterByVal == '3' ? '#4545FE' : '#ffffff'}
                  minW={'max-content'}
                  borderRight="1px solid #D0D5DD"
                  color={filterByVal == '3' ? '#FFFFFF' : '#344054'}
                >
                  <Text>In 3 Days</Text>
                </Box>
                <Box
                  flex="1"
                  textAlign={'center'}
                  cursor={'pointer'}
                  onClick={() => handleChange('4')}
                  py={'14px'}
                  px={'16px'}
                  fontWeight={'600'}
                  bg={filterByVal == '4' ? '#4545FE' : '#ffffff'}
                  minW={'max-content'}
                  borderRight="1px solid #D0D5DD"
                  color={filterByVal == '4' ? '#FFFFFF' : '#344054'}
                >
                  <Text>In 1 week</Text>
                </Box>
                <Box
                  flex="1"
                  textAlign={'center'}
                  cursor={'pointer'}
                  onClick={() => handleChange('5')}
                  py={'14px'}
                  px={'16px'}
                  fontWeight={'600'}
                  bg={filterByVal == '5' ? '#4545FE' : '#ffffff'}
                  minW={'max-content'}
                  borderRight="1px solid #D0D5DD"
                  color={filterByVal == '5' ? '#FFFFFF' : '#344054'}
                >
                  <Text>In 1 month</Text>
                </Box>
                <DateRange
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                  setQuery={setDate}
                  filterByVal={filterByVal}
                  setFilterByVal={setFilterByVal}
                  futureFilter={filterByVal}
                  router={router}
                />
              </HStack>
              <ActionBtns
                noSortBy
                noAlphabets
                noFilter
                data={getDataFromJSON(UPCOMING_DEPOSITS_DATA)}
              />
            </Flex>
            <MatadorCustomTable
              forLimit={[limit, router]}
              maxW=""
              minW="100%"
              forMemo={[router, filterByVal]}
              headerSpace="evenly"
              number_of_pages={number_of_pages}
              handlePagination={handlePagination}
              COLUMNS={ACCOUNTS_UPCOMING_PAYMENTS_COLUMN(router, limit)}
              DATA={UPCOMING_DEPOSITS_DATA?.data}
            />
          </Box>
        )}
      </LayoutView>
    </>
  );
};

export default Deposits;

function convertToDays(value) {
  switch (value) {
    case '1':
      return 1; // Replace with the appropriate number of days for "All time"
    case '2':
      return 1; // Replace with the number of days for "By tomorrow"
    case '3':
      return 3; // Replace with the number of days for "In 3 Days"
    case '4':
      return 7; // Replace with the number of days for "In 1 week"
    case '5':
      return 30; // Replace with the number of days for "In 1 month"
    default:
      return 1; // Handle invalid values here
  }
}
