import {useRouter} from 'next/router';
import {themeStyles} from '../../../theme';
import backArrow from '/src/images/icons/back-arrow.png';
import ListingInfoAmenities from './ListingInfo.components/ListingInfoAmenities';
import ListingInfoWholeUnits from './ListingInfo.components/ListingInfoWholeUnits';
import {LayoutView} from '../../../components/PageLayout/LayoutView';
import AdditionalInfo from './ListingInfo.components/ListingInfo.details/AdditionalInfo';
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
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import ListingContactInfo from './ListingInfo.components/ListingInfo.details/listingContactInfo';
import {listingDetail} from 'constants/listListings';

export const SingleListingPage = () => {
  const router = useRouter();
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  // Variables and states of interest for the useCase where params include isCreate
  const isCreate = router?.query?.isCreate;
  // true;

  // Variables of interest for the useCase where params don't have "isCreate"
  const [screenHeight, setScreenHeight] = useState(0);

  const {listingId} = router?.query;
  const ShowCalendar = useDisclosure();

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

  console.log('listingDetail', listingDetail);

  return (
    <div>
      <Box style={{background: '#FAFAFA'}} minH="100vh" h={isSmallerLaptop ? '60vh' : ''}>
        <LayoutView tabPanelStyle={{px: '0px', pb: '0px'}} px="0px" pb="0px" activePage="listings">
          <Box pb={6} w="full" mx="auto" mt="clamp(52px,calc(10.4vh + 40px),82px)">
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
                <Heading {...themeStyles.textStyles.h3}>Community Profile</Heading>
              </HStack>
              {/* {isCreate ? null : (
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
                )} */}
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
                  <BasicInfo listingDetail={listingDetail || listingInfoFromLocalStorage} />
                  <Flex
                    direction="column"
                    gap="20px"
                    w={{base: 'full', xl: 'full'}}
                    h="fit-content"
                  >
                    <AdditionalInfo
                      pageQueryId={listingId || listingInfoFromLocalStorage?.id}
                      listingDetail={listingDetail || listingInfoFromLocalStorage}
                    />
                    <ListingContactInfo
                      listingDetail={listingDetail || listingInfoFromLocalStorage}
                    />
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
                    <Text
                      gap="15px"
                      fontSize="33px"
                      color="#191919"
                      fontWeight={500}
                      lineHeight="30.43px"
                      alignContent="center"
                      mb="20px"
                    >
                      Reservation
                    </Text>
                    <Container
                      {...themeStyles.containerStyles}
                      padding={{md: '10px 26px', xl: '25px 28px'}}
                      maxW="100%"
                    >
                      <VStack align="start" justify={'center'} spacing="19px" h="full" w="full">
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
            <ListingInfoWholeUnits
              isCreate={isCreate}
              pageQueryId={listingId || listingInfoFromLocalStorage?.id}
              listingDetail={listingDetail ?? listingInfoFromLocalStorage}
            />
            <ListingInfoAmenities
              data={listingDetail?.amenities ?? listingInfoFromLocalStorage?.amenities}
            />
            <SetOpenHouseDate ShowCalendar={ShowCalendar} />
          </Box>
        </LayoutView>
      </Box>
    </div>
  );
};
export default SingleListingPage;
