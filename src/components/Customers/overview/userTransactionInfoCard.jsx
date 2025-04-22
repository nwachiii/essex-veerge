import {Grid, Text, Stack} from '@chakra-ui/react';
import React from 'react';
import {abbrevNum} from 'utils/formatAmount';

const UserTransactionInfoCard = ({customerOverviewData}) => {
  const transactionInfo = [
    {
      heading: 'With outstanding payment',
      info: customerOverviewData?.customers_with_outstanding ?? 0,
    },
    {
      heading: 'Defaulters',
      info: customerOverviewData?.total_defaulters ?? 0,
    },
    {
      heading: 'Without outstanding payment',
      info: customerOverviewData?.customers_without_outstanding ?? 0,
    },
    {
      heading: 'With fractional',
      info: customerOverviewData?.total_fractions_holders ?? 0,
    },
  ];
  return (
    <Grid
      px="20px"
      templateColumns={{base: 'repeat(2, 1fr)', xl: '2fr 1fr'}}
      w="full"
      alignContent="center"
      h="176px"
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
            {abbrevNum(info.info)}
          </Text>
        </Stack>
      ))}
    </Grid>
  );
};

export default UserTransactionInfoCard;
