import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import BackBtn from '../components/BackBtn';
import {useQuery} from '@tanstack/react-query';
import ActionBtns from '../components/ActionBtns';
import {getAccountTransactionStatement} from '../../../apis/account';
import {Box, Center, Flex, useToast} from '@chakra-ui/react';
import {AnimatedLoader, LayoutView} from '../../../components';
import AccountTransactionStatementOverview from './Overview';
import {MatadorCustomTable} from '../../../components/common/Table';
import {AccountTransactionsColumn} from '../../../constants/accounts/AccountTransactionsColumn';
import {useRouter} from 'next/router';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

export const AccountTransactionStatement = () => {
  const toast = useToast();
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const routeQueries = router.query;

  const params = `?page=${routeQueries.page ? Number(routeQueries.page) : 1}`;
  const FETCH_STATEMENT_ENDPOINT = useQuery(['account-statement', params], () =>
    getAccountTransactionStatement(params)
  );
  const STATEMENT_DATA = FETCH_STATEMENT_ENDPOINT?.data?.data?.data || [];
  const OVERVIEW_DATA = FETCH_STATEMENT_ENDPOINT?.data?.data;
  console.log({STATEMENT_DATA, data: FETCH_STATEMENT_ENDPOINT});

  const isTableValid = !FETCH_STATEMENT_ENDPOINT.isError && !!STATEMENT_DATA?.length;

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      STATEMENT_DATA &&
        result.push({
          No: 1 + i,
          Date: `${obj[i]?.date}`,
          Deposits: obj[i]?.deposits,
          Debits: obj[i]?.debits,
          Balance: obj[i]?.balance,
          Description: obj[i]?.description,
          Reference: obj[i]?.reference,
        });
    }
    return result;
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

  const number_of_pages = Math.ceil(~~FETCH_STATEMENT_ENDPOINT?.data?.data?.count / ~~limit);

  useEffect(() => {
    const fetch = async () => await FETCH_STATEMENT_ENDPOINT.refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <LayoutView
      px={{base: '0px', xl: '30px'}}
      tabPanelStyle={{pb: '0px'}}
      pb="0px"
      activePage="account"
    >
      <Head>
        <title>Veerge | Transactions</title>
        <meta name="description" content="Navigating the future of technology" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      {FETCH_STATEMENT_ENDPOINT.isLoading ? (
        <Center h="55vh">
          <AnimatedLoader />
        </Center>
      ) : FETCH_STATEMENT_ENDPOINT.isError ? (
        toast({
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          title: 'An error occured while fetching account transactions',
        })
      ) : FETCH_STATEMENT_ENDPOINT?.data?.data ? (
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          <Flex w="full" justify="space-between" mb="24px">
            <BackBtn name="Account Transactions" />
            {/* <ActionBtns noSortBy noFilter data={getDataFromJSON(STATEMENT_DATA)} /> */}
            <DownloadCsv isTableValid={isTableValid} data={getDataFromJSON(STATEMENT_DATA)} />
          </Flex>
          <AccountTransactionStatementOverview DATA={OVERVIEW_DATA} />
          {!FETCH_STATEMENT_ENDPOINT.isLoading && (
            <MatadorCustomTable
              maxW=""
              mt="24px"
              minW="100%"
              pageSize={10}
              forMemo={[router]}
              isManageAgentEmpty
              DATA={STATEMENT_DATA}
              forLimit={[limit, router]}
              number_of_pages={number_of_pages}
              handlePagination={handlePagination}
              COLUMNS={AccountTransactionsColumn(STATEMENT_DATA)}
            />
          )}
        </Box>
      ) : null}
    </LayoutView>
  );
};

export default AccountTransactionStatement;
