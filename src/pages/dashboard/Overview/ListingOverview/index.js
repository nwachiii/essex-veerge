import {
  Box,
  Divider,
  extendTheme,
  Flex,
  Image,
  HStack,
  Stack,
  Text,
  Skeleton,
  SkeletonText,
  SimpleGrid,
  Grid,
  VStack,
  Icon,
  Heading,
} from '@chakra-ui/react';
import {IoEyeOutline} from 'react-icons/io5';
import {LuBookmark} from 'react-icons/lu';
import React, {useRef} from 'react';
import {useRouter} from 'next/router';
import {OutstandingBalance} from './OutstandingBalance';
import Carousel from 'react-elastic-carousel';
import {TopSelling} from './TopSelling';
import {theme, themeStyles} from '../../../../theme';
import mostSharedImg from '../../../../images/image-fallback.png';
import watchlistIcon from '../../../../images/icons/watchlist-icon.svg';
import viewlistingicon from '../../../../images/icons/viewed-listing-icon.svg';
import DashBoardCarousel from '@/components/dashboard/listingOverview/carousel';

const styles = extendTheme({...theme});

const transitionTime = 3000;
export const ListingOverview = ({data}) => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  const resetCarousel = currentIndex => {
    if (!carouselRef.current) return;
    if (currentIndex?.index === dataArray.length - 1) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        carouselRef.current?.goTo(0);
      }, transitionTime);
    }
  };
  const carouselStyle = {
    enableAutoPlay: true,
    autoPlaySpeed: transitionTime,
    onChange: resetCarousel,
    ref: carouselRef,
  };

  const dataArray = [
    {
      heading: 'Most viewed',
      emptyStateIcon: IoEyeOutline,
      isEmpty: !data?.most_viewed?.project,
      emptyStateSubText: 'Looks like nothing has been viewed yet',
      ...(data?.most_viewed || {}),
    },
    ...(data?.most_watchlisted?.project
      ? [
          {
            heading: 'Most watchlisted',
            emptyStateIcon: LuBookmark,
            isEmpty: !data?.most_watchlisted?.project,

            emptyStateSubText: 'Looks like nothing has been watchlisted yet',
            ...(data?.most_watchlisted || {}),
          },
        ]
      : []),
  ];
  const paginationColors = dataArray.map(item => ({
    active: item.isEmpty ? '#292929' : '#ffffff',
    inactive: item.isEmpty ? '#00000033' : '#FFFFFF33',
  }));

  const MOST_VIEWED = data?.most_viewed?.project?.length ? data?.most_viewed?.project[0] : {};
  const carouselWrapper = {
    w: {xl: 'initial', base: '663.94px'},
    h: {xl: 'initial', base: '454.27px'},
  };
  const aspectRationStyle = {
    ratio: {base: 1.462, xl: 1.432},
    maxH: {xl: '290px', base: '454.27px'},
    w: {base: '663.94px', xl: 'full'},
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" w="full" mt="20px" gap="25px">
      <DashBoardCarousel
        paginationColors={paginationColors}
        carouselStyle={carouselStyle}
        carouselWrapper={carouselWrapper}
        aspectRationStyle={aspectRationStyle}
      >
        {dataArray.map((item, idx) =>
          !item.isEmpty ? (
            <Stack
              cursor="pointer"
              pos="relative"
              onClick={() =>
                router.push(
                  `/listings/manage/?listingId=${item?.project[0]?.id || item?.project?.id}`
                )
              }
              key={idx}
              h="full"
              w="full"
            >
              <Image
                src={item?.project[0]?.photos?.[0]?.photo || item?.project?.photos?.[0]?.photo}
                alt={item?.project[0]?.name || item?.project?.name || "listing's" + 'image'}
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
                  {item?.project[0]?.name || item?.project?.name}
                </Text>
              </Stack>
            </Stack>
          ) : (
            <VStack bg="#ffffff" justifyContent="center" spacing="6px" w="full" h="full">
              <Icon as={item.emptyStateIcon} color="#737373" boxSize="32px " />
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

      <OutstandingBalance data={data} />
      <TopSelling data={data} />
    </Grid>
  );
};

export default ListingOverview;
