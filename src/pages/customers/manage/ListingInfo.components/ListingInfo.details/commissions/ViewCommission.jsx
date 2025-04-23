import {HStack, Stack, VStack, Button, Text, useDisclosure, Flex, Icon} from '@chakra-ui/react';
import React from 'react';
import {Button as CustomButton} from '../../../../../../ui-lib/ui-lib.components';
import Commission from '../../../../../../components/Drawers/commission';
import {themeStyles} from 'theme';
import {FiInfo} from 'react-icons/fi';

export const ViewCommissions = ({onEditOpen, listingDetail}) => {
  const commisionModal = useDisclosure();

  return (
    <>
      <Stack {...themeStyles.card_container} spacing="16px" py="16px">
        <HStack justify="space-between">
          <Flex alignItems="center" cursor={'pointer'} onClick={commisionModal.onOpen} gap="8px">
            <Icon as={FiInfo} boxSize="16px" transform="rotate(180deg)" />
            <Text
              color="#191919"
              fontWeight={600}
              fontSize="16px"
              lineHeight="20.29px"
              // transition="ease-in-out 2ms"
              _hover={{textTransform: 'underline'}}
            >
              Commission
            </Text>
          </Flex>
          <Button
            mt={0}
            height="38px"
            width="79px"
            bg="#191919"
            color="#fff"
            fontSize="14px"
            fontWeight={500}
            onClick={onEditOpen}
            alignSelf="flex-end"
            variant="md-filled-radius"
            // borderRadius="12px"
          >
            Edit
          </Button>
        </HStack>
        {/* <HStack justify="space-between" borderBottom="1px solid #E4E4E4" pb="12px" mt="12px">
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              Internal sales team
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {parseInt(listingDetail?.internal_commission_rate).toFixed(0)}%
            </Text>
          </HStack>
          <HStack justify="space-between" pb="12px" mt="12px">
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              External registered realtors
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {parseInt(listingDetail?.external_commission_rate)?.toFixed(0)}%
            </Text>
          </HStack> */}
        <HStack spacing="10px">
          <VStack
            w="full"
            maxW="164px"
            align="flex-start"
            justify="center"
            {...themeStyles.card_container_white}
            maxH="78px"
            p="16px"
          >
            <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#525252">
              In-house Realtors
            </Text>
            <Text
              wordBreak="break-word"
              whiteSpace="break-spaces"
              fontWeight="500"
              fontSize="16px"
              lineHeight="20.29px"
              color="#191919"
            >
              {parseInt(listingDetail?.internal_commission_rate).toFixed(0)}%
            </Text>
          </VStack>
          <VStack
            w="full"
            maxW="164px"
            align="flex-start"
            justify="center"
            {...themeStyles.card_container_white}
            maxH="78px"
            p="16px"
          >
            <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#525252">
              Registered Realtors
            </Text>
            <Text
              wordBreak="break-word"
              whiteSpace="break-spaces"
              fontWeight="500"
              fontSize="16px"
              lineHeight="20.29px"
              color="#191919"
            >
              {parseInt(listingDetail?.external_commission_rate)?.toFixed(0)}%
            </Text>
          </VStack>
        </HStack>
      </Stack>
      <Commission drawerModal={commisionModal} />
    </>
  );
};

export default ViewCommissions;
