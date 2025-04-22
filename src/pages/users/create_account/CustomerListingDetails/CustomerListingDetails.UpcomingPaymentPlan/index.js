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
  Stack,
  Text,
} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';
import {UPCOMING_PAYMENT_INFO} from '../../../../../constants/createListing';
import {theme} from '../../../../../theme';
import {formatAmount} from '../../../../../utils';
import {removeEmptyObjectValues} from '../../../../../utils/removeEmptyObjectValues';
import UpcomingPaymentPlan from './UpcomingPayment';
import {formatToCurrency} from 'utils/formatAmount';

const styles = extendTheme({...theme});

export default function UpcomingPayments({upcomingPayment, setUpcomingPayment}) {
  const [isClicked, setIsClicked] = useState(false);

  const AddPaymentPlanFields = () => {
    setUpcomingPayment([...upcomingPayment, Object.fromEntries(UPCOMING_PAYMENT_INFO)]);
  };

  const SubmitPlanTypeForm = e => {
    console.log('upcomingpayment', upcomingPayment);
    if (e.cancelable) e.preventDefault();
    setIsClicked(true);
    upcomingPayment.forEach(element => (element.payment_type = 'upcoming-payment'));
    removeEmptyObjectValues(upcomingPayment);
  };

  const handleChangeInput = (id, event) => {
    const val = event.target.value;
    const name = event.target.name;
    const newInputFields = upcomingPayment.map((i, index) => {
      if (id == index) {
        i[name] = val;
      }
      return i;
    });
    setUpcomingPayment(newInputFields);
  };
  console.log(upcomingPayment);

  const removePlan = plan => {
    const copy = [...upcomingPayment];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].amount === plan.amount) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setUpcomingPayment(copy);
  };

  return (
    <Box>
      <Divider color="#E4E4E4" my="50px" w="full" orientation="horizontal" />

      <HStack w="99.7%" justify="space-between">
        <Heading {...styles.textStyles.h2} ml={0}>
          Upcoming Payments
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
      {isClicked && upcomingPayment.length > 0
        ? upcomingPayment.map((plan, index) => (
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
        {upcomingPayment.map((planObject, index) => (
          <Fragment key={index}>
            <UpcomingPaymentPlan
              index={index}
              planObject={planObject}
              handleChangeInput={handleChangeInput}
            />
          </Fragment>
        ))}
        {upcomingPayment.length ? (
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
              Save upcoming payments
            </Button>
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
}
