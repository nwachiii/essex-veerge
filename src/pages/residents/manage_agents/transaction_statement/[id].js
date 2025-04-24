import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';

import {useQuery} from '@tanstack/react-query';

import {Box, Center, Flex, VStack, useToast} from '@chakra-ui/react';
import {AnimatedLoader, LayoutView} from '../../../../components';
import AccountTransactionStatementOverview from './Overview';
import {MatadorCustomTable} from '../../../../components/common/Table';
import TransactionsColumn from './TransactionsColumn';
import {useRouter} from 'next/router';
import BackBtn from '../../../account/components/BackBtn';
import ActionBtns from '../../../account/components/ActionBtns';
import {agentTransactions} from '../../../../apis/manageAgent';

export const AccountTransactions = ({id}) => {
  const toast = useToast();
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const routeQueries = router.query;

  const convertToApiQuery = () => {
    return `?${Object.entries(routeQueries)
      .map(item => (item?.[0] === 'filter' ? `${item?.[1]}` : `${item?.[0]}=${item?.[1]}`))
      .join('&')}`;
  };
  // const params = `?page=${routeQueries.page ? Number(routeQueries.page) : 1}?user=${id}`;
  const params = `?user=${id}`;
  const FETCH_STATEMENT_ENDPOINT = useQuery(['transactions-statement', params], () =>
    agentTransactions(params)
  );
  const STATEMENT_DATA = FETCH_STATEMENT_ENDPOINT?.data?.data?.data;
  const OVERVIEW_DATA = FETCH_STATEMENT_ENDPOINT?.data?.data;

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      STATEMENT_DATA &&
        result.push({
          No: 1 + i,
          Date: `${obj[i]?.date}`,
          Deposits: obj[i]?.deposit,
          Status: obj[i]?.status,
          Debits: obj[i]?.debit,
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

  // console.log('jkjk',FETCH_STATEMENT_ENDPOINT?.data);

  return (
    <LayoutView activePage="account">
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
        <Box mt="12vh" px={8}>
          <Flex w="full" justify="space-between" mt="30px" mb={4}>
            <BackBtn name="Account Transactions" />
            <ActionBtns noSortBy noFilter data={getDataFromJSON(STATEMENT_DATA)} />
          </Flex>
          <AccountTransactionStatementOverview DATA={OVERVIEW_DATA} />
          {!FETCH_STATEMENT_ENDPOINT.isLoading && (
            <MatadorCustomTable
              mt="60px"
              isManageAgentEmpty
              pageSize={10}
              maxW=""
              minW="100%"
              forMemo={[router]}
              forLimit={[limit, router]}
              number_of_pages={number_of_pages}
              handlePagination={handlePagination}
              COLUMNS={TransactionsColumn(STATEMENT_DATA)}
              DATA={STATEMENT_DATA}
            />
          )}
        </Box>
      ) : null}
    </LayoutView>
  );
};

export async function getServerSideProps(context) {
  const {query} = context;
  const id = query.id;

  return {
    props: {
      id,
    },
  };
}

export default AccountTransactions;
