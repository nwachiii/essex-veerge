import Link from 'next/link';
import {CSVLink} from 'react-csv';
import {theme} from '../../../theme';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {AnimatedLoader} from '../../../components';
import CustomersTable from './CustomersTable/Table';
import {fetchCustomers} from '../../../apis/customers';
import {Button} from '../../../ui-lib/ui-lib.components';
import {
  Box,
  useToast,
  HStack,
  Image,
  Button as ChakraBtn,
  extendTheme,
  Heading,
  SkeletonText,
  Text,
  Center,
  Stack,
  VStack,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import SortBy from '../../../components/SortBy';
import backArrow from '/src/images/icons/back-arrow.png';
import collapseIcon from '/src/images/icons/collapse.png';
import downloadIcon from '/src/images/icons/download-icon.svg';

import TopHeader from './TopHeader';
import Filter from './filter';
import createCustomerIcon from '/src/images/icons/create-customer-acct-icon.svg';
import {BiExpand} from 'react-icons/bi';
import expandIcon from '/src/images/icons/expand-icon.svg';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';
import {handleDateFormat} from 'utils/formatDate';
import {toastForError} from 'utils/toastForErrors';

const styles = extendTheme({...theme});

export const CustomerOverviewPage = () => {
  const [expand, setExpand] = useState(true);
  const [value, setValue] = useState('1');
  const [limit, setLimit] = useState(10);

  const toast = useToast();
  const [addedParam, setAddedParam] = useState({
    sort: '',
    filter: '',
    param: '',
  });
  const router = useRouter();
  const handleBack = () => {
    router.back(-1);
  };

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

  const convertToApiQuery = () => {
    return `${Object.entries(routeQueries)
      .map(item => (item?.[0] === 'filter' ? `${item?.[1]}` : `${item?.[0]}=${item?.[1]}`))
      .join('&')}`;
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

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i].response?.name,
          email: data[i].response?.email,
          phone: data[i].response?.phone,
          referral: data[i].response?.phone,
        });
    }
    return result;
  };
  const QUERY_PARAMS =
    value == '2'
      ? 'asset_holders=true'
      : value == '3'
        ? 'defaulting=true'
        : value == '4'
          ? 'outstanding=true'
          : value == '5'
            ? 'outstanding=false'
            : value == '6'
              ? 'fractions=true'
              : '';

  const mainParam = QUERY_PARAMS + (QUERY_PARAMS ? '&' : '') + convertToApiQuery();

  const customers = useQuery(['customer-meta-data', mainParam], () => fetchCustomers(mainParam));
  const customerOverviewData = [customers?.data] ? [customers?.data?.data][0]?.data : [];

  const handleExpand = () => {
    setExpand(!expand);
    setLimit(prev => (prev === 10 ? 20 : 10));
    const defaultQuery = {
      limit: limit === 10 ? 20 : 10,
      ...(canNotBeExpanded && limit === 10 ? {page: ~~currentPage - 1} : {}),
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    expand == false && window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetch = async () => await customers.refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    const defaultQuery = {
      page: `1`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const number_of_pages = Math.ceil(~~customers?.data?.data?.count / ~~limit);
  const number_of_pages_when_expanded = Math.ceil(~~customers?.data?.data?.count / 20);
  const canNotBeExpanded = ~~currentPage > number_of_pages_when_expanded;

  toastForError(customers.error, customers.isError, toast);

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date joined oldest to newest',
    'Date joined newest to oldest',
  ];

  const isTableValid = !customers.isError && !!customerOverviewData?.length;

  return (
    <Box
      // mt="clamp(-100vh, -82vh, calc(-100vh + 120px))"
      mt="clamp(52px,calc(11.4vh + 40px),96px)"
      px={{base: '0px', xl: '30px'}}
      maxW="full"
      w="full"
      mx="auto"

      // className="main-app"
    >
      <TopHeader
        customersFetchQuery={customers}
        setValue={setValue}
        value={value}
        handleExpand={handleExpand}
        expand={expand}
      />
      {customers?.isLoading ? (
        <Box position="relative" display="grid" placeItems="center" mx="auto" mt="10vh">
          <AnimatedLoader />
        </Box>
      ) : customers?.isError ? (
        <></>
      ) : customers?.data ? (
        <>
          <HStack
            justify="space-between"
            mt={!expand ? '0' : '16px'}
            mb="24px"
            w="full"
            spacing="14px"
            align="end"
            color="#191919"
            fontFamily="Euclid Circular B"
          >
            <Heading fontSize="28px" fontWeight="600" lineHeight="24px" color="#191919">
              Overview
            </Heading>

            <HStack
              justifySelf="flex-end"
              flexWrap="wrap-reverse"
              justify="flex-end"
              w="full"
              spacing="16px"
              alignItems="end"
            >
              <Button
                as={Link}
                h="40px"
                maxW={'195px'}
                href="/users/blacklist"
                variant="outline-radius"
              >
                Blacklist
              </Button>
              <SortBy
                sortFor="users"
                setUrl={setAddedParam}
                url={addedParam}
                btnStyle={{bg: '#fff', mt: '0px'}}
                sort_params={sort_params}
              />
              <Filter
                setUrl={setAddedParam}
                url={addedParam}
                isFractional={customerOverviewData?.total_fractions_holders}
                listings={customers?.data?.data?.listings_available}
              />

              <DownloadCsv
                isTableValid={isTableValid}
                data={getDataFromJSON(customerOverviewData)}
              />
            </HStack>
          </HStack>

          {customers.isLoading ? null : (
            <CustomersTable
              forMemo={[router]}
              expanded={expand}
              forLimit={[limit, router]}
              handleExpand={handleExpand}
              handlePagination={handlePagination}
              number_of_pages={number_of_pages}
              customerData={customerOverviewData}
            />
          )}
        </>
      ) : null}
    </Box>
  );
};
export default CustomerOverviewPage;
