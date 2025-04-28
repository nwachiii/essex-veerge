import {Grid, GridItem} from '@chakra-ui/react';
import UserAssetCard from '@/components/Customers/overview/userAssetCard';

export default function TopHeader() {

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
            heading={'Total Residents'}
            value={'22'}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <UserAssetCard heading={'Total Tenants'} value={'11'} />
        </GridItem>
        <GridItem colSpan={1}>
          <UserAssetCard heading={'Total Owners'} value={'11'} />
        </GridItem>
      </Grid>
    </>
  );
}
