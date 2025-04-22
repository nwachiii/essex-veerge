import React, {useEffect, useState} from 'react';
import {AnimatedLoader, LayoutView} from '../../../components';
import {useRouter} from 'next/router';
import {
  Box,
  Button,
  HStack,
  Image,
  Flex,
  useToast,
  Skeleton,
  SkeletonText,
  Center,
} from '@chakra-ui/react';
import {BackArrowWithText} from '../../../components/assets/BackArrow';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {MatadorCustomTable} from '../../../components/common/Table';
import {OUSTANDING_BALANCE_LISTING_COLUMNS} from '../../../constants/dashboard/outstandingBalanceColumn';
import {CSVLink} from 'react-csv';
import PageHeader from '../../../components/common/PageHeader';
import SortBy from '../../../components/SortBy';
import sortByIcon from '/src/images/icons/sort-by-icon.svg';
import {fetchDashboardData} from '../../../apis';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {toastForError} from 'utils/toastForErrors';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

const OutstandingTransactions = () => {
  const [addedParam, setAddedParam] = useState('');
  const toast = useToast();
  const router = useRouter();
  const limit = 10;

  const routeQueries = router.query;

  const convertToApiQuery = () => {
    const allowedQueries = ['sort', 'page', 'limit', 'transaction'];
    const entries = Object.entries(routeQueries).filter(([key]) => allowedQueries.includes(key));

    let query = entries.map(([key, value]) => `${key}=${value}`).join('&');

    if (!query.includes('sort=')) {
      query = query
        ? `${query}&sort=outstanding_balance_highest_to_lowest`
        : `sort=outstanding_balance_highest_to_lowest`;
    }

    return query;
  };

  const mainParam = `?${convertToApiQuery()}`;

  const {data, error, isError, isLoading, refetch} = useQuery(
    ['dashboard-for-outstanding-balance', mainParam],
    () => fetchDashboardData(mainParam),
    {forceFetch: true, staleTime: 1}
  );

  const queryClient = useQueryClient();

  // Parse the sorting option from the URL query parameter
  const urlSortingOption = router.query.sort;
  // Set the sorting option to the URL value if it exists and is different from the current sorting option

  if (urlSortingOption && urlSortingOption !== addedParam.replace('?sort=', '')) {
    setAddedParam(`?sort=${urlSortingOption}`);
  }

  useEffect(() => {
    queryClient.invalidateQueries('dashboard-for-outstanding-balance');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedParam]);

  useEffect(() => {
    const fetch = async () => await refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
  const outstanding_projects =
    data && Object.values([data][0]?.data?.dashboard_data?.outstanding_project);
  const number_of_pages = Math.ceil(~~data?.data?.dashboard_data?.count / ~~limit);

  if (isError) {
    toastForError(error, isError, toast);
  }

  const handleBack = () => {
    router.back(-1);
  };
  useEffect(() => {
    if (router.isReady) {
      // this will set the state before component is mounted
      // setData(JSON.parse(slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const sort_params = [
    'Total Purchase Highest to Lowest',
    'Total Purchase Lowest to Highest',
    'Total Paid Highest to Lowest',
    'Total Paid Lowest to Highest',
    'Outstanding Balance Highest to Lowest',
    'Outstanding Balance Lowest to Highest',
  ];

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i].name,
          total_purchase: data[i].total_purchase,
          total_paid: data[i].total_paid,
          outstanding_balance: data[i].outstanding,
        });
    }
    return result;
  };

  const outstanding_balance_data =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('outstanding-balance'));

  const isTableValid = !isError && !!outstanding_balance_data?.length;

  return (
    <div>
      <PageHeader pageTitle="Outstanding Balance | Transactions" />
      <LayoutView px={{base: '0px', xl: '30px'}} tabPanelStyle={{pb: '0px'}} pb="0px">
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          <Flex w="full" justify="space-between" align="center">
            <BackArrowWithText text="Transactions" onClick={handleBack} />
            <HStack w="full" justify={'flex-end'} gap="11px">
              <DownloadCsv
                isTableValid={isTableValid}
                data={getDataFromJSON(outstanding_balance_data)}
              />

              <SortBy
                setUrl={setAddedParam}
                url={addedParam}
                sort_params={sort_params}
                defaultSortValue="outstanding_balance_highest_to_lowest"
                sortFor="outstanding_balance"
              />
            </HStack>
          </Flex>
          <Box mt="20px">
            {isError ? null : isLoading ? (
              <Center h="65vh">
                <AnimatedLoader />
              </Center>
            ) : addedParam ? (
              <MatadorCustomTable
                minW="full"
                headerSpace="evenly"
                forMemo={[router]}
                handlePagination={handlePagination}
                number_of_pages={number_of_pages}
                DATA={outstanding_projects}
                COLUMNS={OUSTANDING_BALANCE_LISTING_COLUMNS(router, limit)}
              />
            ) : (
              <MatadorCustomTable
                minW="full"
                headerSpace="evenly"
                forMemo={[router]}
                handlePagination={handlePagination}
                number_of_pages={number_of_pages}
                DATA={outstanding_projects}
                // DATA={outstanding_balance_data}
                COLUMNS={OUSTANDING_BALANCE_LISTING_COLUMNS(router, limit)}
              />
            )}
          </Box>
        </Box>
      </LayoutView>
    </div>
  );
};

export default OutstandingTransactions;
