/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, {Fragment, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AnimatePresence} from 'framer-motion';
import {useQuery} from '@tanstack/react-query';
import Carousel from 'react-elastic-carousel';

import UnitMenu from './UnitMenu';
import PaymentPlan from './payment_plan/PaymentPlan';
import {UnitOtherFees} from './closing-cost/OtherFees';
import {themeStyles} from '../../../../theme';
import {Button} from 'ui-lib/ui-lib.components';
import backArrow from '/src/images/icons/back-arrow.png';
import imageFallback from '/src/images/image-fallback.png';
import {AnimatedLoader, LayoutView} from '../../../../components';
import UnitPropertyInformation from './UnitPropertyInformation';
import {fetchAllBundlePaymentPlan} from '../../../../apis/listings';
import {AnimateImagePresence} from '../ListingInfo.components/ListingInfo.details/BasicInfo';
import FractionsInfo from './fractionsInfo';
import Head from 'next/head';

export const UnitInformation = () => {
  const toast = useToast();
  const router = useRouter();
  const {query} = useRouter();
  const bundleId = query && query?.id;
  const ShowCalendar = useDisclosure();
  const [viewId, setViewId] = useState(0);
  const CREATE_ALLOCATIONS_MODAL = useDisclosure();
  const [direction, setDirection] = useState(0);
  const [photoViewSrc, setPhotoViewSrc] = useState(null);
  const {
    data: bundle,
    isError,
    isLoading,
    refetch,
  } = useQuery(['payment_plan', bundleId], () => fetchAllBundlePaymentPlan(bundleId));

  // Fetch Unit Information :- v2/investment/project-bundles/project_id=121

  const PAYMENT_PLAN_DATA = bundle && bundle?.data?.results;
  const UNIT_INFO = bundle && bundle?.data?.results[0]?.bundle;

  useEffect(
    () => setPhotoViewSrc(UNIT_INFO?.photos[0]?.photo ?? imageFallback.src),
    [UNIT_INFO?.photos[0]]
  );

  const breakPoints = [{width: 1, itemsToShow: 3}];
  const handlePhotoView = (src, idx) => {
    setPhotoViewSrc(src);
    setViewId(idx);
    idx <= direction ? setDirection(-1) : setDirection(1);
  };

  const handleBack = () => {
    router.back(-1);
  };

  return (
    <Box bg="#FAFAFA" minH="100vh" h="fit-content">
      <Head>
        <title>Veerge | Unit info</title>
        <meta name="description" content="Veerge | Unit info" />
        <meta name="theme-color" content="#FFFFFF" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView activePage="listings" />
      <Box mt="-85.3vh" maxW="1280px" mx="auto" pb="80px">
        {isLoading ? (
          <AnimatedLoader />
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
          <Fragment>
            <HStack w="100%" justify="space-between" my={4}>
              <HStack onClick={handleBack} zIndex={10}>
                <Image
                  cursor="pointer"
                  mr={2}
                  boxSize="50px"
                  src={backArrow.src}
                  alt="back_arrow"
                />
                <Heading {...themeStyles.textStyles.h3}>{UNIT_INFO?.project?.name}</Heading>
              </HStack>
              <Flex justify="space-between" columnGap="28px" zIndex={10} align="center">
                <Link href={`/listings/manage/unit_info/transactions/?id=${bundleId}`}>
                  <Button mt={0} variant="primary" w="218px">
                    Transactions
                  </Button>
                </Link>
                {
                  <UnitMenu
                    refetch={refetch}
                    bundleId={bundleId}
                    ShowCalendar={ShowCalendar}
                    isFraction={query?.isFraction}
                    unitQty={UNIT_INFO?.total_quantity}
                    unitPrice={UNIT_INFO?.price}
                    unitInfo={UNIT_INFO}
                  />
                }
              </Flex>
            </HStack>
            <Container {...themeStyles.containerStyles} maxW="1284px" padding="29px 36px" mt="25px">
              <Flex direction={{base: 'column', md: 'row'}} gap="33px">
                <Stack w="53%">
                  {UNIT_INFO?.photos?.length > 0 ? (
                    <AnimateImagePresence
                      layoutId={viewId}
                      sourceUrl={photoViewSrc}
                      direction={direction}
                      w="full"
                      maxW="full"
                      h="570px"
                      objectFit="fit"
                    />
                  ) : null}
                  {UNIT_INFO?.photos?.length > 0 ? (
                    <Box postion="relative" pt="8px">
                      {photoViewSrc ? (
                        <Box position="relative" w="60%" mx="auto">
                          <Carousel
                            showArrows={UNIT_INFO?.photos?.length > 1 ? true : false}
                            pagination={false}
                            itemPadding={[0, 1]}
                            enableAutoPlay={false}
                            autoPlaySpeed={1500}
                            breakPoints={breakPoints}
                            showEmptySlots={true}
                          >
                            {UNIT_INFO?.photos?.map((item, idx) => (
                              <AnimatePresence key={idx}>
                                <Image
                                  alt=""
                                  objectFit={'cover'}
                                  justifySelf={'stretch'}
                                  my={2}
                                  cursor="pointer"
                                  onClick={() => handlePhotoView(item?.photo, idx)}
                                  h="80px"
                                  w="90px"
                                  borderRadius="16px"
                                  {...themeStyles.imageFallback}
                                  src={item?.photo ?? imageFallback.src}
                                  mr={2}
                                />
                              </AnimatePresence>
                            ))}
                          </Carousel>
                        </Box>
                      ) : null}
                    </Box>
                  ) : null}
                </Stack>
                <UnitPropertyInformation
                  CREATE_ALLOCATIONS_MODAL={CREATE_ALLOCATIONS_MODAL}
                  unitDetail={UNIT_INFO}
                />
              </Flex>
            </Container>
            {UNIT_INFO?.unit_description && (
              <Box mt="60px">
                <Text fontSize="26px" fontWeight="500" color="#191919" lineHeight="41px">
                  Unit Description
                </Text>
                <Container
                  w={'700px'}
                  {...themeStyles.containerStyles}
                  border="1px solid #F6F6F6"
                  padding="39px 36px"
                  mx=""
                >
                  <VStack justify={'center'} h="full">
                    <Text
                      pt="19px"
                      fontWeight={300}
                      fontSize="18px"
                      lineHeight="28px"
                      color="#191919"
                    >
                      {UNIT_INFO?.unit_description}
                    </Text>
                  </VStack>
                </Container>
              </Box>
            )}
            {UNIT_INFO?.is_fraction_sale_available && <FractionsInfo bundle={UNIT_INFO} />}

            <PaymentPlan refetch={refetch} PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA} />

            {UNIT_INFO?.fees.every(fee => fee.name !== '') && (
              <Text mt="40px" fontSize="28px" fontWeight="500" color="#191919" lineHeight="41px">
                Closing costs
              </Text>
            )}
            <UnitOtherFees refetch={refetch} otherFeesData={UNIT_INFO && UNIT_INFO?.fees} />
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default UnitInformation;
