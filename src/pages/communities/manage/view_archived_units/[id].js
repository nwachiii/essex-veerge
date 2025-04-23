import React from 'react';
import {useRouter} from 'next/router';
import {themeStyles} from '../../../../theme';
import {useQuery} from '@tanstack/react-query';
import {fetchAllArchivedUnits} from '../../../../apis/listings';
import {AnimatedLoader} from '../../../../components/common/loaders';
import {LayoutView} from '../../../../components/PageLayout/LayoutView';
import {
  Box,
  Heading,
  Stack,
  HStack,
  Image,
  Text,
  VStack,
  Tag,
  TagLabel,
  MenuList,
  Flex,
  useToast,
} from '@chakra-ui/react';
import backArrow from '/src/images/icons/back-arrow.png';
import ConvertToFractions from '../ListingInfo.components/ListingInfo.details/convertToFractions';
import {FaCaretRight} from 'react-icons/fa';
import RemoveFromArchive from './RemoveFromArchive';
import fallback from '/src/images/image-fallback.png';
import {formatAmountWithDecimal} from '../../../../utils/formatAmount';
import {Button} from '../../../../ui-lib';

export const ViewArchivedUnits = () => {
  const toast = useToast();
  const {query} = useRouter();
  const router = useRouter();
  const ArchivedUnits = useQuery(['archivedUnits', query.id], () =>
    fetchAllArchivedUnits(query.id)
  );
  console.log(ArchivedUnits.data?.data?.data);
  if (ArchivedUnits.isLoading) {
    return <AnimatedLoader />;
  }
  if (ArchivedUnits.isError) {
    return toast({
      title: 'Request failed',
      description: `An error occured while fetching`,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const handleBack = () => {
    router.back(-1);
  };

  const ARCHIVED__UNITS = ArchivedUnits.data ? ArchivedUnits.data.data.data : [];

  return (
    <div style={{background: '#FAFAFA'}}>
      <LayoutView activePage="listings" />
      <Box mt="-80vh" maxW="1280px" mx="auto" mb="60px">
        <HStack onClick={handleBack} zIndex="10" position="relative">
          <Image
            style={{cursor: 'pointer'}}
            mr={2}
            boxSize="50px"
            src={backArrow.src}
            alt="back_arrow"
          />
          <Heading {...themeStyles.textStyles.h3}>Back</Heading>
        </HStack>
        <Heading {...themeStyles.textStyles.h2}>Archived Units</Heading>
        <Flex justify="flex-start" gap="46px 36px" w="full" flexWrap="wrap" minW="auto">
          {ARCHIVED__UNITS.length > 0 ? (
            ARCHIVED__UNITS.map((unit, index) => (
              <VStack
                w="full"
                key={index}
                bg="#FFFFFF"
                maxW="292px"
                p="24px 26px"
                minH="482px"
                boxShadow="md"
                spacing="24px"
                align="flex-start"
                h="fit-content"
                borderRadius="16px"
              >
                <Image
                  alt=""
                  w="full"
                  maxW="240px"
                  h="219px"
                  borderRadius="28px"
                  src={unit?.photos[index]?.photo ?? fallback.src}
                />
                {unit.is_fraction_sale_available ? (
                  <Button w="158px" h="36px" variant="primary" fontSize="14px">
                    Fractionalized
                  </Button>
                ) : (
                  <ConvertToFractions />
                )}
                <Text fontSize="24px" fontWeight="600" color="#191919" lineHeight="30px">
                  {unit.unit_title}
                </Text>
                <Stack fontSize="4px">
                  <Text fontSize="14px" fontWeight="400" color="#606060" lineHeight="18px">
                    Unit size
                  </Text>
                  <Text fontSize="18px" fontWeight="500" color="#191919" lineHeight="23px">
                    {unit.unit_size}
                  </Text>
                </Stack>
                <Stack fontSize="4px">
                  <Text fontSize="14px" fontWeight="400" color="#606060" lineHeight="18px">
                    Unit price
                  </Text>
                  <Text fontSize="18px" fontWeight="600" color="#191919" lineHeight="23px">
                    {formatAmountWithDecimal(unit.price)}
                  </Text>
                </Stack>
                {/* <Tag p={3} w='112px' size='md' colorScheme={unit.total_purchased_units === unit.total_quantity ? 'red' : unit.quantity === 5 ? 'orange' : 'teal'} borderRadius='32px'>
									<TagLabel mx='auto'>{unit.total_purchased_units === unit.total_quantity ? 'Sold out' : `${unit.quantity} units left`}</TagLabel>
								</Tag> */}
                <Tag p={3} w="112px" size="md" colorScheme={'teal'} borderRadius="32px">
                  <TagLabel mx="auto">{unit.total_archive}</TagLabel>
                </Tag>
                <Text
                  cursor="pointer"
                  display="flex"
                  fontSize="14px"
                  fontWeight={500}
                  color={themeStyles.color.primary}
                  onClick={() =>
                    router.push({
                      pathname: `/listings/manage/unit_info/?unitId=${unit.id}&projectId=${query.id}`,
                      query: unit,
                    })
                  }
                >
                  View Unit Info
                  <FaCaretRight style={{marginTop: '3px'}} fontSize="18px" color="#191919" />
                </Text>
                <RemoveFromArchive bundleId={unit.id} />
              </VStack>
            ))
          ) : (
            <Heading {...themeStyles.textStyles.h2}>Your Archive is empty</Heading>
          )}
        </Flex>
      </Box>
    </div>
  );
};

export default ViewArchivedUnits;
