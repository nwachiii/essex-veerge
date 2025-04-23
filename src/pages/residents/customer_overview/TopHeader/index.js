import {Box, Flex, Grid, GridItem} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import React from 'react';
import ExpandOverview from './Expand';
import UserAssetCard from '@/components/Customers/overview/userAssetCard';
import UserTransactionInfoCard from '@/components/Customers/overview/userTransactionInfoCard';
import Link from 'next/link';
import {Button} from 'ui-lib';

export default function TopHeader({handleExpand, expand, value, setValue, customersFetchQuery}) {
  const sort_params = [
    'A-Z',
    'Z-A',
    'Date joined oldest to newest',
    'Date joined newest to oldest',
  ];
  const customerOverviewData =
    [customersFetchQuery?.data] && [customersFetchQuery?.data?.data]?.[0];

  const usersWithoutAssets =
    (customerOverviewData?.total_customers || 0) - (customerOverviewData?.total_asset_holders || 0);

  return (
    <>
      {/* <Flex mb="24px" w="full" justify="flex-end">
        <Link href="/residents/manage_agents">
          <Button variant="primary" w="140px" mt="0px" h="48px">
            Manage Realtors
          </Button>
        </Link>
      </Flex> */}
      <Grid
        mb="32px"
        templateColumns={{base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}}
        w="full"
        gap="11px"
      >
        {/* <ExpandOverview
        value={value}
        setValue={setValue}
        sort_params={sort_params}
        handleExpand={handleExpand}
        customersFetchQuery={customersFetchQuery}
      /> */}

        <GridItem colSpan={1}>
          <UserAssetCard
            hasAssets
            heading={'Users with assets'}
            value={customerOverviewData?.total_asset_holders ?? 0}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <UserAssetCard heading={'Users without assets'} value={usersWithoutAssets ?? 0} />
        </GridItem>
        <GridItem colSpan={{base: 2, xl: 1}}>
          <UserTransactionInfoCard customerOverviewData={customerOverviewData} />
        </GridItem>
      </Grid>
    </>
  );
}
