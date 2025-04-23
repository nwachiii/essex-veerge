import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {Box, Center, Stack, useToast} from '@chakra-ui/react';
import {fetchBlackListUsers} from 'apis/manageAgent';
import MatadorCustomTable from '@/components/common/Table';
import {AnimatedLoader, LayoutView} from '@/components/index';
import BLACKLIST_COLUMNS from './Columns';
import BackBtn from 'pages/account/components/BackBtn';

const BlacklistedUsers = () => {
  const router = useRouter();
  const GET_BLACKLIST = useQuery(['blacklist'], fetchBlackListUsers);
  const toast = useToast();
  const BLACKLIST_DATA = GET_BLACKLIST?.data?.data?.user_list || [];

  const routeQueries = router.query;
  const limit = 10;
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
  const number_of_pages = Math.ceil(~~BLACKLIST_DATA?.length / ~~limit);

  return (
    <div>
      <Stack position={'relative'} mx="auto" bg="#FAFAFA">
        <Head>
          <title>Veerge | Blacklisted Users</title>
          <meta name="description" content="Blacklisted Users" />
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
          {GET_BLACKLIST?.isLoading ? (
            <Center h="65vh">
              <AnimatedLoader />
            </Center>
          ) : GET_BLACKLIST?.isError ? (
            toast({
              title: 'Request failed',
              description: `An error occured while fetching`,
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            })
          ) : (
            <Stack
              mt="clamp(52px,calc(11.4vh + 40px),96px)"
              px={{base: '0px', xl: '30px'}}
              maxW="95%"
              w="full"
              mx="auto"
            >
              <BackBtn name="Blacklist" />
              <MatadorCustomTable
                maxW=""
                minW="100%"
                headerSpace="evenly"
                handlePagination={handlePagination}
                number_of_pages={number_of_pages}
                COLUMNS={BLACKLIST_COLUMNS(GET_BLACKLIST?.refetch)}
                DATA={BLACKLIST_DATA}
              />
            </Stack>
          )}
        </LayoutView>
      </Stack>
    </div>
  );
};

export default BlacklistedUsers;
