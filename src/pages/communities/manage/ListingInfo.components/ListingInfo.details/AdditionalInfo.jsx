import {
  Button,
  Flex,
  HStack,
  Image,
  Spinner,
  Stack,
  Switch,
  Tag,
  TagLabel,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {formatAmountWithDecimal, formatNumberWithCommas} from '../../../../../utils/formatAmount';
import { Fragment } from 'react';
import {useRouter} from 'next/router';
import {themeStyles} from '../../../../../theme';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {useMutation, useQuery} from '@tanstack/react-query';
import {EditUnitInfo, fetchAllListingBundles} from 'apis/listings';
import switchIsTrue from '/src/images/icons/switch-icon-true.svg';
import switchIsFalse from '/src/images/icons/switch-icon-off.svg';

export const AdditionalInfo = ({pageQueryId, refetch, listingDetail}) => {
  const router = useRouter();
  const isCreate = router?.query?.isCreate;
  const toast = useToast();

  const listingId = Number(pageQueryId) || Number(listingDetail?.id);
  const LISTING_BUNDLES_QUERY = useQuery(['listing-bundle', listingId], () =>
    fetchAllListingBundles(listingId)
  );
  const listingBundles = LISTING_BUNDLES_QUERY?.data?.data?.results ?? [];
  const smallestPriceFromUnits = (listingBundles || [])
    .map(item => convertToNumber(item?.price))
    .filter(price => !isNaN(price)) // Filter out NaN values
    .reduce((acc, item) => (acc === null || item < acc ? item : acc), null);

  const mutation = useMutation(body => EditUnitInfo(listingDetail?.unit_id, body), {
    onSuccess: async res => {
      return await refetch();
    },
    onError: error => {
      toast({
        title: 'Oops ...',
        description: `${
          error?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : error?.response?.status === 401
              ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
              : (error?.response?.data?.message ??
                error?.response?.message ??
                error?.message ??
                'Something went wrong')
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleDisplayPriceSwitch = () => {
    mutation.mutate({display_price: !listingDetail?.project_display_price});
  };

  const startingPriceFromAPIData = listingDetail?.starting_from;

  const STARTING_PRICE = isCreate
    ? (smallestPriceFromUnits ?? startingPriceFromAPIData)
    : startingPriceFromAPIData;

  const isBuildingTypeSingleFamilyResidential =
    listingDetail?.building_type == 'Detached' || listingDetail?.building_type == 'Semi Detached';
  const isLand = listingDetail?.building_type == 'Land';
  const getDocumentType = name =>
    listingDetail?.property_document?.find(item => item.purpose === name);
  const outrightDoc = getDocumentType('outright')?.document_file;
  const brochureDoc = getDocumentType('brochure')?.document_url;
  const BUILDING_TYPE = listingDetail?.building_type?.toLowerCase();

  return (
    <>
      <VStack w="full" maxW={{base: 'full', lg: 'full'}} spacing="20px">
        <Stack spacing="22.5px" w="full">
          <Flex alignItems="center" flexWrap="wrap" gap="8px">
            <Text fontSize={'32px'} fontWeight={500} color="#191919" lineHeight={'40.58px'}>
              {listingDetail?.name}
            </Text>
            {isCreate ? null : listingDetail?.payment_plan_is_available ? (
              <Tag borderRadius="48px" bg="#e7fbf5" w="129px" p="8px 12px" h="36px">
                <TagLabel color="#060623" mx="auto">
                  Payment Plan
                </TagLabel>
              </Tag>
            ) : null}
          </Flex>
          <Flex
            p="20px"
            h="95px"
            alignItems="center"
            justify="space-between"
            {...themeStyles.card_container}
          >
            <Stack spacing="1px">
              <Text
                fontWeight="600"
                fontSize="28px"
                color={themeStyles.color.primary}
                lineHeight="35.5px"
              >
                {formatAmountWithDecimal(STARTING_PRICE)}
              </Text>

              <Text fontWeight=" 400" fontSize="14px" lineHeight="17.75px" color="#606060">
                Starting Price
              </Text>
            </Stack>

            {isBuildingTypeSingleFamilyResidential || isLand ? (
              <HStack
                h="38px"
                w="141px"
                justify={'center'}
                borderRadius={'16px'}
                bg="rgba(69, 69, 254, 0.1)"
              >
                <Text fontSize={'12px'} color="#606060">
                  Display price
                </Text>
                {mutation?.isLoading ? (
                  <Spinner color="#191919" />
                ) : listingDetail?.project_display_price == true ? (
                  <Image
                    alt=""
                    h="18px"
                    w="34px"
                    cursor={'pointer'}
                    src={switchIsTrue.src}
                    onClick={handleDisplayPriceSwitch}
                  />
                ) : (
                  <Image
                    alt=""
                    h="18px"
                    w="34px"
                    cursor={'pointer'}
                    justifySelf="flex-end"
                    src={switchIsFalse.src}
                    onClick={handleDisplayPriceSwitch}
                  />
                )}
              </HStack>
            ) : null}
          </Flex>
        </Stack>
        <Stack w="100%" {...themeStyles.card_container}>
          {listingDetail?.status === 'Post Construction' ||
          BUILDING_TYPE === 'land' ||
          BUILDING_TYPE === 'parcel of land' ? null : (
            <Fragment>
              <HStack py="12px" justify="space-between">
                <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                  Start date
                </Text>
                <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                  {`${listingDetail?.start_period} ${listingDetail?.start_year}`}
                </Text>
              </HStack>
              <HStack py="12px" justify="space-between">
                <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                  Estimated completion date
                </Text>
                <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                  {`${listingDetail?.end_period} ${listingDetail?.end_year}`}
                </Text>
              </HStack>
            </Fragment>
          )}
          {listingDetail?.building_type && (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Listing Type
              </Text>
              <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                {listingDetail?.building_type}
              </Text>
            </HStack>
          )}
          {listingDetail?.land_title && (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Land Title
              </Text>
              <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                {listingDetail?.land_title}
              </Text>
            </HStack>
          )}
          <HStack py="12px" justify="space-between">
            <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
              Land Size
            </Text>
            <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
              {listingDetail?.land_size}
            </Text>
          </HStack>

          {listingDetail?.units_available && !(isBuildingTypeSingleFamilyResidential || isLand) ? (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Total Units
              </Text>
              <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                {formatNumberWithCommas(listingDetail?.units_available)}
              </Text>
            </HStack>
          ) : null}
          {listingDetail?.total_units && !(isBuildingTypeSingleFamilyResidential || isLand) ? (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Available Units
              </Text>
              <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                {formatNumberWithCommas(listingDetail?.total_units)}
              </Text>
            </HStack>
          ) : null}
          {outrightDoc && (isBuildingTypeSingleFamilyResidential || isLand) ? (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Outright Contract
              </Text>

              <Button
                as="a"
                fontWeight={500}
                fontSize="14px"
                lineHeight="18px"
                target="_blank"
                variant="link"
                color="#4545FE"
                cursor="pointer"
                href={outrightDoc}
                rightIcon={<ChevronRightIcon />}
                iconSpacing="1px"
              >
                View
              </Button>
            </HStack>
          ) : null}

          {listingDetail?.units_sold ? (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Sold Units
              </Text>
              <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                {listingDetail?.units_sold}
              </Text>
            </HStack>
          ) : null}
          {listingDetail?.total_archive ? (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Archived
              </Text>
              <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                {listingDetail?.total_archive}
              </Text>
            </HStack>
          ) : null}
          {listingDetail?.total_available_fractions && (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Total Available Fractions
              </Text>
              <Text fontSize="16px" lineHeight="20.29px" fontWeight={500} color="#191919">
                {listingDetail?.total_available_fractions}
              </Text>
            </HStack>
          )}
          {brochureDoc ? (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#606060">
                Brochure
              </Text>

              <Button
                as="a"
                fontWeight={500}
                fontSize="14px"
                lineHeight="18px"
                target="_blank"
                variant="link"
                color="#4545FE"
                cursor="pointer"
                href={brochureDoc}
                rightIcon={<ChevronRightIcon />}
                iconSpacing="1px"
              >
                View
              </Button>
            </HStack>
          ) : null}
        </Stack>
      </VStack>
    </>
  );
};

export default AdditionalInfo;

function convertToNumber(str) {
  if (typeof str !== 'string') {
    throw new Error('Input should be a string');
  }

  const number = parseFloat(str);
  if (isNaN(number)) {
    throw new Error('Invalid number format');
  }

  return number;
}
