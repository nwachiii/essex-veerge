import {AddIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  extendTheme,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../../../theme';
import {CustomSelect, Input} from '../../../../../ui-lib';
import {formatAmount} from '../../../../../utils';

export default function UpcomingPaymentPlan({planObject, handleChangeInput, index}) {
  return (
    <Box mt={10}>
      <SimpleGrid placeItems="center" columns={2} spacing={10}>
        <Input
          mx={1}
          required
          type="text"
          id="amount"
          name="amount"
          onChange={e => handleChangeInput(index, e)}
          value={formatAmount(planObject?.amount) == 'NaN' ? '' : formatAmount(planObject?.amount)}
          placeholder="Amount"
          _placeholder={{
            color: 'gray.500',
          }}
        />
        <Input
          mx={1}
          required
          type="date"
          id="payment_date"
          name="payment_date"
          onChange={e => handleChangeInput(index, e)}
          defaultValue={planObject?.payment_date}
          placeholder="Payment date"
          _placeholder={{
            color: 'gray.500',
          }}
        />
      </SimpleGrid>
    </Box>
  );
}
