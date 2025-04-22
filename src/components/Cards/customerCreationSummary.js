import {ChevronDownIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Box, extendTheme, Flex, HStack, Icon, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {CUSTOMER_PAYMENT_PLAN, PAYMENT_TYPE} from '../../constants/createCustomers';
import {theme} from '../../theme';
import {formatAmount} from '../../utils';
import {changeDateFormat, handleDateFormat} from '../../utils/formatDate';
import {
  FormatToColorfulCurrency,
  formatAmountWithDecimal,
  formatToCurrency,
} from '../../utils/formatAmount';

const styles = extendTheme({...theme});

export default function EquitySummary({data, ...rest}) {
  // console.log('Upcoming payments', data);
  return (
    <Stack spacing="18px" w="full">
      {data?.map((entry, index) => (
        <Stack
          key={index}
          {...styles.componentStyles.cardOne}
          p="17px 24px 22px"
          maxW="1284px"
          h="93px"
          w="full"
          my="0px"
          borderRadius="16px"
          {...rest}
          bg="#F5F5F5"
        >
          <HStack key={index} spacing={4} h="93px" justify="space-between" bg="#F5F5F5">
            <SimpleGrid columns={entry.due_date ? 4 : 3} spacing="100px">
              <Stack spacing="4px" align="start">
                <Text color="#606060" fontWeight="400" fontSize="14px">
                  {entry.due_date ? 'Next due payment' : 'Amount paid'}
                </Text>

                <FormatToColorfulCurrency
                  amount={entry?.amount}
                  decimalStyle={{
                    color: '#919191',
                    fontSize: '24px',
                    fontWeight: '600',
                  }}
                  color="#191919"
                  fontSize="24px"
                  fontWeight="600"
                />
              </Stack>
              {entry.payment_date && (
                <Stack spacing="4px" align="start">
                  <Text color="#606060" fontWeight="400" fontSize="14px">
                    Payment date
                  </Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {entry?.payment_date ? changeDateFormat(entry?.payment_date) : '-'}
                  </Text>
                </Stack>
              )}
              {entry?.due_date && (
                <Stack spacing="9px" align="center">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#606060">
                    Next due date
                  </Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {handleDateFormat(entry?.due_date ?? '')}
                  </Text>
                </Stack>
              )}
              {entry?.transaction_action_type && (
                <Stack spacing="9px" align="center">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#606060">
                    Payment type
                  </Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {entry.transaction_action_type == 'equity_outright'
                      ? 'Outright'
                      : entry.transaction_action_type == 'equity_plan_initial'
                        ? 'Initial deposit'
                        : entry.transaction_action_type == 'equity_plan_deposit'
                          ? 'Top up'
                          : entry.transaction_action_type == 'equity_fractions'
                            ? 'Fractional'
                            : null}
                  </Text>
                </Stack>
              )}
              {entry?.transaction_action_type && (
                <Stack spacing="9px" align="center">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#606060">
                    Payment date
                  </Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {handleDateFormat(entry?.created_at)}
                  </Text>
                </Stack>
              )}

              {entry?.frequency && (
                <Stack spacing="9px" align="center">
                  <Text color="gray.500">Remaining balance</Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {formatAmountWithDecimal(
                      Number(entry.equity?.total_unit_price) - Number(entry.equity?.amount_paid)
                    )}
                  </Text>
                </Stack>
              )}

              {entry?.frequency && (
                <Stack spacing="9px" align="center">
                  <Text color="gray.500">Payment frequency</Text>
                  <Text textTransform={'capitalize'} fontWeight="600" fontSize={'24px'}>
                    {entry?.frequency?.toLowerCase()}
                  </Text>
                </Stack>
              )}
            </SimpleGrid>

            {/* <HStack spacing={4} justify='space-between' align='center'>
							<Icon as={ChevronDownIcon} width='20px' height='20px' alt='arrow_down' />
							<Icon as={SmallCloseIcon} width='20px' height='20px' alt='cancel_icon' color='red' />
						</HStack> */}
          </HStack>
        </Stack>
      ))}
    </Stack>
  );
}
