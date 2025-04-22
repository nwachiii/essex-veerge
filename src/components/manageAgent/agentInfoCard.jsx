import {Flex, Heading, Text, Image, Stack} from '@chakra-ui/react';
import React from 'react';
import verifiedIcon from '/src/images/icons/verifiedIcon.svg';

import ProgressIndicator from 'ui-lib/ui-lib.components/CustomTag/progressIndicator';
import {formatNumberWithCommas} from 'utils/formatAmount';

const AgentInfoCard = ({heading, hasAssets, value}) => {
  return (
    <Flex
      overflow="hidden"
      w="full"
      px="24px"
      justify="space-between"
      align="center"
      h="176px"
      spacing="none"
      borderRadius="12px"
      border="0.5px solid #e4e4e4"
      bg="#ffffff"
    >
      <Stack spacing="12px">
        <Flex align="center" gap="8px">
          <Heading fontSize="16px" fontWeight="500" color="#525252" lineHeight="24px">
            {heading}
          </Heading>
        </Flex>
        <Text fontSize="36px" fontWeight="600" color="#141414" lineHeight="44px">
          {formatNumberWithCommas(value)}
        </Text>
      </Stack>
      <ProgressIndicator hasGained={true} />
    </Flex>
  );
};

export default AgentInfoCard;
