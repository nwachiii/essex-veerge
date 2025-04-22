import React, {useState} from 'react';
import Link from 'next/link';
import {OTPInput} from 'chakra-otp-input';
import {
  VStack,
  Textarea,
  Image,
  Tag,
  TagLabel,
  Flex,
  Text,
  Stack,
  useDisclosure,
  Box,
  Divider,
} from '@chakra-ui/react';

import {Button, Popup, CustomTag} from 'ui-lib';
import refundIcon from '/src/images/refund-image.png';
import SuccessGif from '/src/images/icons/purple-success-icon.gif';
import {themeStyles} from '/src/theme';
import {useQuery} from '@tanstack/react-query';
import {handleDateFormat, handleDateTime} from '/src/utils/formatDate';
import {formatAmountWithDecimal, priceString} from '../../utils/formatAmount';
import {fetchAllWithdrawalTxns} from '../../apis/account';

export const ViewWithdrawalDetails = ({type, id, data}) => {
  const DetailModal = useDisclosure();
  // const ACCOUNT__WITHDRAWAL__TXNS = useQuery(['withdrawal-txns'], fetchAllWithdrawalTxns);

  // console.log('single view withdrawal details', data);
  return (
    <div>
      <Button
        onClick={() => DetailModal.onOpen()}
        mt={0}
        variant="secondary"
        border="1px solid #4545FE"
        borderRadius="12px"
        w="105px"
        py={0}
        my={0}
        h="35px"
      >
        View
      </Button>
      <Popup
        // p='45px'
        pb="15px"
        minH="483px"
        h="fit-content"
        minW={{base: '90%', md: '478px'}}
        isOpen={DetailModal.isOpen}
        onClose={DetailModal.onClose}
        isCentered
        size="full"
        mt="17vh"
      >
        <Popup.Body h="auto">
          <VStack w="full" px={0.2} spacing={4}>
            <Image alt="" src={refundIcon.src} mx="auto" boxSize="130px" />
            <Stack textAlign="center" spacing="2px" w="full">
              <Text fontSize="14px">Transacted amount</Text>
              <Text color={themeStyles.color.primary} fontSize="24px" fontWeight={600}>
                {formatAmountWithDecimal(data?.amount)}
              </Text>
            </Stack>
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="14px">Status</Text>
              <Text mx="auto" my={2}>
                <CustomTag
                  variant={`${
                    data?.status == 'pending'
                      ? 'orange'
                      : data?.status == 'success'
                        ? 'green'
                        : data?.status == 'reversed'
                          ? 'purple'
                          : data?.status == 'failed'
                            ? 'red'
                            : null
                  }`}
                  text={`${
                    data?.status == 'pending'
                      ? 'Pending'
                      : data?.status == 'success'
                        ? 'Success'
                        : data?.status == 'reversed'
                          ? 'Reversed'
                          : data?.status == 'failed'
                            ? 'Failed'
                            : null
                  }`}
                />
              </Text>

              <Text fontSize="16px">
                {handleDateFormat(data?.created_at)} <b>|</b> {handleDateTime(data?.created_at)} ⏰
              </Text>
            </Stack>
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="14px">Description</Text>
              <Text
                fontSize="14px"
                color="#191919"
                fontWeight={600}
                maxW="300px"
                wordWrap="break-word"
              >
                {data?.description}
              </Text>
            </Stack>

            {data?.transaction_type?.toLowerCase() !== 'commission' && (
              <Stack textAlign="center" spacing="2px">
                <Text fontSize="14px">Transaction type</Text>

                <CustomTag
                  variant={`${
                    data?.transaction_type == 'commission'
                      ? 'orange'
                      : data?.transaction_type == 'withdrawal'
                        ? 'green'
                        : data?.transaction_type == 'settlement'
                          ? 'purple'
                          : null
                  }`}
                  text={`${
                    data?.transaction_type == 'commission'
                      ? 'Commission'
                      : data?.transaction_type == 'withdrawal'
                        ? 'Withdrawal'
                        : data?.transaction_type == 'settlement'
                          ? 'Settlement'
                          : null
                  }`}
                />
              </Stack>
            )}
            {data?.transaction_type?.toLowerCase() == 'commission' && (
              <Stack textAlign="center" spacing="2px">
                <Text fontSize="14px">Commission</Text>
                <Text color={themeStyles.color.matador__green} fontSize="24px" fontWeight={600}>
                  {formatAmountWithDecimal(data?.amount)}
                </Text>
              </Stack>
            )}
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="14px">Client</Text>
              <Text fontSize="14px" color="#191919" fontWeight={600}>
                {`${data?.user?.first_name} ${data?.user?.last_name}`}
              </Text>
            </Stack>
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="14px">Ref</Text>
              <Text fontSize="14px" color="#191919" fontWeight={600}>
                {data?.reference}
              </Text>
            </Stack>
          </VStack>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default ViewWithdrawalDetails;
