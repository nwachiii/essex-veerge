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
  IconButton,
  useDisclosure,
  AspectRatio,
  VStack,
  Icon,
  Heading,
} from '@chakra-ui/react';
import {theme, themeStyles} from '../../../../theme';
import fallback from '../../../../images/image-fallback.png';
import outStandingBalanceIcon from '/src/images/icons/outstandingBalancemoneyIcon.svg';
import {handleLastTwoDigits, removeLastTwoDigits} from '../../../../utils';
import {IoArrowForwardOutline, IoEyeOutline} from 'react-icons/io5';
import {useRouter} from 'next/router';
import OutstandingBalanceComp from '../../../../components/Drawers/outstandingBalance';
import DashBoardCarousel from '@/components/dashboard/listingOverview/carousel';
import {FormatToColorfulCurrency} from 'utils/formatAmount';

const styles = extendTheme({...theme});

export const OutstandingBalance = ({data}) => {
  const outstandingModal = useDisclosure();
  const router = useRouter();
  const outstanding_projects = data && Object.values(data?.outstanding_project);
  const [slider, setSlider] = useState('');
  const breakPoints = [{width: 1, itemsToShow: 1}];
  const handleOutstandingBalView = () => {
    router.push({
      pathname: `/dashboard/outstanding-balance/transactions`,
    });
  };
  const carouselWrapper = {
    w: {xl: 'initial', base: '663.94px'},
    h: {xl: 'initial', base: '454.27px'},
  };
  const aspectRationStyle = {
    ratio: {base: 1.462, xl: 1.432},
    maxH: {xl: '290px', base: '454.27px'},
    w: {base: '663.94px', xl: 'full'},
  };
  localStorage.setItem('outstanding-balance', JSON.stringify(outstanding_projects));
  const emptyStateArray = [
    {
      heading: 'OUTSTANDING BALANCE',
      emptyStateImg: outStandingBalanceIcon.src,
      emptyStateSubText: 'Looks like there is no outstanding payment',

      active: !outstanding_projects || outstanding_projects?.length == 0 ? '#292929' : '#ffffff',
      inactive:
        !outstanding_projects || outstanding_projects?.length == 0 ? '#00000033' : '#FFFFFF33',
    },
  ];

  return (
    <>
      <DashBoardCarousel
        aspectRationStyle={aspectRationStyle}
        carouselWrapper={carouselWrapper}
        paginationColors={emptyStateArray}
      >
        {!outstanding_projects || outstanding_projects?.length == 0
          ? emptyStateArray.map((item, idx) => (
              <VStack
                key={idx}
                bg="#ffffff"
                pos="relative"
                justifyContent="center"
                spacing="6px"
                w="full"
                h="full"
              >
                <Image boxSize="32px" alt="outstanding empty state icon" src={item.emptyStateImg} />
                <Heading fontSize="14px" color="#191919" fontWeight="500" lineHeight="17.75px">
                  {item.heading}
                </Heading>
                <Text fontSize="12px" color="#737373" fontWeight="400" lineHeight="15.22px">
                  {item.emptyStateSubText}
                </Text>
              </VStack>
            ))
          : (outstanding_projects || [])?.map((project, pKey) => (
              <Stack
                cursor="pointer"
                onClick={() =>
                  router.push(
                    `/dashboard/outstanding-balance/?listingId=${project?.id}&name=${project?.name}&project_id=${project?.id}&isFractional=${project?.is_fractional}`
                  )
                }
                key={pKey}
                h="full"
                pos="relative"
                w="full"
              >
                <Image
                  src={project?.photos[0]?.photo ?? fallback.src}
                  alt={project?.name || "listing's" + 'image'}
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

                <Stack px="16px" color="#ffffff" pos="absolute" bottom="24.2px" spacing="none">
                  <Text
                    textTransform="uppercase"
                    fontSize="14px"
                    lineHeight="17.75px"
                    fontWeight="500"
                  >
                    Outstanding Balance
                  </Text>
                  <Text
                    textTransform="capitalize"
                    fontSize="18px"
                    lineHeight="22.82px"
                    fontWeight="600"
                  >
                    {project?.name}
                  </Text>

                  <FormatToColorfulCurrency
                    amount={project?.outstanding}
                    color="red"
                    fontSize="10px"
                    lineHeight="12.68px"
                    fontWeight="600"
                    wordBreak="break-word"
                  />
                </Stack>
              </Stack>
            ))}
      </DashBoardCarousel>

      <OutstandingBalanceComp drawerModal={outstandingModal} />
    </>
  );
};

export default OutstandingBalance;
