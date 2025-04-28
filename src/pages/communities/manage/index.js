import {useRouter} from 'next/router';
import {themeStyles} from '../../../theme';
import backArrow from '/src/images/icons/back-arrow.png';
import ListingInfoAmenities from './ListingInfo.components/ListingInfoAmenities';
import ListingInfoWholeUnits from './ListingInfo.components/ListingInfoWholeUnits';
import {LayoutView} from '../../../components/PageLayout/LayoutView';
import AdditionalInfo from './ListingInfo.components/ListingInfo.details/AdditionalInfo';
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
  Button,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import ListingContactInfo from './ListingInfo.components/ListingInfo.details/listingContactInfo';
import {listingDetail} from 'constants/listListings';
import {AMENITIES_ESSEX} from 'constants/listings/amenities';
import ListingMoreOption from '@/components/Drawers/listingMoreOptionsDrawer';
import ListingInfoReservations from './ListingInfo.components/ListingInfoReservations';
import ListingInfoBoardMembers from './ListingInfo.components/ListingInfoBoardMembers';

export const SingleListingPage = () => {
  const router = useRouter();
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  // Variables and states of interest for the useCase where params include isCreate
  const isCreate = router?.query?.isCreate;
  // true;

  // Variables of interest for the useCase where params don't have "isCreate"
  const [screenHeight, setScreenHeight] = useState(0);

  const {listingId} = router?.query;

  const listingInfoFromLocalStorage =
    typeof window !== 'undefined' &&
    localStorage.getItem('listingInfo') !== 'undefined' &&
    JSON.parse(localStorage.getItem('listingInfo'));

  const handleBack = () => {
    router.back(-1);
  };

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    window.addEventListener('resize', () => {
      setScreenHeight(window.innerHeight);
    });
  }, []);

  const drawerDisclosure = useDisclosure();

  return (
    <>
      <Box style={{background: '#FAFAFA'}} minH="100vh" h={isSmallerLaptop ? '60vh' : ''}>
        <LayoutView
          tabPanelStyle={{px: '0px', pb: '0px'}}
          px="0px"
          pb="0px"
          activePage="communities"
        >
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
              <HStack align="center" gap={{base: '16px', xl: '24px'}}>
                <Button
                  rounded="full"
                  bg="#191919"
                  w="214px"
                  fontSize="16px"
                  fontWeight={400}
                  color="#FFF"
                  p="16px 40px"
                  _hover={{
                    opacity: 1,
                  }}
                  h="54px"
                  onClick={() => router.push('/transactions')}
                >
                  Transactions
                </Button>
                <ListingMoreOption
                  drawerDisclosure={drawerDisclosure}
                  listingId={listingId}
                  isPrivate={listingDetail?.is_private}
                  listingDetail={listingInfoFromLocalStorage || listingDetail}
                  name={listingDetail?.name || listingInfoFromLocalStorage?.name}
                />
              </HStack>
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
              <ListingInfoBoardMembers />
              <SimpleGrid
                mx="auto"
                columns={2}
                spacing={{base: '26px', md: '84px'}}
                minChildWidth={'500px'}
              >
                <ListingInfoReservations />
              </SimpleGrid>
            </Box>
            <ListingInfoAmenities data={AMENITIES_ESSEX} />
            <ListingInfoWholeUnits />
          </Box>
        </LayoutView>
      </Box>
    </>
  );
};
export default SingleListingPage;
