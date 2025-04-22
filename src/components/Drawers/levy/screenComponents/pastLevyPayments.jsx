import React from 'react';
import {
  AbsoluteCenter,
  Button,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {FormatToColorfulCurrency} from 'utils/formatAmount';
import {IoArrowBackSharp} from 'react-icons/io5';
import LevyTable from '../components/levyTable';
import {PastPaymentRowComponent} from '../components/table/pastAndIncomingPaymentRowComponent';
import PaymentFilter from '../components/paymentFilter';

const PastLevyPayments = ({setScreen}) => {
  let error;
  return (
    <>
      <HStack
        borderBottom="0.5px solid #e4e4e7"
        box-shadow=" 0px 2px 4px 0px #0000000D"
        py="7px"
        bg="#fafafa"
        h="50px"
        px="20px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap="10px">
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={() => setScreen('more options')}
          />
          <Text fontSize="16px" fontWeight={600} color="#18181b">
            Past Payment
          </Text>
        </Flex>
      </HStack>
      <DrawerBody pt="24px" px={'20px'}>
        {false ? (
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        ) : false ? (
          <AbsoluteCenter>
            <Text fontSize="11px" fontWeight="400" color="#52525b">
              {error?.message === 'Network Error'
                ? 'Please check your network connection'
                : error?.response?.status === 500
                  ? "Apologies for the inconvenience. We're working on it. Please try again later."
                  : error?.response?.status === 401
                    ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                    : (error?.response?.data?.message ??
                      error?.response?.message ??
                      error?.message ??
                      'Something went wrong')}
            </Text>
          </AbsoluteCenter>
        ) : (
          <Stack spacing="24px" w="full">
            <HStack justify="space-between" w="full">
              <Text fontSize="13px" fontWeight="400" color="#52525B">
                View Method
              </Text>
              <PaymentFilter type="past" />
            </HStack>

            <VStack
              spacing="8px"
              w="full"
              bg="#fbfcfc"
              border="0.5px solid #e4e4e7"
              borderRadius="4px"
              p="12px"
              minH="90px"
            >
              <Text fontSize="13px" fontWeight={400} color="#52525b">
                Total Past Payment
              </Text>

              <FormatToColorfulCurrency
                amount={1200000}
                fontSize="23px"
                fontWeight="600"
                color="#4545fe"
                decimalStyle={{
                  color: '#919191',
                }}
              />
            </VStack>
            <LevyTable Component={PastPaymentRowComponent} data={[1, 2, 2, 2, 2]} />
          </Stack>
        )}
      </DrawerBody>
    </>
  );
};

export default PastLevyPayments;
