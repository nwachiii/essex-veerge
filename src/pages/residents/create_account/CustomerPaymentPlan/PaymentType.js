import React from 'react';
import {CustomSelect, Input} from '../../../../ui-lib';
import {
  Box,
  Button,
  ButtonGroup,
  extendTheme,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {theme} from '../../../../theme';
import PaymentPlanSummary from '../../../../components/Cards/PaymentPlanSummary';
import {formatAmount} from '../../../../utils';

const styles = extendTheme({...theme});

export default function PaymentType({
  handleChangeInput,
  planTypeObject,
  index,
  SubmitPlanTypeForm,
  AddPaymentPlanType,
}) {
  return (
    <Box mt={10}>
      <HStack w="99.7%" justify="space-between">
        <Heading {...styles.textStyles.h2} ml={0}>
          Past payment / Top up
        </Heading>
        <ButtonGroup isAttached variant="outline">
          <Button
            variant="outline"
            color={themeStyles.color.primary}
            borderColor={themeStyles.color.primary}
            onClick={AddPaymentPlanType}
          >
            <Icon alignSelf="center" as={AddIcon} mr="8px" />
            Add
          </Button>
        </ButtonGroup>
      </HStack>
      <PaymentPlanSummary />
      <SimpleGrid placeItems="center" columns={2} spacing={10}>
        <Input
          mx={1}
          required
          type="text"
          id="payment_amount"
          name="payment_amount"
          onChange={e => handleChangeInput(index, e)}
          value={
            formatAmount(planTypeObject?.payment_amount) == 'NaN'
              ? ''
              : formatAmount(planTypeObject?.payment_amount)
          }
          placeholder="Payment amount"
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
          defaultValue={planTypeObject?.payment_date}
          placeholder="Payment date"
          _placeholder={{
            color: 'gray.500',
          }}
        />
        <CustomSelect
          id="payment_type"
          name="payment_type"
          placeholder="Payment type"
          onChange={e => handleChangeInput(index, e)}
          defaultValue={planTypeObject?.payment_type}
        >
          <option value={'top-up'}>Top up</option>
          <option value={'past-payment'}>Past payment</option>
        </CustomSelect>
      </SimpleGrid>
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
          Save
        </Button>
      </Stack>
    </Box>
  );
}

// DEPRECATED
