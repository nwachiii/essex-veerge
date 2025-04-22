import React from 'react';
import {Box, SimpleGrid, Text, Skeleton, Stack, useMediaQuery} from '@chakra-ui/react';
import {themeStyles} from '../../../theme';
import {
  formatAmountWithDecimal,
  FormatToColorfulAdaptiveCurrency,
  FormatToColorfulCurrency,
} from '../../../utils/formatAmount';
import MetaDataIconGreen from '../../../components/assets/MetaDataIconGreen';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';

export const TransactionsOverview = ({
  isAccount,
  data,
  outstandingBalance,
  unprocessedTransactions,
}) => {
  const [isBelow800] = useMediaQuery('(max-width: 800px)');
  return (
    <Stack align={'center'} minH="165px" minW={{base: `100%`, lg: `200px`}} flex={`1`}>
      {data ? (
        <SimpleGrid
          w={`100%`}
          h="max-content"
          columns={2}
          gap={`14px`}
          justifyContent="flex-end"
          alignSelf="center"
        >
          <Box {...themeStyles.transactionBox} h={`full`} w={`100%`}>
            <FormatToColorfulAdaptiveCurrency
              amount={data?.graph_item_net_transactions}
              lens={13}
              color={themeStyles.color.primary}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              fontWeight="700"
              decimalStyle={{fontWeight: '700'}}
            />
            <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
              Net Transactions
              <Text
                color={themeStyles.color.matador__green}
                display="flex"
                align="center"
                gap={1.2}
              >
                <MetaDataIconGreen /> +0.00%
              </Text>
            </Text>
          </Box>

          <Box {...themeStyles.transactionBox} h={`full`} w={`100%`}>
            <FormatToColorfulAdaptiveCurrency
              amount={data?.processed_transactions}
              lens={13}
              color={themeStyles.color.matador__green}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              fontWeight="700"
              decimalStyle={{fontWeight: '700'}}
            />
            <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
              {/* {isAccount ? `Processed Transactions` : `Total Deposits`} */}
              {`Processed Transactions`}
              <Text
                color={themeStyles.color.matador__green}
                display="flex"
                align="center"
                gap={1.2}
              >
                <MetaDataIconGreen />
                +0.00%
              </Text>
            </Text>
          </Box>

          <Box {...themeStyles.transactionBox} h={`full`} w={`100%`}>
            <FormatToColorfulAdaptiveCurrency
              amount={isAccount ? data?.unprocessed_transactions : data?.graph_item_total_purchases}
              lens={13}
              color={
                unprocessedTransactions
                  ? themeStyles.color.matador__red
                  : themeStyles.color.matador__yellow
              }
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              fontWeight="700"
              decimalStyle={{fontWeight: '700'}}
            />
            <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
              {isAccount ? `Unprocessed Transactions` : `Total Purchases`}
              {!isAccount && (
                <Text
                  my="auto"
                  gap={1.2}
                  display="flex"
                  align="center"
                  color={themeStyles.color.matador__green}
                >
                  <MetaDataIconGreen /> +0.00%
                </Text>
              )}
            </Text>
          </Box>
          <Box {...themeStyles.transactionBox} h={`full`} w={`100%`}>
            <FormatToColorfulAdaptiveCurrency
              lens={13}
              color={'red'}
              maxSize={16}
              minSize={10}
              fontWeight="700"
              pow={isBelow800 ? 0.68 : 0.92}
              decimalStyle={{fontWeight: '700'}}
              amount={data?.graph_item_withdrawal}
            />
            <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
              {`Total Payout`}
              <Text
                color={themeStyles.color.matador__green}
                my="auto"
                display="flex"
                align="center"
                gap={1.2}
              >
                <MetaDataIconGreen /> +0.00%
              </Text>
            </Text>
          </Box>
        </SimpleGrid>
      ) : (
        <SimpleGrid
          w={`100%`}
          h="100%"
          columns={2}
          gap={`14px`}
          justifyContent="flex-end"
          alignSelf="center"
        >
          <Skeleton
            {...themeStyles.transactionBox}
            h={`65px`}
            w={`100%`}
            fadeDuration={0.6}
            speed={1}
            endColor="#ececec"
            startColor="#FAFAFA"
          />
          <Skeleton
            {...themeStyles.transactionBox}
            h={`65px`}
            w={`100%`}
            fadeDuration={0.6}
            speed={0.7}
            endColor="#ececec"
            startColor="#FAFAFA"
          />
          <Skeleton
            {...themeStyles.transactionBox}
            h={`65px`}
            w={`100%`}
            fadeDuration={0.6}
            speed={0.7}
            endColor="#ececec"
            startColor="#FAFAFA"
          />
          <Skeleton
            {...themeStyles.transactionBox}
            h={`65px`}
            w={`100%`}
            fadeDuration={0.6}
            speed={1}
            endColor="#ececec"
            startColor="#FAFAFA"
          />
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default TransactionsOverview;

// {
//     "graph_item_total_purchases": 806218079.88,
//     "graph_item_net_transactions": 49897846192.124756,
//     "graph_item_total_deposit": 397803591.88,
//     "graph_item_withdrawal": 0,
//     "unprocessed_transactions": 49897116844.549995,
//     "processed_transactions": 729347.5747945205
// }
