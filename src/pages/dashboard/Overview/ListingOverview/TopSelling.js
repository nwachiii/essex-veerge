import React, {useState} from 'react';
import Carousel from 'react-elastic-carousel';
import {ArrowBackIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  extendTheme,
  Flex,
  Image,
  HStack,
  Stack,
  Text,
  SkeletonText,
  IconButton,
  AspectRatio,
  VStack,
  Heading,
} from '@chakra-ui/react';
import {theme, themeStyles} from '../../../../theme';
import fallback from '/src/images/image-fallback.png';
import {handleLastTwoDigits, removeLastTwoDigits} from '/src/utils';
import Link from 'next/link';
import {IoArrowForwardOutline, IoArrowBackCircleOutline} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {formatAmountWithDecimal} from '../../../../utils/formatAmount';
import topSellingIcon from '/src/images/icons/topSellingIcon.svg';

const styles = extendTheme({...theme});

export const TopSelling = ({data}) => {
  const router = useRouter();
  const [slider, setSlider] = useState('');
  const breakPoints = [{width: 1, itemsToShow: 1}];

  const topSellingUnit = data?.most_sold?.most_sold_unit;
  const carouselWrapper = {
    w: {xl: 'initial', base: '663.94px'},
    h: {xl: 'initial', base: '454.27px'},
  };
  const aspectRationStyle = {
    ratio: {base: 1.462, xl: 1.432},
    maxH: {xl: '290px', base: '454.27px'},
    w: {base: '663.94px', xl: 'full'},
  };
  const DISPLAY_DATA = [
    {
      top_selling: data?.most_sold?.most_sold_unit,
    },
    {
      top_selling: data?.most_sold?.most_sold_fractions,
    },
  ];

  // console.log('=>=>', DISPLAY_DATA);

  return (
    <>
      {/* {!data || !DISPLAY_DATA[0]?.top_selling?.price ? (
        <Box
          {...styles.lg_Box}
          maxW={{base: `350px`}}
          w={{base: `350px`}}
          h={`100%`}
          p={6}
          align="left"
        >
          <Box px="4" pt="2">
            <Text {...styles.textStyles.p_lg_strong} pb={1}>
              Top Selling
            </Text>
            <Text {...styles.textStyles.p_lg_strong}>₦ 0.00</Text>

            <Image
              alt=""
              src={fallback?.src}
              boxShadow="md"
              mt={6}
              borderRadius="16px"
              boxSize="150"
            />
          </Box>
        </Box>
      ) : ( */}
      {/* <Box
          position="relative"
          display={'flex'}
          flexDirection={'column'}
          {...styles.lg_Box}
          alignItems={'stretch'}
          py={4}
          px={2}
          align="left"
          h={`100%`}
          maxW={{base: `350px`}}
          w={{base: `350px`}}
        >
          <Carousel
            showArrows={false}
            pagination={false}
            itemPadding={[0, 2]}
            enableAutoPlay={false}
            autoPlaySpeed={1500}
            breakPoints={breakPoints}
            ref={slider => setSlider(slider)}
          >
            {(DISPLAY_DATA || [])?.map((item, pKey) => (
              <Box position="relative" w="full" key={pKey}>
                <Stack>
                  <Text color="#12D8A0" fontSize="16px" fontWeight="600">
                    Top Selling
                  </Text>
                  <Stack spacing={1} pb={2}>
                    <Text display="flex" {...styles.textStyles.lg_Heading} fontSize="34px">
                      {formatAmountWithDecimal(item.top_selling?.price)}
                    </Text>
                    <Text fontSize={'14px'} fontWeight="400" color="grey">
                      Total sold
                    </Text>
                  </Stack>
                </Stack>
                <HStack w="full" spacing="19px">
                  {item.top_selling?.project?.photos && (
                    <Image
                      alt=""
                      objectFit="cover"
                      src={item.top_selling?.project?.photos[0]?.photo ?? fallback.src}
                      width="154px"
                      height="155px"
                      borderRadius="16px"
                    />
                  )}
                  <Stack spacing="20px" w="full" alignSelf="flex-start" h="full">
                    <Box
                      w="full"
                      cursor="pointer"
                      onClick={() =>
                        router.push(
                          `/listings/manage/?listingId=${Number(item.top_selling?.project?.id)}`
                        )
                      }
                    >
                      <Text
                        textTransform={'capitalize'}
                        fontSize="20px"
                        lineHeight="25px"
                        fontWeight="600"
                        color="#191919"
                        _hover={{color: 'gray.400'}}
                      >
                        {item.top_selling?.project?.name?.toLowerCase() ?? 'none'}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight={600} fontSize={'16px'} color="#4545FE">
                        {pKey == 0
                          ? item.top_selling?.top_unit_sold
                          : item.top_selling?.top_fractions_sold}
                      </Text>

                      <Text fontSize="12px" fontWeight="400" color="grey">
                        {pKey == 0
                          ? `Unit${Number(item.top_selling?.top_unit_sold) > 1 ? 's' : ''} sold`
                          : `Fraction${Number(item.top_selling?.top_fractions_sold) > 1 ? 's' : ''} sold`}
                      </Text>
                    </Box>
                  </Stack>
                </HStack>
                {DISPLAY_DATA[1]?.top_selling?.price > 0 ? (
                  <Text
                    zIndex={99}
                    right="29%"
                    bottom={3}
                    pos="absolute"
                    color="#606060"
                    fontSize={'14px'}
                    fontWeight={400}
                    textAlign="right"
                    mx="auto"
                  >{`${pKey + 1}/${DISPLAY_DATA?.length}`}</Text>
                ) : null}
              </Box>
            ))}
          </Carousel>
          {DISPLAY_DATA[1]?.top_selling?.price > 0 && (
            <HStack justify={'flex-end'} spacing={4}>
              <IconButton
                pos="absolute"
                right={16}
                bottom={4}
                bg="#F5F5F5"
                borderWidth={0.5}
                zIndex={99}
                size="md"
                rounded="full"
                icon={<ArrowBackIcon fontSize="20px" />}
                onClick={() => slider.slidePrev()}
              />
              <IconButton
                pos="absolute"
                bg="#F5F5F5"
                borderWidth={0.5}
                right={5}
                bottom={4}
                zIndex={99}
                size="md"
                rounded="full"
                icon={<IoArrowForwardOutline fontSize="20px" />}
                onClick={() => slider.slideNext()}
              />
            </HStack>
          )}
        </Box> */}
      {topSellingUnit?.price ? (
        <AspectRatio ratio={1.432} maxH="290px" w="full" {...aspectRationStyle}>
          <Stack
            spacing="none"
            bg="#f5f5f5"
            aspectRatio="1.432"
            borderRadius="12px"
            overflow="hidden"
            cursor="pointer"
            onClick={() =>
              router.push(`/listings/manage/?listingId=${Number(topSellingUnit?.project?.id)}`)
            }
            h="full"
            pos="relative"
            sx={{...carouselWrapper}}
          >
            <Image
              src={topSellingUnit?.project?.photos[0]?.photo}
              alt={topSellingUnit?.project?.name || "listing's" + 'image'}
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
              alignItems="start"
              px="16px"
              color="#ffffff"
              pos="absolute"
              bottom="24.2px"
              left="0"
              spacing="none"
            >
              <Text textTransform="uppercase" fontSize="14px" lineHeight="17.75px" fontWeight="500">
                Top Selling
              </Text>
              <Text
                textTransform="capitalize"
                fontSize="18px"
                lineHeight="22.82px"
                fontWeight="600"
              >
                {topSellingUnit?.project?.name}
              </Text>

              <Text fontSize="10px" lineHeight="12.68px" fontWeight="600" color="#ffff00">
                {topSellingUnit?.top_unit_sold} SOLD
              </Text>
            </Stack>
          </Stack>
        </AspectRatio>
      ) : (
        <VStack
          border="0.5px #e4e4e4 solid"
          borderRadius="12px"
          bg="#ffffff"
          justifyContent="center"
          spacing="6px"
          w="full"
          h="full"
          sx={{...carouselWrapper}}
        >
          <Image boxSize="32px" alt="top selling empty state icon" src={topSellingIcon.src} />
          <Heading
            textTransform="uppercase"
            fontSize="14px"
            color="#191919"
            fontWeight="500"
            lineHeight="17.75px"
          >
            Top selling unit
          </Heading>
          <Text fontSize="12px" color="#737373" fontWeight="400" lineHeight="15.22px">
            Look like nothing has been sold yet
          </Text>
        </VStack>
      )}
    </>
  );
};

export default TopSelling;
