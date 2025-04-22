import React from 'react';
import Head from 'next/head';
import {useQuery} from '@tanstack/react-query';
import {Box, Center, Stack, useToast} from '@chakra-ui/react';
import {AnimatedLoader} from '/src/components/common/loaders';
import {LayoutView} from '/src/components/PageLayout/LayoutView';
import {fetchEscrowHistory, fetchExcrowSummary} from '../../../apis/account';
import {MatadorCustomTable} from '@/components/common/Table';
import {EXCROW_HISTORY_COLUMNS, EXCROW_TXNS_COLUMNS} from 'constants/accounts/payment/excrow';
import {useRouter} from 'next/router';
import BackBtn from '../components/BackBtn';

export const ExcrowPaymentHistory = () => {
  const limit = 10;
  const toast = useToast();
  const router = useRouter();
  const EXCROW_PAYMENT_HIISTORY_QUERY = useQuery(['escrow-history'], fetchEscrowHistory);
  const ESCROW_DATA = EXCROW_PAYMENT_HIISTORY_QUERY?.data?.data?.results;
  const routeQueries = router.query;
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
  const EXCROW_PAYMENTS_COUNT = EXCROW_PAYMENT_HIISTORY_QUERY?.data?.data?.count;
  const number_of_pages = Math.ceil(~~EXCROW_PAYMENTS_COUNT / ~~limit);

  return (
    <Stack position={'relative'} mx="auto" bg="#FAFAFA">
      <Head>
        <title>Veerge | Account - Escrow history</title>
        <meta name="description" content="Escrow history" />
        <meta name="theme-color" content="#191919" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="account"
      >
        {EXCROW_PAYMENT_HIISTORY_QUERY?.isLoading ? (
          <Center h="65vh">
            <AnimatedLoader />
          </Center>
        ) : EXCROW_PAYMENT_HIISTORY_QUERY?.isError ? (
          toast({
            title: 'Request failed',
            description: `An error occured while fetching`,
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
            <BackBtn mb={4} name="Escrow History" />
            <MatadorCustomTable
              maxW=""
              minW="100%"
              headerSpace=""
              isManageAgentEmpty
              forMemo={[router]}
              forLimit={[limit, router]}
              handlePagination={handlePagination}
              number_of_pages={number_of_pages}
              COLUMNS={EXCROW_HISTORY_COLUMNS(ESCROW_DATA)}
              DATA={ESCROW_DATA}
            />
          </Box>
        )}
      </LayoutView>
    </Stack>
  );
};

export default ExcrowPaymentHistory;
