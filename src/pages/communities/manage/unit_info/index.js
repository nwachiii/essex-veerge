import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useToast,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, {Fragment, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AnimatePresence} from 'framer-motion';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Carousel from 'react-elastic-carousel';
import PaymentPlan from './payment_plan/PaymentPlan';
import {UnitOtherFees} from './closing-cost/OtherFees';
import {themeStyles} from '../../../../theme';
import backArrow from '/src/images/icons/back-arrow.png';
import imageFallback from '/src/images/image-fallback.png';
import {AnimatedLoader, LayoutView} from '../../../../components';
import UnitPropertyInformation from './UnitPropertyInformation';
import carrouselArrow from '/src/images/icons/paymentplanNavArrow.svg';
import {
  EditUnitPrice,
  fetchAllBundlePaymentPlan,
  getPendingEquities,
} from '../../../../apis/listings';
import {AnimateImagePresence} from '../ListingInfo.components/ListingInfo.details/BasicInfo';
import FractionsInfo from './fractionsInfo';
import Head from 'next/head';
import UnitMoreOption from '../../../../components/Drawers/unitMoreOptions';
import PendingTransactionsModal from './edit_unit/PendingTransactionsModal';
import {toastForError} from 'utils/toastForErrors';
import ListingInfoDocuments from '../ListingInfo.components/ListingInfoDocuments';

import ViewImage from '../ListingInfo.components/ListingInfo.details/ViewImage';
import AddNewClosingCosts from './closing-cost/add-new-closing-costs';
import ClosingCost from '@/components/Drawers/closingCost';
import PaymentPlanDrawer from '@/components/Drawers/paymentPlan';
import CreateNewPaymentPlan from './payment_plan/create_new_plan';

