import Link from 'next/link';
import {theme} from '../../../theme';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {AnimatedLoader} from '../../../components';
import CustomersTable from './CustomersTable/Table';
import {fetchCustomers} from '../../../apis/customers';
import {Button} from '../../../ui-lib/ui-lib.components';
import {Box, useToast, HStack, extendTheme, Heading} from '@chakra-ui/react';
import SortBy from '../../../components/SortBy';

import TopHeader from './TopHeader';
import Filter from './filter';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';
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

  const number_of_pages = Math.ceil(~~customers?.count / ~~limit);
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
      // mt="clamp(-100vh, -82vh, calc(-100vh + 120px))"
      mt="clamp(52px,calc(11.4vh + 40px),96px)"
      px={{base: '0px', xl: '30px'}}
      maxW="full"
      w="full"
      mx="auto"
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
              <Filter
                setUrl={setAddedParam}
                url={addedParam}
                isFractional={customerOverviewData?.total_fractions_holders}
                listings={customers?.listings_available}
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
              number_of_pages={3}
              forLimit={[limit, router]}
              handleExpand={handleExpand}
              handlePagination={handlePagination}
              customerData={customerOverviewData}
            />
          )}
        </>
      ) : null}
    </Box>
  );
};
export default CustomerOverviewPage;

