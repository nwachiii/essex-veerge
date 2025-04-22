import React from 'react';
import {ChevronRightIcon} from '@chakra-ui/icons';
import fallback from '/src/images/dashbordFallbackImage.svg';
import right from '/src/images/icons/rightemptyState.svg';
import {Box, Button, VStack, Image, HStack, Stack, Text, useDisclosure} from '@chakra-ui/react';
import left from '/src/images/icons/leftemptyState.svg';

const OutstandingOverviewState = () => {
  return (
    <Stack
      bg="#ffffff"
      borderRadius="16px"
      w={{base: '100%', md: 418}}
      py="13px"
      px="22px"
      spacing="31px"
      border="1px solid #e4e4e4"
    >
      <HStack w="full" justify="space-between" align="start">
        <Stack spacing="4px">
          <Text color="#191919" fontWeight="600" fontSize={'28px'}>
            ₦ 0
            <Text as="span" color="#CBCBCB">
              .00
            </Text>
          </Text>
          <Text fontSize={'14px'} color="#606060" fontWeight={'400'} py={1}>
            Total Outstanding Balance
          </Text>
        </Stack>
        <Button
          fontSize="12px"
          fontWeight="500"
          _hover={{
            background: 'transparent',
          }}
          as="small"
          color={'#CBCBCB'}
          variant="ghost"
          rightIcon={<ChevronRightIcon />}
        >
          view all{' '}
        </Button>
      </HStack>
      <HStack spacing="19px" align="start">
        <VStack justify="center" borderRadius="12px" w="full" maxW="154px" h="155px" bg="#F5F5F5">
          <Image alt="img" src={fallback.src} />
        </VStack>
        <Stack w="stretch" spacing="none" visibility={'hidden'}>
          <Text mb="47px" fontSize={'20px'} fontWeight={600}>
            None
          </Text>
          <Text color="#FF3636" fontWeight="600" fontSize={'14px'}>
            ₦ 0
            <Text as="span" color="#CBCBCB">
              .00
            </Text>
          </Text>
          <Text fontSize="12px" fontWeight="400" color="#606060">
            Outstanding Balance
          </Text>
          <HStack w="full" justify="end" spacing="11px" mt="25px">
            <Text fontSize={'14px'} fontWeight={400}>
              1/5
            </Text>
            <Image alt="img" src={left.src} /> <Image alt="img" src={right.src} />
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default OutstandingOverviewState;
