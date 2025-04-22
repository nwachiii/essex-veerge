import Head from 'next/head';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {LayoutView} from '/src/components';
import {fetchAllDepositTxns} from '/src/apis/account';
import {AbsoluteCenter, Box, Flex, useToast} from '@chakra-ui/react';
import {MatadorCustomTable} from '/src/components/common/Table';
import {AnimatedLoader} from '/src/components/common/loaders/AnimatedLoader';
import BackBtn from '../components/BackBtn';
import ActionBtns from '../components/ActionBtns';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {ACCOUNTS_DEPOSITS_COLUMN} from 'constants/accounts/deposits_column';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';

const Deposits = () => {
  const toast = useToast();
  const limit = 10;
  const router = useRouter();
  const routeQueries = router.query;

  const convertToApiQuery = () => {
    const queryParams = [];

    for (const [key, value] of Object.entries(routeQueries)) {
      if (key === 'filter') {
        queryParams.push(value);
      } else if (key === 'sort') {
        queryParams.push(`${value}=true`);
      } else {
        queryParams.push(`${key}=${value}`);
      }
    }

    return queryParams.length > 0 ? `&${queryParams.join('&')}` : '';
  };

  const param = convertToApiQuery();

  const ACCOUNT__DEPOSIT__TXNS = useQuery(['deposit-txns', param], () =>
    fetchAllDepositTxns(param)
  );
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  useEffect(() => {
    const fetch = async () => await ACCOUNT__DEPOSIT__TXNS?.refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const DEPOSITS_DATA = ACCOUNT__DEPOSIT__TXNS?.data?.data?.data;
  // console.log('Recent deposit txns: ', ACCOUNT__DEPOSIT__TXNS?.data?.data);

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
  const number_of_pages = Math.ceil(~~ACCOUNT__DEPOSIT__TXNS?.data?.data?.count / ~~10);

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      let type = obj[i]?.transaction_type?.toLowerCase();
      let paymentType = '';

      switch (type) {
        case 'equity_outright':
          paymentType = 'full payment';
          break;
        case 'outright':
          paymentType = 'full payment';
          break;
        case 'shared_outright':
          paymentType = 'Co-Outright';
          break;
        case 'initial_deposit':
          paymentType = 'Initial deposit';
          break;
        case 'equity_plan_initial':
          paymentType = 'initial deposit';
          break;
        case 'shared_initial_deposit':
          paymentType = 'Co-Initial deposit';
          break;
        case 'installment':
          paymentType = 'top up';
          break;
        case 'shared_installment':
          paymentType = 'Co-Top up';
          break;
        case 'recurring':
          paymentType = 'Recurring';
          break;
        case 'fraction':
          paymentType = 'Fractional';
          break;
        default:
          break;
      }

      DEPOSITS_DATA &&
        result.push({
          No: 1 + i,
          Name: `${obj[i]?.connected_transaction?.user?.first_name} ${obj[i]?.connected_transaction?.user?.last_name}`,
          Amount: obj[i]?.amount,
          'Listing Name': 'nil',
          'Unit Type': 'nil',
          'Payment Type': paymentType,
        });
    }
    return result;
  };

  return (
    <Box position="relative" bg="#FAFAFA" minH="100vh" h={isSmallerLaptop ? '60vh' : ''}>
      <Head>
        <title>Veerge | Deposits</title>
        <meta name="description" content="Navigating the future of technology" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage={'account'}
      >
        {ACCOUNT__DEPOSIT__TXNS.isLoading ? (
          <AbsoluteCenter mt="40vh">
            <AnimatedLoader />
          </AbsoluteCenter>
        ) : ACCOUNT__DEPOSIT__TXNS.isError ? (
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
            <Flex w="full" justify="space-between" mb={4}>
              <BackBtn name="Recent transactions" />
              <ActionBtns noSortBy noFilter data={getDataFromJSON(DEPOSITS_DATA)} />
            </Flex>
            <MatadorCustomTable
              forLimit={[limit, router]}
              maxW=""
              minW="100%"
              forMemo={[router]}
              headerSpace="evenly"
              handlePagination={handlePagination}
              number_of_pages={number_of_pages}
              COLUMNS={ACCOUNTS_DEPOSITS_COLUMN(router, limit)}
              DATA={DEPOSITS_DATA}
            />
          </Box>
        )}
      </LayoutView>
    </Box>
  );
};

export default Deposits;
