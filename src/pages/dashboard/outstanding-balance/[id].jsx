import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {fetchListingOutstandingBalanceCustomers} from '../../../apis/listings';
import {AnimatedLoader, LayoutView} from '../../../components';
import {useToast, Box, Flex, Image, HStack, Button, VStack, SkeletonText} from '@chakra-ui/react';
import {CSVLink} from 'react-csv';
import downloadIcon from '/src/images/icons/download-icon.svg';
import PageHeader from '../../../components/common/PageHeader';
import {MatadorCustomTable} from '../../../components/common/Table';
import {OUSTANDING_BALANCE_CUSTOMERS_COLUMNS} from '../../../constants/dashboard/outstandingBalanceCustomersColumn';
import {BackArrowWithText} from '../../../components/assets/BackArrow';
import OutstandingBalTopHeader from './OutstandingBalTopHeader';
import SortBy from '../../../components/SortBy';

export const OutstandingBalanceCustomersForSingleListing = () => {
  const [addedParam, setAddedParam] = useState('');
  const toast = useToast();
  const router = useRouter();
  const id = router?.query?.id;
  const isFractional = router?.query?.isFractional;
  const name = router?.query?.name;
  const [value, setValue] = useState('1');
  const [limit, setLimit] = useState(10);

  const routeQueries = router.query;

  const convertToApiQuery = () => {
    return `${value !== '1' ? '&' : '?'}${Object.entries(routeQueries)
      .map(item =>
        item?.[0] === 'page' || item?.[0] === 'limit' || item?.[0] === 'sort'
          ? `${item?.[0]}=${item?.[1]}`
          : 'null'
      )
      .filter(item => item != 'null')
      .join('&')}`;
  };
  const param = convertToApiQuery();
  console.log(param);
  const CUSTOMERS_DATA = useQuery(
    ['outstanding-balance-customers', id && parseInt(id), value, addedParam],
    () => fetchListingOutstandingBalanceCustomers(id && parseInt(id), value, param)
  );

  const customersList =
    CUSTOMERS_DATA?.data && CUSTOMERS_DATA?.data?.data?.customer_list?.map(item => item?.response);
  const customersMetaData = CUSTOMERS_DATA?.data && CUSTOMERS_DATA?.data?.data;

  // console.log('customer-list', customersMetaData);
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
  const sort_params = [
    'A-Z',
    'Z-A',
    'Date Joined Oldest to Newest',
    'Date Joined Newest to Oldest',
  ];

  useEffect(() => {
    const fetch = async () => await CUSTOMERS_DATA.refetch();
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, router]);

  const handleNextPage = arg => {
    arg == 'deposits' &&
      router.push(`/listings/manage/transactions/deposit-breakdown/?id=${parseInt(id)}`);
    arg == 'fractional' &&
      router.push(`/listings/manage/transactions/fractional/?id=${parseInt(id)}`);
  };
  const number_of_pages = Math.ceil(~~CUSTOMERS_DATA?.data?.data?.page_count / ~~limit);

  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      customersList &&
        result.push({
          No: '1 + i',
          Name: obj[i]?.name,
          Unit: obj[i]?.unit,
          PurchasePrice: obj[i]?.purchase_price,
          TotalPaid: obj[i]?.total_paid,
          OutstandingBalance: obj[i]?.outstanding_balance,
        });
    }
    return result;
  };

  return (
    <LayoutView>
      <PageHeader pageTitle="Outstanding Balance | customers" />
      <Box h="full" mt="10.6vh">
        <Flex w="full" justify="space-between">
          <BackArrowWithText pl={4} mb={4} text={name ?? 'Back'} />
          <HStack spacing="20px">
            {isFractional == 'true' ? (
              <Button
                onClick={() => handleNextPage('fractional')}
                bg="#4545FE"
                width="192px"
                height="48px"
                border="1px solid #4545FE"
                borderRadius="12px"
                color="#FFFFFF"
                fontWeight={'400'}
                fontSize={'18px'}
              >
                Fractional
              </Button>
            ) : null}
            <Button
              px={3}
              onClick={() => handleNextPage('deposits')}
              bg="#FFFFFF"
              minW="192px"
              w="fit-content"
              height="48px"
              border="1px solid #4545FE"
              borderRadius="12px"
              color="#4545FE"
              fontWeight={'400'}
              fontSize={'18px'}
            >
              Recent Deposits
            </Button>
          </HStack>
        </Flex>
        {CUSTOMERS_DATA?.isLoading ? (
          <VStack h="80vh">
            <AnimatedLoader />
          </VStack>
        ) : CUSTOMERS_DATA?.isError ? (
          toast({
            title: 'Fetch Error!',
            description:
              'Something went wrong while fetching the list of customer outstanding payments',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          })
        ) : CUSTOMERS_DATA?.data ? (
          <>
            {/* Meta data */}
            <OutstandingBalTopHeader
              customersMetaData={customersMetaData}
              value={value}
              setValue={setValue}
            />

            <HStack mb="18px" mt="45px" w="full" justify="flex-end" gap="12px">
              <CSVLink data={getDataFromJSON(customersList)}>
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

            {/* Table */}
            <Box
              padding="0"
              border={CUSTOMERS_DATA?.isLoading && 'solid 1px #f4f4f4'}
              borderRadius={CUSTOMERS_DATA?.isLoading && '8px'}
              overflow={CUSTOMERS_DATA?.isLoading && 'hidden'}
              bg={CUSTOMERS_DATA?.isLoading && 'white'}
            >
              <SkeletonText
                isLoaded={!CUSTOMERS_DATA?.isLoading}
                skeletonHeight="60px"
                noOfLines={1}
                startColor="gray.300"
                endColor={'#F3F3F3'}
              />
              <SkeletonText
                isLoaded={!CUSTOMERS_DATA?.isLoading}
                mt="4"
                noOfLines={6}
                spacing="10px"
                skeletonHeight="20px"
                startColor="gray.300"
                endColor={'#F3F3F3'}
              >
                {!CUSTOMERS_DATA?.isLoading && (
                  <MatadorCustomTable
                    isRefetching={CUSTOMERS_DATA?.isLoading}
                    nextPageUrl={'/dashboard/outstanding-balance/user_payment'}
                    minW="full"
                    headerSpace="evenly"
                    handlePagination={handlePagination}
                    forMemo={[router]}
                    forLimit={[limit, router]}
                    number_of_pages={number_of_pages}
                    DATA={customersList}
                    COLUMNS={OUSTANDING_BALANCE_CUSTOMERS_COLUMNS(customersList)}
                  />
                )}
              </SkeletonText>
            </Box>
          </>
        ) : null}
      </Box>
    </LayoutView>
  );
};

export default OutstandingBalanceCustomersForSingleListing;
