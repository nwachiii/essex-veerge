import ListingsPieChart from '@/components/Charts/ListingsPieChart';
import {AspectRatio, Box, Flex, Heading, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {formatNumberWithCommas} from 'utils/formatAmount';
import ViolationPieChart from '../Charts/violationPieChart';

const ViolationDetailsCard = ({escalated, lateToCure, inCure, total, heading}) => {
  return (
    <Stack
      overflow="hidden"
      w="full"
      justifySelf="center"
      h="full"
      spacing="none"
      borderRadius="12px"
      border="0.5px solid #e4e4e7"
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
        <ViolationPieChart C={escalated} A={lateToCure} B={inCure} />
      </Flex>
      <Flex
        h="50px"
        borderTop="0.5px solid #e4e4e7"
        bg="#f9fafb"
        w="full"
        justify="space-between"
        px="24px"
      >
        <Flex alignItems="center">
          <Box alignSelf={'center'} boxSize="13.81px" mr="4px" borderRadius="2px" bg={'#4545fe'} />
          <Text
            fontSize="13px"
            fontWeight="400"
            color="rgba(25, 25, 25, 0.6)"
            lineHeight="20.29px"
            mr="8px"
          >
            In cure
          </Text>
          <Text fontSize="13px" fontWeight="600" color="#191919" lineHeight="22.82px">
            {formatNumberWithCommas(inCure)}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box alignSelf={'center'} boxSize="13.81px" mr="4px" borderRadius="2px" bg={'#dc2626'} />
          <Text
            fontSize="13px"
            fontWeight="400"
            color="rgba(25, 25, 25, 0.6)"
            lineHeight="20.29px"
            mr="8px"
          >
            Late to cure
          </Text>
          <Text fontSize="13px" fontWeight="600" color="#191919" lineHeight="22.82px">
            {formatNumberWithCommas(lateToCure)}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Box alignSelf={'center'} boxSize="13.81px" mr="4px" borderRadius="2px" bg={'#f97316'} />
          <Text
            fontSize="13px"
            fontWeight="400"
            color="rgba(25, 25, 25, 0.6)"
            lineHeight="20.29px"
            mr="8px"
          >
            Escalated
          </Text>
          <Text fontSize="13px" fontWeight="600" color="#191919" lineHeight="22.82px">
            {formatNumberWithCommas(escalated)}
          </Text>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default ViolationDetailsCard;
