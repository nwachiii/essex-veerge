import React, {Fragment} from 'react';
import {
  Badge,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Button as ChakraBtn,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {themeStyles} from '../../../../../theme';

import Link from 'next/link';
import Filter from './filter';
import {CSVLink} from 'react-csv';
import {useRouter} from 'next/router';
import {BiExpand} from 'react-icons/bi';
import {useQuery} from '@tanstack/react-query';
import {fetchDashboardData} from '../../../../../apis';
import {handleDateFormat} from '/src/utils/formatDate';
import mostSharedImg from '/src/images/image-fallback.png';
import draftsIcon from '/src/images/icons/drafts-icon.svg';
import ListingsPieChart from '../../../../../components/Charts/ListingsPieChart';
import SortBy from '../../../../../components/SortBy';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import publishedIcon from '/src/images/icons/published-listing.svg';
import createListingIcon from '/src/images/icons/create-new-listing-icon.svg';

import RightListingEmptyPieChart from '/src/images/empty-listing-state-1.svg';
import LeftListingEmptyPieChart from '/src/images/empty-listing-state-2.svg';

import downloadIcon from '/src/images/icons/download-icon.svg';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';

export default function ExpandedHeader({
  draftCount,
  addedParam,
  sort_params,
  setAddedParam,
  isDraft,
  setIsDraft,
  handleExpand,
  listingType,
  setListingType,
  data,
  publishedListingCount,
  LISTINGS_DATA,
  forFilter,
  isTableValid,
}) {
  const router = useRouter();
  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      const sold = obj[i]?.units_sold;
      const total = obj[i]?.total_units;
      LISTINGS_DATA &&
        result.push({
          name: obj[i]?.name,
          location: obj[i]?.location_description ?? obj[i]?.landmark,
          created_date: handleDateFormat(obj[i]?.created_at),
          total_units: total,
          remaining_units: total - sold,
        });
    }
    return result;
  };
  return (
    <Fragment>
      <Box>
        <Flex
          justify="center"
          gap="25px"
          columnGap="10px"
          align="center"
          flexDirection={{
            md: 'column',
            xl: 'row',
          }}
          mt={3}
        >
          <ListingOverviewDetails
            overviewDetails={data}
            listingType={listingType}
            setListingType={setListingType}
          />
          <ListingOverviewSummary />
        </Flex>

        <Flex w="full" justify="space-between" mt="30px">
          <RadioGroup onChange={setIsDraft} value={isDraft} pb={3}>
            <Flex gap={3}>
              {isDraft == 'drafts' && (
                <Button
                  disabled={isDraft == 'listings'}
                  px={0}
                  mt={0}
                  variant="secondary"
                  w="229px"
                  h="48px"
                >
                  <Radio
                    w="full"
                    hidden
                    color={themeStyles.color.primary}
                    borderColor={themeStyles.color.primary}
                    value={'listings'}
                  >
                    <HStack w="full" spacing={2}>
                      <Image alt="" boxSize={'24px'} src={publishedIcon.src} />
                      <Text fontSize={'16px'} fontWeight={'500'}>
                        Published Listings
                      </Text>
                      <Badge color="#606060" bg="#F5F5F5" p={2} borderRadius="full">
                        {`${publishedListingCount || 0}`}
                      </Badge>
                    </HStack>
                  </Radio>
                </Button>
              )}

              {isDraft == 'listings' && (
                <Button
                  disabled={isDraft == 'drafts'}
                  px={0}
                  mt={0}
                  variant="secondary"
                  w="179px"
                  h="48px"
                  hidden
                >
                  <Radio
                    w="full"
                    hidden
                    color={themeStyles.color.primary}
                    borderColor={themeStyles.color.primary}
                    value={'drafts'}
                  >
                    <HStack w="full" spacing={2}>
                      <Image alt="" boxSize={'24px'} src={draftsIcon.src} />
                      <Text fontSize={'16px'} fontWeight={'500'}>
                        Drafts
                      </Text>
                      <Badge color="#606060" bg="#F5F5F5" p={2} borderRadius="full">
                        {`${draftCount || 0}`}
                      </Badge>
                    </HStack>
                  </Radio>
                </Button>
              )}
            </Flex>
          </RadioGroup>

          <Flex justify="space-between" w="full" align="center" pb={'15px'}>
            <HStack spacing={5} alignSelf="end" minH="35px">
              {isRoleRestricted('create listings').check ? null : (
                <Link href="/listings/create">
                  <Button
                    mt={0}
                    transition="all 2000s ease-in-out"
                    variant={'secondary'}
                    borderRadius="12px"
                    fontSize="14px"
                    fontWeight="400"
                    bg={'#FFFFFF'}
                    w="150px"
                    border="1px solid #e4e4e4"
                    h="35px"
                  >
                    <HStack gap="12px">
                      <Image boxSize={'16px'} src={createListingIcon.src} alt="add_icon" />
                      <Text
                        color="#191919"
                        fontFamily="Euclid Circular B"
                        fontSize="14px"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        New Listing
                      </Text>
                    </HStack>
                  </Button>
                </Link>
              )}
            </HStack>

            <HStack flexWrap="wrap-reverse" justify="end" spacing={6} align="center" minH="48px">
              <Button
                h="48px"
                borderRadius="12px"
                isDisabled={!isTableValid}
                mt={0}
                onClick={handleExpand}
                w="150px"
                fontWeight={'500'}
                fontSize={'14px'}
                variant="primary"
              >
                <HStack>
                  <BiExpand style={{color: '#fff', fontSize: '20px'}} />
                  <Text>Expand List</Text>
                </HStack>
              </Button>

              <SortBy
                setUrl={setAddedParam}
                url={addedParam}
                sortFor="listing"
                btnStyle={{bg: '#fff'}}
                sort_params={sort_params}
              />

              <Filter forFilter={forFilter} setUrl={setAddedParam} url={addedParam} />

              {isDraft == 'listings' && (
                <CSVLink data={getDataFromJSON(LISTINGS_DATA)}>
                  <ChakraBtn
                    mt={0}
                    display="flex"
                    gap="7px"
                    w="157px"
                    isDisabled={!isTableValid}
                    _hover={{
                      bg: 'transparent',
                    }}
                    bg="transparent"
                    height="48px"
                    border="1px solid #4545FE"
                    borderRadius="12px"
                    fontWeight="500"
                    fontSize="12px"
                    lineHeight="15px"
                    textAlign="center"
                    color="#4545FE"
                  >
                    <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                    Download as CSV
                  </ChakraBtn>
                </CSVLink>
              )}
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Fragment>
  );
}

