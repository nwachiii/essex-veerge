import React from 'react';
import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Flex,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import {formatAmountWithDecimal} from 'utils';
import rightArrow from '/src/images/icons/homePacketRightArrowIcon.svg';
import FractionalGrouping from './FractionalGrouping';
import {fetchFractionalGrouping} from '/src/apis/listings';
import {useQuery} from '@tanstack/react-query';
import {AnimatedLoader} from '@/components/common/loaders';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';

export const ViewSummaryDrawer = ({
  customScrollbarStyles,
  handleScreen,
  fractionalInfo,
  unitInfo,
}) => {
  // console.table('fractionalInfo', fractionalInfo);
  const FRACTIONAL_GROUPING_QUERY = useQuery(['fractional-grouping'], () =>
    fetchFractionalGrouping(Number(unitInfo?.id))
  );
  const FRACTIONS_DATA = fractionalInfo?.data?.fraction_data;
  const FractionalGroupingDisclosure = useDisclosure();
  const FRACTIONAL_PARTNERS = fractionalInfo?.data?.partners;
  const DIVIDEND_INFO = fractionalInfo?.data?.extra_info;

  const FRACTIONAL_GROUPING_DATA =
    FRACTIONAL_GROUPING_QUERY?.data && FRACTIONAL_GROUPING_QUERY?.data?.data?.data?.length
      ? FRACTIONAL_GROUPING_QUERY?.data?.data?.data
      : [];

  const doBuyersExist = FRACTIONAL_GROUPING_DATA?.map(item => item?.fractional_cowners)?.length > 0;

  const styleHStack = {
    h: '41px',
    w: 'full',
    fontSize: '12px',
    justify: 'space-between',
    borderBottom: '1px solid #F5F5F5',
  };

  const removeUnderscores = txt => {
    return txt?.replace(/[_\s]/g, ` `);
  };

  return (
    <>
      <DrawerContent
        p="0px"
        bg="#fff"
        zIndex={100}
        mt="65.12px"
        position="relative"
        minW="fit-content"
        sx={customScrollbarStyles}
      >
        <HStack
          py="30px"
          px="25px"
          h="49.699px"
          bg="#F5F5F5"
          align="center"
          position="relative"
          justify="space-between"
        >
          <Flex gap="8px" align="center" onClick={handleScreen('options')} cursor="pointer">
            <Image alt="back icon" src={backIcon.src} />
            <Heading fontSize="16.032px" fontWeight="700">
              Fractional Details
            </Heading>
          </Flex>
          <HStack spacing="15px">
            <VStack
              w="30px"
              h="30px"
              _hover={{
                width: '30px',
                height: '30px',
              }}
              align="center"
              justify="center"
              position="relative"
              borderRadius="5px"
              transition="0.3s ease-in-out"
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        {FRACTIONAL_GROUPING_QUERY?.isLoading ? (
          <AnimatedLoader />
        ) : (
          <DrawerBody sx={customScrollbarStyles} paddingTop="1rem" mr="2px" w="400px">
            <Stack h="fit-content" w="full" px="12px" background="#F9FAFB">
              <HStack {...styleHStack}>
                <Text>Price per fraction</Text>
                <Text fontSize={'12px'} fontWeight={600}>
                  {formatAmountWithDecimal(unitInfo?.price_per_fraction)}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Unit quantity</Text>
                <Text fontSize={'12px'}>{unitInfo?.total_fractionalized_units}</Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Total fractions</Text>
                <Text fontSize={'12px'}>{unitInfo?.total_fractions}</Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Strategy</Text>
                <Text fontSize={'12px'} textTransform={'capitalize'}>
                  {removeUnderscores(unitInfo?.strategy)}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Holding period</Text>
                <Text fontSize={'12px'}>{unitInfo?.holding_period}</Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Deal structure</Text>
                <Text fontSize={'12px'} textTransform={'capitalize'}>
                  {DIVIDEND_INFO?.deal_structure}
                </Text>
              </HStack>

              {!(FRACTIONAL_PARTNERS.length > 0)
                ? []
                : FRACTIONAL_PARTNERS?.map((item, key) => (
                    <HStack key={key} {...styleHStack}>
                      <Text textTransform={'capitalize'}>
                        {removeUnderscores(item.stakeholder_type)}
                      </Text>
                      <Text fontSize={'12px'}>{item.stakeholder_name}</Text>
                    </HStack>
                  ))}
              <HStack {...styleHStack}>
                <Text>Total Buyers</Text>
                <HStack
                  spacing="4px"
                  opacity={doBuyersExist ? 1 : 0.5}
                  onClick={() =>
                    doBuyersExist ? FractionalGroupingDisclosure.onOpen() : console.log('No buyers')
                  }
                  cursor={doBuyersExist ? 'pointer' : 'not-allowed'}
                >
                  <Text
                    color={doBuyersExist ? '#4545FE' : '#606060'}
                    fontSize="14.429px"
                    fontWeight="500"
                  >
                    View
                  </Text>
                  <Image src={rightArrow.src} alt="right  arrow" />
                </HStack>
              </HStack>
              <FractionalGrouping
                unitInfo={unitInfo}
                handleScreen={handleScreen}
                fractional_grouping_data={FRACTIONAL_GROUPING_DATA}
                customScrollbarStyles={customScrollbarStyles}
                DrawerDisclosure={FractionalGroupingDisclosure}
              />
            </Stack>
            {DIVIDEND_INFO?.enable_dividend ? (
              <Stack h="61px" w="full" px="12px" background="#F9FAFB" mt="16px">
                <Flex justify={'space-between'} w="full" h="full" align={'center'}>
                  <VStack>
                    <Text fontSize={'8px'} color="#606060">
                      Dividend payout type
                    </Text>
                    <Text fontSize={'12px'} fontWeight={600}>
                      {DIVIDEND_INFO?.dividend_payout}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize={'8px'} color="#606060">
                      Dividend Amount
                    </Text>
                    <Text fontSize={'12px'} fontWeight={600}>
                      {formatAmountWithDecimal(DIVIDEND_INFO?.dividend_amount)}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize={'8px'} color="#606060">
                      Dividend commencement date
                    </Text>
                    <Text fontSize={'12px'} fontWeight={600}>
                      {DIVIDEND_INFO?.dividend_start_date?.slice(4)}
                    </Text>
                  </VStack>
                </Flex>
              </Stack>
            ) : null}
          </DrawerBody>
        )}
      </DrawerContent>
    </>
  );
};

export default ViewSummaryDrawer;
