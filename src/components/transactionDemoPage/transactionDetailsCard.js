import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from 'theme';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';
import {FormatToColorfulAdaptiveCurrency, FormatToColorfulCurrency} from 'utils/formatAmount';

const TransactionDetailsCard = () => {
  const overview = [
    {
      name: 'Net Transaction',
      value: '135.93',
      color: themeStyles.color.primary,
    },
    {
      name: 'Total Deposit',
      value: '6,754.10',
      color: '#22c55e',
    },
    {
      name: 'Total Debit',
      value: '1,465.72',
      color: '#f04438',
    },
  ];
  return (
    <Flex
      h="full"
      mb="32px"
      minH="140px"
      alignItems="center"
      bg="#ffffff"
      p="32px 48px"
      rounded="12px"
      border="0.5px solid #e4e4e7"
      w="full"
      justifyContent="space-between"
    >
      {overview.map((item, idx) => (
        <Stack key={idx} spacing="12px">
          <Text fontSize="16px" fontWeight="500" color="#18181b">
            {item.name}
          </Text>

          <FormatToColorfulAdaptiveCurrency
            amount={item?.value}
            lens={13}
            color={item.color}
            maxSize={32}
            minSize={10}
            pow={0.92}
            fontWeight="600"
            decimalStyle={{fontWeight: '600', color: '#606060'}}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default TransactionDetailsCard;
