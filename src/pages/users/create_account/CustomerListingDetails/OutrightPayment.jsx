import React from 'react';
import {Input} from '../../../../ui-lib';
import {Box, SimpleGrid, Button, Stack} from '@chakra-ui/react';
import {removeEmptyObjectValues} from '../../../../utils/removeEmptyObjectValues';
import {formatAmount} from '../../../../utils';

export default function OutrightPayment({outrightPayment, setOutrightPayment}) {
  const handleChangeInput = (id, event) => {
    const val = event.target.value;
    const name = event.target.name;
    const newInputFields = outrightPayment.map((i, index) => {
      if (id == index) {
        i[name] = val;
      }
      return i;
    });
    setOutrightPayment(newInputFields);
  };

  const SubmitPlanTypeForm = e => {
    if (e.cancelable) e.preventDefault();
    removeEmptyObjectValues(outrightPayment);
    outrightPayment.forEach(element => (element.payment_type = 'outright'));
    console.log('outright', outrightPayment);
  };
  return (
    <Box mt={10}>
      {outrightPayment.map((planObject, index) => (
        <SimpleGrid key={index} placeItems="center" columns={2} spacing={10}>
          <Input
            mx={1}
            required
            type="text"
            id="amount"
            name="amount"
            onChange={e => handleChangeInput(index, e)}
            value={
              formatAmount(planObject?.amount) == 'NaN' ? '' : formatAmount(planObject?.amount)
            }
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
      ))}
      <Stack align="flex-end" mt={8} pb="60px" ml="auto" width="full">
        <Button
          type="submit"
          onClick={SubmitPlanTypeForm}
          color="whitesmoke"
          bg="#191919"
          borderRadius="12px"
          w="216px"
          h="55px"
        >
          Save outright payment
        </Button>
      </Stack>
    </Box>
  );
}
