import React from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  FormControl,
  ModalOverlay,
  Select,
  Text,
  useToast,
  VStack,
  ModalHeader,
  Flex,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  StackDivider,
  Spinner,
  Center,
} from '@chakra-ui/react';
import paymentplancardIcon from '/src/images/icons/paymentplancardIcon.svg';
import {formatToCurrency} from '../../../../../utils/formatAmount';
import {useQuery} from '@tanstack/react-query';
import {fetchCustomPlanSummary} from '../../../../../apis/listings';
import {getOrdinal} from '../../../../../utils/getOrdinals';

const CustomPaymentModal = ({modalDisclosure, selectedPlan}) => {
  const {data, isError, isLoading, error} = useQuery(
    ['customPLansummary', selectedPlan?.id],
    () => fetchCustomPlanSummary(selectedPlan?.id),
    {
      enabled: !!selectedPlan?.id,
    }
  );

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={modalDisclosure.isOpen}
      onClose={modalDisclosure.onClose}
      scrollBehavior="inside"
      blockScrollOnMount={'true'}
      isCentered
      size={'md'}
      // h={'550px'}
    >
      <ModalOverlay bg="rgba(0,0,0,0.2)" />
      <ModalContent
        // mt="18vh"
        px={'23px'}
        py={'16px'}
        minH="200px"
        borderRadius="16px"
        boxShadow="0px 40px 80px -1px rgba(0, 0, 0,0.2)"
      >
        <HStack align="start" justify="space-between">
          <Image src={paymentplancardIcon.src} alt="paymentlan icon" />

          <ModalCloseButton color="#000000" position="initial" />
        </HStack>
        <ModalBody px="0px" my="0px" py="0px">
          <Heading mb="24px" fontSize={'20px'} color="#191919" fontWeight={'600'}>
            Payment Breakdown
          </Heading>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : isError ? (
            <Center mt="10%">
              <Text>
                {`${
                  error?.response?.status === 500
                    ? "Apologies for the inconvenience. We're working on it. Please try again later."
                    : error?.response?.status === 401
                    ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                    : error?.response?.data?.message ??
                      error?.response?.message ??
                      error?.message ??
                      'Something went wrong'
                }`}
              </Text>
            </Center>
          ) : (
            <VStack
              w="full"
              spacing={'none'}
              divider={<StackDivider my="12px" borderColor="#F5F5F5" />}
            >
              <HStack justify="space-between" w="full" align="start">
                <Stack spacing="5px">
                  <Text fontSize={'14px'} color="#3D3D3D" fontWeight={'400'}>
                    Initial deposit
                  </Text>
                </Stack>
                <Text fontSize={'16px'} color="#191919" fontWeight={'500'}>
                  {selectedPlan?.initial_deposit_in_value
                    ? formatToCurrency(selectedPlan?.initial_deposit_in_value)
                    : '-'}
                </Text>
              </HStack>
              {data?.data?.data.map((item, idx) => {
                return (
                  <HStack justify="space-between" align="start" key={idx} w="full">
                    <Stack spacing="5px">
                      <Text fontSize={'14px'} color="#3D3D3D" fontWeight={'400'}>
                        {`${getOrdinal(idx + 1)} Instalment`}
                      </Text>
                      <Text fontSize={'10px'} color="#606060" fontWeight={'400'}>
                        After {item?.period_in_months} month{item?.period_in_months > 1 ? 's' : ''}
                      </Text>
                    </Stack>
                    <Text fontSize={'16px'} color="#191919" fontWeight={'500'}>
                      {item?.amount ? formatToCurrency(item?.amount) : '-'}
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomPaymentModal;
