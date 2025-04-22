import {useRouter} from 'next/router';
import {themeStyles} from '../../../theme';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  EditUnitPrice,
  fetchAllBundlePaymentPlan,
  fetchListingDetail,
  getPendingEquities,
} from '../../../apis/listings';
import backArrow from '/src/images/icons/back-arrow.png';
import ListingInfoAmenities from './ListingInfo.components/ListingInfoAmenities';
import ListingInfoWholeUnits from './ListingInfo.components/ListingInfoWholeUnits';
import {AnimatedLoader} from '../../../components/common/loaders';
import {LayoutView} from '../../../components/PageLayout/LayoutView';
import ViewCommission from './ListingInfo.components/ListingInfo.details/commissions/ViewCommission';
import AdditionalInfo from './ListingInfo.components/ListingInfo.details/AdditionalInfo';
import EditCommission from './ListingInfo.components/ListingInfo.details/commissions/EditCommission';
import {SetOpenHouseDate} from '../../../components/Modals/SetOpenHouseData';
import BasicInfo from './ListingInfo.components/ListingInfo.details/BasicInfo';

import {
  Box,
  Flex,
  Text,
  Image,
  HStack,
  Heading,
  Container,
  VStack,
  useDisclosure,
  SimpleGrid,
  useToast,
  Grid,
  AbsoluteCenter,
  Center,
} from '@chakra-ui/react';
import ListingMoreOption from '../../../components/Drawers/listingMoreOptionsDrawer';
import {useEffect, useState} from 'react';
import AddNewClosingCosts from './unit_info/closing-cost/add-new-closing-costs';
import UnitOtherFees from './unit_info/closing-cost/OtherFees';
import FractionsInfo from './unit_info/fractionsInfo';
import PaymentPlan from './unit_info/payment_plan/PaymentPlan';
import CreateNewPaymentPlan from './unit_info/payment_plan/create_new_plan';
import PendingTransactionsModal from './unit_info/edit_unit/PendingTransactionsModal';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import ListingContactInfo from './ListingInfo.components/ListingInfo.details/listingContactInfo';

