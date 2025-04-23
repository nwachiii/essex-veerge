import {Box, Button, Heading, SimpleGrid, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {CustomSelect, Input} from '../../../../../ui-lib';

function SmartPaymentPlan({handleChangeInput, planObject, index}) {
  return (
    <Box mt={10}>
      <SimpleGrid placeItems="center" columns={2} spacing={10}>
        <Input
          mx={1}
          required
          type="text"
          id="initial_deposit_in_value"
          name="initial_deposit_in_value"
          onChange={e => handleChangeInput(index, e)}
          defaultValue={Number(planObject.initial_deposit_in_value)}
          placeholder="Initial deposit"
          _placeholder={{
            color: 'gray.500',
          }}
        />
        <Input
          mx={1}
          // required
          type="text"
          id="interest_rate"
          name="interest_rate"
          onChange={e => handleChangeInput(index, e)}
          value={planObject.interest_rate}
          placeholder="Interest rate"
          _placeholder={{
            color: 'gray.500',
          }}
        />
        <CustomSelect
          id="grace_period_in_months"
          name="grace_period_in_months"
          placeholder="Grace period"
          onChange={e => handleChangeInput(index, e)}
          value={planObject.grace_period}
        >
          <option value={'3 months'}>3 months</option>
          <option value={'6 months'}>6 months</option>
          <option value={'9 months'}>9 months</option>
          <option value={'12 months'}>12 months</option>
          <option value={'18 months'}>18 months</option>
        </CustomSelect>
        <Input
          mx={1}
          // required
          type="text"
          id="max_duration_in_months"
          name="max_duration_in_months"
          onChange={e => handleChangeInput(index, e)}
          value={planObject.max_duration_in_months}
          placeholder="maximum duration (in months)"
          _placeholder={{
            color: 'gray.500',
          }}
        />
      </SimpleGrid>
    </Box>
  );
}

export default SmartPaymentPlan;
