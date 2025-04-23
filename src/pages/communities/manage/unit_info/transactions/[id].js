import {CSVLink} from 'react-csv';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import {useQuery} from '@tanstack/react-query';
import SortBy from '../../../../../components/SortBy';
import {fetchUnitTxns} from '../../../../../apis/listings';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {UNIT_TXN_COLUMNS} from '../../../../../constants/dashboard/outstandingBalanceCustomersColumn';
import PageHeader from '../../../../../components/common/PageHeader';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';
import {HStack, Image, Stack, useToast, VStack} from '@chakra-ui/react';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import {BackArrowWithText} from '../../../../../components/assets/BackArrow';
import OutstandingBalTopHeader from '../../../../dashboard/outstanding-balance/OutstandingBalTopHeader';

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

  if (UNIT_TXNS?.isLoading) {
    return (
      <VStack h="56vh">
        <AnimatedLoader />
      </VStack>
    );
  }
  if (UNIT_TXNS?.isError) {
    return toast({
      title: 'Request failed',
      description: `An error occured while fetching`,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date Joined Oldest to Newest',
    'Date Joined Newest to Oldest',
  ];

  const unitTxns = UNIT_TXNS?.data && UNIT_TXNS?.data?.data;
  // console.log('unitTxnsss', unitTxns?.data);

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

  // useEffect(() => {
  // 	const fetch = async() => await UNIT_TXNS?.refetch();
  // 	fetch();
  // }, []);

  return (
    <div style={{background: '#FFFFFF', minHeight: '100vh'}}>
      <LayoutView activePage={'listings'}>
        <PageHeader pageTitle="Unit Transactions" />
        <BackArrowWithText pl={4} mb={4} text={name ?? 'Back'} />
        <Stack mx="auto" maxW="1284px" spacing={'3px'} mt="12vh">
          {UNIT_TXNS?.isLoading ? (
            <AnimatedLoader />
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
              <OutstandingBalTopHeader unitTxns={unitTxns} value={value} setValue={setValue} />
              <HStack mb="18px" mt="15px" w="full" justify="flex-end" gap="12px">
                <CSVLink data={getDataFromJSON(unitTxns?.data)}>
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
                </CSVLink>
                <SortBy
                  url={addedParam}
                  setUrl={setAddedParam}
                  sortFor="outstanding_balance_id"
                  sort_params={sort_params}
                />
              </HStack>
              <MatadorCustomTable
                isManageAgentEmpty
                nextPageUrl={'/dashboard/outstanding-balance/user_payment'}
                w="full"
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
        </Stack>
      </LayoutView>
    </div>
  );
}
