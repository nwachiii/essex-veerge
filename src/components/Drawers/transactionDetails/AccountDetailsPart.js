import React from 'react';
import {BsDashLg} from 'react-icons/bs';
import {Box, Text, Flex, Tag, TagLabel} from '@chakra-ui/react';

const AccountDetailsPart = ({data, isFractional, hasCo_owners}) => {
  const accountDetails = data?.account_details;
  const equityInfo = data?.equity_info;
  const isStatusValid = equityInfo.status === 'SUSPENDED' || equityInfo.status === 'TERMINATED';
  const isBuildingTypeSingleFamilyResidential =
    equityInfo?.unit?.building_type == 'Detached' ||
    equityInfo?.unit?.building_type == 'Semi Detached';
  return (
    <Flex
      borderRadius="4px"
      // boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      border="0.5px solid #E4E4E7"
      p="12px"
      bg="#fafafa"
      minH="61px"
      justifyContent="space-between"
    >
      <Flex
        gap={1}
        color="#191919"
        fontSize="12px"
        fontWeight="600"
        alignItems="center"
        wordBreak="break-word"
      >
        {isBuildingTypeSingleFamilyResidential || !equityInfo?.unit?.unit_title ? (
          <Text>{equityInfo?.project?.name ?? <BsDashLg />}</Text>
        ) : (
          <>
            <Text>{equityInfo?.unit?.unit_title ?? <BsDashLg />},</Text>
            <Text>{equityInfo?.project?.name ?? <BsDashLg />}</Text>
          </>
        )}
      </Flex>

      {isFractional || hasCo_owners ? null : (
        <Box display="flex" flexDirection="column">
          <Text
            color="#191919"
            fontSize="12px"
            fontWeight="600"
            alignItems="center"
            wordBreak="break-word"
          >
            {accountDetails?.account_number ?? <BsDashLg />}
          </Text>
          <Text
            color="#606060"
            fontSize="7.22px"
            fontWeight="400"
            alignItems="center"
            wordBreak="break-word"
          >
            {accountDetails?.bank_name ?? <BsDashLg />}
          </Text>
        </Box>
      )}
      {isStatusValid ? <TransactionTag status={equityInfo?.status} /> : null}
    </Flex>
  );
};

export default AccountDetailsPart;

const TransactionTag = ({status}) => {
  const val = status?.toLowerCase();
  const tagObj = {
    suspended: {
      bg: '#e5e5e5',
      color: '#606060',
    },
    terminated: {
      bg: '#FF36361A',
      color: '#FF3636',
    },
  };
  return (
    <Tag
      p="6px 8px"
      maxH="22px"
      w="fit-content"
      color={tagObj?.[val]?.color}
      bg={tagObj?.[val]?.bg}
      borderRadius="26.67px"
    >
      <TagLabel lineHeight="10.14px" fontSize="8px" fontWeight="500" textTransform="capitalize">
        {val}
      </TagLabel>
    </Tag>
  );
};
