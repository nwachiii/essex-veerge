import {Box, Grid, Text, Skeleton, Stack, SimpleGrid, useMediaQuery} from '@chakra-ui/react';
import {FormatToColorfulAdaptiveCurrency, FormatToColorfulCurrency} from 'utils/formatAmount';
import MetaDataIconGreen from '@/components/assets/MetaDataIconGreen';
import {themeStyles} from 'theme';
import {AdaptiveText} from 'utils/adaptiveText';

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
          <Box {...themeStyles.transactionBox} h="full" w="100%">
            <FormatToColorfulAdaptiveCurrency
              baseSize={14}
              fontWeight={700}
              lens={13}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              decimalStyle={{fontWeight: '700'}}
              wordBreak="break-word"
              color={themeStyles.color.primary}
              amount={isAccount ? (data?.balance ?? 0) : (data?.wallet?.total ?? 0)}
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

          <Box {...themeStyles.transactionBox} h="full" w="100%">
            <FormatToColorfulAdaptiveCurrency
              amount={isAccount ? (data?.total_deposit ?? 0) : (data?.deposits?.total ?? 0)}
              baseSize={14}
              fontWeight={700}
              lens={13}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              decimalStyle={{fontWeight: '700'}}
              color={themeStyles.color.matador__green}
              wordBreak="break-word"
            />
            <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
              Total Deposits
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

          <Box {...themeStyles.transactionBox} h="full" w="100%">
            <FormatToColorfulAdaptiveCurrency
              amount={isAccount ? (unprocessedTransactions ?? 0) : (data?.purchases?.total ?? 0)}
              baseSize={14}
              fontWeight={700}
              lens={13}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              decimalStyle={{fontWeight: '700'}}
              color={
                unprocessedTransactions
                  ? themeStyles.color.matador__red
                  : themeStyles.color.matador__yellow
              }
              wordBreak="break-word"
            />
            <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
              {isAccount ? `Unprocessed Transactions` : `Total Purchases`}
              {!isAccount && (
                <Text
                  color={themeStyles.color.matador__green}
                  my="auto"
                  display="flex"
                  align="center"
                  gap={1.2}
                >
                  <MetaDataIconGreen /> +0.00%
                </Text>
              )}
            </Text>
          </Box>
          <Box {...themeStyles.transactionBox} h="full" w="100%">
            <FormatToColorfulAdaptiveCurrency
              amount={isAccount ? data?.total_withdrawal || 0 : data?.withdrawals?.total || 0}
              color="red"
              baseSize={14}
              fontWeight={700}
              lens={13}
              maxSize={16}
              minSize={10}
              pow={isBelow800 ? 0.68 : 0.92}
              decimalStyle={{fontWeight: '700'}}
              wordBreak="break-word"
            />

            <Text as="small" fontSize="9px" display="flex" gap={2} mt={2} flexWrap={`wrap`}>
              {isAccount ? `Total Withdrawal` : `Total Payout`}
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
          {/* </Grid> */}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default TransactionsOverview;
