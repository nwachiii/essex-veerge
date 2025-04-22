import Head from 'next/head';
import Link from 'next/link';
import BackBtn from '../components/BackBtn';
import {useQuery} from '@tanstack/react-query';
import {ActionBtns} from '../components/ActionBtns';
import {AnimatedLoader, LayoutView} from '../../../components';
import {fetchAllStoreWalletUserTxns} from '../../../apis/account';
import {MatadorCustomTable} from '../../../components/common/Table';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';
import {AbsoluteCenter, Box, Flex, Text, VStack, useToast} from '@chakra-ui/react';
import {USERS_TXNS_COLUMNS} from '../../../constants/accounts/store_wallet/users_txns';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ProgressIndicator from 'ui-lib/ui-lib.components/CustomTag/progressIndicator';

export const UsersWalletTxnsList = () => {
  const toast = useToast();
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const routeQueries = router.query;

  const convertToApiQuery = () => {
    const queryParam = `${Object.entries(routeQueries)
      .map(item =>
        item?.[0] === 'filter'
          ? `${item?.[1]}`
          : item?.[0] === 'total'
            ? null
            : `${item?.[0]}=${item?.[1]}`
      )
      .filter(item => item)
      .join('&')}`;

    return queryParam ? `?${queryParam}` : '';
  };

  console.log(convertToApiQuery());
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

  const param = convertToApiQuery();

  const USERS_WALLET_TXNS = useQuery(['store-wallet-user-txns', param], () =>
    fetchAllStoreWalletUserTxns(param)
  );

  const total = ~~USERS_WALLET_TXNS?.data?.data?.total;

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      USERS_WALLET_TXNS?.data?.data?.data &&
        result.push({
          No: '1 + i',
          Name: `${obj[i]?.account?.owner?.first_name} ${obj[i]?.account?.owner?.last_name}`,
          Amount: obj[i]?.amount,
        });
    }
    return result;
  };

  useEffect(() => {
    const fetch = async () => await USERS_WALLET_TXNS.refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const number_of_pages = Math.ceil(~~USERS_WALLET_TXNS?.data?.data?.count / ~~limit);
  const isTableValid = !USERS_WALLET_TXNS.isError && !!USERS_WALLET_TXNS?.data?.data?.data?.length;

  return (
    <>
      <Head>
        <title>Veerge | Users Wallet</title>
        <meta name="description" content="Veerge | Users Wallet" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage={'account'}
      >
        {USERS_WALLET_TXNS?.isLoading ? (
          <AbsoluteCenter mt="25vh">
            <AnimatedLoader />
          </AbsoluteCenter>
        ) : USERS_WALLET_TXNS?.isError ? (
          toast({
            title: 'Request failed',
            description: `An error occured while fetching users transactions`,
            status: 'error',
            duration: 3000,
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
            <Flex w="full" justifyContent="space-between">
              <BackBtn name="Users Wallet" />

              <ActionBtns
                isTableValid={isTableValid}
                noFilter
                data={getDataFromJSON(USERS_WALLET_TXNS?.data?.data?.data)}
              />
            </Flex>

            <VStack
              justifyContent={'center'}
              gap="12px"
              my="24px"
              mx="auto"
              w="full"
              h="176px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              bg="#fff"
            >
              <Text fontSize="16px" fontWeight={'500'} lineHeight="24px" color="#525252">
                Total wallet balance
              </Text>
              <Text color="#12B76A" fontWeight="600" lineHeight="40.58px" fontSize={'24px'}>
                {total == '0' ? '-' : formatAmountWithDecimal(total)}
              </Text>
              <ProgressIndicator hasGained={false} />
            </VStack>

            <MatadorCustomTable
              isManageAgentEmpty
              handlePagination={handlePagination}
              forMemo={[router]}
              forLimit={[limit, router]}
              number_of_pages={number_of_pages}
              headerSpace="evenly"
              maxW=""
              minW="100%"
              COLUMNS={USERS_TXNS_COLUMNS(USERS_WALLET_TXNS?.data?.data?.data, router, limit)}
              DATA={USERS_WALLET_TXNS?.data?.data?.data}
            />
          </Box>
        )}
      </LayoutView>
    </>
  );
};

export default UsersWalletTxnsList;
