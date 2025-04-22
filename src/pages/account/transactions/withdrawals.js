import Head from 'next/head';
import {AnimatedLoader, LayoutView} from '../../../components';
import {useQuery} from '@tanstack/react-query';
import {fetchAllWithdrawalTxns} from '../../../apis/account';
import Link from 'next/link';
import {Box, Flex, useToast} from '@chakra-ui/react';
import {MatadorCustomTable} from '../../../components/common/Table';
import {ACCOUNTS_WITHDRAWAL_COLUMN} from '../../../constants/accounts/deposits_column';
import BackBtn from '../components/BackBtn';
import ActionBtns from '../components/ActionBtns';
import {useRouter} from 'next/router';

const Withdrawals = () => {
  const toast = useToast();
  const limit = 10;
  const router = useRouter();
  const routeQueries = router.query;
  const convertToApiQuery = () => {
    return `&${Object.entries(routeQueries)
      .map(item =>
        item?.[0] === 'filter'
          ? `${item?.[1]}`
          : item?.[0] === 'sort'
          ? `${item?.[1]}=true`
          : `${item?.[0]}=${item?.[1]}`
      )
      .join('&')}`;
  };
  const param = convertToApiQuery();
  const ACCOUNT__WITHDRAWAL__TXNS = useQuery(['withdrawal-txns', param], () =>
    fetchAllWithdrawalTxns(param)
  );
  const WITHDRAWAL_DATA = ACCOUNT__WITHDRAWAL__TXNS?.data?.data?.data;
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
  const number_of_pages = Math.ceil(~~ACCOUNT__WITHDRAWAL__TXNS?.data?.data?.count / ~~10);

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      WITHDRAWAL_DATA &&
        result.push({
          No: 1 + i,
          Amount: obj[i]?.amount,
          'Withdrawal Type': obj[i]?.transaction_type,
          Date: obj[i]?.created_at,
        });
    }
    return result;
  };

  return (
    <Box className="relative" bg="#FAFAFA" minH="100vh" pb={'70px'}>
      <Head>
        <title>Veerge | Payouts</title>
        <meta name="description" content="Veerge | Payouts" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView activePage={'account'} />
      {ACCOUNT__WITHDRAWAL__TXNS.isLoading ? (
        <Flex direction="column" w="full" h="full" justify="center" align="center">
          <AnimatedLoader />
        </Flex>
      ) : ACCOUNT__WITHDRAWAL__TXNS.isError ? (
        toast({
          title: 'An error occured',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      ) : (
        <Box px="78px" position="relative" mt="-87vh">
          <Flex w="full" justify="space-between" mt="30px" mb={4}>
            <BackBtn name="Payouts" />
            <ActionBtns noSortBy noFilter data={getDataFromJSON(WITHDRAWAL_DATA)} />
          </Flex>
          <MatadorCustomTable
            forLimit={[limit, router]}
            minW={'100%'}
            headerSpace={'evenly'}
            number_of_pages={number_of_pages}
            COLUMNS={ACCOUNTS_WITHDRAWAL_COLUMN(router, limit)}
            DATA={WITHDRAWAL_DATA}
            handlePagination={handlePagination}
          />
        </Box>
      )}
    </Box>
  );
};

export default Withdrawals;
