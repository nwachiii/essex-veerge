import {
  HStack,
  Image,
  Stack,
  Text,
  Heading,
  VStack,
  Spinner,
  Center,
  Divider,
  Grid,
} from '@chakra-ui/react';
import React from 'react';
import avatar from '/src/images/avatar.svg';
import {formatToCurrency} from '../../../../utils/formatAmount';
import {changeDateFormat} from '../../../../utils/formatDate';

import HoverListingName from '../../../dashboard/table/HoverListingName';
import HoverOnAmount from '../../../../ui-lib/ui-lib.components/hoverOnText/hoverOnAmount';
import {getOrdinal} from '../../../../utils/getOrdinals';

export const CommissionPayments = ({
  past_payment_obj,
  incoming_payment_obj,
  client_data,
  customScrollbarStyles,
}) => {
  const reversed = arr => arr.reverse();
  const payment_keys = ['amount', 'transaction_action_type', 'created_at'];
  const transactionType = {
    equity_outright: 'outright',
    equity_plan_initial: 'Initial deposit',
    equity_plan_deposit: 'Top up',
    equity_fractions: 'Fractional',
  };

  return (
    <Stack bg="#F5F5F5" borderRadius="10px" p={`9px 12px`} overflowY="auto" w="full" h={`100%`}>
      <Stack
        overflowY="scroll"
        sx={customScrollbarStyles}
        w="full"
        divider={<Divider my={`8px !important`} borderColor={`#e4e4e4`} />}
      >
        {client_data?.payment_plan ? (
          <VStack align="start" gap="4px" py="6px">
            <Heading as="h3" fontSize="12px" fontWeight="400" color="#606060">
              Payment duration
            </Heading>
            <Text as="span" fontSize="12px" fontWeight="500" color="#191919">
              {client_data?.payment_plan ?? '-'} months
            </Text>
          </VStack>
        ) : null}

        {past_payment_obj.isLoading ? (
          <Center h={`40px`} w={`100%`}>
            <Spinner />
          </Center>
        ) : past_payment_obj?.data?.length ? (
          <VStack align="start" py={``}>
            <Heading as="h3" fontSize="12px" fontWeight="400" color="#606060">
              Past Payments
            </Heading>
            <Grid templateColumns={`1fr 1.5fr 1.5fr`} w="full" gap="8px 12px">
              {reversed(past_payment_obj?.data).map(item => {
                return payment_keys.map(key => {
                  if (key === 'amount') {
                    return (
                      <HoverOnAmount
                        text={item[key]}
                        key={key}
                        as="span"
                        fontSize="12px"
                        fontWeight="600"
                        color="#191919"
                        w={`max-content`}
                      />
                    );
                  } else if (key === 'transaction_action_type') {
                    return (
                      <Text
                        key={key}
                        as="span"
                        fontSize="12px"
                        fontWeight="500"
                        color="#191919"
                        textTransform={`capitalize`}
                      >
                        {transactionType[item?.[key]]}
                      </Text>
                    );
                  } else if (key === 'created_at') {
                    return (
                      <Text key={key} as="span" fontSize="12px" fontWeight="500" color="#191919">
                        {item?.[key] ? changeDateFormat(item[key]) : '-'}
                      </Text>
                    );
                  }
                });
              })}
            </Grid>
          </VStack>
        ) : null}

        {incoming_payment_obj.isLoading ? (
          <Center h={`40px`} w={`100%`}>
            <Spinner />
          </Center>
        ) : incoming_payment_obj.data?.length ? (
          <VStack align="start">
            <Heading as="h3" fontSize="12px" fontWeight="400" color="#606060">
              Upcoming payment
            </Heading>
            <Grid templateColumns={`1fr 1.5fr 1.5fr`} w="full" gap="8px 12px">
              {incoming_payment_obj?.data.map((item, idx) => {
                return payment_keys.map(key => {
                  if (key === 'amount') {
                    return (
                      <HoverOnAmount
                        text={item[key]}
                        key={key}
                        as="span"
                        fontSize="12px"
                        fontWeight="600"
                        color="#191919"
                        w={`max-content`}
                      />
                    );
                  } else if (key === 'transaction_action_type') {
                    return (
                      <Text key={key} as="span" fontSize="12px" fontWeight="500" color="#191919">
                        {`${getOrdinal(idx + 1 + past_payment_obj?.data?.length)} payment`}
                      </Text>
                    );
                  } else if (key === 'created_at') {
                    return (
                      <Text key={key} as="span" fontSize="12px" fontWeight="500" color="#191919">
                        {item[key] ? changeDateFormat(item[key]) : '-'}
                      </Text>
                    );
                  }
                });
              })}
            </Grid>
          </VStack>
        ) : null}
      </Stack>
    </Stack>
  );
};

