import {Flex, HStack, Icon, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {themeStyles} from '../../../../theme';
import {formatAmount, formatAmountWithDecimal} from '../../../../utils';
import SmallCloseIcon from '/src/images/icons/cancleBig.png';
import {FaCaretRight} from 'react-icons/fa';
import {base64ToUrl, decodeBase64ToFile, decodeBase64URL} from 'utils/convertBase64';
import ViewPaymentBreakdownModal from './WholeUnits.PaymentPlan/ViewPaymentBreakdownModal';
import RightAngleIcon from '@/components/assets/rightAngleIcon';
import {formatToCurrency} from 'utils/formatAmount';

export const PreviewPaymentPlan = ({
  showPreview,
  previewData,
  paymentPlan,
  unit,
  index,
  setPreviewData,
  setFieldValue,
  savedPaymentPlan,
}) => {
  const [selectedPaymentView, setSelectedPaymentView] = useState(null);
  const PAYMENT_PLAN_LENGTH = unit?.payment_plan;
  const VIEW_PAYMENT_BREAKDOWN_MODAL = useDisclosure();
  const UNIT_PLAN = unit?.payment_plan || [];
  const LAST_ADDED_UNIT = UNIT_PLAN?.[UNIT_PLAN?.length - 1];
  const removePlan = indx => {
    const copy = [...previewData];
    for (let i = 0; i < copy.length; i++) {
      if (i == indx) {
        copy?.splice(i, 1);
        i = copy?.length;
      }
    }
    setFieldValue(`units.${index}.payment_plan`, copy);
  };
  // Truthy use case
  if (
    LAST_ADDED_UNIT?.payment_period_in_months !== '' &&
    LAST_ADDED_UNIT?.initial_deposit_in_value !== '' &&
    LAST_ADDED_UNIT?.contract !== '' &&
    LAST_ADDED_UNIT?.purchase_price !== '' &&
    savedPaymentPlan == 'true'
  ) {
    setPreviewData(UNIT_PLAN);
  }
  const handleViewPaymentBreakdown = indx => {
    const copy = [...previewData];
    for (let i = 0; i < copy.length; i++) {
      if (i == indx) {
        setSelectedPaymentView(copy[i]);
      }
    }
    VIEW_PAYMENT_BREAKDOWN_MODAL?.onOpen();
  };
  return (
    <div>
      {showPreview == 'true' && previewData?.[index]?.contract !== ''
        ? previewData?.map((plan, num) => {
            return (
              <Stack
                key={num}
                {...themeStyles.componentStyles.cardOne}
                mt={0}
                maxW="1203px"
                h="93px"
                bg="#F5F5F5"
              >
                <HStack spacing={4} justify="space-between" h="141px">
                  <Flex justify={'space-between'} key={num} h="70%" align="center" columnGap="60px">
                    <Stack spacing="9px">
                      <Text color="gray.500">Duration</Text>
                      <Text fontWeight="bold">{`${plan?.payment_period_in_months} months`}</Text>
                    </Stack>
                    <Stack spacing="9px">
                      <Text color="gray.500">Initial deposit</Text>
                      <Text
                        pl={2}
                        color={
                          formatAmount(plan.initial_deposit_in_value) == 'NaN' && 'transparent'
                        }
                        fontWeight="bold"
                      >
                        {formatToCurrency(plan.initial_deposit_in_value)}
                      </Text>
                    </Stack>

                    {paymentPlan[num]?.plan_type == 'custom' &&
                    !paymentPlan[num]?.payment_frequency ? null : (
                      <Stack spacing="9px">
                        <Text color="gray.500" textTransform={'capitalize'}>
                          {plan.payment_frequency == 'flexible'
                            ? 'Payment type'
                            : plan.payment_frequency + ' payment'}{' '}
                        </Text>
                        <Text
                          pl={2}
                          color={formatAmount(plan.periodic_payment) == 'NaN' && 'transparent'}
                          fontWeight="bold"
                        >
                          {plan.payment_frequency == 'flexible'
                            ? 'flexible'
                            : formatToCurrency(plan.periodic_payment)}
                        </Text>
                      </Stack>
                    )}

                    <Stack spacing="9px">
                      <Text color="gray.500">Purchase price</Text>
                      <Text
                        pl={2}
                        color={formatAmount(plan.purchase_price) == 'NaN' && 'transparent'}
                        fontWeight="bold"
                      >
                        {formatToCurrency(plan.purchase_price)}
                      </Text>
                    </Stack>
                    {paymentPlan[num]?.plan_type == 'custom' &&
                    !paymentPlan[num]?.payment_frequency ? (
                      <HStack spacing="9px" cursor={'pointer'}>
                        <Text
                          color="#12D8A0"
                          fontSize="18px"
                          fontWeight="500"
                          fontStyle="normal"
                          lineHeight="normal"
                          fontFamily="Euclid Circular B"
                          onClick={() => handleViewPaymentBreakdown(num)}
                        >
                          View Payment <br /> Breakdown
                        </Text>
                        <RightAngleIcon />
                      </HStack>
                    ) : null}
                    <ViewPaymentBreakdownModal
                      plan={selectedPaymentView}
                      modal={VIEW_PAYMENT_BREAKDOWN_MODAL}
                    />
                  </Flex>

                  <HStack
                    spacing={4}
                    justify="space-between"
                    align="center"
                    onClick={() => removePlan(num)}
                  >
                    <Image
                      src={SmallCloseIcon.src}
                      cursor="pointer"
                      width="30px"
                      height="30px"
                      alt="cancel_icon"
                      color="red"
                    />
                  </HStack>
                </HStack>
              </Stack>
            );
          })
        : null}
    </div>
  );
};

export default PreviewPaymentPlan;
