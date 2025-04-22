import {Box, Flex, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../../theme';
import {formatAmountWithDecimal} from '../../../../utils';

export const AccountTransactionStatementOverview = ({DATA}) => {
  return (
    <div>
      <SimpleGrid
        mx="auto"
        display={'flex'}
        align={'center'}
        {...gridContainerStyles}
        justifyContent={'center'}
      >
        <Box {...overviewBoxStyles}>
          <Text {...overviewAmountStyles} color={themeStyles.color.primary}>
            {DATA?.current_balance == '0' ? '-' : formatAmountWithDecimal(DATA?.current_balance)}
          </Text>
          <Text {...overviewLabelStyles}>Balance</Text>
        </Box>
        <Box {...overviewBoxStyles}>
          <Text {...overviewAmountStyles}>
            {DATA?.total_commission == '0' ? '-' : formatAmountWithDecimal(DATA?.total_commission)}
          </Text>
          <Text {...overviewLabelStyles}>Total Commission Earned</Text>
        </Box>

        <Box {...overviewBoxStyles}>
          <Text {...overviewAmountStyles} color={themeStyles.color.matador__red}>
            {DATA?.total_debits == '0' ? '-' : formatAmountWithDecimal(DATA?.total_debits)}
          </Text>
          <Text {...overviewLabelStyles}>Total Withdrawal</Text>
        </Box>
      </SimpleGrid>
    </div>
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
  boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.02)',
};
const overviewBoxStyles = {
  gap: '14px',
  width: '285px',
  flexShrink: '0',
  display: 'flex',
  height: '130px',
  background: '#FFF',
  borderRadius: '12px',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '1px solid #F5F5F5',
};
const overviewAmountStyles = {
  color: '#12D8A0',
  fontSize: '24px',
  fontWeight: '600',
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
};
const overviewLabelStyles = {
  color: '#606060',
  fontSize: '14px',
  fontWeight: '400',
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
};
