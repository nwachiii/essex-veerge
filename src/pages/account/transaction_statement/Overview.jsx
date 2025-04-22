import {Box, Flex, Grid, GridItem, HStack, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../theme';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';

export const AccountTransactionStatementOverview = ({DATA}) => {
  return (
    <Grid templateColumns={{base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}} w="full" gap="12px">
      <GridItem colSpan={1}>
        <Box {...overviewBoxStyles}>
          <Text {...overviewLabelStyles}>Total Payout</Text>
          <Text {...overviewAmountStyles} color={themeStyles.color.primary}>
            {DATA?.all_debits == '0' ? '-' : formatAmountWithDecimal(DATA?.all_debits)}
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box {...overviewBoxStyles}>
          <Text {...overviewLabelStyles}>Total Inflow</Text>
          <Text {...overviewAmountStyles}>
            {DATA?.all_deposits == '0' ? '-' : formatAmountWithDecimal(DATA?.all_deposits)}
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={{base: 2, xl: 1}}>
        <Box {...overviewBoxStyles} alignItems={{base: 'center', xl: 'start'}}>
          <Text {...overviewLabelStyles}>Net Transactions</Text>
          <Text {...overviewAmountStyles} color={themeStyles.color.matador__yellow}>
            {DATA?.closing_balance == '0' ? '-' : formatAmountWithDecimal(DATA?.closing_balance)}
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default AccountTransactionStatementOverview;

const gridContainerStyles = {
  w: '100%',
  gap: '23px',
  columns: '4',
  minH: '183px',
  maxW: '1284px',
  flexShrink: '0',
  background: '#FFF',
  padding: '37px 23px',
  borderRadius: '16px',
  height: 'fit-content',
  border: '1px solid #E4E4E4',
};
const overviewBoxStyles = {
  gap: '12px',
  // width: '285px',
  w: 'full',
  // flexShrink: '0',
  display: 'flex',
  height: '176px',
  background: '#FFF',
  borderRadius: '12px',
  padding: '48px 24px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  border: '0.5px solid #e4e4e4',
};
const overviewAmountStyles = {
  color: '#12D8A0',
  fontSize: '36px',
  fontWeight: '600',
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: '45.65px',
};
const overviewLabelStyles = {
  color: '#525252',
  fontSize: '16px',
  fontWeight: '500',
  textAlign: 'start',
  fontStyle: 'normal',
  lineHeight: '24px',
};
