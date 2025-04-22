import React from 'react';
import {themeStyles} from '../../../theme';
import {
  Box,
  Flex,
  Text,
  VStack,
  RadioGroup,
  Radio,
  SimpleGrid,
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import {
  FormatToColorfulAdaptiveCurrency,
  formatAmountWithDecimal,
} from '../../../utils/formatAmount';
import TransactionInfoCard from '@/components/dashboard/outstandingBalance/transactionInfoCard';

export const OutstandingBalTopHeader = ({unitTxns, customersMetaData, value, setValue}) => {
  return (
    <Grid templateColumns={{base: '1fr', xl: '2fr 1fr'}} w="full" gap="12px">
      <Grid
        border="0.5px solid #e4e4e4"
        p="48px 24px"
        bg="#ffffff"
        borderRadius="12px"
        templateColumns={'repeat(3, 1fr)'}
        w="full"
        gap="11px"
      >
        <GridItem>
          <Stack spacing="12px">
            <Text fontSize="16px" fontWeight={'500'} color="#525252">
              Total Purchase
            </Text>
            <FormatToColorfulAdaptiveCurrency
              amount={
                unitTxns?.overview?.finance_card?.total_purchase_price ??
                customersMetaData?.total_purchases ??
                0
              }
              lens={15}
              color="#4545FE"
              maxSize={32}
              baseSize={20}
              wrapper={{
                justify: 'start',
              }}
              minSize={20}
              pow={0.93}
              fontWeight="600"
              decimalStyle={{fontWeight: '600'}}
            />
          </Stack>
        </GridItem>
        <GridItem>
          <Stack spacing="12px">
            <Text fontSize="16px" fontWeight={'500'} color="#525252">
              Total Paid
            </Text>
            <FormatToColorfulAdaptiveCurrency
              amount={
                unitTxns?.overview?.finance_card?.total_paid ?? customersMetaData?.total_paid ?? 0
              }
              lens={15}
              pow={0.93}
              color="#12D8A0"
              maxSize={32}
              baseSize={20}
              wrapper={{
                justify: 'start',
              }}
              minSize={20}
              fontWeight="600"
              decimalStyle={{fontWeight: '600'}}
            />
          </Stack>
        </GridItem>
        <GridItem>
          <Stack spacing="12px">
            <Text fontSize="16px" fontWeight={'500'} color="#525252">
              Total Outstanding Balance
            </Text>
            <FormatToColorfulAdaptiveCurrency
              amount={
                unitTxns?.overview?.finance_card?.total_outstanding ??
                customersMetaData?.total_outstanding ??
                0
              }
              lens={15}
              pow={0.93}
              color="#FF6A6A"
              maxSize={32}
              baseSize={20}
              wrapper={{
                justify: 'start',
              }}
              minSize={20}
              fontWeight="600"
              decimalStyle={{fontWeight: '600'}}
            />
          </Stack>
        </GridItem>
      </Grid>
      <TransactionInfoCard customerOverviewData={customersMetaData} />
    </Grid>
  );
};

export default OutstandingBalTopHeader;

{
  /* <SimpleGrid
w="full"
maxW={{base: 'full', lg: '290px', xl: '380px'}}
columns={{base: 2, lg: 1}}
gap="30px"
spacing="10px"
>
<Box
  {...themeStyles.md_Box}
  border={`2px solid #F5F5F5`}
  w={{base: 'full', lg: '290px', xl: '380px'}}
  h={'90px'}
  py={2}
>
  <FormatToColorfulAdaptiveCurrency
    amount={
      unitTxns?.overview?.finance_card?.total_purchase_price ??
      customersMetaData?.total_purchases ??
      0
    }
    lens={22}
    color="#4545FE"
    maxSize={24}
    wrapper={{
      justify: 'center',
    }}
    minSize={14}
    pow={0.93}
    fontWeight="600"
    decimalStyle={{fontWeight: '600'}}
  />
  <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
    Total Purchase
  </Text>
</Box>
<Box
  {...themeStyles.md_Box}
  border={`2px solid #F5F5F5`}
  w={{base: 'full', lg: '290px', xl: '380px'}}
  h={'90px'}
  py={2}
>
  <FormatToColorfulAdaptiveCurrency
    amount={
      unitTxns?.overview?.finance_card?.total_paid ?? customersMetaData?.total_paid ?? 0
    }
    lens={22}
    pow={0.93}
    color="#12D8A0"
    maxSize={24}
    wrapper={{
      justify: 'center',
    }}
    minSize={14}
    fontWeight="600"
    decimalStyle={{fontWeight: '600'}}
  />
  <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
    Total Paid
  </Text>
</Box>
<Box
  {...themeStyles.md_Box}
  border={`2px solid #F5F5F5`}
  w={{base: 'full', lg: '290px', xl: '380px'}}
  h={'90px'}
  py={2}
>
  <FormatToColorfulAdaptiveCurrency
    amount={
      unitTxns?.overview?.finance_card?.total_outstanding ??
      customersMetaData?.total_outstanding ??
      0
    }
    lens={22}
    pow={0.93}
    color="#FF6A6A"
    maxSize={24}
    wrapper={{
      justify: 'center',
    }}
    minSize={14}
    fontWeight="600"
    decimalStyle={{fontWeight: '600'}}
  />
  <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
    Total Outstanding Balance
  </Text>
</Box>

</SimpleGrid> */
}
{
  /* <RadioGroup w="full" onChange={setValue} value={value}>
  <Flex alignContent="center" justify={'space-between'} w="full" h="full" gap="18px 24px">
    <SimpleGrid
      w="full"
      sx={{
        '.chakra-radio__label': {
          width: '100% ',
          paddingLeft: '0px',
        },
      }}
      columns={2}
      gap="30px"
    >
      <Radio value="1" hidden>
        <Box
          {...themeStyles.md_Box}
          minW={{md: '200px', xl: '290px'}}
          w="full"
          maxW="380px"
          border={`2px solid ${value == '1' ? '#4545FE' : '#F5F5F5'}`}
          justifySelf="stretch"
          h="125px"
          py={2}
        >
          <Text fontWeight="600" fontSize={'24px'}>
            {unitTxns?.overview?.total ?? customersMetaData?.total_customers ?? '-'}
          </Text>
          <Text py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
            {Number(unitTxns?.overview?.total) < 2 || Number(customersMetaData?.total_customers) < 2
              ? ' Total subscriber'
              : ' Total subscribers'}
          </Text>
        </Box>
      </Radio>
      <Radio value="2" hidden>
        <Box
          {...themeStyles.md_Box}
          minW={{md: '200px', xl: '290px'}}
          border={`2px solid ${value == '2' ? '#4545FE' : '#F5F5F5'}`}
          w="full"
          maxW="380px"
          h="125px"
          py={2}
        >
          <Text fontWeight="600" fontSize={'24px'}>
            {unitTxns?.overview?.uncompleted ?? customersMetaData?.customer_with_outstanding ?? '-'}
          </Text>
          <Text maxW={197} mx="auto" py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
            {Number(unitTxns?.overview?.uncompleted) < 2 ||
            Number(customersMetaData?.customer_with_outstanding) < 2
              ? 'Subscriber with outstanding payment'
              : 'Subscribers with outstanding payment'}
          </Text>
        </Box>
      </Radio>
      <Radio value="3" hidden>
        <Box
          {...themeStyles.md_Box}
          minW={{md: '200px', xl: '290px'}}
          border={`2px solid ${value == '3' ? '#4545FE' : '#F5F5F5'}`}
          w="full"
          maxW="380px"
          h="125px"
          py={2}
        >
          <Text fontWeight="600" fontSize={'24px'}>
            {unitTxns?.overview?.completed ??
              customersMetaData?.customer_without_outstanding ??
              '-'}
          </Text>
          <Text maxW={215} mx="auto" py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
            {Number(unitTxns?.overview?.completed) < 2 ||
            Number(customersMetaData?.customer_without_outstanding) < 2
              ? 'Subscriber with completed payment'
              : 'Subscribers with completed payment'}
          </Text>
        </Box>
      </Radio>
      <Radio value="4" hidden>
        <Box
          {...themeStyles.md_Box}
          minW={{md: '200px', xl: '290px'}}
          border={`2px solid ${value == '4' ? '#4545FE' : '#F5F5F5'}`}
          w="full"
          maxW="380px"
          h="125px"
          py={2}
        >
          <Text fontWeight="600" fontSize={'24px'}>
            {unitTxns?.overview?.defaulting ?? customersMetaData?.defaulting_customers ?? '-'}
          </Text>
          <Text py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
            {Number(unitTxns?.overview?.defaulting) < 2 ||
            Number(customersMetaData?.defaulting_customers) < 2
              ? 'Defaulting subscriber'
              : 'Defaulting subscribers'}
          </Text>
        </Box>
      </Radio>
    </SimpleGrid>
  </Flex>
</RadioGroup>; */
}
