import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {FcCalendar} from 'react-icons/fc';
import {RiEdit2Fill} from 'react-icons/ri';
import {IoIosUnlock} from 'react-icons/io';
import {themeStyles} from '../../../theme';
import {AiOutlineMenu} from 'react-icons/ai';
import {useQuery} from '@tanstack/react-query';
import {fetchListings} from '../../../apis/listings';
import backArrow from '/src/images/icons/back-arrow.png';
import ListingInfoDocuments from './ListingInfo.components/ListingInfoDocuments';
import ListingInfoAmenities from './ListingInfo.components/ListingInfoAmenities';
import ListingInfoWholeUnits from './ListingInfo.components/ListingInfoWholeUnits';
import {isRoleRestricted} from '../../../ui-lib/ui-lib.hooks';
import {AnimatedLoader, LayoutView} from '../../../components';
import {Button, EmbedVideo} from '../../../ui-lib/ui-lib.components';
import AdditionalInfo from './ListingInfo.components/ListingInfo.details/AdditionalInfo';
import ViewCommission from './ListingInfo.components/ListingInfo.details/commissions/ViewCommission';
import EditCommission from './ListingInfo.components/ListingInfo.details/commissions/EditCommission';
import {SetOpenHouseDate} from '../../../components/Modals/SetOpenHouseData';
import BasicInfo from './ListingInfo.components/ListingInfo.details/BasicInfo';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import {RxCross1} from 'react-icons/rx';

export default function SingleListingPage() {
  const router = useRouter();
  const toast = useToast();
  const {id} = router?.query;
  const ShowCalendar = useDisclosure();
  const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
  const [isClicked, setIsClicked] = useState(true);
  const {data, isError, isLoading, refetch} = useQuery(['listings', ''], () => fetchListings(''));
  const listingInfoFromLocalStorage =
    typeof window !== 'undefined' &&
    localStorage.getItem('listingInfo') !== 'undefined' &&
    JSON.parse(localStorage.getItem('listingInfo'));

  if (isLoading) {
    return (
      <VStack h="55vh">
        <AnimatedLoader />
      </VStack>
    );
  }
  if (isError) {
    return toast({
      title: `Oops' `,
      status: 'An error occured',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }
  const listingDetailArr = data && data?.data?.project?.filter(list => list.id == id);
  const listingDetail = listingInfoFromLocalStorage ?? data?.id ? data : listingDetailArr[0];

  const handleBack = () => {
    router.back(-1);
  };
  return (
    <Box style={{background: '#FAFAFA'}} minH="100vh" h="fit-content">
      <LayoutView activePage="listings" />
      <Box mt="-85vh" maxW="1280px" mx="auto" pb="80px">
        <HStack w="100%" justify="space-between" my={4}>
          <HStack onClick={handleBack} zIndex={10}>
            <Image
              style={{cursor: 'pointer'}}
              mr={2}
              boxSize="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading {...themeStyles.textStyles.h3}>Back</Heading>
          </HStack>
          <Flex justify="space-between" columnGap="28px" zIndex={10} align="center">
            <Link
              href={`/dashboard/outstanding-balance/?listingId=${id}&name=${listingDetail?.name}`}
            >
              <Button mt={0} variant="primary" w="218px">
                Transactions
              </Button>
            </Link>

            <Menu>
              {({isOpen}) => (
                <>
                  {
                    <MenuButton onClick={() => setIsClicked(!isClicked)}>
                      {!isOpen ? (
                        <AiOutlineMenu style={{color: '#4545FE', fontSize: '44px'}} />
                      ) : (
                        <RxCross1 style={{color: '#4545FE', fontSize: '30px'}} />
                      )}
                    </MenuButton>
                  }
                  <MenuList mt="24px">
                    <MenuItem>
                      <Link href={`/listings/edit/${id}`}>
                        <HStack p="1.2em" spacing="20px">
                          <RiEdit2Fill style={{color: 'orange', fontSize: '34px'}} />
                          <Text color="#4545FE" fontSize="20px" fontWeight={500}>
                            Edit listing
                          </Text>
                        </HStack>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <HStack p="1.2em" spacing="20px">
                        <IoIosUnlock style={{color: 'teal', fontSize: '34px'}} />
                        {listingDetail?.is_private ? (
                          <Text color="#4545FE" fontSize="20px" fontWeight={500}>
                            Make listing public
                          </Text>
                        ) : (
                          <Text color="#4545FE" fontSize="20px" fontWeight={500}>
                            Make listing private
                          </Text>
                        )}
                      </HStack>
                    </MenuItem>
                    <MenuItem>
                      <HStack p="1.2em" spacing="20px" onClick={ShowCalendar.onOpen}>
                        <FcCalendar style={{color: '#4545FE', fontSize: '34px'}} />
                        <Text color="#4545FE" fontSize="20px" fontWeight={500}>
                          Set Open house Date
                        </Text>
                      </HStack>
                    </MenuItem>

                    {/* <MenuItem>
                      <HStack
                        onClick={() =>
                          router.push(
                            `/listings/manage/view_archived_units/${id}`
                          )
                        }
                        p="1.2em"
                        spacing="20px"
                      >
                        <Image src={listingStatusIcon.src} />
                        <Text color="#4545FE" fontSize="20px" fontWeight={500}>
                          Manage archived units
                        </Text>
                      </HStack>
                    </MenuItem> */}
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        </HStack>
        <Container {...themeStyles.containerStyles} maxW="1284px" padding="19px 36px" mt="25px">
          <Flex>
            <BasicInfo refetch={refetch} listingDetail={listingDetail} />
            <Flex direction="column" w="full">
              <AdditionalInfo listingDetail={listingDetail} />
              <ViewCommission listingDetail={listingDetail} onEditOpen={onEditOpen} />
              <EditCommission
                defaultData={listingDetail}
                isOpen={isEditOpen}
                onClose={onEditClose}
              />
            </Flex>
          </Flex>
        </Container>
        <SimpleGrid columns={2} spacing={{base: '26px', md: '84px'}} minChildWidth={'500px'}>
          {listingDetail?.description && (
            <Box mt="60px">
              <Text
                display={'flex'}
                gap="15px"
                alignContent="center"
                fontWeight={500}
                fontSize="26px"
                lineHeight="41px"
                color="#191919"
              >
                Listing Description
              </Text>
              <Container
                maxW="100%"
                minH="299px"
                padding="19px 36px"
                border="1px solid #F6F6F6"
                {...themeStyles.containerStyles}
                mx={listingDetail?.youtube_url ? 'auto' : 'unset'}
              >
                <VStack justify={'center'} h="full" w="full">
                  <Text
                    w="full"
                    pt="19px"
                    fontWeight={300}
                    fontSize="18px"
                    lineHeight="28px"
                    color="#191919"
                  >
                    {listingDetail.description}
                  </Text>
                </VStack>
              </Container>
            </Box>
          )}
          {listingDetail?.youtube_url && (
            <Container
              {...themeStyles.containerStyles}
              border="1px solid #F6F6F6"
              padding="10px"
              mt="60px"
              height={'fit-content'}
            >
              <EmbedVideo videoId={listingDetail?.youtube_url?.slice(-11)} />
            </Container>
          )}
        </SimpleGrid>
        <ListingInfoWholeUnits listingDetail={listingDetail} />
        <ListingInfoDocuments listingDetail={listingDetail} />
        {listingDetail?.amenities && <ListingInfoAmenities data={listingDetail?.amenities} />}
        <SetOpenHouseDate ShowCalendar={ShowCalendar} />
      </Box>
    </Box>
  );
}
