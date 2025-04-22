import {Grid, Text, Stack} from '@chakra-ui/react';
import React from 'react';
import {abbrevNum, formatNumberWithCommas} from 'utils/formatAmount';

const TransactionInfoCard = ({customerOverviewData}) => {
  const transactionInfo = [
    {
      heading: `Total Subscriber${customerOverviewData?.total_customers > 1 ? 's' : ''}`,
      info: formatNumberWithCommas(customerOverviewData?.total_customers ?? 0),
    },
    {
      heading: `Defaulting Subscriber${customerOverviewData?.defaulting_customers > 1 ? 's' : ''}`,
      info: formatNumberWithCommas(customerOverviewData?.defaulting_customers ?? 0),
    },
    {
      heading: 'Complete payment',
      info: formatNumberWithCommas(customerOverviewData?.customer_without_outstanding ?? 0),
    },
    {
      heading: 'With outstanding balance',
      info: formatNumberWithCommas(customerOverviewData?.customer_with_outstanding ?? 0),
    },
  ];

  return (
    <Grid
      px="20px"
      templateColumns={'repeat(2, 1fr)'}
      w="full"
      alignContent="center"
      minH="176px"
      borderRadius="12px"
      border="0.5px solid #e4e4e4"
      bg="#ffffff"
      gap="11px"
    >
      {transactionInfo.map((info, idx) => (
        <Stack key={idx} spacing="8px">
          <Text fontSize="14px" fontWeight="500" color="#525252" lineHeight="20px">
            {info.heading}
          </Text>
          <Text fontSize="24px" fontWeight="600" color="#141414" lineHeight="38px">
            {info.info}
          </Text>
        </Stack>
      ))}
    </Grid>
  );
};

export default TransactionInfoCard;
