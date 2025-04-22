import {fetchAllStoreWalletAgentsTxns} from '../../../apis/account';
import {AbsoluteCenter, Box, Flex, Text, VStack, useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {AnimatedLoader, LayoutView} from '../../../components';
import Head from 'next/head';
import BackBtn from '../components/BackBtn';
import ActionBtns from '../components/ActionBtns';
import {MatadorCustomTable} from '../../../components/common/Table';
import Link from 'next/link';
import {AGENTS_TXNS_COLUMNS} from '../../../constants/accounts/store_wallet/agents_txns';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';
import {useState} from 'react';
import {useRouter} from 'next/router';
import ProgressIndicator from 'ui-lib/ui-lib.components/CustomTag/progressIndicator';

export const AgentsWalletTxnsList = () => {
  const toast = useToast();

  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const routeQueries = router.query;

  const convertToApiQuery = () => {
    const queryParam = `${Object.entries(routeQueries)
      .flatMap(item =>
        item?.[0] === 'sort' || item?.[0] === 'page' || item?.[0] === 'limit'
          ? `${item?.[0]}=${item?.[1]}`
          : []
      )
      .join('&')}`;

    return queryParam ? `?${queryParam}` : '';
  };

  const mainParam = convertToApiQuery();
  const AGENTS_WALLET_TXNS = useQuery(['store-wallet-agents-txns', mainParam], () =>
    fetchAllStoreWalletAgentsTxns(mainParam)
  );

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

  const number_of_pages = Math.ceil(~~AGENTS_WALLET_TXNS?.data?.data?.count / ~~limit);

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      AGENTS_WALLET_TXNS?.data?.data?.data &&
        result.push({
          No: '1 + i',
          Name: `${obj[i]?.account?.owner?.first_name} ${obj[i]?.account?.owner?.last_name}`,
          Amount: obj[i]?.amount,
        });
    }
    return result;
  };

  const totalBalance = AGENTS_WALLET_TXNS?.data?.data;
  const isTableValid =
    !AGENTS_WALLET_TXNS.isError && !!AGENTS_WALLET_TXNS?.data?.data?.data?.length;

  return (
    <>
      <Head>
        <title>Veerge | Agents Wallet</title>
        <meta name="description" content="Veerge | Agents Wallet" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage={'account'}
      >
        {AGENTS_WALLET_TXNS?.isLoading ? (
          <AbsoluteCenter mt="25vh">
            <AnimatedLoader />
          </AbsoluteCenter>
        ) : AGENTS_WALLET_TXNS?.isError ? (
          toast({
            title: 'Request failed',
            description: `An error occured while fetching agents transactions`,
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
              <BackBtn name="Realtors Wallet" />
              <ActionBtns
                isTableValid={isTableValid}
                noFilter
                data={getDataFromJSON(AGENTS_WALLET_TXNS?.data?.data?.data)}
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
                {totalBalance?.total === 0 ? '-' : formatAmountWithDecimal(totalBalance?.total)}
              </Text>

              <ProgressIndicator hasGained={true} />
            </VStack>

            <MatadorCustomTable
              isManageAgentEmpty
              headerSpace="evenly"
              handlePagination={handlePagination}
              forMemo={[router]}
              forLimit={[limit, router]}
              number_of_pages={number_of_pages}
              maxW=""
              minW="100%"
              COLUMNS={AGENTS_TXNS_COLUMNS(AGENTS_WALLET_TXNS?.data?.data?.data)}
              DATA={AGENTS_WALLET_TXNS?.data?.data?.data}
            />
          </Box>
        )}
      </LayoutView>
    </>
  );
};

export default AgentsWalletTxnsList;
