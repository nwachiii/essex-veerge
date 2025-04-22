import {Flex, HStack, Heading, Stack, Text, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';

import {FormatToColorfulCurrency, formatToCurrency} from 'utils/formatAmount';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '2px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#cbcbcb',
  },
};
export const SettlementSummary = ({submitInfo}) => {
  const [expand, setExpand] = useState(false);

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'));

  return (
    <Stack
      flex={`1`}
      p={`12px`}
      w="full"
      border="0.5px solid #E4E4E4"
      borderRadius="12px"
      gap="12px"
      background={`#FBFCFC`}
    >
      <HStack align="start" spacing="12px" borderRadius="10px">
        <Flex alignSelf="stretch" minW="252px" gap="12px" p={`8px`} bg="#F5F5F5" borderRadius="4px">
          <Stack align="start" spacing="3.39px" borderRadius="10px">
            <Text fontSize="12px" fontWeight="400" color="#606060">
              Settlement Amount
            </Text>
            {/* <Text fontSize="12px" fontWeight="500" color="#191919">
              {formatToCurrency(submitInfo?.amount?.slice(0, -2)) ?? '-'}
              <Text as="span" color="#919191">
                {submitInfo?.amount?.slice(-2)}
              </Text>
            </Text> */}
            <FormatToColorfulCurrency
              amount={submitInfo?.amount}
              decimalStyle={{
                color: '#919191',
                fontSize: '12px',
                fontWeight: '500',
              }}
              color="#191919"
              fontSize="12px"
              fontWeight="500"
            />
          </Stack>
        </Flex>
        <Stack
          w="full"
          justify="stretch"
          spacing="3.39px"
          bg="#F5F5F5"
          borderRadius="4px"
          h="full"
          maxH="100px"
          overflowY="auto"
          sx={customScrollbarStyles}
          p={`8px`}
        >
          <Text fontSize="12px" fontWeight="400" color="#606060">
            Note
          </Text>
          <Text fontSize="12px" fontWeight="500" color="#191919">
            {expand
              ? (submitInfo?.note ?? '-')
              : (submitInfo?.note ?? '-')?.length <= 80
                ? (submitInfo?.note ?? '-')
                : `${(submitInfo?.note ?? '-')?.slice(0, 80)}`}
            <Text
              fontSize="10px"
              cursor="pointer"
              fontWeight="400"
              color="#606060"
              as="span"
              onClick={() => setExpand(!expand)}
            >
              {(submitInfo?.note ?? '-')?.length <= 80
                ? ''
                : expand
                  ? ' ... See less'
                  : ' ... read more'}
            </Text>
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default SettlementSummary;