const ListingOverviewDetails = ({overviewDetails, listingType, setListingType}) => {
  const totalListings =
    overviewDetails?.project_sold_out + overviewDetails?.total_available_listing;

  const totalUnits =
    overviewDetails?.total_developer_sold_units + overviewDetails?.total_available_unit;
  return (
    <HStack w="full">
      <Flex gap="22px" mx="auto" align="center" justify="space-between" w="full">
        {overviewDetails?.total_available_listing == '0' ? (
          <VStack
            background="#FFFFFF"
            border="1px solid #e5e5e5"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="16px"
            align="center"
            w={{md: 'full', xl: '380px'}}
            px="33px"
            h="fit-content"
            minH="256px"
            py="22px"
            spacing="14px"
          >
            <VStack p="20px" borderRadius="full" boxSize="180px" bg="#CBCBCB">
              <VStack
                justify="center"
                spacing="none"
                w="full"
                bg="#fff"
                h="full"
                borderRadius="full"
              >
                <Text fontSize="37.528px" fontWeight="400" color="#191919">
                  0
                </Text>
                <Text fontSize="" fontWeight="" color="rgba(25, 25, 25, 0.6)">
                  Listings
                </Text>
              </VStack>
            </VStack>
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box alignSelf={'center'} bg={'#24A69A'} boxSize="16.575px" borderRadius="2px" />
                Total available listing
              </Text>
              <Text color="#191919">0</Text>
            </HStack>
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box
                  alignSelf={'center'}
                  bg={themeStyles.color.matador__red}
                  boxSize="16.575px"
                  borderRadius="2px"
                />
                Total sold-out listing
              </Text>
              <Text color="#191919">0</Text>
            </HStack>
          </VStack>
        ) : (
          <VStack
            background="#FFFFFF"
            border="1px solid #E4E4E4"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="16px"
            align="center"
            w={{md: 'full', xl: '380px'}}
            px="33px"
            h="fit-content"
            minH="300px"
            py="22px"
            spacing="14px"
          >
            <ListingsPieChart
              title={Number(totalListings) < 2 ? 'Listing' : 'Listings'}
              A={overviewDetails?.project_sold_out ?? 0}
              B={overviewDetails?.total_available_listing ?? 0}
            />
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box alignSelf={'center'} boxSize="16.575px" borderRadius="2px" bg={'#24A69A'} />
                {Number(overviewDetails?.total_available_listing) < 2
                  ? 'Total available listing'
                  : 'Total available listings'}
              </Text>
              <Text color="#191919">
                {Intl.NumberFormat('en-US').format(overviewDetails?.total_available_listing ?? 0)}
              </Text>
            </HStack>
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box
                  alignSelf={'center'}
                  bg={themeStyles.color.matador__red}
                  boxSize="16.575px"
                  borderRadius="2px"
                />
                {Number(overviewDetails?.project_sold_out) < 2
                  ? 'Total sold-out listing'
                  : 'Total sold-out listings'}
              </Text>
              <Text color="#191919">
                {Intl.NumberFormat('en-US').format(overviewDetails?.project_sold_out ?? 0)}
              </Text>
            </HStack>
          </VStack>
        )}
        {!overviewDetails?.total_available_unit ? (
          <VStack
            background="#FFFFFF"
            border="1px solid #E4E4E4"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="16px"
            align="center"
            w={{md: 'full', xl: '380px'}}
            px="33px"
            h="fit-content"
            minH="300px"
            py="22px"
            spacing="14px"
          >
            <VStack p="20px" borderRadius="full" boxSize="180px" bg="#CBCBCB">
              <VStack
                justify="center"
                spacing="none"
                w="full"
                bg="#fff"
                h="full"
                borderRadius="full"
              >
                <Text fontSize="37.528px" fontWeight="400" color="#191919">
                  0
                </Text>
                <Text fontSize="" fontWeight="" color="rgba(25, 25, 25, 0.6)">
                  Units
                </Text>
              </VStack>
            </VStack>
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box alignSelf={'center'} bg={'#24A69A'} boxSize="16.575px" borderRadius="2px" />
                Total available Unit
              </Text>
              <Text color="#191919">0</Text>
            </HStack>
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box
                  alignSelf={'center'}
                  bg={themeStyles.color.matador__red}
                  boxSize="16.575px"
                  borderRadius="2px"
                />
                Total sold Unit
              </Text>
              <Text color="#191919">0</Text>
            </HStack>
          </VStack>
        ) : (
          <VStack
            background="#FFFFFF"
            border="1px solid #e4e4e4"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="16px"
            align="center"
            w={{md: 'full', xl: '380px'}}
            px="33px"
            h="fit-content"
            minH="300px"
            spacing="14px"
            py="22px"
          >
            <ListingsPieChart
              title={Number(totalListings) < 2 ? 'Unit' : 'Units'}
              A={overviewDetails?.total_developer_sold_units ?? 0}
              B={overviewDetails?.total_available_unit ?? 0}
            />
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box alignSelf={'center'} bg={'#24A69A'} boxSize="16.575px" borderRadius="2px" />
                {Number(overviewDetails?.total_available_unit) < 2
                  ? 'Total available unit'
                  : 'Total available units'}
              </Text>
              <Text color="#191919">
                {Intl.NumberFormat('en-US').format(overviewDetails?.total_available_unit ?? 0)}
              </Text>
            </HStack>
            <HStack
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
            >
              <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
                <Box
                  alignSelf={'center'}
                  bg={themeStyles.color.matador__red}
                  boxSize="16.575px"
                  borderRadius="2px"
                />
                {Number(overviewDetails?.total_developer_sold_units) < 2
                  ? 'Total sold unit'
                  : 'Total sold units'}
              </Text>
              <Text color="#191919">
                {Intl.NumberFormat('en-US').format(
                  overviewDetails?.total_developer_sold_units ?? 0
                )}
              </Text>
            </HStack>
          </VStack>
        )}
      </Flex>
    </HStack>
  );
};

