import {Flex, Heading, Text, Image, Stack, Icon} from '@chakra-ui/react';
import React from 'react';
import verifiedIcon from '/src/images/icons/verifiedIcon.svg';
import {IoArrowDown} from 'react-icons/io5';
import {formatNumberWithCommas} from 'utils/formatAmount';

const UserAssetCard = ({heading, hasAssets, value}) => {
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
        {hasAssets ? <Flex gap="2px" bg={hasAssets ? '#ecfdf3' : '#fef3f2'} borderRadius="24px" h="36px" p="8px">
          <Icon
            as={IoArrowDown}
            boxSize="20px"
            transform={hasAssets ? 'rotate(180deg)' : ''}
            color={hasAssets ? '#064b38' : '#f04438'}
          />
          <Text fontSize="14px" fontWeight="500" color={'#292929'} lineHeight="20px">
            <Text as="span" color={hasAssets ? '#064b38' : '#f04438'}>
              40%
            </Text>{' '}
            vs last month
          </Text>
        </Flex> : null}
      </Stack>
    </Flex>
  );
};

export default UserAssetCard;