const scrollBar = {
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const UnitInformation = () => {
  const toast = useToast();
  const router = useRouter();
  const bundleId = Number(router?.query?.unitId);
  const [viewId, setViewId] = useState(0);
  const VIEW_IMAGE = useDisclosure();
  const CREATE_ALLOCATIONS_MODAL = useDisclosure();
  const PENDING_TRANSACTIONS = useDisclosure();
  const drawerDisclosure = useDisclosure();
  const closingCostDisclosure = useDisclosure();
  const [direction, setDirection] = useState(0);
  const [photoViewSrc, setPhotoViewSrc] = useState(null);
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPriceUpdated, setPriceUpdated] = useState(false);
  const [editUnitPrice, setEditUnitPrice] = useState();
  const queryClient = useQueryClient();
  const [doc, setDoc] = useState(null);
  const {
    data: bundle,
    isError,
    isLoading,
    refetch,
  } = useQuery(['payment_plan', bundleId], () => fetchAllBundlePaymentPlan(bundleId));
  const FETCHED_PENDING_EQUITIES = useQuery(
    ['get-pending-equity', Number(bundleId)],
    () => getPendingEquities(Number(bundleId)),
    {enabled: !!!isNaN(Number(bundleId))}
  );
  const itemsToShow = 5;
  const breakPoints = [{width: 1, itemsToShow}];

  const pendingEquities = FETCHED_PENDING_EQUITIES?.data?.data?.data;

  const PAYMENT_PLAN_DATA = bundle && bundle?.data?.results;
  const UNIT_INFO = bundle && bundle?.data?.results[0]?.bundle;
  const WIDGET_MODAL = useDisclosure();

  const handlePendingTransactions = () => {
    drawerDisclosure.onClose();
    PENDING_TRANSACTIONS.onOpen();
  };

  const handleNoPendingTransactions = () => {
    drawerDisclosure.onClose();
    toast({
      title: 'Unit price successsfully updated',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const mutation = useMutation(body => EditUnitPrice(bundleId, body), {
    onSuccess: res => {
      const response_body = res?.data?.extra;
      editUnitPrice !== UNIT_INFO?.price
        ? handleNoPendingTransactions()
        : drawerDisclosure.onClose();
      response_body?.price_change == 'true' ? setPriceUpdated(true) : setPriceUpdated(false);
      queryClient.invalidateQueries('payment_plan');
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Editing process failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const displayPhoto = UNIT_INFO?.profile_image ? UNIT_INFO?.profile_image : UNIT_INFO?.photos[0]?.photo;

  useEffect(() => {
    if (displayPhoto) {
      setBigPhotoViewSrc(displayPhoto ?? imageFallback.src);
    }
  }, [displayPhoto, UNIT_INFO?.photos]);

  const handlePhotoView = (src, idx) => {
    setPhotoViewSrc(src);
    setBigPhotoViewSrc(src);
    setViewId(idx);
    setCurrentImageIndex(idx); //
    idx <= direction ? setDirection(-1) : setDirection(1);
  };

  const resetCurrentImageIndex = () => {
    setPhotoViewSrc(bigPhotoViewSrc);
  };

  const handleBack = () => {
    router.back(-1);
  };
  // const OUTRIGHT_CONTRACT_LINK = UNIT_INFO?.property_document[0]?.document_file;
  const hasContract = PAYMENT_PLAN_DATA?.some(item => item.hasOwnProperty('contract'));

  return (
    <Box bg="#FAFAFA" minH="100vh" h="fit-content">
      <Head>
        <title>Veerge | Manage unit info</title>
        <meta name="description" content="Veerge | Manage unit info" />
        <meta name="theme-color" content="#FFFFFF" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView tabPanelStyle={{px: '0px', pb: '0px'}} px="0px" pb="0px" activePage="listings">
        <Box pb={6} w="full" mx="auto" mt="clamp(52px,calc(10.4vh + 40px),82px)">
          {isLoading ? (
            <Center mt="25vh">
              <AnimatedLoader />
            </Center>
          ) : isError ? (
            err => toastForError(err, true, toast)
          ) : (
            <Fragment>
              <HStack
                px={{base: '16px', xl: '78px'}}
                mx="auto"
                w="100%"
                justify="space-between"
                my={4}
              >
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
                  <UnitMoreOption
                    bundleId={bundleId}
                    refetch={refetch}
                    unitQty={UNIT_INFO?.total_quantity}
                    unitPrice={UNIT_INFO?.price}
                    unitInfo={UNIT_INFO}
                    pendingTransactions={PENDING_TRANSACTIONS}
                    isPriceUpdated={isPriceUpdated}
                    editUnitPrice={editUnitPrice}
                    setEditUnitPrice={setEditUnitPrice}
                    mutation={mutation}
                    handlePendingTransactions={handlePendingTransactions}
                    drawerDisclosure={drawerDisclosure}
                    doc={doc}
                    setDoc={setDoc}
                    pendingEquities={pendingEquities}
                    equityRefresh={FETCHED_PENDING_EQUITIES?.refetch}
                  />
                </Flex>
              </HStack>
              <Box w="full" px={{base: '0px', xl: '78px'}}>
                <Container
                  {...themeStyles.containerStyles}
                  maxW="full"
                  mx="auto"
                  padding="24px"
                  border={'1px solid #E4E4E4'}
                  borderBottomRadius={{base: '0px', xl: '16px'}}
                  mt="25px"
                >
                  <Flex direction={{base: 'column', lg: 'row'}} gap="33px">
                    <Stack w={{base: 'full', lg: '53%'}} minW={{lg: '400px'}}>
                      <Heading
                        display={{lg: 'none', base: 'initial'}}
                        textAlign={'left'}
                        alignSelf="flex-start"
                      >
                        {UNIT_INFO?.unit_title}
                      </Heading>
                      <AnimateImagePresence
                        layoutId={viewId}
                        sourceUrl={bigPhotoViewSrc}
                        videoUrl={UNIT_INFO?.youtube_url}
                        onClick={VIEW_IMAGE.onOpen}
                        direction={direction}
                        w="full"
                        maxW="full"
                        h="570px"
                        objectFit="cover"
                        cursor={'zoom-in'}
                      />

                      {UNIT_INFO?.photos?.length > 0 ? (
                        <Stack minW={UNIT_INFO?.photos?.length < 4 ? '200px' : '390px'} w="full">
                          {bigPhotoViewSrc ? (
                            <Flex w="full" gap="8px" sx={scrollBar} overflowX="auto">
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
                                    mr={{base: '5px', xl: '0px'}}
                                    borderRadius="16px"
                                    {...themeStyles.imageFallback}
                                    src={item?.photo ?? imageFallback.src}
                                  />
                                </AnimatePresence>
                              ))}
                            </Flex>
                          ) : null}
                        </Stack>
                      ) : null}
                      <ViewImage
                        modal={VIEW_IMAGE}
                        src={photoViewSrc}
                        currentImageIndex={currentImageIndex}
                        photos={UNIT_INFO?.photos}
                        setPhotoViewSrc={setPhotoViewSrc}
                        setCurrentImageIndex={setCurrentImageIndex}
                        resetCurrentImageIndex={resetCurrentImageIndex}
                      />
                    </Stack>
                    <UnitPropertyInformation
                      refetch={refetch}
                      unitDetail={UNIT_INFO}
                      CREATE_ALLOCATIONS_MODAL={CREATE_ALLOCATIONS_MODAL}
                    />
                  </Flex>
                </Container>
              </Box>
              {/* <ListingInfoDocuments docText="Outright document" docLink={OUTRIGHT_CONTRACT_LINK} /> */}
              {UNIT_INFO?.unit_description ? (
                <Box mt="30px" w="full" px={{base: '16px', xl: '78px'}}>
                  <Text fontSize="26px" fontWeight="500" color="#191919" lineHeight="41px">
                    Unit Description
                  </Text>
                  <Container
                    {...themeStyles.containerStyles}
                    padding="19px 36px"
                    mx=""
                    mt={2}
                    minH="130px"
                  >
                    <Text
                      whiteSpace="pre-wrap"
                      fontWeight={300}
                      fontSize="18px"
                      lineHeight="28px"
                      color="#191919"
                    >
                      {UNIT_INFO?.unit_description}
                    </Text>
                  </Container>
                </Box>
              ) : null}
              {UNIT_INFO?.is_fraction_sale_available ? (
                <FractionsInfo
                  wrapper={{
                    mt: '30px',
                    maxW: 'full',
                    px: {xl: '78px', base: '16px'},
                    mx: 'auto',
                  }}
                  containerstyle={{mt: '0px'}}
                  stackWrapperStyle={{mt: '0px'}}
                  bundle={UNIT_INFO}
                  refetch={refetch}
                />
              ) : null}

              {hasContract ? (
                <PaymentPlan
                  wrapper={{
                    px: {xl: '78px', base: '16px'},
                    mx: 'auto',
                    mt: '36px',
                  }}
                  refetch={refetch}
                  PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
                />
              ) : (
                <Box w="full" px={{xl: '78px', base: '16px'}}>
                  <HStack
                    w="99.7%"
                    justify="space-between"
                    borderTop={'1px solid #E5E5E5'}
                    borderBottom={'1px solid #E5E5E5'}
                    py="27px"
                  >
                    <Text fontSize={'24px'} fontWeight={'500'} color="#191919" ml={0}>
                      Do you want to add{' '}
                      <span
                        onClick={WIDGET_MODAL.onOpen}
                        style={{color: '#4545FE', cursor: 'pointer'}}
                      >
                        payment plan
                      </span>{' '}
                      ?
                    </Text>
                    <PaymentPlanDrawer drawerModal={WIDGET_MODAL} />
                    <CreateNewPaymentPlan
                      refetch={refetch}
                      unitId={PAYMENT_PLAN_DATA?.[0]?.bundle?.id}
                    />
                  </HStack>
                </Box>
              )}

              {UNIT_INFO?.fees.length > 0 ? (
                <>
                  <Box w="full" px={{xl: '78px', base: '16px'}}>
                    <HStack spacing="10px" align="center" mt="40px" justify={`space-between`}>
                      <Text fontSize="28px" fontWeight="500" color="#191919" mb={'15px'}>
                        Closing costs
                      </Text>
                      <AddNewClosingCosts mb={0} refetch={refetch} unitId={bundleId} />
                    </HStack>
                  </Box>
                  <UnitOtherFees
                    refetch={refetch}
                    wrapper={{
                      w: 'full',
                      px: {xl: '78px', base: '16px'},
                      mx: 'auto',
                      my: '0px',
                    }}
                    otherFeesData={UNIT_INFO && UNIT_INFO?.fees}
                    unitInfo={UNIT_INFO}
                  />
                </>
              ) : (
                <Box w="full" px={{xl: '78px', base: '16px'}}>
                  <HStack
                    w="99.7%"
                    justify="space-between"
                    borderBottom={'1px solid #E5E5E5'}
                    py="27px"
                  >
                    <Text fontSize={'24px'} fontWeight={'500'} color="#191919" ml={0}>
                      Do you want to add{' '}
                      <span
                        onClick={closingCostDisclosure.onOpen}
                        style={{color: '#4545FE', cursor: 'pointer'}}
                      >
                        closing costs
                      </span>{' '}
                      ?
                    </Text>
                    <ClosingCost drawerModal={closingCostDisclosure} />
                    <AddNewClosingCosts refetch={refetch} unitId={bundleId} />
                  </HStack>
                </Box>
              )}
            </Fragment>
          )}
        </Box>
        <PendingTransactionsModal
          doc={doc}
          refetch={refetch}
          unitId={bundleId}
          unitInfo={UNIT_INFO}
          priceMutation={mutation}
          unitPrice={editUnitPrice}
          modal={PENDING_TRANSACTIONS}
          isPriceUpdated={isPriceUpdated}
          pendingEquities={pendingEquities}
          isLoading={FETCHED_PENDING_EQUITIES?.isLoading}
          isError={FETCHED_PENDING_EQUITIES?.isError}
        />
      </LayoutView>
    </Box>
  );
};
export default UnitInformation;
