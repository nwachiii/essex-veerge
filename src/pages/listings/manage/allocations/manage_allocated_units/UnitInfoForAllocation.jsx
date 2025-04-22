import React, {Fragment} from 'react';
import {Box, Flex, HStack, Stack, StackDivider, Text} from '@chakra-ui/react';

const UnitInfoForAllocation = ({unitQuantity, totalArchive, allocations, isUnitView, unitInfo}) => {
  const TOTAL_ALLOCATIONS = allocations ? allocations?.length : null;
  const ALLOCATED = allocations
    ? allocations?.filter(item => item.allocated == true)?.length
    : null;
  const ARCHIVED = unitInfo
    ? unitInfo?.total_archive
    : allocations?.filter(item => item.archived == true)?.length;

  const AVAILABLE_ALLOCATIONS = TOTAL_ALLOCATIONS - ALLOCATED;

  return (
    <div>
      {isUnitView ? (
        <Stack spacing={'24px'}>
          <HStack
            borderRadius="16px"
            background="#F8F8F8"
            width="500px"
            flexShrink="0"
            justify={'space-between'}
            px={3}
            align="center"
          >
            <Text fontSize="16px" fontWeight="500" color="#191919">
              Allocations
            </Text>
            <Text fontSize="16px" fontWeight={400} color="#919191">
              {`Total allocations  ${TOTAL_ALLOCATIONS}`}
            </Text>
          </HStack>
          <Stack
            divider={<StackDivider color={'#E4E4E4'} />}
            background="#F5F5F5"
            borderRadius="8px"
            p={'0px 14px'}
            maxW={'658px'}
          >
            <HStack flexShrink="0" justify={'space-between'} p={'16px 0px'}>
              <Text fontSize="12px" fontWeight="500" color="#191919" whiteSpace="nowrap">
                Available for allocation
              </Text>
              <Text fontSize="14px" fontWeight="500" color="#191919">
                {AVAILABLE_ALLOCATIONS}
              </Text>
            </HStack>
            {ALLOCATED > 0 && (
              <HStack justify={'space-between'} p={'16px 0px'} align="center">
                <Text fontSize="12px" fontWeight="500" color="#191919">
                  Allocated
                </Text>
                <Text fontSize="14px" fontWeight="500" color="#191919">
                  {ALLOCATED}
                </Text>
              </HStack>
            )}
            {ARCHIVED > 0 && (
              <HStack p={'16px 0px'} align="center" justify={'space-between'}>
                <Text fontSize="12px" fontWeight="500" color="#191919">
                  Archived
                </Text>
                <Text fontSize="14px" fontWeight="500" color="#191919">
                  {ARCHIVED}
                </Text>
              </HStack>
            )}
          </Stack>
        </Stack>
      ) : (
        <Fragment>
          <Flex direction="row" mb="25px" justifyContent="space-between">
            <Text fontSize="24px" fontWeight="500" lineHeight="30px" color="#191919">
              Allocations
            </Text>
            <Text fontSize="18px" fontWeight="500" lineHeight="30px" color="#919191">
              {`Total allocations  ${unitQuantity}`}
            </Text>
          </Flex>
          <Flex
            px="23px"
            w="full"
            h="83px"
            bg="#F8F8F8"
            direction="row"
            mb="25px"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="16px"
          >
            <Text
              fontSize="18px"
              maxW="176px"
              fontWeight="500"
              lineHeight="23px"
              color="#191919"
              whiteSpace="nowrap"
            >
              Available for allocation
            </Text>
            <Text fontSize="18px" fontWeight="500" lineHeight="23px">
              {unitQuantity - totalArchive}
            </Text>
          </Flex>
          {totalArchive > 0 && (
            <Flex
              px="23px"
              w="full"
              h="83px"
              bg="#F8F8F8"
              direction="row"
              mb="25px"
              justifyContent="space-between"
              alignItems="center"
              borderRadius="16px"
            >
              <Text fontSize="18px" fontWeight="500" lineHeight="23px" color="#191919">
                Archived
              </Text>
              <Text fontSize="18px" fontWeight="500" lineHeight="23px">
                {totalArchive}
              </Text>
            </Flex>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default UnitInfoForAllocation;
