import React, {useEffect, useState} from 'react';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';
import PageHeader from '../../../../../components/common/PageHeader';
import {BackArrowWithText} from '../../../../../components/assets/BackArrow';
import {Box, Flex, HStack, Image, Stack, Text, VStack, useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchListingTxns} from '../../../../../apis/listings';
import {useRouter} from 'next/router';
import {CSVLink} from 'react-csv';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {themeStyles} from '../../../../../theme';
import {formatAmountWithDecimal} from '../../../../../utils/formatAmount';
import {DEPOSITS_BREAKDOWN_COLUMNS} from '../../../../../constants/listings/deposit-breakdown';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import SortBy from '../../../../../components/SortBy';
import ProgressIndicator from 'ui-lib/ui-lib.components/CustomTag/progressIndicator';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

export const TransactionDepositBreakdown = () => {
  const toast = useToast();
  const router = useRouter();
  const limit = 10;
  const routeQueries = router.query;
  const project_id = routeQueries?.id;

  const convertToApiQuery = () => {
    const queryParam = `${Object.entries(routeQueries)
      .flatMap(item =>
        item?.[0] === 'page' || item?.[0] === 'limit' ? `${item?.[0]}=${item?.[1]}` : []
      )
      .join('&')}`;
    return `${project_id}${queryParam ? '/?' : '/'}${queryParam}`;
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

  const TRANSACTIONS = useQuery(['listingTxnss', convertToApiQuery()], () =>
    fetchListingTxns(convertToApiQuery())
  );

  const listingTxns = TRANSACTIONS && TRANSACTIONS?.data?.data.data;

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
          name: `${data[i].user?.first_name} ${data[i].user.last_name}`,
          unit: data[i].equity?.unit?.unit_title,
          deposit_amount: data[i].amount,
        });
    }
    return result;
  };

  const isTableValid = !TRANSACTIONS.isError && !!listingTxns?.length;

  const getTotalDeposits = () => {
    let result = 0;
    for (let index = 0; index < listingTxns.length; index++) {
      result += listingTxns[index]?.amount;
    }
    return result;
  };

  const number_of_pages = Math.ceil((~~TRANSACTIONS?.data?.data?.count ?? 1) / ~~limit);

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
            <PageHeader pageTitle="Transactions | deposit-breakdown" />
            <Box
              mt="clamp(52px,calc(11.4vh + 40px),96px)"
              px={{base: '0px', xl: '30px'}}
              maxW="full"
              w="full"
              mx="auto"
            >
              <BackArrowWithText mb={'20px'} text={'Recent Deposit'} />
              <Stack
                gap="12px"
                borderRadius="12px"
                border="0.5px solid #e4e4e4"
                bg="#ffffff"
                w="full"
                maxH="176px"
                padding="48px 24px"
                justifyContent={'center'}
                alignItems="center"
                mx="auto"
              >
                <Text fontSize="16px" fontWeight={'500'} lineHeight="24px" color="#525252">
                  Total Deposit
                </Text>
                <Text color="#12B76A" fontWeight="600" lineHeight="40.58px" fontSize={'24px'}>
                  {formatAmountWithDecimal(TRANSACTIONS?.data?.data?.total)}
                </Text>
                <ProgressIndicator hasGained={false} />
              </Stack>
              <HStack mb="25px" mt="26px" w="full" justify="flex-end" gap="12px" align={'center'}>
                {/* <CSVLink data={getDataFromJSON(listingTxns)}>
                  <Button
                    mt={0}
                    display="flex"
                    gap="3px"
                    w="177px"
                    height="46px"
                    border="1px solid #4545FE"
                    borderRadius="12px"
                    fontWeight="500"
                    fontSize="12px"
                    lineHeight="15px"
                    textAlign="center"
                    color="#4545FE"
                    bg="transparent"
                  >
                    <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                    Download as CSV
                  </Button>
                </CSVLink> */}
                <DownloadCsv isTableValid={isTableValid} data={getDataFromJSON(listingTxns)} />
              </HStack>
              <MatadorCustomTable
                minW="full"
                headerSpace=""
                DATA={listingTxns}
                emptyStateDescription="No deposits have been made yet"
                COLUMNS={DEPOSITS_BREAKDOWN_COLUMNS(listingTxns)}
                handlePagination={handlePagination}
                forMemo={[router]}
                forLimit={[limit, router]}
                number_of_pages={number_of_pages}
              />
            </Box>
          </>
        )}
      </LayoutView>
    </div>
  );
};

export default TransactionDepositBreakdown;
