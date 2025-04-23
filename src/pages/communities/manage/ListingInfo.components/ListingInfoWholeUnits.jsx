import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {FaCaretRight} from 'react-icons/fa';
import {themeStyles} from '../../../../theme';
import Carousel from 'react-elastic-carousel';
import {useQuery} from '@tanstack/react-query';
import fallback from '/src/images/image-fallback.png';
import fractionTag from '/src/images/icons/halfCircleFractionalIcon.svg';

import {fetchAllListingBundles} from '../../../../apis/listings';
import {
  formatAmountWithDecimal,
  formatNumberWithCommas,
  formatToCurrency,
} from '../../../../utils/formatAmount';
import UnitSkeletons from './UnitsSkeleton';
import {AddMoreBtn} from 'ui-lib/ui-lib.components';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
    display: 'none',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px #fafafa',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#cbcbcb',
  },
};

export const ListingInfoWholeUnits = ({listingDetail, pageQueryId, isCreate}) => {
  const router = useRouter();
  const {id} = router?.query;

  const toast = useToast();
  const listingId = Number(pageQueryId) || Number(listingDetail?.id);
  const LISTING_BUNDLES_QUERY = useQuery(['listing-bundle', listingId], () =>
    fetchAllListingBundles(listingId)
  );
  const listingBundles = LISTING_BUNDLES_QUERY?.data?.data?.results ?? [];

  const isLand = listingDetail?.building_type.includes('land');
  const isSingleUnit =
    listingDetail?.building_type === 'Detached' ||
    listingDetail?.building_type === 'Semi Detached' ||
    listingDetail?.building_type === 'Land';

  const viewUnitPage = unit =>
    router.push({
      pathname: `/listings/manage/unit_info/`,
      query: {
        isFraction: listingDetail?.fraction_is_available,
        unitId: unit?.id,
        projectId: Number(listingId) || id,
      },
    });
  return (
    <>
      {!!listingBundles?.length && (
        <Box
          mx={'auto'}
          // maxW="88vw"
          pl={{base: '16px', xl: '78px'}}
          mt="40px"
        >
          <Flex
            pr={{base: '16px', xl: '78px'}}
            mb="25.5px"
            w="full"
            justifyContent="space-between"
            gap="16px"
            align="center"
          >
            <Heading fontSize="32px" lineHeight="40.58px" fontWeight="500" color="#191919">
              Units
            </Heading>
            {isCreate || isSingleUnit ? null : (
              <AddMoreBtn
                h="42px"
                fontSize="14px"
                w="176px"
                btnText="Create New Unit"
                borderRadius="72px"
                borderColor="#a3a3a3"
                iconStyle={{color: '#191919'}}
                color="#191919"
                clickFunction={() =>
                  router.push(
                    `/listings/create/new-unit/?listingId=${Number(listingDetail?.id)}&isLand=${isLand}`
                  )
                }
              />
            )}
          </Flex>
          <Box w="full">
            {LISTING_BUNDLES_QUERY?.isLoading || !LISTING_BUNDLES_QUERY?.data ? (
              <UnitSkeletons />
            ) : LISTING_BUNDLES_QUERY?.isError ? (
              toast({
                title: 'Oops ...',
                description: `${
                  err?.response?.data?.message ??
                  err?.response?.message ??
                  err?.message ??
                  'Something went wrong, we are working on resolving it'
                }`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
              })
            ) : LISTING_BUNDLES_QUERY?.data?.data?.results.length > 0 ? (
              <Flex
                px="0"
                justify="flex-start"
                gap="38px"
                position={'relative'}
                // flexWrap="wrap"
                overflowX="auto"
                sx={customScrollbarStyles}
                minW="420px"
                w="full"
              >
                {listingBundles &&
                  listingBundles?.map((unit, index) => (
                    <VStack
                      key={index}
                      w="292px"
                      position={'relative'}
                      spacing="16px"
                      h="fit-content"
                      borderRadius="12px"
                    >
                      <Image
                        alt=""
                        loading="lazy"
                        w="full"
                        minW="292px"
                        h={'266.45px'}
                        borderRadius="12px"
                        objectFit={'cover'}
                        cursor={'pointer'}
                        onClick={() => viewUnitPage(unit)}
                        maxW={'full'}
                        src={unit?.photos?.[0]?.photo || fallback.src}
                      />
                      <Tag
                        position={'absolute'}
                        top="8px"
                        zIndex={22}
                        right="8px"
                        p="4px 12px"
                        maxH="26px"
                        border="1px solid "
                        bg={unit?.quantity >= 0 && unit?.quantity > 2 ? '#f5f5f5' : '#fef3f2'}
                        borderColor={
                          unit?.quantity >= 0 && unit?.quantity > 2 ? '#d6d6d6' : '#fda29b'
                        }
                        color={unit?.quantity >= 0 && unit?.quantity > 2 ? '#191919' : '#f04438'}
                        borderRadius="12px"
                      >
                        <TagLabel fontSize="14px" fontWeight="500" lineHeight="17.75px" mx="auto">
                          {unit?.quantity > 0
                            ? `${formatNumberWithCommas(unit.quantity)} unit${unit.quantity === 1 ? '' : 's'} left`
                            : 'Sold out'}
                        </TagLabel>
                      </Tag>
                      <Stack w="full" spacing="6px">
                        <Box>
                          {unit?.is_fraction_sale_available ? (
                            <HStack
                              spacing="8px"
                              w="143px"
                              borderRadius="12px"
                              bg="#4545FE"
                              p="4px 12px"
                              border="1px solid #FFFFFF1A"
                              h="26px"
                            >
                              <Image src={fractionTag.src} alt="fractional icon" />
                              <Text fontSize="14px" fontWeight="400" color="#ffffff">
                                Fractionalized
                              </Text>
                            </HStack>
                          ) : null}
                        </Box>
                        <Text
                          fontSize={'24px'}
                          fontWeight="600"
                          color="#191919"
                          lineHeight="30.43px"
                        >
                          {unit?.unit_title ?? ''}
                        </Text>
                        <Text fontSize="16px" fontWeight="500" color="#424242" lineHeight="20.29px">
                          {formatToCurrency(unit?.price, 'naira', 'no space')}
                        </Text>
                      </Stack>
                    </VStack>
                  ))}
              </Flex>
            ) : null}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ListingInfoWholeUnits;
