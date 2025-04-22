import React from 'react';
import {ChevronRightIcon} from '@chakra-ui/icons';
import fallback from '/src/images/dashbordFallbackImage.svg';
import right from '/src/images/icons/rightemptyState.svg';
import {Box, Button, VStack, Image, HStack, Stack, Text} from '@chakra-ui/react';
import left from '/src/images/icons/leftemptyState.svg';

const TopSellingState = () => {
  return (
    <Stack
      bg="#ffffff"
      borderRadius="16px"
      w={{base: '100%', md: 418}}
      py="13px"
      px="22px"
      spacing="14px"
      border="1px solid #e4e4e4"
    >
      <Stack spacing="none">
        <Text mb="10px" color="#12D8A0" fontWeight="600" fontSize={'16px'}>
          Top Selling
        </Text>
        <Text fontFamily={''} color="#191919" fontWeight="600" fontSize={'28px'}>
          ₦ 0
          <Text as="span" color="#CBCBCB">
            .00
          </Text>
        </Text>
        <Text mt="4px" fontSize={'14px'} color="#606060" fontWeight={'400'} py={1}>
          Total Sold
        </Text>
      </Stack>

      <HStack spacing="19px" align="start">
        <VStack justify="center" borderRadius="12px" w="full" maxW="154px" h="155px" bg="#F5F5F5">
          <Image alt="img" src={fallback.src} />
        </VStack>
        <Stack w="stretch" spacing="none">
          <Text mb="47px" fontSize={'20px'} fontWeight={600}>
            None
          </Text>
          <Text color="#4545FE" fontWeight="600" fontSize={'14px'}>
            0
          </Text>
          <Text fontSize="12px" fontWeight="400" color="#606060">
            Units sold
          </Text>
          {/* <HStack w="full" justify="end" spacing="11px" mt="25px">
            <Text fontSize={"14px"} fontWeight={400}>
              1/5
            </Text>
            <Image alt="img" src={left.src} />{" "}
            <Image alt="img" src={right.src} />
          </HStack> */}
        </Stack>
      </HStack>
    </Stack>
  );
};

export default TopSellingState;
