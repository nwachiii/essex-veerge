import React from 'react';
import {useRouter} from 'next/router';
import billingIcon from '/src/images/icons/billing_icon.svg';
import {Button, Popup} from '../../../ui-lib/ui-lib.components';
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

export const BillingModal = () => {
  const router = useRouter();
  const BILLING_MODAL = useDisclosure();
  const BILLING_PAYMENT = useDisclosure();

  const handleModalOpen = () => {
    BILLING_PAYMENT.onOpen();
    BILLING_MODAL.onClose();
  };

  const payment_status = 'default';
  const payment_status2 = 'paid';
  const payment_status3 = null;
  return (
    <div>
      <Button
        borderRadius="10px"
        mt={0}
        py={0}
        h="42px"
        w="100px"
        variant="dark"
        bg="transparent"
        border="1px solid #191919"
        color="#191919"
        onClick={() => router.push('/billing')}
        fontSize="14px"
        fontWeight="400"
      >
        <Flex w="full" align="center" gap="8px" justify="space-around">
          <Image objectFit={'cover'} alt="" h={'18.5px'} w="16.782px" src={billingIcon.src} />{' '}
          Billing
        </Flex>
      </Button>

      <Popup
        overflowY="auto"
        size="full"
        mt="35px"
        pb="65px"
        minW={{base: '90%', md: '60%'}}
        color="#191919"
        isOpen={BILLING_MODAL.isOpen}
        px="32px"
        minH="fit-content"
        onClose={BILLING_MODAL.onClose}
      >
        <Text fontSize="24px" fontWeight={600}>
          Recent Bill
        </Text>
        <Popup.Body h="fit-content">
          <Box w="full">
            <Flex
              mb="25px"
              align="center"
              justify="space-between"
              w="full"
              color="#191919"
              borderBottom="1px solid #F5F5F5"
              pb={2}
            >
              <Stack spacing="4px">
                <Text fontWeight={500} fontSize="16px" lineHeight="20px">
                  $ 1,500
                </Text>
                <Text fontWeight={300} fontSize="12px" lineHeight="15px">
                  17th August 2022
                </Text>
              </Stack>
              <Stack spacing="4px">
                <Text fontWeight={400} fontSize="14px" lineHeight="18px">
                  Monthly Subscription
                </Text>
                <Text fontWeight={300} fontSize="10px" lineHeight="13px" color="#4545FE">
                  Download Breakdown
                </Text>
              </Stack>
              {payment_status == 'default' ? (
                <Tag w="130px" colorScheme="red" borderRadius="full" h="36px">
                  <TagLabel mx="auto">Defaulting</TagLabel>
                </Tag>
              ) : payment_status == 'paid' ? (
                <Tag w="130px" colorScheme="teal" borderRadius="full" h="36px">
                  <TagLabel mx="auto">Paid</TagLabel>
                </Tag>
              ) : (
                <Text w="130px">{''}</Text>
              )}
              <Button
                h="44px"
                mt={0}
                w="139px"
                variant="secondary"
                onClick={() => handleModalOpen()}
              >
                Pay
              </Button>
            </Flex>
            <Flex
              mb="25px"
              align="center"
              justify="space-between"
              w="full"
              color="#191919"
              borderBottom="1px solid #F5F5F5"
              pb={2}
            >
              <Stack spacing="4px">
                <Text fontWeight={500} fontSize="16px" lineHeight="20px">
                  $ 1,500
                </Text>
                <Text fontWeight={300} fontSize="12px" lineHeight="15px">
                  17th August 2022
                </Text>
              </Stack>
              <Stack spacing="4px">
                <Text fontWeight={400} fontSize="14px" lineHeight="18px">
                  Monthly Subscription
                </Text>
                <Text fontWeight={300} fontSize="10px" lineHeight="13px" color="#4545FE">
                  Download Breakdown
                </Text>
              </Stack>
              {payment_status2 == 'default' ? (
                <Tag w="130px" colorScheme="red" borderRadius="full" h="36px">
                  <TagLabel mx="auto">Defaulting</TagLabel>
                </Tag>
              ) : payment_status2 == 'paid' ? (
                <Tag w="130px" colorScheme="teal" borderRadius="full" h="36px">
                  <TagLabel mx="auto">Paid</TagLabel>
                </Tag>
              ) : (
                <Text w="130px">{''}</Text>
              )}
              <Text w="130px">{''}</Text>
            </Flex>
            <Flex
              mb="25px"
              align="center"
              justify="space-between"
              w="full"
              color="#191919"
              borderBottom="1px solid #F5F5F5"
              pb={2}
            >
              <Stack spacing="4px">
                <Text fontWeight={500} fontSize="16px" lineHeight="20px">
                  $ 1,500
                </Text>
                <Text fontWeight={300} fontSize="12px" lineHeight="15px">
                  17th August 2022
                </Text>
              </Stack>
              <Stack spacing="4px">
                <Text fontWeight={400} fontSize="14px" lineHeight="18px">
                  Monthly Subscription
                </Text>
                <Text fontWeight={300} fontSize="10px" lineHeight="13px" color="#4545FE">
                  Download Breakdown
                </Text>
              </Stack>
              {payment_status3 == 'default' ? (
                <Tag w="130px" colorScheme="red" borderRadius="full" h="36px">
                  <TagLabel mx="auto">Defaulting</TagLabel>
                </Tag>
              ) : payment_status == 'paid' ? (
                <Tag w="130px" colorScheme="teal" borderRadius="full" h="36px">
                  <TagLabel mx="auto">Paid</TagLabel>
                </Tag>
              ) : (
                <Text w="130px">{''}</Text>
              )}
              <Text w="130px">{''}</Text>
            </Flex>
          </Box>
        </Popup.Body>
      </Popup>
      <BillingPaymentModal billingPaymentModal={BILLING_PAYMENT} BILLING_MODAL={BILLING_MODAL} />
    </div>
  );
};
export default BillingModal;

const BillingPaymentModal = ({billingPaymentModal}) => {
  return (
    <div>
      <Popup
        overflowY="auto"
        size="full"
        mt="35px"
        pb="65px"
        minW={{base: '90%', md: '60%'}}
        color="#191919"
        isOpen={billingPaymentModal.isOpen}
        px="32px"
        minH="fit-content"
        onClose={billingPaymentModal.onClose}
      >
        <Text color="#4545FE" fontSize="24px" fontWeight={600}>
          Recent Bill
        </Text>
        <Popup.Body h="fit-content">
          <VStack w="full">
            <Heading>
              Make a deposit to your wallet and your billing will be charged automatically
            </Heading>
          </VStack>
        </Popup.Body>
      </Popup>
    </div>
  );
};
