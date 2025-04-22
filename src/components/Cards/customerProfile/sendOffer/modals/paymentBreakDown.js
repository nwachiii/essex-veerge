import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  Image,
  Spinner,
  Center,
  useMediaQuery,
} from '@chakra-ui/react';
import paymentplancardIcon from '/src/images/icons/paymentplancardIcon.svg';
import HoverOnAmount from 'utils/HoverOnAmount';
import {getOrdinal} from 'utils/getOrdinals';
import {formatToCurrency} from 'utils/formatAmount';
import {fetchCustomPlanSummary} from 'apis/listings';
import {useQuery} from '@tanstack/react-query';

export const PaymentBreakdown = ({paymentBreakdownDisclosure, info, customScrollbarStyles}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummary', parseInt(info?.payment_plan?.id)],
    () => fetchCustomPlanSummary(parseInt(info?.payment_plan?.id)),
    {
      enabled: !!info?.payment_plan,
    }
  );

  const customPaymentBreakdown = {
    initialDeposit: info?.payment_plan?.initial_deposit_in_value ?? '-',
    upcomingPayments: customPlanBreakDown?.data?.data?.data ?? [],
    isError: customPlanBreakDown.isError,
    isLoading: customPlanBreakDown.isLoading,
  };
  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');
  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      motionPreset="slideInBottom"
      isOpen={paymentBreakdownDisclosure.isOpen}
      onClose={paymentBreakdownDisclosure.onClose}
    >
      <ModalOverlay />
      <ModalContent
        transform={isShortScreenHeight ? 'scale(0.8) !important' : 'none'}
        maxW="462px"
        maxH="400px"
        borderRadius="16px "
        p="24px"
      >
        <HStack justify="space-between" w="full">
          <Image src={paymentplancardIcon.src} alt="paymentlan icon" />
          <ModalCloseButton position="initial" transform="translateX(7px)" />
        </HStack>
        <Heading fontSize="20px" fontWeight="600" mt="16px" mb="24px" color="#191919">
          Payment Breakdown
        </Heading>
        <ModalBody p="0px" sx={customScrollbarStyles} pr="4px">
          {customPlanBreakDown?.isError ? (
            <Text fontSize={'10px'} textAlign="center" color="#606060" fontWeight={'400'}>
              We currently can&apos;t access this info, kindly try again.
            </Text>
          ) : (
            <Stack spacing="none" divider={<StackDivider my="12px" />}>
              <HStack w="full" justify="space-between">
                <Text fontSize="15.4px" fontWeight="400" color="#606060">
                  Initial Deposit
                </Text>
                <Text fontSize={'16px'} color="#191919" fontWeight={'500'}>
                  {customPaymentBreakdown.initialDeposit
                    ? formatToCurrency(customPaymentBreakdown.initialDeposit)
                    : '-'}
                </Text>
                {/* <HoverOnAmount text={2000} fontSize="19.8px" fontWeight="500" color="#191919" /> */}
              </HStack>
              {customPaymentBreakdown.isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                customPaymentBreakdown?.upcomingPayments.map((item, idx) => {
                  return (
                    <HStack justify="space-between" align="start" key={idx} w="full">
                      <Stack spacing="5px">
                        <Text fontSize={'14px'} color="#606060" fontWeight={'400'}>
                          {`${getOrdinal(idx + 1)} Instalment`}
                        </Text>
                        {/* <Text fontSize={'10px'} color="#606060" fontWeight={'400'}>
                        After {item?.period_in_months} month{item?.period_in_months > 1 ? 's' : ''}
                      </Text> */}
                      </Stack>
                      <Text fontSize={'16px'} color="#191919" fontWeight={'500'}>
                        {item?.amount ? formatToCurrency(item?.amount) : '-'}
                      </Text>
                    </HStack>
                  );
                })
              )}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentBreakdown;
