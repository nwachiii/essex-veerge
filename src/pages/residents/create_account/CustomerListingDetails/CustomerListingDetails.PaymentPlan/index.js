import {AddIcon, ChevronDownIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  extendTheme,
  Flex,
  Heading,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';
import {PAST_PAYMENT_INFO} from '../../../../../constants/createListing';
import {theme} from '../../../../../theme';
import {formatAmount} from '../../../../../utils';
import {removeEmptyObjectValues} from '../../../../../utils/removeEmptyObjectValues';
import ManualPaymentPlan from './PaymentPlan.Form';
import {formatToCurrency} from 'utils/formatAmount';

const styles = extendTheme({...theme});

// WholeUnitsPaymentPlan : reference file
export default function CustomerPreviousPaymentPlan({
  paymentPlan,
  setPaymentPlan,
  unitFields,
  index,
}) {
  const [planType, setPlanType] = useState('manual');
  const [isClicked, setIsClicked] = useState(false);

  const AddPaymentPlanFields = () => {
    setPaymentPlan([...paymentPlan, Object.fromEntries(PAST_PAYMENT_INFO)]);
  };

  const SubmitPlanTypeForm = e => {
    console.log('paymentPlannn', paymentPlan);
    if (e.cancelable) e.preventDefault();
    setIsClicked(true);
    paymentPlan.forEach(element => (element.payment_type = 'past-payment'));
    removeEmptyObjectValues(paymentPlan);
  };

  const handleChangeInput = (id, event) => {
    const val = event.target.value;
    const name = event.target.name;
    const newInputFields = paymentPlan.map((i, index) => {
      if (id == index) {
        i[name] = val;
      }
      return i;
    });
    setPaymentPlan(newInputFields);
  };
  const removePlan = plan => {
    const copy = [...paymentPlan];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].amount === plan.amount) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setPaymentPlan(copy);
  };

  return (
    <Box>
      <HStack w="99.7%" justify="space-between">
        <Heading {...styles.textStyles.h2} ml={0}>
          Past Payments
        </Heading>
        <ButtonGroup isAttached variant="outline">
          <Button
            variant="outline"
            color={themeStyles.color.primary}
            borderColor={themeStyles.color.primary}
            onClick={AddPaymentPlanFields}
          >
            <Icon alignSelf="center" as={AddIcon} mr="8px" />
            Add payment
          </Button>
        </ButtonGroup>
      </HStack>
      {isClicked && paymentPlan.length > 0
        ? paymentPlan.map((plan, index) => (
            <Stack
              key={index}
              {...styles.componentStyles.cardOne}
              mt={0}
              maxW="1203px"
              h="93px"
              bg="#F5F5F5"
            >
              <HStack spacing={4} justify="space-between" h="141px">
                <Flex key={index} h="70%" align="center" columnGap="60px">
                  <Stack spacing="9px">
                    <Text color="gray.500">Amount</Text>
                    <Text fontWeight="bold">
                      {formatAmount(plan.amount) == 'NaN' ? '' : formatToCurrency(plan.amount)}
                    </Text>
                  </Stack>
                  <Stack spacing="9px">
                    <Text color="gray.500">Payment date</Text>
                    <Text fontWeight="bold">{plan.payment_date}</Text>
                  </Stack>
                </Flex>

                <HStack
                  spacing={4}
                  justify="space-between"
                  align="center"
                  onClick={() => removePlan(plan)}
                >
                  <Icon
                    as={SmallCloseIcon}
                    cursor="pointer"
                    width="30px"
                    height="30px"
                    alt="cancel_icon"
                    color="red"
                  />
                </HStack>
              </HStack>
            </Stack>
          ))
        : null}

      <Box as="form" onSubmit={SubmitPlanTypeForm}>
        {paymentPlan.map((planObject, index) => (
          <Fragment key={index}>
            <ManualPaymentPlan
              index={index}
              planObject={planObject}
              handleChangeInput={handleChangeInput}
            />
          </Fragment>
        ))}
        {paymentPlan.length ? (
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
              Save payment plan
            </Button>
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
}
