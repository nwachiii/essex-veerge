import {Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {FormatToColorfulAdaptiveCurrency} from 'utils/formatAmount';

const AccountOverViewHeader = ({header, amount}) => {
  return (
    <Stack
      h="full"
      minH="142px"
      mb="24px"
      alignItems="center"
      bg="#ffffff"
      p="32px 24px"
      rounded="12px"
      border="0.5px solid #e4e4e7"
      w="full"
      justifyContent="center"
    >
      <Stack alignItems="center" spacing="12px">
        <Text fontSize="16px" fontWeight="500" color="#52525b">
          {header}
        </Text>

        <FormatToColorfulAdaptiveCurrency
          amount={amount}
          lens={13}
          color={'#4545fe'}
          maxSize={32}
          minSize={10}
          pow={0.92}
          fontWeight="600"
          decimalStyle={{fontWeight: '600', color: '#606060'}}
        />
      </Stack>
    </Stack>
  );
};

export default AccountOverViewHeader;
