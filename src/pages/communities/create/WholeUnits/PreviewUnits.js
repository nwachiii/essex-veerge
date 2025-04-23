import {SmallCloseIcon} from '@chakra-ui/icons';
import {Divider, Flex, HStack, Icon, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../../theme';
import {extractBase64, formatAmount} from '../../../../utils';
import {PreviewOtherFees} from './PreviewOtherFees';
import PreviewPaymentPlan from './PreviewPaymentPlan';
import {formatToCurrency} from 'utils/formatAmount';

export const PreviewUnits = ({
  unitFields,
  isClicked,
  files,
  removeUnit,
  paymentPlan,
  setPaymentPlan,
  otherFees,
  setOtherFees,
}) => {
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
  const removeFee = fee => {
    const copy = [...otherFees];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].name === fee.name) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setOtherFees(copy);
  };
  return (
    <div>
      {isClicked && unitFields.length > 0
        ? unitFields.map((unitField, index) => (
            // UNIT PREVIEW
            <div key={index}>
              <Stack {...themeStyles.componentStyles.cardOne} mt={0}>
                <HStack spacing={4} justify="space-between" h="141px">
                  <Image
                    alt=""
                    src={extractBase64(files)[index]}
                    borderRadius="14px"
                    height="141px"
                    width="141px"
                  />
                  <Flex key={index} h="70%" align="flex-start" columnGap="60px">
                    <Stack spacing="9px">
                      <Text color="gray.500">Name</Text>
                      <Text fontWeight="bold">{unitField.unit_title}</Text>
                    </Stack>
                    <Divider color="#E4E4E4" orientation="vertical" />
                    <Stack spacing="9px">
                      <Text color="gray.500">Unit Size</Text>
                      <Text fontWeight="bold">{unitField.unit_size}</Text>
                    </Stack>
                    <Divider color="#E4E4E4" orientation="vertical" />
                    <Stack spacing="9px">
                      <Text color="gray.500">Bedroom</Text>
                      <Text fontWeight="bold">{unitField.no_of_bedrooms}</Text>
                    </Stack>
                    <Divider color="#E4E4E4" orientation="vertical" />
                    <Stack spacing="9px">
                      <Text color="gray.500">Price per unit</Text>
                      <Text fontWeight="bold">{formatToCurrency(unitField.price)}</Text>
                    </Stack>
                    <Divider color="#E4E4E4" orientation="vertical" />
                    <Stack spacing="9px">
                      <Text color="gray.500">Initial deposit</Text>
                      <Text fontWeight="bold">
                        {formatToCurrency(unitField.initial_deposit_in_value)}
                      </Text>
                    </Stack>
                    <Divider color="#E4E4E4" orientation="vertical" />
                  </Flex>

                  <Stack
                    justify="space-between"
                    h="50%"
                    cursor="pointer"
                    onClick={() => removeUnit(unitField)}
                  >
                    <Icon
                      as={SmallCloseIcon}
                      width="30px"
                      height="30px"
                      alt="cancel_icon"
                      color="red"
                    />
                    {/* <Icon as={ChevronDownIcon} width='20px' height='20px' alt='arrow_down' /> */}
                  </Stack>
                </HStack>
              </Stack>
              <PreviewPaymentPlan
                removePlan={removePlan}
                paymentPlan={unitField.payment_plan}
                isClicked={isClicked}
              />

              <PreviewOtherFees
                removeFee={removeFee}
                otherFees={unitField.fees}
                isClicked={isClicked}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default PreviewUnits;