export const PaymentBreakDown = ({
  customScrollbarStyles,
  commissionRequestObj: {data},
  clientData,
  incomingPaymentObj,
  pastPaymentObj,
}) => {
  console.log(clientData);

  const reversed = arr => arr.reverse();
  const payment_keys = ['amount', 'transaction_action_type', 'created_at'];
  const transactionType = {
    equity_outright: 'outright',
    equity_plan_initial: 'Initial deposit',
    equity_plan_deposit: 'Top up',
    equity_fractions: 'Fractional',
  };

  return (
    <Stack
      flex={`1`}
      p={`12px`}
      border="0.5px solid #E4E4E4"
      borderRadius="12px"
      gap="8px"
      background={`#FBFCFC`}
    >
      <Heading as="h1" fontSize="12px" color="#606060" fontWeight="400">
        Payment Breakdown
      </Heading>
      <HStack gap={`10px`} w="full" justify="space-between">
        <HStack gap="8px" flex={`1`}>
          <Center w={`40px`} h={`40px`} minWidth={`40px`} overflow="hidden" borderRadius={`50%`}>
            <Image
              src={data?.customer?.avatar ?? avatar.src}
              alt="client image"
              objectFit="cover"
              minW={`100%`}
              minH={`100%`}
            />
          </Center>
          <VStack alignItems={`flex-start`} gap={`4px`}>
            <Text
              color="#191919"
              textTransform="capitalize"
              fontSize="12px"
              fontWeight="500"
              m={`0px`}
              maxW={`16ch`}
              textOverflow={`ellipsis`}
              whiteSpace={`nowrap`}
              overflow={`hidden`}
            >
              {`${data?.customer?.first_name ?? '-'} ${data?.customer?.last_name ?? '-'}`}
            </Text>
            <Text
              color="#4545fe"
              fontSize="10px"
              fontWeight="400"
              m={`0px`}
              maxW={`16ch`}
              textOverflow={`ellipsis`}
              whiteSpace={`nowrap`}
              overflow={`hidden`}
            >
              {data?.customer?.email ?? '-'}
            </Text>
          </VStack>
        </HStack>
        <HStack gap="8px" flex={`1`}>
          <Center w={`45px`} h={`40px`} minWidth={`40px`} overflow="hidden" borderRadius={`5px`}>
            <Image
              src={clientData?.photo ?? clientData?.unit_photo ?? avatar.src}
              alt="equity image"
              objectFit="cover"
              minW={`100%`}
              minH={`100%`}
            />
          </Center>
          <VStack justify="space-between" align="start" gap="4px">
            <HoverListingName
              text={clientData?.project_name ?? '-'}
              lens={24}
              as="h2"
              fontSize="12px"
              fontWeight="500"
              color="#191919"
              m={`0px`}
            />
            <Text color="#4b4b4b" as="span" fontSize="10px" fontWeight="400">
              {clientData?.unit_title ?? '-'}
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <CommissionPayments
        past_payment_obj={pastPaymentObj}
        incoming_payment_obj={incomingPaymentObj}
        client_data={clientData}
        customScrollbarStyles={customScrollbarStyles}
      />
      {/* <Stack bg="#F5F5F5" borderRadius="10px" p={`9px 12px`} overflowY="auto" w="full" h={`100%`}>
        <Stack
          overflowY="scroll"
          sx={customScrollbarStyles}
          w="full"
          divider={<Divider my={`8px !important`} borderColor={`#e4e4e4`} />}
        >
          {clientData?.payment_plan ? (
            <VStack align="start" gap="4px" py="6px">
              <Heading as="h3" fontSize="12px" fontWeight="400" color="#606060">
                Payment duration
              </Heading>
              <Text as="span" fontSize="12px" fontWeight="500" color="#191919">
                {clientData?.payment_plan ?? '-'} months
              </Text>
            </VStack>
          ) : null}

          {pastPaymentObj.isLoading ? (
            <Center h={`40px`} w={`100%`}>
              <Spinner />
            </Center>
          ) : pastPaymentObj?.data?.length ? (
            <VStack align="start" py={``}>
              <Heading as="h3" fontSize="12px" fontWeight="400" color="#606060">
                Past Payments
              </Heading>
              <Grid templateColumns={`1fr 1.5fr 1.5fr`} w="full" gap="8px 12px">
                {reversed(pastPaymentObj?.data).map(item => {
                  return payment_keys.map(key => {
                    if (key === 'amount') {
                      return (
                        <HoverOnAmount
                          text={item[key]}
                          key={key}
                          as="span"
                          fontSize="12px"
                          fontWeight="500"
                          color="#191919"
                          w={`max-content`}
                        />
                      );
                    } else if (key === 'transaction_action_type') {
                      return (
                        <Text
                          key={key}
                          as="span"
                          fontSize="12px"
                          fontWeight="500"
                          color="#191919"
                          textTransform={`capitalize`}
                        >
                          {transactionType[item?.[key]]}
                        </Text>
                      );
                    } else if (key === 'created_at') {
                      return (
                        <Text key={key} as="span" fontSize="12px" fontWeight="500" color="#191919">
                          {item?.[key] ? changeDateFormat(item[key]) : '-'}
                        </Text>
                      );
                    }
                  });
                })}
              </Grid>
            </VStack>
          ) : null}

          {incomingPaymentObj.isLoading ? (
            <Center h={`40px`} w={`100%`}>
              <Spinner />
            </Center>
          ) : incomingPaymentObj.data?.length ? (
            <VStack align="start">
              <Heading as="h3" fontSize="12px" fontWeight="400" color="#606060">
                Upcoming payment
              </Heading>
              <Grid templateColumns={`1fr 1.5fr 1.5fr`} w="full" gap="8px 12px">
                {incomingPaymentObj?.data.map((item, idx) => {
                  return payment_keys.map(key => {
                    if (key === 'amount') {
                      return (
                        <Text key={key} as="span" fontSize="12px" fontWeight="500" color="#191919">
                          {item[key] ? formatToCurrency(item[key]) : '-'}
                        </Text>
                      );
                    } else if (key === 'transaction_action_type') {
                      return (
                        <Text key={key} as="span" fontSize="12px" fontWeight="500" color="#191919">
                          {`${getOrdinal(idx + 1 + pastPaymentObj?.data?.length)} payment`}
                        </Text>
                      );
                    } else if (key === 'created_at') {
                      return (
                        <Text key={key} as="span" fontSize="12px" fontWeight="500" color="#191919">
                          {item[key] ? changeDateFormat(item[key]) : '-'}
                        </Text>
                      );
                    }
                  });
                })}
              </Grid>
            </VStack>
          ) : null}
        </Stack>
      </Stack> */}
    </Stack>
  );
};

export default PaymentBreakDown;