export const SingleListingPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [staleTimeUpdate, setStaleTimeUpdate] = useState(true);
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  // Variables and states of interest for the useCase where params include isCreate
  const isCreate = router?.query?.isCreate;
  // true;
  const [editUnitPrice, setEditUnitPrice] = useState();
  const [isPriceUpdated, setPriceUpdated] = useState(false);
  const [doc, setDoc] = useState(null);
  // Variables of interest for the useCase where params don't have "isCreate"
  const [screenHeight, setScreenHeight] = useState(0);

  const {listingId} = router?.query;
  const ShowCalendar = useDisclosure();
  const drawerDisclosure = useDisclosure();
  const PENDING_TRANSACTIONS = useDisclosure();
  const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
  const {data, isError, isLoading, refetch} = useQuery(['listingDetail', listingId], {
    queryFn: () => fetchListingDetail(Number(listingId)),
    refetchOnWindowFocus: true,
  });
  const listingDetail = data && data?.data?.project;
  const bundleId = listingDetail?.unit_id;

  const BUNDLE_IN_LISTING_QUERY = useQuery(
    ['units', Number(bundleId)],
    () => fetchAllBundlePaymentPlan(Number(bundleId)),
    {enabled: !!!isNaN(bundleId)}
  );
  const FETCHED_PENDING_EQUITIES = useQuery(
    ['get-pending-equity', Number(bundleId)],
    () => getPendingEquities(Number(bundleId)),
    {enabled: !!!isNaN(Number(bundleId))}
  );

  const listingInfoFromLocalStorage =
    typeof window !== 'undefined' &&
    localStorage.getItem('listingInfo') !== 'undefined' &&
    JSON.parse(localStorage.getItem('listingInfo'));

  const handleBack = () => {
    router.push('/listings');
  };

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    window.addEventListener('resize', () => {
      setScreenHeight(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    refetch();
    setTimeout(() => {
      setStaleTimeUpdate(false);
    }, 3500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isBuildingTypeSingleFamilyResidential =
    listingDetail?.building_type == 'Detached' || listingDetail?.building_type == 'Semi Detached';
  const isLand = listingDetail?.building_type == 'Land';
  const PAYMENT_PLAN_DATA = BUNDLE_IN_LISTING_QUERY && BUNDLE_IN_LISTING_QUERY?.data?.data?.results;
  const UNIT_INFO =
    BUNDLE_IN_LISTING_QUERY && BUNDLE_IN_LISTING_QUERY?.data?.data?.results?.[0]?.bundle;
  const pendingEquities = FETCHED_PENDING_EQUITIES?.data?.data?.data;

  const handlePendingTransactions = () => {
    drawerDisclosure.onClose();
    PENDING_TRANSACTIONS.onOpen();
  };

  const handleNoPendingTransactions = () => {
    drawerDisclosure.onClose();
    toast({
      title: 'Listing price successsfully updated',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const mutation = useMutation(body => EditUnitPrice(bundleId, body), {
    onSuccess: res => {
      refetch();
      const response_body = res?.data?.extra;
      editUnitPrice !== listingDetail?.starting_from
        ? handleNoPendingTransactions()
        : drawerDisclosure.onClose();
      response_body?.price_change == 'true' ? setPriceUpdated(true) : setPriceUpdated(false);
    },
    onError: err => {
      // console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Editing process failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const hasContract = PAYMENT_PLAN_DATA?.some(item => item.hasOwnProperty('contract'));

  return (
    <div>
      <Box style={{background: '#FAFAFA'}} minH="100vh" h={isSmallerLaptop ? '60vh' : ''}>
        <LayoutView tabPanelStyle={{px: '0px', pb: '0px'}} px="0px" pb="0px" activePage="listings">
          {isLoading || staleTimeUpdate ? (
            <Center h="60vh">
              <AnimatedLoader />
            </Center>
          ) : isError ? (
            toast({
              title: `Oops' `,
              duration: 5000,
              isClosable: true,
              position: 'top-right',
              status: 'An error occured',
            })
          ) : (
            <Box
              pb={6}
              w="full"
              mx="auto"
              mt="clamp(52px,calc(10.4vh + 40px),82px)"
            >
              <HStack
                px={{base: '16px', xl: '78px'}}
                mx="auto"
                w="100%"
                justify="space-between"
                my={4}
              >
                <HStack
                  zIndex={1000}
                  position="relative"
                  onClick={handleBack}
                  opacity={isCreate ? 0 : 1}
                  cursor={isCreate ? '' : 'pointer'}
                >
                  <Image mr={2} boxSize="50px" alt="back_arrow" src={backArrow.src} />
                  <Heading {...themeStyles.textStyles.h3}>Back</Heading>
                </HStack>
                {isCreate ? null : (
                  <ListingMoreOption
                    doc={doc}
                    setDoc={setDoc}
                    refetch={refetch}
                    mutation={mutation}
                    listingId={listingId}
                    editUnitPrice={editUnitPrice}
                    isPriceUpdated={isPriceUpdated}
                    pendingEquities={pendingEquities}
                    setEditUnitPrice={setEditUnitPrice}
                    drawerDisclosure={drawerDisclosure}
                    isPrivate={listingDetail?.is_private}
                    pendingTransactions={PENDING_TRANSACTIONS}
                    handlePendingTransactions={handlePendingTransactions}
                    listingDetail={listingInfoFromLocalStorage || listingDetail}
                    name={listingDetail?.name || listingInfoFromLocalStorage?.name}
                  />
                )}
              </HStack>
              <Box w="full" px={{base: '0px', xl: '78px'}}>
                <Container
                  {...themeStyles.containerStyles}
                  maxW="full"
                  mx="auto"
                  padding="24px"
                  border={'1px solid #E4E4E4'}
                  borderBottomRadius={{base: '0px', xl: '16px'}}
                >
                  <Grid
                    templateColumns={{base: '1fr', xl: 'repeat(2, 1fr)'}}
                    w="full"
                    gap="11px"
                    rowGap={{base: '20px', xl: '3.27%'}}
                    columnGap={{xl: '40px'}}
                    h="fit-content"
                  >
                    <BasicInfo
                      isCreate={isCreate}
                      refetch={refetch}
                      listingDetail={listingDetail || listingInfoFromLocalStorage}
                    />
                    <Flex
                      direction="column"
                      gap="20px"
                      w={{base: 'full', xl: 'full'}}
                      h="fit-content"
                    >
                      <AdditionalInfo
                        refetch={refetch}
                        pageQueryId={listingId || listingInfoFromLocalStorage?.id}
                        listingDetail={listingDetail || listingInfoFromLocalStorage}
                      />
                      {isCreate ? null : (
                        <ViewCommission
                          listingDetail={listingDetail || listingInfoFromLocalStorage}
                          onEditOpen={onEditOpen}
                        />
                      )}
                      <ListingContactInfo
                        listingDetail={listingDetail || listingInfoFromLocalStorage}
                      />
                      {isCreate ? null : (
                        <EditCommission
                          defaultData={listingDetail || listingInfoFromLocalStorage}
                          isOpen={isEditOpen}
                          onClose={onEditClose}
                          refetch={refetch}
                        />
                      )}
                    </Flex>
                  </Grid>
                </Container>
              </Box>
              <Box w="full" px={{base: '16px', xl: '78px'}}>
                <SimpleGrid
                  mx="auto"
                  columns={2}
                  spacing={{base: '26px', md: '84px'}}
                  minChildWidth={'500px'}
                >
                  {(listingDetail || listingInfoFromLocalStorage)?.description && (
                    <Box mt="36px">
                      <Container
                        {...themeStyles.containerStyles}
                        padding={{md: '10px 26px', xl: '25px 28px'}}
                        maxW="100%"
                        minH="196px"
                        mx={
                          (listingDetail || listingInfoFromLocalStorage)?.youtube_url
                            ? 'auto'
                            : 'unset'
                        }
                      >
                        <VStack align="start" justify={'center'} spacing="19px" h="full" w="full">
                          <Text
                            gap="15px"
                            fontSize="24px"
                            color="#191919"
                            fontWeight={500}
                            lineHeight="30.43px"
                            alignContent="center"
                          >
                            Description
                          </Text>

                          <Text
                            w="full"
                            fontWeight={300}
                            fontSize={{md: '14px', xl: '16px'}}
                            lineHeight={{xl: '20.29px'}}
                            color="#191919"
                            whiteSpace="pre-wrap"
                          >
                            {(listingDetail || listingInfoFromLocalStorage).description}
                          </Text>
                        </VStack>
                      </Container>
                    </Box>
                  )}
                </SimpleGrid>
              </Box>
              {isBuildingTypeSingleFamilyResidential || isLand ? null : (
                <ListingInfoWholeUnits
                  isCreate={isCreate}
                  pageQueryId={listingId || listingInfoFromLocalStorage?.id}
                  listingDetail={listingDetail ?? listingInfoFromLocalStorage}
                />
              )}
              {(listingInfoFromLocalStorage && listingInfoFromLocalStorage?.amenities?.length) ||
              listingDetail?.amenities?.length ? (
                <ListingInfoAmenities
                  data={listingDetail?.amenities ?? listingInfoFromLocalStorage?.amenities}
                />
              ) : null}

              {isBuildingTypeSingleFamilyResidential || isLand ? (
                <>
                  {UNIT_INFO?.is_fraction_sale_available ? (
                    <FractionsInfo
                      bundle={UNIT_INFO}
                      wrapper={{
                        mt: '30px',
                        maxW: 'full',
                        px: {xl: '78px', base: '16px'},
                        mx: 'auto',
                      }}
                      containerstyle={{mt: '0px'}}
                      stackWrapperStyle={{mt: '15px'}}
                      refetch={BUNDLE_IN_LISTING_QUERY?.refetch}
                      isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
                    />
                  ) : null}

                  {hasContract ? (
                    <PaymentPlan
                      wrapper={{
                        px: {xl: '78px', base: '16px'},
                        mx: 'auto',
                        mt: '36px',
                      }}
                      containerStyle={{
                        mt: '0px',
                      }}
                      refetch={BUNDLE_IN_LISTING_QUERY?.refetch}
                      PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
                    />
                  ) : (
                    <Box w="full" px={{xl: '78px', base: '16px'}}>
                      <HStack
                        w="full"
                        justify="space-between"
                        mx="auto"
                        mt="36px"
                        borderTop={'1px solid #E5E5E5'}
                        borderBottom={'1px solid #E5E5E5'}
                        py="27px"
                      >
                        <Text fontSize={'24px'} fontWeight={'500'} color="#191919" ml={0}>
                          Do you want to add{' '}
                          <span style={{color: '#4545FE', cursor: 'pointer'}}>payment plan</span> ?
                        </Text>
                        <CreateNewPaymentPlan
                          refetch={BUNDLE_IN_LISTING_QUERY?.refetch}
                          unitId={PAYMENT_PLAN_DATA?.[0]?.bundle?.id}
                        />
                      </HStack>
                    </Box>
                  )}

                  {/* CLosing Costs */}
                  {UNIT_INFO?.fees.length > 0 ? (
                    <>
                      <Box w="full" px={{xl: '78px', base: '16px'}}>
                        <HStack
                          maxW="full"
                          mx="auto"
                          mt="36px"
                          spacing="10px"
                          justifyContent="start"
                          align="center"
                          justify={`space-between`}
                        >
                          <Text fontSize="28px" fontWeight="500" color="#191919" mb={'15px'}>
                            Closing costs
                          </Text>
                          <AddNewClosingCosts
                            mb={0}
                            refetch={BUNDLE_IN_LISTING_QUERY?.refetch}
                            unitId={Number(listingDetail?.unit_id)}
                          />
                        </HStack>
                      </Box>
                      <UnitOtherFees
                        wrapper={{
                          // maxW: '1284px',
                          w: 'full',
                          px: {xl: '78px', base: '16px'},
                          mx: 'auto',
                          my: '0px',
                        }}
                        refetch={BUNDLE_IN_LISTING_QUERY?.refetch}
                        otherFeesData={UNIT_INFO && UNIT_INFO?.fees}
                        unitInfo={UNIT_INFO}
                      />
                    </>
                  ) : (
                    <Box w="full" px={{xl: '78px', base: '16px'}}>
                      <HStack
                        w="full"
                        // maxW="1284px"

                        mx="auto"
                        mt="36px"
                        justify="space-between"
                        borderBottom={'1px solid #E5E5E5'}
                        py="27px"
                      >
                        <Text fontSize={'24px'} fontWeight={'500'} color="#191919" ml={0}>
                          Do you want to add{' '}
                          <span style={{color: '#4545FE', cursor: 'pointer'}}>closing costs</span> ?
                        </Text>
                        <AddNewClosingCosts
                          refetch={BUNDLE_IN_LISTING_QUERY?.refetch}
                          unitId={Number(listingDetail?.unit_id)}
                        />
                      </HStack>
                    </Box>
                  )}
                </>
              ) : null}
              <SetOpenHouseDate ShowCalendar={ShowCalendar} />
            </Box>
          )}
          {(isBuildingTypeSingleFamilyResidential || isLand) && (
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
          )}
        </LayoutView>
      </Box>
    </div>
  );
};
export default SingleListingPage;
