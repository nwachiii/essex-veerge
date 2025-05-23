import React, {useMemo, useState} from 'react';
import {Box, Flex, HStack, Heading, Icon, Text} from '@chakra-ui/react';
import {LayoutView} from '@/components/index';
import {useSmallerLaptopsBreakpoint} from 'ui-lib';
import {useRouter} from 'next/router';

import MatadorCustomTable from '@/components/common/Table';

import {FaAngleLeft} from 'react-icons/fa';

import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

import AccountOverViewHeader from '@/components/account/overViewHeader';
import {demoAccountPageTableData} from 'constants/DEMODATA/account/accountPages';
import {REFUNDABLE_COLUMN} from 'constants/accounts/tables/refundableDeposit';
import {CAPFEE_COLUMN} from 'constants/accounts/tables/capFee';
import Head from 'next/head';
import {filterDataByFutureDateRange} from '@/components/account/utils';

const limit = 10;
const UpcomingDeposit = () => {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();
  const [filterByVal, setFilterByVal] = useState('1');

  const router = useRouter();

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

  const data = filterDataByFutureDateRange(demoAccountPageTableData, filterByVal);
  const total = [...data.page1, ...data.page2].reduce((total, item) => {
    // Ensure item exists and amount is a number, otherwise add 0
    const itemAmount = item && typeof Number(item.amount) === 'number' ? Number(item.amount) : 0;

    return total + itemAmount;
  }, 0);
  const count = [...data.page1, ...data.page2].length;
  const transactions = data?.[`page${currentPage}`] ?? data?.[`1`];

  const handleVal = val => () => {
    setFilterByVal(val);
  };
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
  const number_of_pages = Math.ceil(~~count / ~~limit);

  const columns = useMemo(() => CAPFEE_COLUMN, []);

  return (
    <Box w="full" minH="100vh" bg="#FAFAFA" h={isSmallerLaptop ? '60vh' : ''}>
      <Head>
        <title>Essex | Upcoming payments</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="theme-color" content="#191919" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage={'account'}
      >
        <Box
          // mt="clamp(-100vh, -82vh, calc(-100vh + 120px))"
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"

          // className="main-app"
        >
          <Flex mb="28px" w="full" alignItems="center" justifyContent="space-between">
            <Flex gap="12px" alignItems="center">
              <Flex
                onClick={() => router.back()}
                bg="#f4f4f5"
                role="button"
                boxSize="50px"
                border="1px solid #e4e4e7"
                rounded="full"
                justify="center"
                align="center"
              >
                <Icon as={FaAngleLeft} boxSize="20px" />
              </Flex>
              <Heading fontSize="23px" fontWeight="600" color="#18181b">
                Upcoming Payments
              </Heading>
            </Flex>
            <Box boxSize="36px">
              <DownloadCsv data={[]} />
            </Box>
          </Flex>
          <Flex alignItems="center" mb="29px" gap="24px" justifyContent="center" w="full">
            <Text fontSize="12px" fontWeight="500" color="#000000">
              View method
            </Text>
            <HStack
              // w="100%"
              spacing={'12px'}
              color="#4545FE"
              fontWeight={'400'}
              fontSize="14px"
            >
              <Box
                flex="1"
                textAlign={'center'}
                cursor={'pointer'}
                minH="33px"
                py={'12px'}
                px={'9.5px'}
                onClick={handleVal('1')}
                transition="0.3s ease-in-out"
                borderRadius={'72px'}
                bg={filterByVal == '1' ? '#4545FE' : 'transparent'}
                minW={'max-content'}
                color={filterByVal == '1' ? '#ffffff' : '#4545fe'}
              >
                <Text lineHeight="10px">All Time</Text>
              </Box>
              <Box
                flex="1"
                textAlign={'center'}
                cursor={'pointer'}
                minH="33px"
                py={'12px'}
                transition="0.3s ease-in-out"
                px={'9.5px'}
                borderRadius={'72px'}
                onClick={handleVal('2')}
                bg={filterByVal == '2' ? '#4545FE' : 'transparent'}
                minW={'max-content'}
                color={filterByVal == '2' ? '#ffffff' : '#4545fe'}
              >
                <Text lineHeight="10px">By Tomorrow</Text>
              </Box>
              <Box
                flex="1"
                textAlign={'center'}
                cursor={'pointer'}
                h="33px"
                py={'12px'}
                px={'9.5px'}
                transition="0.3s ease-in-out"
                borderRadius={'72px'}
                onClick={handleVal('3')}
                fontWeight={filterByVal == '3' ? '600' : '400'}
                bg={filterByVal == '3' ? '#4545FE' : 'transparent'}
                color={filterByVal == '3' ? '#ffffff' : '#4545fe'}
                minW={'max-content'}
              >
                <Text lineHeight="10px">In 3 Days</Text>
              </Box>
              <Box
                flex="1"
                textAlign={'center'}
                cursor={'pointer'}
                minH="33px"
                py={'12px'}
                px={'9.5px'}
                transition="0.3s ease-in-out"
                borderRadius={'72px'}
                onClick={handleVal('4')}
                bg={filterByVal == '4' ? '#4545FE' : 'transparent'}
                minW={'max-content'}
                color={filterByVal == '4' ? '#ffffff' : '#4545fe'}
              >
                <Text lineHeight="10px">In 1 week</Text>
              </Box>
              <Box
                flex="1"
                textAlign={'center'}
                cursor={'pointer'}
                minH="33px"
                py={'12px'}
                px={'9.5px'}
                transition="0.3s ease-in-out"
                borderRadius={'72px'}
                onClick={handleVal('5')}
                bg={filterByVal == '5' ? '#4545FE' : 'transparent'}
                minW={'max-content'}
                color={filterByVal == '5' ? '#ffffff' : '#4545fe'}
              >
                <Text lineHeight="10px">In 1 month</Text>
              </Box>
              <Box
                flex="1"
                textAlign={'center'}
                cursor={'not-allowed'}
                minH="33px"
                py={'12px'}
                px={'9.5px'}
                borderRadius={'72px'}
                bg={'transparent'}
                minW={'max-content'}
              >
                <Text lineHeight="10px">Date Range</Text>
              </Box>
            </HStack>
          </Flex>
          <AccountOverViewHeader header="Total Upcoming Payments" amount={total} />
          <MatadorCustomTable
            minW="full"
            forMemo={[router, filterByVal, data]}
            forLimit={[limit, router, filterByVal, data]}
            headerSpace="evenly"
            COLUMNS={columns}
            number_of_pages={number_of_pages}
            handlePagination={handlePagination}
            DATA={transactions}
            isManageAgentEmpty="No deposit has been found yet"
          />
        </Box>
      </LayoutView>
    </Box>
  );
};

export default UpcomingDeposit;
