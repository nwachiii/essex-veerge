import {useEffect, useState} from 'react';
import TopHeader from '../../pages/dashboard/Header/TopHeader';
import {Box, Stack, Flex, HStack, AbsoluteCenter, SimpleGrid} from '@chakra-ui/react';
import GraphOverview from './GraphOverview';
import PropertyOverview from '../../pages/dashboard/Overview/PropertyOverview';
import CustomerOverview from '../../pages/dashboard/Overview/CustomerOverview';
import ListingOverviewState from './ListingOverviewState';
import OutstandingOverviewState from './OutstandingOverviewState';
import TopSellingState from './TopSellingState';
import BadgeForAccount from '../PageLayout/BadgeForAccount';
import QuickStart from '/src/components/QuickStart';
import {AnimatedLoader} from '../common/loaders';
import {useRouter} from 'next/router';
import DashboardApexChart from 'pages/dashboard/Overview/GraphRepresentation';
import TransactionsOverview from 'pages/dashboard/Overview/TransactionsOverview';
import OverviewHeader from 'pages/dashboard/Header/OverviewHeader';
import ListingOverview from 'pages/dashboard/Overview/ListingOverview';

export const PendingDashBoardState = ({data, ...restProps}) => {
  const router = useRouter();
  const [filterByVal, setFilterByVal] = useState('1');

  const IS_USER_TOKEN_AVAILABLE =
    (typeof window !== 'undefined' && JSON?.parse(localStorage?.getItem('devToken'))) ?? null;

  useEffect(() => {
    if (!IS_USER_TOKEN_AVAILABLE) {
      router.push('/auth/onboarding/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IS_USER_TOKEN_AVAILABLE]);
  const DEVELOPER_DASHBOARD_DATA = data && [data]?.[0]?.data?.dashboard_data;

  return (
    <Box
      mx="auto"
      // maxW={1284}
      position="relative"
      pb={'20px'}
      w="full"
      mt="clamp(52px,calc(10.4vh + 40px),82px)"
      zIndex={15}
      {...restProps}
    >
      {!IS_USER_TOKEN_AVAILABLE ? (
        <AbsoluteCenter mt="17rem">
          <AnimatedLoader />
        </AbsoluteCenter>
      ) : (
        <>
          <BadgeForAccount
            isExpected={data?.data?.dashboard_data?.expected_activities}
            in_review={data?.data?.dashboard_data?.in_review}
            initial_status={data?.data?.dashboard_data?.user?.initial_status}
            role={data?.data?.dashboard_data?.user?.role}
            veerge_user={data?.data?.dashboard_data?.user}
            account_trial_Info={{
              trial_display: data?.data?.dashboard_data?.user?.trial_display,
              trial_days: data?.data?.dashboard_data?.user?.trial_days,
            }}
          />

          <HStack px={{base: `30px`, xl: '78px'}} w="full">
            <TopHeader />
            {/* <QuickStart
              first_name={data?.data?.dashboard_data?.user?.first_name}
              last_name={data?.data?.dashboard_data?.user?.last_name}
              in_review={data?.data?.dashboard_data?.in_review}
              // quickTourInfo={data?.data?.dashboard_data?.quick_start}
            /> */}
          </HStack>

          {/* <Flex justify="center" gap="25px" h={{base: 'auto', md: 'fit-content'}}>
            <Box
              w="100%"
              maxW={876}
              bg="#FFF"
              minH="210px"
              h="fit-content"
              // border="1px solid #F4F4F4"
              border="1px solid #e4e4e4"
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
              borderRadius="16px"
              p={4}
            >
              <GraphOverview />
            </Box>
            <Stack spacing={3}>
              <PropertyOverview data={null} />
              <CustomerOverview data={null} />
            </Stack>
          </Flex> */}
          <Flex
            w="full"
            px={{base: `30px`, xl: '78px'}}
            direction={{base: `column`, xl: `row`}}
            justify="center"
            gap="25px"
            h={`100%`}
          >
            <Box
              flex={`856`}
              // flex={'2'}
              px={4}
              w="100%"
              h={`100%`}
              maxH="321px"
              bg="#FFF"
              borderRadius="16px"
              border="1px solid #E4E4E4"
              maxW={{base: `100%`, xl: `876px`}}
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            >
              <OverviewHeader
                isPending={true}
                filterByVal={filterByVal}
                setFilterByVal={setFilterByVal}
                showing={
                  filterByVal == '1'
                    ? '1 Week'
                    : filterByVal == '2'
                      ? '1 Month'
                      : filterByVal == '3'
                        ? '1 Year'
                        : null
                }
              />
              {/* Graph Area */}
    
                <DashboardApexChart filterValue={filterByVal} />
                {/* <TransactionsOverview data={DEVELOPER_DASHBOARD_DATA} /> */}
    
            </Box>
            <Flex
              gap={`12px`}
              w={{base: `100%`, xl: '500px'}}
              direction={{base: `row`, xl: `column`}}
              flex={`467`}
              // flex="1"
              maxH="321px"
            >
              <PropertyOverview data={null} />
              <CustomerOverview data={null} />
            </Flex>
          </Flex>
          {/* <Flex justify="space-between" w="full" mt="20px" align="flex-start" gap="20px">
            <ListingOverviewState />
            <OutstandingOverviewState />
            <TopSellingState />
          </Flex> */}
          <Stack
            direction="row"
            spacing={2}
            pl={{base: `30px`, xl: '78px'}}
            px={{base: `30px`, xl: '78px'}}
            // minW={`100%`}
            overflowX={{base: `auto`, xl: 'visible'}}
            css={{
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <ListingOverview data={null} />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default PendingDashBoardState;
