import React from 'react';
import {Box, SimpleGrid, Text, Skeleton, Stack, useMediaQuery, Flex} from '@chakra-ui/react';
import {themeStyles} from '../../../theme';
import {
  formatAmountWithDecimal,
  FormatToColorfulAdaptiveCurrency,
  FormatToColorfulCurrency,
} from '../../../utils/formatAmount';
import MetaDataIconGreen from '../../../components/assets/MetaDataIconGreen';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import MetaDataIconRed from '@/components/assets/MetaDataIconRed';

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
              amount={data?.totalInflow?.amount}
              lens={13}
              color={themeStyles.color.primary}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              fontWeight="700"
              decimalStyle={{fontWeight: '700'}}
            />

            <Flex gap="4px">
              <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
                Total Inflow
              </Text>
              <Flex
                h="fit-content"
                alignSelf="end"
                color={themeStyles.color.matador__green}
                align="end"
                gap="4px"
              >
                {data?.totalInflow?.changeDirection == 'up' ? (
                  <MetaDataIconGreen />
                ) : (
                  <MetaDataIconRed />
                )}
                <Text
                  fontSize="10px"
                  fontWeight="400"
                  color={
                    data?.totalInflow?.changeDirection == 'up'
                      ? themeStyles.color.matador__green
                      : '#f04438'
                  }
                >
                  {data?.totalInflow?.changePercent}%
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Box {...themeStyles.transactionBox} h={`full`} w={`100%`}>
            <FormatToColorfulAdaptiveCurrency
              amount={data?.totalProcessedTransactions?.amount}
              lens={13}
              color={themeStyles.color.matador__green}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              fontWeight="700"
              decimalStyle={{fontWeight: '700'}}
            />
            <Flex gap="4px">
              <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
                {`Total Processed Transactions`}
              </Text>
              <Flex
                h="fit-content"
                alignSelf="end"
                color={themeStyles.color.matador__green}
                align="end"
                gap="4px"
              >
                {data?.totalProcessedTransactions?.changeDirection == 'up' ? (
                  <MetaDataIconGreen />
                ) : (
                  <MetaDataIconRed />
                )}
                <Text
                  fontSize="10px"
                  fontWeight="400"
                  color={
                    data?.totalProcessedTransactions?.changeDirection == 'up'
                      ? themeStyles.color.matador__green
                      : '#f04438'
                  }
                >
                  {data?.totalProcessedTransactions?.changePercent}%
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Box {...themeStyles.transactionBox} h={`full`} w={`100%`}>
            <FormatToColorfulAdaptiveCurrency
              amount={data?.unprocessedTransactions?.amount}
              lens={13}
              color={unprocessedTransactions ? '#f04438' : themeStyles.color.matador__yellow}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              fontWeight="700"
              decimalStyle={{fontWeight: '700'}}
            />

            <Flex gap="4px">
              <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
                Unprocessed Transactions
              </Text>
              {/* <Flex color={themeStyles.color.matador__green} align="end" gap="4px">
                {data?.unprocessedTransactions?.changeDirection == 'up' ? (
                  <MetaDataIconGreen />
                ) : (
                  <MetaDataIconRed />
                )}
                <Text
                  fontSize="10px"
                  fontWeight="400"
                  color={
                    data?.unprocessedTransactions?.changeDirection == 'up'
                      ? themeStyles.color.matador__green
                      : '#f04438'
                  }
                >
                  {data?.unprocessedTransactions?.changePercent}%
                </Text>
              </Flex> */}
            </Flex>
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
              amount={data?.outstandingBalance?.amount}
            />

            <Flex gap="4px">
              <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
                Outstanding Balance
              </Text>
              <Flex
                h="fit-content"
                alignSelf="end"
                color={themeStyles.color.matador__green}
                align="end"
                gap="4px"
              >
                {data?.outstandingBalance?.changeDirection == 'up' ? (
                  <MetaDataIconGreen />
                ) : (
                  <MetaDataIconRed />
                )}
                <Text
                  fontSize="10px"
                  fontWeight="400"
                  color={
                    data?.outstandingBalance?.changeDirection == 'up'
                      ? themeStyles.color.matador__green
                      : '#f04438'
                  }
                >
                  {data?.outstandingBalance?.changePercent}%
                </Text>
              </Flex>
            </Flex>
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
