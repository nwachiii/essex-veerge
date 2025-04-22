import {HStack, Text, useDisclosure, useToast, VStack, Flex, Stack, Box} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchFractionalizedInfo} from '../../../../../apis/listings';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {formatAmount} from '../../../../../utils';
import EditFractionsModal from './EditFractionsModal';
import ManageFractions from '@/components/Drawers/FractrionalDrawer';
import {themeStyles} from 'theme';
import {formatToCurrency} from 'utils/formatAmount';

export const FractionsInfo = ({
  bundle,
  refetch,
  wrapper,
  containerstyle,
  stackWrapperStyle,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const toast = useToast();
  const EDIT_FRACTIONS = useDisclosure();
  const FractionsDrawer = useDisclosure();
  const FRACTIONS_QUERY = useQuery(['fractions', bundle?.id], () =>
    fetchFractionalizedInfo(bundle?.id)
  );
  // const FRACTIONS_DATA = FRACTIONS?.data?.data?.fraction_data;
  // const FRACTIONAL_PARTNERS = FRACTIONS?.data?.data?.partners;
  // const EXTRA_INFO = FRACTIONS?.data?.data?.extra_info;

  const sold = bundle?.total_purchased_fractions;
  const noSoldOutUnits = sold == 0;
  const total_available_fractions = bundle?.total_fractions + bundle?.total_purchased_fractions;
  const noAvailableUnits = total_available_fractions == sold;
  const soldPercentage = bundle ? (sold / total_available_fractions) * 100 : 0;
  const totalPercentage = 100 - soldPercentage;

  return (
    <VStack
      fontFamily="Euclid Circular B"
      w="full"
      align="flex-start"
      justify="center"
      // minH="400px"
      h="fit-content"
      {...wrapper}
    >
      {FRACTIONS_QUERY?.isLoading ? (
        <AnimatedLoader />
      ) : FRACTIONS_QUERY?.isError ? (
        toast({
          title: 'Error.',
          description: 'An error occurred while fetching fractions information',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      ) : !FRACTIONS_QUERY?.data ? null : (
        <>
          <HStack w="full" mt="80px" justify="space-between" align="center" {...containerstyle}>
            <Text fontSize="26px" fontWeight="500" color="#191919" lineHeight="41px">
              Fractional
            </Text>
          </HStack>
          <Stack
            mt="8px"
            maxW="763px"
            w="full"
            h="115px"
            justify="center"
            borderRadius="8px 8px 0px 0px"
            border="1px solid #EAECF0"
            background="#FFF"
            px="10px"
            {...stackWrapperStyle}
          >
            <Flex
              w="full"
              gap="8px"
              maxW="715px"
              h="66px"
              alignSelf="center"
              justify={'space-between'}
            >
              <HStack
                maxW="292px"
                w="full"
                height="70px"
                padding="10px 15px"
                justifyContent="space-between"
                borderRadius="8px"
                background="#F5F5F5"
              >
                <VStack align="flex-start" spacing={1}>
                  <Text fontSize={'14px'} color="#475467">
                    Total Sold
                  </Text>
                  <Text color={'#191919'} fontSize="18px" fontWeight="500">{`${
                    bundle?.total_purchased_fractions
                  }/${bundle?.total_fractions + bundle?.total_purchased_fractions}`}</Text>
                </VStack>
                <HStack
                  mx="auto"
                  w="157px"
                  gap={'0.8px'}
                  spacing={0}
                  borderRadius={'30px'}
                  alignSelf={'flex-end'}
                  pb={2}
                >
                  <Box
                    w={`${soldPercentage}%`}
                    borderRadius={noAvailableUnits ? '30px' : '30px 0 0 30px'}
                    h="10px"
                    bg={themeStyles.color.matador__red}
                  />
                  <Box
                    w={`${totalPercentage}%`}
                    borderRadius={noSoldOutUnits ? '30px' : '0 30px 30px 0'}
                    h="10px"
                    bg={'teal.400'}
                  />
                </HStack>
              </HStack>
              <VStack>
                <Text fontSize={'14px'} color="#475467">
                  Price per fraction
                </Text>
                <Text
                  color={'#191919'}
                  fontSize="24px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="normal"
                >{`${formatToCurrency(bundle?.price_per_fraction)}`}</Text>
              </VStack>
              <VStack>
                <Text fontSize={'14px'} color="#475467">
                  Total buyers
                </Text>
                <Text
                  color={'#191919'}
                  fontSize="24px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="normal"
                >
                  {bundle?.invested_users?.length}
                </Text>
              </VStack>

              <ManageFractions
                unitInfo={bundle}
                unitInfoRefetch={refetch}
                FractionsDrawer={FractionsDrawer}
                FRACTIONS_QUERY={FRACTIONS_QUERY}
                isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
              />
            </Flex>
          </Stack>
        </>
      )}
      <EditFractionsModal editFractions={EDIT_FRACTIONS} />
    </VStack>
  );
};

export default FractionsInfo;
