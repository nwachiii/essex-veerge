import {ChevronDownIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Box, extendTheme, Flex, HStack, Icon, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {CUSTOMER_PAYMENT_PLAN, PAYMENT_TYPE} from '../../constants/createCustomers';
import {theme} from '../../theme';
import {formatAmount} from '../../utils';
import {handleDateFormat} from '../../utils/formatDate';
import {formatAmountWithDecimal} from '../../utils/formatAmount';

const styles = extendTheme({...theme});

export default function PaymentPlanSummary({data, ...rest}) {
  // console.log('Upcoming payments', data);
  return (
    <Box pb={4} bg="#F5F5F5">
      {data.map((entry, index) => (
        <Stack
          key={index}
          {...styles.componentStyles.cardOne}
          my={6}
          maxW="1203px"
          h="93px"
          {...rest}
          bg="#F5F5F5"
        >
          <HStack key={index} spacing={4} h="93px" justify="space-between" bg="#F5F5F5">
            <SimpleGrid columns={entry.due_date ? 4 : 3} spacing="100px">
              <Stack spacing="9px" align="center">
                <Text color="gray.500">{entry.due_date ? 'Next due payment' : 'Amount paid'}</Text>
                <Flex fontWeight="600" fontSize={'24px'}>
                  {formatAmountWithDecimal(entry?.amount || 0)}
                </Flex>
              </Stack>
              {entry.payment_date && (
                <Stack spacing="9px" align="center">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#606060">
                    Payment date
                  </Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {entry.payment_date ?? handleDateFormat(entry?.created_at)}
                  </Text>
                </Stack>
              )}
              {entry.due_date && (
                <Stack spacing="9px" align="center">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#606060">
                    Next due date
                  </Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {handleDateFormat(entry?.due_date)}
                  </Text>
                </Stack>
              )}
              {entry.transaction_action_type && (
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
              {entry.transaction_action_type && (
                <Stack spacing="9px" align="center">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#606060">
                    Payment date
                  </Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {handleDateFormat(entry?.created_at)}
                  </Text>
                </Stack>
              )}

              {entry.frequency && (
                <Stack spacing="9px" align="center">
                  <Text color="gray.500">Remaining balance</Text>
                  <Text fontWeight="600" fontSize={'24px'}>
                    {formatAmountWithDecimal(
                      Number(entry.equity?.total_unit_price) - Number(entry.equity?.amount_paid)
                    )}
                  </Text>
                </Stack>
              )}

              {entry.frequency && (
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
    </Box>
  );
}
