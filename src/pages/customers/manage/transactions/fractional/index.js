import React, {useEffect, useState} from 'react';
import PageHeader from '../../../../../components/common/PageHeader';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';
import {BackArrowWithText} from '../../../../../components/assets/BackArrow';
import {Box, Flex, HStack, Image, Text, VStack, Button, useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchFractionalListingTxns, fetchListingTxns} from '../../../../../apis/listings';
import {useRouter} from 'next/router';
// import {Button} from '../../../../../ui-lib/ui-lib.components';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import {FRACTIONAL_TXNS_COLUMNS} from '../../../../../constants/listings/fractional-transactions';
import FractionalTxnHeader from './Header';
import SortBy from '../../../../../components/SortBy';
import {CSVLink} from 'react-csv';
import {handleDateFormat} from 'utils/formatDate';
import {priceString} from 'utils';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

export const TransactionFractionalBreakdown = () => {
  const toast = useToast();
  const router = useRouter();
  const limit = 10;
  const routeQueries = router.query;

  const [addedParam, setAddedParam] = useState('');
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const convertToApiQuery = () => {
    const queryParams = Object.entries(routeQueries)
      .flatMap(([key, value]) =>
        key === 'sort' || key === 'page' || key === 'limit' ? `${key}=${value}` : []
      )
      .join('&');

    return queryParams ? `${routeQueries.id}/?${queryParams}` : `${routeQueries.id}/`;
  };

  const param = convertToApiQuery();

  const TRANSACTIONS = useQuery(['listingTxns_fractional', param], () =>
    fetchFractionalListingTxns(param)
  );

  const FractionalTxns = TRANSACTIONS && TRANSACTIONS?.data?.data?.data;

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

  useEffect(() => {
    const fetch = async () => await TRANSACTIONS.refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: `${data?.[i]?.owner?.first_name} ${data?.[i]?.owner?.last_name}`,
          'No. of Fraction': data?.[i]?.amount,
          'Purchase Price': priceString('naira', data?.[i]?.purchase_price),
          'Fractional value': priceString('naira', data?.[i]?.equity_value),
          Date: handleDateFormat(data?.[i]?.created_at),
        });
    }
    return result;
  };

  const sort_params = [
    'Total Purchase Highest to Lowest',
    'Total Purchase Lowest to Highest',
    'Highest no. of Fractions to Lowest',
    'Lowest no. of Fractions to Highest',
  ];
  const number_of_pages = Math.ceil(~~TRANSACTIONS?.data?.data?.count / ~~limit);
  const isTableValid = !TRANSACTIONS.isError && !!FractionalTxns?.length;

  return (
    <div>
      <LayoutView px={{base: '0px', xl: '30px'}} tabPanelStyle={{pb: '0px'}} pb="0px">
        {TRANSACTIONS?.isError ? (
          toast({
            title: 'An error occured',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          })
        ) : TRANSACTIONS?.isLoading ? (
          <VStack h="50vh">
            <AnimatedLoader />
          </VStack>
        ) : (
          <>
            <PageHeader pageTitle="Transactions | Fractional" />
            <Box
              mt="clamp(52px,calc(11.4vh + 40px),96px)"
              px={{base: '0px', xl: '30px'}}
              maxW="full"
              w="full"
              mx="auto"
            >
              <BackArrowWithText mb={4} text={FractionalTxns?.equity?.project?.name ?? 'Back'} />
              <FractionalTxnHeader data={TRANSACTIONS?.data?.data?.overview} />
              <HStack mb="18px" mt="20px" w="full" justify="flex-end" gap="12px" align={'center'}>
                <DownloadCsv isTableValid={isTableValid} data={getDataFromJSON(FractionalTxns)} />
                <SortBy
                  sort_params={sort_params}
                  url={addedParam}
                  setUrl={setAddedParam}
                  sortFor="fractional"
                  bg="#ffffff"
                />
              </HStack>
              <MatadorCustomTable
                isManageAgentEmpty
                forMemo={[router]}
                handlePagination={handlePagination}
                forLimit={[limit, router]}
                number_of_pages={number_of_pages}
                minW="full"
                headerSpace="evenly"
                DATA={FractionalTxns || []}
                COLUMNS={FRACTIONAL_TXNS_COLUMNS(FractionalTxns)}
              />
            </Box>
          </>
        )}
      </LayoutView>
    </div>
  );
};

export default TransactionFractionalBreakdown;
