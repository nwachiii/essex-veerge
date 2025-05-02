import {useRouter} from 'next/router';
import {useState} from 'react';
import {AnimatedLoader} from '../../../../../components';
import CustomersTable from './CustomersTable/Table';
import {Box, useToast, HStack, Heading, Image} from '@chakra-ui/react';
import SortBy from '../../../../../components/SortBy';

import TopHeader from './TopHeader';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';
import {toastForError} from 'utils/toastForErrors';
import {themeStyles} from '../../../../../theme';
import backArrow from '/src/images/icons/back-arrow.png';
import MatadorCustomTable from '@/components/common/Table';
import {OCCUPANT_DATA_COLUMNS} from 'constants/DEMODATA/communities/units';

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

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

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

  const customerOverviewData = customers?.[`page${currentPage}`];

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

  const number_of_pages_when_expanded = Math.ceil(~~customers?.count / 20);
  const canNotBeExpanded = ~~currentPage > number_of_pages_when_expanded;

  toastForError(customers.error, customers.isError, toast);

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date joined oldest to newest',
    'Date joined newest to oldest',
  ];

  const isTableValid = !!customerOverviewData?.length;

  return (
    <Box
      mt="clamp(52px,calc(11.4vh + 40px),96px)"
      px={{base: '0px', xl: '30px'}}
      maxW="full"
      w="full"
      mx="auto"
    >
      <HStack
        zIndex={1000}
        position="relative"
        onClick={() => router.back(-1)}
        cursor={'pointer'}
        mb="32px"
      >
        <Image mr={2} boxSize="50px" alt="back_arrow" src={backArrow.src} />
        <Heading {...themeStyles.textStyles.h3}>Oak Ridge Occupants</Heading>
      </HStack>

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
      ) : customers ? (
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
            <HStack
              justifySelf="flex-end"
              flexWrap="wrap-reverse"
              justify="flex-end"
              w="full"
              spacing="16px"
              alignItems="end"
            >
              {/* <Button
                as={Link}
                h="40px"
                maxW={'195px'}
                href="/residents/blacklist"
                variant="outline-radius"
              >
                Blacklist
              </Button> */}
              <SortBy
                sortFor="users"
                setUrl={setAddedParam}
                url={addedParam}
                btnStyle={{bg: '#fff', mt: '0px'}}
                sort_params={sort_params}
              />
              {/* <Filter
                setUrl={setAddedParam}
                url={addedParam}
                isFractional={customerOverviewData?.total_fractions_holders}
                listings={customers?.listings_available}
              /> */}

              <DownloadCsv
                isTableValid={isTableValid}
                data={getDataFromJSON(customerOverviewData)}
              />
            </HStack>
          </HStack>

          {customers.isLoading ? null : (
            <MatadorCustomTable
              forMemo={[]}
              forLimit={[limit]}
              expanded={expand}
              headerSpace="evenly"
              handleExpand={handleExpand}
              DATA={customers?.data}
              number_of_pages={150}
              handlePagination={handlePagination}
              COLUMNS={OCCUPANT_DATA_COLUMNS(customers?.data)}
            />
          )}
        </>
      ) : null}
    </Box>
  );
};
export default CustomerOverviewPage;

export const customers = {
  data: [
    {
      address: '4th Avenue, Roseline Close',
      name: 'Ralph Edwards',
      phoneNumber: '+1 415 555 2671',
      status: 'Owner',
      email: 'ralpheds@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      address: '5th Avenue, Roseline Close',
      name: 'Brooklyn Simmons',
      phoneNumber: '+1 217 555 0113',
      status: 'Tenant',
      email: 'brooke25@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    {
      address: 'Garden Heights, Pine Hill Road',
      name: 'Wade Warren',
      phoneNumber: '+1 252 555 0126',
      status: 'Tenant',
      email: 'wadewee@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
    {
      address: 'Blossom Way, Cherrywood Drive',
      name: 'Jenny Wilson',
      phoneNumber: '+1 704 555 0127',
      status: 'Owner',
      email: 'jennywilly@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/81.jpg',
    },
    {
      address: 'Sunset Drive, Willow Park Avenue',
      name: 'Arlene McCoy',
      phoneNumber: '+1 270 555 0117',
      status: 'Tenant',
      email: 'arlenee89@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    },
    {
      address: 'Maple Court, Lily Lane',
      name: 'Guy Hawkins',
      phoneNumber: '+1 205 555 0100',
      status: 'Owner',
      email: 'guyhawkins158@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
    {
      address: 'Palm Grove, Lavender Hill',
      name: 'Courtney Henry',
      phoneNumber: '+1 505 555 0125',
      status: 'Tenant',
      email: 'courtneyhenry11@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    },
    {
      address: 'Silver Heights, Briarwood Lane',
      name: 'James Cooper',
      phoneNumber: '+1 907 555 0101',
      status: 'Owner',
      email: 'jamescooper@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    },
    {
      address: 'Ivy Lane, Westbrook Close',
      name: 'Savannah Nguyen',
      phoneNumber: '+1 702 555 0122',
      status: 'Tenant',
      email: 'savngu94@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      address: 'Laurel Heights, Riverstone Drive',
      name: 'Darlene Robertson',
      phoneNumber: '+1 209 555 0104',
      status: 'Tenant',
      email: 'darlene23@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
    },
  ],
};
