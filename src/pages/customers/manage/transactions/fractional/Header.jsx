import {Box, Flex, HStack, SimpleGrid, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import ListingsPieChart from '../../../../../components/Charts/ListingsPieChart';
import {
  FormatToColorfulCurrency,
  FormatToColorfulAdaptiveCurrency,
  formatAmountWithDecimal,
  formatNumberWithCommas,
} from '../../../../../utils/formatAmount';
import {themeStyles} from 'theme';

export const FractionalTxnHeader = ({data}) => {
  return (
    <Flex
      gap={'18px'}
      w="full"
      flexDirection={{md: 'column', lg: 'row'}}
      justify={{md: 'center', lg: 'space-between'}}
      h={{md: 'fit-content', lg: '315px'}}
      align={'center'}
    >
      <VStack
        justify={'center'}
        maxW={{base: 'full', xl: '623px'}}
        w="full"
        height="full"
        background="#FFFFFF"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        borderRadius="16px"
        border="1px solid #E4E4E4"
        p="20px"
        align="center"
        alignItems="center"
      >
        <Box
          w="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxW="256px"
          mx="auto"
        >
          <ListingsPieChart
            title="Total fractions"
            A={data?.fractions_left}
            B={data?.fractions_sold}
            // colorB="#5A3FFF"
            colorB="#008080"
            // colorA="#1ED6FF"
            colorA={themeStyles.color.matador__red}
          />

          <Stack spacing="13px" mx="auto" w="fit-content">
            <HStack
              mt="14px"
              align="center"
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              w="full"
              justify="space-between"
              spacing="30.12px"
            >
              <Text display={'flex'} gap="11px" color="#19191999">
                {/* <Box alignSelf={'center'} bg="#5A3FFF" boxSize={'13.81px'} /> */}
                <Box alignSelf={'center'} bg="teal" boxSize={'13.81px'} />
                {/* Total Fractions left */}
                Available Fractions
              </Text>
              <Text
                color="#191919"
                justifySelf="end"
                w="fit-content"
                fontSize="18px"
                fontWeight="400"
              >
                {formatNumberWithCommas(data?.fractions_left)}
              </Text>
            </HStack>
            <HStack
              align="center"
              lineHeight="23px"
              // w="fit-content"
              w="full"
              justify="stretch"
              justifyContent="space-between"
              spacing="30.12px"
            >
              <Text display={'flex'} fontWeight="400" fontSize="18px" gap="11px" color="#19191999">
                {/* <Box alignSelf={'center'} bg="#1ED6FF" boxSize={'13.81px'} /> */}
                <Box alignSelf={'center'} bg={themeStyles.color.matador__red} boxSize={'13.81px'} />
                {/* Total Fractions Sold */}
                Sold Fractions
              </Text>
              <Text justifySelf="end" color="#191919" fontSize="18px" fontWeight="400">
                {formatNumberWithCommas(data?.fractions_sold)}
              </Text>
            </HStack>
          </Stack>
        </Box>
      </VStack>
      <SimpleGrid
        placeItems={'center'}
        columns={2}
        maxW={{base: 'full', xl: '620px'}}
        w="full"
        height="full"
        background="#FFFFFF"
        gap={{md: '20px', xl: '30px'}}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        borderRadius="16px"
        p={{md: '15px', xl: '20px'}}
        border={'1px solid #E4E4E4'}
      >
        <Stack
          maxW={{base: 'full', xl: '285px'}}
          w="full"
          justify={'center'}
          align="center"
          spacing={{md: '3px', xl: '14px'}}
          p="10px"
          height="full"
          background="#FFFFFF"
          border="1px solid #e5e5e5"
          borderRadius="12px"
        >
          <FormatToColorfulAdaptiveCurrency
            amount={data?.total_value}
            lens={12}
            color="#4545FE"
            maxSize={24}
            minSize={14}
            fontWeight="600"
            decimalStyle={{fontWeight: '600'}}
          />
          <Text fontSize="14px" textAlign="center" fontWeight={'400'} color="#606060">
            Total Value of Fractions
          </Text>
        </Stack>
        <Stack
          maxW={{base: 'full', xl: '285px'}}
          w="full"
          justify={'center'}
          align="center"
          spacing={{md: '3px', xl: '14px'}}
          p="10px"
          height="full"
          background="#FFFFFF"
          border="1px solid #e5e5e5"
          borderRadius="12px"
        >
          <FormatToColorfulAdaptiveCurrency
            amount={data?.price_per_fraction}
            lens={12}
            color="#FF9103"
            maxSize={24}
            minSize={14}
            fontWeight="600"
            decimalStyle={{fontWeight: '600'}}
          />

          <Text fontSize="14px" textAlign="center" fontWeight={'400'} color="#606060">
            Price per Fraction
          </Text>
        </Stack>
        <Stack
          maxW={{base: 'full', xl: '285px'}}
          w="full"
          justify={'center'}
          align="center"
          spacing={{md: '3px', xl: '14px'}}
          p="10px"
          height="full"
          background="#FFFFFF"
          border="1px solid #e5e5e5"
          borderRadius="12px"
        >
          <FormatToColorfulAdaptiveCurrency
            amount={data?.total_value_left}
            lens={12}
            color="#12D8A0"
            maxSize={24}
            minSize={14}
            fontWeight="600"
            decimalStyle={{fontWeight: '600'}}
          />

          <Text fontSize="14px" textAlign="center" fontWeight={'400'} color="#606060">
            Total Value of Fractions left
          </Text>
        </Stack>
        <Stack
          maxW={{base: 'full', xl: '285px'}}
          w="full"
          justify={'center'}
          align="center"
          spacing={{md: '3px', xl: '14px'}}
          p="10px"
          height="full"
          background="#FFFFFF"
          border="1px solid #e5e5e5"
          borderRadius="12px"
        >
          <FormatToColorfulAdaptiveCurrency
            amount={data?.total_value_sold}
            lens={12}
            color="#12D8A0"
            maxSize={24}
            minSize={14}
            fontWeight="600"
            decimalStyle={{fontWeight: '600'}}
          />

          <Text fontSize="14px" textAlign="center" fontWeight={'400'} color="#606060">
            Total Value of Fractions Sold
          </Text>
        </Stack>
      </SimpleGrid>
    </Flex>
  );
};

export default FractionalTxnHeader;
