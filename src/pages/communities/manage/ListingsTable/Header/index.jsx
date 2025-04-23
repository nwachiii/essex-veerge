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

const ListingOverViewHeader = () => {
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
      isEmpty: !DEVELOPER_DASHBOARD_DATA?.most_viewed?.project,
      emptyStateSubText: 'Looks like nothing has been viewed yet',
      ...(DEVELOPER_DASHBOARD_DATA?.most_viewed || {}),
    },
    {
      heading: 'Most shared',
      emptyStateIcon: IoShareSocialOutline,
      isEmpty: !DEVELOPER_DASHBOARD_DATA?.most_shared?.project,
      emptyStateSubText: 'Looks like nothing has been shared yet',
      ...(DEVELOPER_DASHBOARD_DATA?.most_shared || {}),
    },
    {
      heading: 'Most watchlisted',
      emptyStateIcon: LuBookmark,
      isEmpty: !DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.project,

      emptyStateSubText: 'Looks like nothing has been watchlisted yet',
      ...(DEVELOPER_DASHBOARD_DATA?.most_watchlisted || {}),
    },

    {
      heading: 'Best selling unit',
      emptyStateImg: topSellingIcon.src,
      isEmpty: !DEVELOPER_DASHBOARD_DATA?.most_sold?.most_sold_unit?.project,

      emptyStateSubText: 'Looks like nothing has been watchlisted yet',
      ...(DEVELOPER_DASHBOARD_DATA?.most_sold?.most_sold_unit || {}),
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
        <ListingsDetailsCard
          total={totalListings}
          heading="Total Listings"
          soldOut={soldOutListings}
          available={availableListings}
        />
      </GridItem>
      <GridItem colSpan={1}>
        {' '}
        <ListingsDetailsCard
          total={totalUnits}
          heading="Total Units"
          soldOut={soldOutUnits}
          available={availableUnits}
        />
      </GridItem>
      <GridItem colSpan={{base: 2, xl: 1}}>
        <DashBoardCarousel aspectRationStyle={{maxH: '176px'}} paginationColors={paginationColors}>
          {dataArray.map((item, idx) =>
            !item.isEmpty ? (
              <Stack
                cursor="pointer"
                onClick={() =>
                  router.push(
                    `/listings/manage/?listingId=${item?.project[0]?.id || item?.project?.id}`
                  )
                }
                pos="relative"
                key={idx}
                h="full"
                w="full"
              >
                <Image
                  src={item?.project?.[0]?.photos?.[0]?.photo || item?.project?.photos?.[0]?.photo}
                  alt={item?.project?.[0]?.name || item?.project?.name || "listing's" + 'image'}
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

                <Stack
                  zIndex={1}
                  px="16px"
                  color="#ffffff"
                  pos="absolute"
                  bottom="24.2px"
                  spacing="none"
                >
                  <Text
                    textTransform="uppercase"
                    fontSize="14px"
                    lineHeight="17.75px"
                    fontWeight="500"
                  >
                    {item.heading}
                  </Text>
                  <Text
                    textTransform="capitalize"
                    fontSize="18px"
                    lineHeight="22.82px"
                    fontWeight="600"
                  >
                    {item?.project?.[0]?.name || item?.project?.name}
                  </Text>
                </Stack>
              </Stack>
            ) : (
              <VStack
                key={idx}
                bg="#ffffff"
                justifyContent="center"
                spacing="6px"
                w="full"
                h="full"
              >
                {item?.emptyStateImg ? (
                  <Image
                    boxSize="32px"
                    alt="top selling empty state icon"
                    src={item.emptyStateImg}
                  />
                ) : (
                  <Icon as={item.emptyStateIcon} color="#737373" boxSize="32px " />
                )}
                <Heading fontSize="14px" color="#191919" fontWeight="500" lineHeight="17.75px">
                  {item.heading}
                </Heading>
                <Text fontSize="12px" color="#737373" fontWeight="400" lineHeight="15.22px">
                  {item.emptyStateSubText}
                </Text>
              </VStack>
            )
          )}
        </DashBoardCarousel>
      </GridItem>
    </Grid>
  );
};

export default ListingOverViewHeader;
