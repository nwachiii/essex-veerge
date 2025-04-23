import {CSVLink} from 'react-csv';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'ui-lib/ui-lib.components';
import {useQuery} from '@tanstack/react-query';
import SortBy from '../../../../../components/SortBy';
import {fetchUnitTxns} from '../../../../../apis/listings';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {UNIT_TXN_COLUMNS} from '../../../../../constants/dashboard/outstandingBalanceCustomersColumn';
import PageHeader from '../../../../../components/common/PageHeader';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';
import {AbsoluteCenter, Box, HStack, Image, Stack, useToast, VStack} from '@chakra-ui/react';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import {BackArrowWithText} from '../../../../../components/assets/BackArrow';
import OutstandingBalTopHeader from '../../../../dashboard/outstanding-balance/OutstandingBalTopHeader';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

export default function TransactionHistory() {
  const limit = 10;
  const toast = useToast();
  const router = useRouter();
  const {query} = useRouter();
  const name = router?.query?.name;
  const routeQueries = router.query;
  const [value, setValue] = useState('1');
  const [addedParam, setAddedParam] = useState('');
  const UNIT_TXNS = useQuery(['unitTxns', query?.id, value, addedParam], () =>
    fetchUnitTxns(query?.id, value, addedParam)
  );

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date Joined Oldest to Newest',
    'Date Joined Newest to Oldest',
  ];

  const unitTxns = UNIT_TXNS?.data && UNIT_TXNS?.data?.data;
  const customersMetaData = unitTxns?.overview;
  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i]?.owner?.first_name,
          purchase_price: data[i]?.total_unit_price,
          total_paid: data[i]?.total_paid,
          outstanding_balance: data[i]?.outstanding_balance,
          date: data[i]?.created_at,
          status: data[i]?.payment_status,
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

  const number_of_pages = Math.ceil(UNIT_TXNS?.data?.data?.overview?.total / ~~10);

  return (
    <div style={{background: '#FFFFFF', minHeight: '100vh'}}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage={'listings'}
      >
        <PageHeader pageTitle="Unit Transactions" />

        <Box
          position={'relative'}
          // overflow="auto"
          mx="auto"
          maxW={'full'}
          px={{base: '0px', xl: '30px'}}
          // mt="clamp(-100vh , -82vh, calc(-100vh + 130px))"
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          zIndex={1000}
          w="full"
          h="full"
          pb="20px"
        >
          {UNIT_TXNS?.isLoading ? null : <BackArrowWithText pl={4} mb={4} text={name ?? 'Back'} />}
          {UNIT_TXNS?.isLoading ? (
            <AbsoluteCenter mt="25vh">
              <AnimatedLoader />
            </AbsoluteCenter>
          ) : UNIT_TXNS?.isError ? (
            toast({
              duration: 4000,
              status: 'error',
              isClosable: true,
              position: 'top-right',
              title: 'Fetch Error!',
              description: 'Something went wrong while fetching unit transactions',
            })
          ) : UNIT_TXNS?.data ? (
            <>
              <OutstandingBalTopHeader
                customersMetaData={customersMetaData}
                unitTxns={unitTxns}
                value={value}
                setValue={setValue}
              />
              <HStack mb="18px" mt="15px" w="full" justify="flex-end" gap="12px">
                {/* <CSVLink data={getDataFromJSON(unitTxns?.data)}>
                  <Button
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
                <DownloadCsv data={getDataFromJSON(unitTxns?.data)} />
                <SortBy
                  url={addedParam}
                  setUrl={setAddedParam}
                  sortFor="outstanding_balance_id"
                  sort_params={sort_params}
                />
              </HStack>
              <MatadorCustomTable
                // isManageAgentEmpty
                // nextPageUrl={'/dashboard/outstanding-balance/user_payment'}

                minW="full"
                headerSpace="evenly"
                forMemo={[router]}
                handlePagination={handlePagination}
                number_of_pages={number_of_pages}
                DATA={unitTxns?.data}
                COLUMNS={UNIT_TXN_COLUMNS(router, limit)}
              />
            </>
          ) : null}
        </Box>
      </LayoutView>
    </div>
  );
}
