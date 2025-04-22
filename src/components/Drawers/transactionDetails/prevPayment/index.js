import React, {useEffect, useState} from 'react';
import {BsDashLg} from 'react-icons/bs';
import {Box, Text, Flex, OrderedList, ListItem, Stack, Image} from '@chakra-ui/react';

import {monthDayYear} from 'utils/formatDate';
import {formatAmountWithDecimal} from 'utils';
import PrevPaymentMenu from './prevPaymentMenu';
import walletIcon from '/src/images/icons/maturityDateWalletIcon.svg';

const PrevPayment = ({payment, fracRefetch, isFractional}) => {
  const isNotOutrightPayment = equityObj => {
    if (equityObj.type === 'WHOLE' && !equityObj.payment_plan) return false;
    return true;
  };
  const [prevPayment, setPrevPayment] = useState([]);

  useEffect(() => {
    if (payment) {
      setPrevPayment([...payment].reverse());
    }
  }, [payment]);

  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Text color="#3D3D3D" fontSize="12px" fontWeight="300" wordBreak="break-word">
        {isFractional ? 'Payments' : `Previous Payments`}
      </Text>
      <Box bg="#F5F5F5" p="12px" width="full" borderRadius="12px">
        <Stack spacing="16px">
          {prevPayment?.map((single, index) => (
            <Stack spacing="4px">
              {isFractional && single.maturity_date ? (
                <Image
                  boxSize="16px"
                  src={walletIcon.src}
                  alt="maturity date indicator wallet icon"
                />
              ) : null}
              <Flex key={index} width="full" justifyContent="space-between">
                {isFractional ? (
                  <Stack spacing="4px">
                    <Text color="#191919" fontSize="14px" fontWeight="600">
                      {single?.price_per_fraction ? (
                        formatAmountWithDecimal(single?.price_per_fraction)
                      ) : (
                        <BsDashLg />
                      )}
                    </Text>
                    <Text pl={2} color="#606060" fontSize="10px" fontWeight="400" textAlign="left">
                      {single?.amount ? single?.amount : <BsDashLg />}
                    </Text>
                  </Stack>
                ) : (
                  <Text color="#3D3D3D" fontSize="14px" fontWeight="400">
                    {index === 0 && isNotOutrightPayment(single?.equity)
                      ? 'Initial Deposit'
                      : 'Deposit'}
                  </Text>
                )}
                <Flex gap="16px" alignItems="center">
                  <Box display="flex" alignItems="end" flexDirection="column" gap="4px">
                    <Text color="#191919" fontSize="14px" fontWeight="600">
                      {single?.purchase_price ? (
                        formatAmountWithDecimal(single?.purchase_price)
                      ) : single?.amount ? (
                        formatAmountWithDecimal(single?.amount)
                      ) : (
                        <BsDashLg />
                      )}
                    </Text>
                    <Text color="#606060" fontSize="10px" fontWeight="400" textAlign="end">
                      {single?.created_at ? monthDayYear(single?.created_at) : <BsDashLg />}
                    </Text>
                  </Box>
                  {isFractional ? (
                    <PrevPaymentMenu
                      fracRefetch={fracRefetch}
                      id={single.id}
                      maturity_date={single?.maturity_date ?? ''}
                      maturity_assigned_to={single?.team_members_assigned ?? []}
                    />
                  ) : null}
                </Flex>
              </Flex>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default PrevPayment;