export const customers = {
  status: true,
  count: 78,
  total_customers: 78,
  check: 'deployed',
  total_asset_holders: 28,
  total_fractions_holders: 10,
  customers_with_outstanding: 10,
  customers_without_outstanding: 14,
  total_defaulters: 11,
  listings_available: [
    'Goshen',
    'Cesc fab',
    'Civic resident',
    'Acc',
    'Levi charged',
    'Civic residence',
    'Xyz',
    'Haven',
    'Preference',
    'Thisis',
    'Parkside estate',
    'Golden acres',
    'Pinecrest meadows',
    'Lakeshore residence',
    'Junir apartment',
    'Cedar ridge apartments',
    'Woodland properties',
    'Laitan estate',
    'Rahim estate',
    'Graham  suite',
    'Blue ridge towers',
    'Baldini suite',
    'Bain apartments',
    'Ololade suite',
    'Maple woods estate',
    'Emerald villas',
    'Well spacious 4 bedroom apartment',
    'Christopher suite',
    'Egugun mall ipaja lagos',
    'Chevy view estate lekki',
    'Elvin testing estate ikoyi',
    '6 bedroom house',
    '5-bedroom duplex in victoria island',
    'Charles mall',
    'James estate ikeja',
    'Modern 3-bedroom apartment in lekki, lagos',
    'Block 105, abesan estate',
    'Block 103, abesan estate',
    'Fully automated 5 bedroom duplex in chevron',
    'Luxury apartment complex in ikoyi, lagos',
    'prime parcel of land in lekki free trade zone',
    'Urban center - mixed-use development in victoria island, lagos',
    'Sunset terrace homes',
    'Luxuria estate - modern living in lagos',
    'Greenfield agricultural land',
    'Rosewood semi-detached duplex',
    'White orchid detached villa',
    'Blue river shopping mall',
  ],
  page1: [
    {
      response: {
        customer_id: 3375,
        id: 4026,
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
        email: 'ralph.edwards@example.com',
        name: 'Ralph Edwards',
        phone: '+1 415 555 2671',
        community: 'Mapel Glen & 2 others',
        address: null,
        status: false,
        date_joined: '2025-04-16T13:48:59.602977Z',
        referred_by: {
          name: 'Facebook',
          avatar:
            'https://elasticbeanstalk-us-east-1-366943739396.s3.amazonaws.com/resources/facebook.svg',
          id: null,
          type: 'Facebook',
          info: 'Facebook',
        },
      },
    },
    {
      response: {
        customer_id: 3352,
        id: 4006,
        img: 'https://randomuser.me/api/portraits/women/45.jpg',
        email: 'brooke.simmons@example.com',
        name: 'Brooke Simmons',
        phone: '+1 217 555 0113',
        address: null,
        community: 'Crystal Lake Manor',
        status: true,
        date_joined: '2025-04-12T03:09:36.170497Z',
        referred_by: {
          name: 'Joseph Admin',
          avatar: 'https://matador-bucket.s3.amazonaws.com/media/3c758fc0-224.png',
          id: 3738,
          type: 'created',
          info: null,
        },
      },
    },
    {
      response: {
        customer_id: 3351,
        id: 3532,
        img: 'https://randomuser.me/api/portraits/men/28.jpg',
        email: 'wade.warren@example.com',
        name: 'Wade Warren',
        phone: '+1 252 555 0126',
        community: 'Oakstone Valley',
        address: null,
        status: false,
        date_joined: '2025-04-11T22:27:46.554830Z',
        referred_by: {
          name: 'Facebook',
          avatar:
            'https://elasticbeanstalk-us-east-1-366943739396.s3.amazonaws.com/resources/facebook.svg',
          id: null,
          type: 'Facebook',
          info: 'Facebook',
        },
      },
    },
    {
      response: {
        customer_id: 3350,
        id: 4005,
        img: 'https://randomuser.me/api/portraits/women/33.jpg',
        email: 'jenny.wilson@example.com',
        name: 'Jenny Wilson',
        phone: '+1 704 555 0127',
        address: null,
        community: 'Oak Ridge',
        status: true,
        date_joined: '2025-04-11T13:18:22.267094Z',
        referred_by: {
          name: 'Linkedin',
          avatar: null,
          id: null,
          type: 'Linkedin',
          info: 'Linkedin',
        },
      },
    },
    {
      response: {
        customer_id: 3242,
        id: 2336,
        img: 'https://randomuser.me/api/portraits/women/52.jpg',
        email: 'arlene.mccoy@example.com',
        name: 'Arlene McCoy',
        phone: '+1 270 555 0117',
        address: null,
        status: false,
        community: 'Evergreen Hills',
        date_joined: '2025-03-17T13:49:05.800924Z',
        referred_by: {
          name: 'Another Admin',
          avatar: 'https://matador-bucket.s3.amazonaws.com/media/a3195a78-570.png',
          id: 3787,
          type: 'created',
          info: null,
        },
      },
    },
    {
      response: {
        customer_id: 3241,
        id: 2335,
        img: 'https://randomuser.me/api/portraits/men/41.jpg',
        email: 'guy.hawkins@example.com',
        name: 'Guy Hawkins',
        phone: '+1 205 555 0100',
        address: null,
        status: false,
        community: 'Bluebell Meadows & 3 others',
        date_joined: '2025-03-17T13:49:05.732809Z',
        referred_by: {
          name: 'Another Admin',
          avatar: 'https://matador-bucket.s3.amazonaws.com/media/a3195a78-570.png',
          id: 3787,
          type: 'created',
          info: null,
        },
      },
    },
    {
      response: {
        customer_id: 3240,
        id: 2334,
        img: 'https://randomuser.me/api/portraits/women/68.jpg',
        email: 'courtney.henry@example.com',
        name: 'Courtney Henry',
        phone: '+1 505 555 0125',
        address: null,
        status: false,
        community: 'The Aspen Enclave',
        date_joined: '2025-03-17T13:49:05.519216Z',
        referred_by: {
          name: 'Another Admin',
          avatar: 'https://matador-bucket.s3.amazonaws.com/media/a3195a78-570.png',
          id: 3787,
          type: 'created',
          info: null,
        },
      },
    },
    {
      response: {
        customer_id: 3231,
        id: 3895,
        img: 'https://randomuser.me/api/portraits/men/89.jpg',
        email: 'peter.schmidt@example.com',
        name: 'Peter Schmidt',
        phone: '+49 176 12345678',
        community: 'Zenith Court',
        address: null,
        status: false,
        date_joined: '2025-03-14T14:11:33.723814Z',
        referred_by: {
          name: 'Referral',
          avatar: null,
          id: null,
          type: 'Referral',
          info: 'Referral',
        },
      },
    },
    {
      response: {
        customer_id: 3230,
        id: 3892,
        img: 'https://randomuser.me/api/portraits/men/76.jpg',
        email: 'lucas.martin@example.com',
        name: 'Lucas Martin',
        phone: '+33 6 12 34 56 78',
        community: 'Luxe Haven Residences',
        address: null,
        status: false,
        date_joined: '2025-03-14T14:02:39.534484Z',
        referred_by: {
          name: 'Referral',
          avatar: null,
          id: null,
          type: 'Referral',
          info: 'Referral',
        },
      },
    },
    {
      response: {
        customer_id: 3227,
        id: 3890,
        img: 'https://randomuser.me/api/portraits/men/22.jpg',
        email: 'james.cooper@example.com',
        name: 'James Cooper',
        phone: '+1 505 555 0125',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-14T09:58:34.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
  ],
  page2: [
    {
      response: {
        customer_id: 3227,
        id: 3890,
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
        email: 'michael.anderson@example.com',
        name: 'Michael Anderson',
        phone: '+1 505 555 0125',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-14T09:58:34.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3228,
        id: 3891,
        img: 'https://randomuser.me/api/portraits/women/44.jpg',
        email: 'sophie.muller@example.com',
        name: 'Sophie Müller',
        phone: '+49 176 12345678',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-15T10:22:11.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3229,
        id: 3892,
        img: 'https://randomuser.me/api/portraits/men/67.jpg',
        email: 'james.wilson@example.com',
        name: 'James Wilson',
        phone: '+1 212 555 0187',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-16T11:45:22.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3230,
        id: 3893,
        img: 'https://randomuser.me/api/portraits/women/28.jpg',
        email: 'maria.garcia@example.com',
        name: 'Maria García',
        phone: '+34 612 345 678',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-17T08:15:33.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3231,
        id: 3894,
        img: 'https://randomuser.me/api/portraits/men/53.jpg',
        email: 'oliver.smith@example.com',
        name: 'Oliver Smith',
        phone: '+44 7700 900123',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-18T14:37:45.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3232,
        id: 3895,
        img: 'https://randomuser.me/api/portraits/women/71.jpg',
        email: 'emma.johnson@example.com',
        name: 'Emma Johnson',
        phone: '+1 415 555 0198',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-19T16:22:10.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3233,
        id: 3896,
        img: 'https://randomuser.me/api/portraits/men/89.jpg',
        email: 'luca.rossi@example.com',
        name: 'Luca Rossi',
        phone: '+39 345 678 9012',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-20T09:12:34.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3234,
        id: 3897,
        img: 'https://randomuser.me/api/portraits/women/63.jpg',
        email: 'sarah.dubois@example.com',
        name: 'Sarah Dubois',
        phone: '+33 6 12 34 56 78',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-21T11:45:22.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3235,
        id: 3898,
        img: 'https://randomuser.me/api/portraits/men/22.jpg',
        email: 'david.brown@example.com',
        name: 'David Brown',
        phone: '+1 617 555 0134',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-22T13:18:56.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3236,
        id: 3899,
        img: 'https://randomuser.me/api/portraits/women/85.jpg',
        email: 'anna.kowalski@example.com',
        name: 'Anna Kowalski',
        phone: '+48 601 234 567',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-23T15:33:44.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
  ],
  page3: [
    {
      response: {
        customer_id: 3237,
        id: 3900,
        img: 'https://randomuser.me/api/portraits/men/45.jpg',
        email: 'thomas.martin@example.com',
        name: 'Thomas Martin',
        phone: '+1 305 555 0178',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-24T10:22:11.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },
    {
      response: {
        customer_id: 3238,
        id: 3901,
        img: 'https://randomuser.me/api/portraits/women/37.jpg',
        email: 'laura.schmidt@example.com',
        name: 'Laura Schmidt',
        phone: '+49 171 9876543',
        community: 'The Aspen Enclave',
        address: null,
        status: true,
        date_joined: '2025-03-25T12:45:33.441175Z',
        referred_by: {
          name: 'Via a consultant',
          avatar: null,
          id: null,
          type: 'Via a consultant',
          info: 'you',
        },
      },
    },

  ],
};
