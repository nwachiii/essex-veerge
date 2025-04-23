import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import ListingsDetailsCard from './component/listingsDetailsCard';
import {useQuery} from '@tanstack/react-query';
import {fetchDashboardData} from 'apis';
import {IoEyeOutline} from 'react-icons/io5';
import {LuBookmark} from 'react-icons/lu';
import DashBoardCarousel from '@/components/dashboard/listingOverview/carousel';
import topSellingIcon from '/src/images/icons/topSellingIcon.svg';
import {IoShareSocialOutline} from 'react-icons/io5';
import {fetchListingStats} from 'apis/listings';
import {useRouter} from 'next/router';

const ListingOverViewHeader = ({listingData}) => {
  const {data} = useQuery(['dashboard', ''], () => fetchDashboardData(''));
  const fETCH_LISTINGS_STATS = useQuery(['listing_stat'], fetchListingStats);
  const ListingHeaderStatDATA = fETCH_LISTINGS_STATS?.data?.data?.data;
  const router = useRouter();

  const totalListings = ListingHeaderStatDATA?.total_listings ?? 0;
  const totalUnits = ListingHeaderStatDATA?.total_units ?? 0;
  const availableUnits = ListingHeaderStatDATA?.total_available_unit ?? 0;
  const soldOutUnits = ListingHeaderStatDATA?.total_developer_sold_units ?? 0;
  const availableListings = ListingHeaderStatDATA?.total_available_listing ?? 0;
  const soldOutListings = ListingHeaderStatDATA?.project_sold_out ?? 0;

  const DEVELOPER_DASHBOARD_DATA = data && [data][0].data.dashboard_data;

  const dataArray = [
    {
      heading: 'Most viewed',
      emptyStateIcon: IoEyeOutline,
      isEmpty: false,
      emptyStateSubText: 'Looks like nothing has been viewed yet',
      ...(listingData?.[0] || {}),
    },
  ];
  const paginationColors = dataArray.map(item => ({
    active: item.isEmpty ? '#292929' : '#ffffff',
    inactive: item.isEmpty ? '#00000033' : '#FFFFFF33',
  }));

  return (
    <Grid
      mb="32px"
      templateColumns={{base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}}
      w="full"
      gap="11px"
    >
      <GridItem colSpan={1}>
        {' '}
        <Stack
          overflow="hidden"
          w="full"
          h="176px"
          spacing="none"
          borderRadius="12px"
          border="0.5px solid #e4e4e4"
          bg="#ffffff"
          justify="center"
          align="center"
        >
          <Flex w="full" p="16px 24px 14px" justifyContent="space-between" alignItems="center">
            <Stack spacing="8px">
              <Heading fontSize="16px" fontWeight="500" color="#525252" lineHeight="25px">
                Total Communities
              </Heading>
              <Text fontSize="36px" fontWeight="600" color="#141414" lineHeight="44px">
                {listingData?.length}
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        {' '}
        <ListingsDetailsCard total={1200} heading="Total Unit" soldOut={820} available={400} />
      </GridItem>
      <GridItem colSpan={{base: 2, xl: 1}} borderRadius='19.712px'>
        <Stack
          cursor="pointer"
          // onClick={() =>
          //   router.push(
          //     `/listings/manage/?listingId=${item?.project[0]?.id || item?.project?.id}`
          //   )
          // }
          pos="relative"
          h="176px"
          w="full"
          borderRadius='19.712px'
        >
          <Image
            src={listingData?.photos?.photo?.[0]}
            alt={listingData?.[0]?.name || "listing's" + 'image'}
            objectFit="cover"
            pos="absolute"
            w="full"
            h="full"
          />
          <Box
            pos="absolute"
            left="0"
            w="full"
            h="full"
            bg=" linear-gradient(183.45deg, rgba(0, 0, 0, 0.1) 47.65%, rgba(0, 0, 0, 0.8) 100.3%)"
          />

          <Stack zIndex={1} px="16px" color="#ffffff" pos="absolute" bottom="24.2px" spacing="none">
            <Text textTransform="uppercase" fontSize="14px" lineHeight="17.75px" fontWeight="500">
              most populated
            </Text>
            <Text textTransform="capitalize" fontSize="18px" lineHeight="22.82px" fontWeight="600">
              {listingData?.[0]?.name}
            </Text>
          </Stack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default ListingOverViewHeader;
