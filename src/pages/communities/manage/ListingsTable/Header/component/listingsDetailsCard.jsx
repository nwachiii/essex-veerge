import ListingsPieChart from '@/components/Charts/ListingsPieChart';
import {AspectRatio, Box, Flex, Heading, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {formatNumberWithCommas} from 'utils/formatAmount';

const ListingsDetailsCard = ({soldOut, total, available, heading}) => {
  return (
    <Stack
      overflow="hidden"
      w="full"
      h="full"
      spacing="none"
      borderRadius="12px"
      border="0.5px solid #E4E4E7"
      bg="#ffffff"
    >
      <Flex w="full" p="16px 24px 14px" justifyContent="space-between" alignItems="center">
        <Stack spacing="12px">
          <Heading fontSize="16px" fontWeight="500" color="#525252" lineHeight="25px">
            {heading}
          </Heading>
          <Text fontSize="36px" fontWeight="600" color="#141414" lineHeight="44px">
            {formatNumberWithCommas(total)}
          </Text>
        </Stack>
        <ListingsPieChart A={soldOut} B={available} />
      </Flex>
      <Flex
        h="50px"
        borderTop="0.5px solid #E4E4E7"
        bg="#f9fafb"
        w="full"
        justify="space-between"
        px="24px"
      >
        <Flex alignItems="center">
          <Box
            alignSelf={'center'}
            boxSize="13.81px"
            mr="12.43px"
            borderRadius="2px"
            bg={'#12b76a'}
          />
          <Text
            fontSize="16px"
            fontWeight="400"
            color="#19191999"
            lineHeight="20.29px"
            mr="16.37px"
          >
            Available
          </Text>
          <Text fontSize="18px" fontWeight="500" color="#191919" lineHeight="22.82px">
            {formatNumberWithCommas(available)}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box
            alignSelf={'center'}
            boxSize="13.81px"
            mr="12.43px"
            borderRadius="2px"
            bg={'#f04438'}
          />
          <Text
            fontSize="16px"
            fontWeight="400"
            color="#19191999"
            lineHeight="20.29px"
            mr="16.37px"
          >
            {heading == 'Total Units' ? `Sold` : `Sold out`}
          </Text>
          <Text fontSize="18px" fontWeight="500" color="#191919" lineHeight="22.82px">
            {formatNumberWithCommas(soldOut)}
          </Text>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default ListingsDetailsCard;