const ListingOverviewSummary = () => {
  const router = useRouter();
  const {data} = useQuery(['dashboard', ''], () => fetchDashboardData(''));

  const DEVELOPER_DASHBOARD_DATA = data?.data?.dashboard_data || null;

  return (
    <Box
      {...themeStyles.lg_Box}
      px="15px"
      pt="13px"
      pb="24px"
      align="left"
      w="full"
      maxW={{md: 'full', xl: '479px'}}
      h="300px"
    >
      <Text {...themeStyles.textStyles.p_lg_strong} fontSize="18px" fontWeight="600" mb="13px">
        Overview
      </Text>

      <SimpleGrid columns={2} rowGap="24px" gap={`24px`}>
        <Box>
          <Text fontSize={'12px'} lineHeight="15px" fontWeight={400}>
            Most viewed
          </Text>
          <Divider w="full" my="8px" maxW="400px" />
          <Flex gap="8px">
            <Center
              width="67px"
              minW="67px"
              height="68px"
              minH="68px"
              borderRadius="xl"
              border={`1px solid ${themeStyles.color.matador__green}`}
              overflow={`hidden`}
            >
              <Image
                alt=""
                src={
                  DEVELOPER_DASHBOARD_DATA?.most_viewed?.project?.length
                    ? DEVELOPER_DASHBOARD_DATA?.most_viewed?.project[0]?.photos[0]?.photo
                    : mostSharedImg.src
                }
                minW={`100%`}
                minH={`100%`}
                objectFit={`cover`}
                fill
              />
            </Center>
            <Stack align="flex-start" spacing={1}>
              <Text
                fontWeight="600"
                fontSize="16px"
                lineHeight="20px"
                as="p"
                cursor="pointer"
                onClick={() =>
                  router.push(
                    `/listings/manage/?listingId=${Number(
                      DEVELOPER_DASHBOARD_DATA?.most_viewed?.project[0]?.id
                    )}`
                  )
                }
              >
                {DEVELOPER_DASHBOARD_DATA?.most_viewed.project &&
                  DEVELOPER_DASHBOARD_DATA?.most_viewed?.project[0]?.name}
              </Text>

              {DEVELOPER_DASHBOARD_DATA?.most_viewed?.most_views && (
                <Text fontSize="12px" lineHeight="15px" color={themeStyles.color.primary}>
                  Viewed <b>{DEVELOPER_DASHBOARD_DATA?.most_viewed?.most_views}</b>{' '}
                  {DEVELOPER_DASHBOARD_DATA?.most_viewed?.most_views > 1 ? 'times' : 'time'}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box textAlign={'left'}>
          <Text fontSize={'12px'} lineHeight="15px" fontWeight={400}>
            Most shared
          </Text>
          <Divider w="full" my="8px" maxW="400px" />
          <Flex gap="8px">
            <Center
              width="67px"
              minW="67px"
              height="68px"
              minH="68px"
              borderRadius="xl"
              border={`1px solid ${themeStyles.color.primary}`}
              overflow={`hidden`}
            >
              <Image
                alt=""
                src={
                  DEVELOPER_DASHBOARD_DATA?.most_shared?.project?.[0]?.photos[0]?.photo ??
                  mostSharedImg.src
                }
                minW={`100%`}
                minH={`100%`}
                objectFit={`cover`}
                fill
              />
            </Center>
            <Stack align="flex-start" spacing={1}>
              <Text
                fontWeight="600"
                as="p"
                fontSize="16px"
                lineHeight="20px"
                cursor="pointer"
                onClick={() =>
                  router.push(
                    `/listings/manage/?listingId=${Number(
                      DEVELOPER_DASHBOARD_DATA?.most_shared?.project?.id
                    )}`
                  )
                }
                _hover={{color: 'gray.400'}}
              >
                {DEVELOPER_DASHBOARD_DATA?.most_shared?.project?.[0]?.name}
              </Text>

              {DEVELOPER_DASHBOARD_DATA?.most_shared?.times_shared && (
                <Text fontSize="12px" lineHeight="15px" color={themeStyles.color.primary}>
                  Shared {DEVELOPER_DASHBOARD_DATA?.most_shared?.times_shared}{' '}
                  {DEVELOPER_DASHBOARD_DATA?.most_shared?.times_shared > 1 ? 'times' : 'time'}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>

        <Box>
          <Text fontSize={'12px'} lineHeight="15px" fontWeight={400}>
            Most watchlisted
          </Text>
          <Divider w="full" my="8px" maxW="400px" />
          <Flex gap="8px">
            <Center
              width="67px"
              minW="67px"
              height="68px"
              minH="68px"
              borderRadius="xl"
              border={`1px solid ${themeStyles.color.matador__yellow}`}
              overflow={`hidden`}
            >
              <Image
                alt=""
                src={
                  DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.project?.photos?.[0]?.photo ??
                  mostSharedImg.src
                }
                minW={`100%`}
                minH={`100%`}
                objectFit={`cover`}
                fill
              />
            </Center>
            <Stack align="flex-start" spacing={1}>
              <Text
                fontWeight="600"
                as="p"
                fontSize="16px"
                lineHeight="20px"
                cursor="pointer"
                onClick={() =>
                  router.push(
                    `/listings/manage/?listingId=${Number(
                      DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.project?.id
                    )}`
                  )
                }
                _hover={{color: 'gray.400'}}
              >
                {DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.project?.name}
              </Text>

              {DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.times_watchlisted && (
                <Text fontSize="12px" lineHeight="15px" color={themeStyles.color.primary}>
                  Watchlisted <b>{DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.times_watchlisted}</b>{' '}
                  {DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.times_watchlisted > 1
                    ? 'times'
                    : 'time'}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box>
          <Text fontSize={'12px'} lineHeight="15px" fontWeight={400}>
            Best selling unit
          </Text>
          <Divider w="full" my="8px" maxW="400px" />
          <Flex gap="8px">
            <Center
              width="67px"
              minW="67px"
              height="68px"
              minH="68px"
              borderRadius="xl"
              border={`1px solid ${themeStyles.color.matador__yellow}`}
              overflow={`hidden`}
            >
              <Image
                alt=""
                src={
                  DEVELOPER_DASHBOARD_DATA?.most_sold?.most_sold_unit?.project?.photos[0]?.photo ??
                  mostSharedImg.src
                }
                minW={`100%`}
                minH={`100%`}
                objectFit={`cover`}
                fill
              />
            </Center>
            <Stack align="flex-start" spacing="4px">
              <HoverText
                text={DEVELOPER_DASHBOARD_DATA?.most_sold?.most_sold_unit?.unit_title ?? '-'}
                fontWeight="600"
                as="p"
                pr="0px"
                lineHeight="20px"
                fontSize="16px"
                cursor="default"
                lens={23}
              />

              <HoverText
                text={DEVELOPER_DASHBOARD_DATA?.most_sold?.most_sold_unit?.project?.name ?? '-'}
                lens={24}
                fontSize="12px"
                lineHeight="15px"
                fontWeight="400"
                color="#606060"
                cursor="pointer"
                onClick={() =>
                  router.push(
                    `/listings/manage/?listingId=${Number(
                      DEVELOPER_DASHBOARD_DATA?.most_sold?.most_sold_unit?.project?.id
                    )}`
                  )
                }
              />
            </Stack>
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
