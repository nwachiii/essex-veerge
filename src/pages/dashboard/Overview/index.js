import React, {Fragment, useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {
  AbsoluteCenter,
  Badge,
  Box,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';

import {ListingOverview} from './ListingOverview';
import {CustomerOverview} from './CustomerOverview';
import {PropertyOverview} from './PropertyOverview';
import {OverviewHeader} from '../Header/OverviewHeader';
import {DashboardApexChart} from './GraphRepresentation';
import {TransactionsOverview} from './TransactionsOverview';
import {TopHeader} from '../Header/TopHeader';
import {AnimatedLoader} from '../../../components';
import QuickStart from '../../../components/QuickStart';
import BadgeForAccount from '../../../components/PageLayout/BadgeForAccount';

export const DashboardOverview = ({data, error, isLoading, refetch, isError, ...restProps}) => {
  const toast = useToast();
  const [filterByVal, setFilterByVal] = useState('4');

  let BILLING_PLAN;
  try {
    BILLING_PLAN = 'subscription'
  } catch (err) {
    console.log(err);
  }

  const DEVELOPER_DASHBOARD_DATA = data && [data]?.[0]?.data?.dashboard_data;
  return (
    <Fragment>
      {isLoading ? (
        <AbsoluteCenter mt="17rem">
          <AnimatedLoader />
        </AbsoluteCenter>
      ) : isError ? (
        toast({
          title: 'Request failed',
          description: `An error occured while fetching`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      ) : (
        <Box
          mx="auto"
          maxW={1284}
          position="relative"
          // className="main-app"
          {...restProps}
          zIndex={15}
        >
          {!BILLING_PLAN ? (
            <BadgeForAccount
              in_review={data?.data?.dashboard_data?.in_review}
              initial_status={data?.data?.dashboard_data?.user?.initial_status}
              account_trial_Info={{
                trial_display: data?.data?.dashboard_data?.user?.trial_display,
                trial_days: data?.data?.dashboard_data?.user?.trial_days,
              }}
              role={data?.data?.dashboard_data?.user?.role}
              veerge_user={data?.data?.dashboard_data?.user}
            />
          ) : null}
          <HStack px={{base: `30px`, xl: '78px'}} w="full">
            <TopHeader />
            {/* <QuickStart
              in_review={data?.data?.dashboard_data?.in_review}
              last_name={data?.data?.dashboard_data?.user?.last_name}
              quickTourInfo={data?.data?.dashboard_data?.quick_start}
              first_name={data?.data?.dashboard_data?.user?.first_name}
            /> */}
          </HStack>
          <Flex
            px={{base: `16px`, xl: '78px'}}
            direction={{base: `column`, xl: `row`}}
            justify="center"
            gap="25px"
            h={`100%`}
          >
            <Box
              flex={`856`}
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
                filterByVal={filterByVal}
                setFilterByVal={setFilterByVal}
                showing={
                  filterByVal == '4'
                    ? 'All time' :
                  filterByVal == '1'
                    ? '1 Week'
                    : filterByVal == '2'
                      ? '1 Month'
                      : filterByVal == '3'
                        ? '1 Year'
                        : 'All time'
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
              maxH="321px"
            >
              <PropertyOverview data={DEVELOPER_DASHBOARD_DATA} />
              <CustomerOverview data={DEVELOPER_DASHBOARD_DATA} />
            </Flex>
          </Flex>
          <Stack
            direction="row"
            spacing={2}
            px={{base: `16px`, xl: '78px'}}
            // minW={`100%`}
            overflowX={{base: `auto`, xl: 'visible'}}
            css={{
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <ListingOverview data={DEVELOPER_DASHBOARD_DATA} />
          </Stack>
          {/* <Box pt={12}></Box> */}
        </Box>
      )}
    </Fragment>
  );
};

export default DashboardOverview;
