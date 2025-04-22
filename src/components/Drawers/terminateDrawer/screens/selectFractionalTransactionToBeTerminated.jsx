import {
  AbsoluteCenter,
  Center,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {FormatToColorfulCurrency} from 'utils/formatAmount';
import {changeDateFormat} from 'utils/formatDate';

const SelectFractionalTransactionToBeTerminated = ({
  navigateBack,
  setId,
  handleScreen,
  FRACTIONALTXN,
}) => {
  const PREV_PAYMENT = FRACTIONALTXN?.data?.data?.data?.fractional_history_data;
  const navigateToNextScreen = id => () => {
    setId(id);
    return handleScreen('2fa');
  };
  return (
    <>
      <HStack
        boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
        py="12px"
        bg="#F5F5F5"
        h="49.7px"
        px="23.2px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap={2}>
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={navigateBack('confirm request')}
          />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Terminate
          </Text>
        </Flex>
        <HStack spacing="15px">
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton position="initial" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody pt="24px" px={'24px'}>
        <Heading
          fontSize="16px"
          fontWeight="20.29px"
          color="#0D0D0D
"
        >
          Select transaction to terminate
        </Heading>
        {FRACTIONALTXN.isLoading ? (
          <Center mt="20vh">
            <Spinner />
          </Center>
        ) : FRACTIONALTXN.isError ? null : (
          <Stack mt="16px" spacing="16px" w="full">
            {PREV_PAYMENT.map((item, idx) => (
              <Flex
                cursor="pointer"
                role="button"
                onClick={navigateToNextScreen(item.id)}
                aria-label="fractional transaction button"
                borderRadius="4px"
                border="1px solid #e4e4e4"
                bg="#f9fafb"
                p="12px 13px"
                key={idx}
                minH="59px"
                justify="space-between"
                w="full"
              >
                <Stack spacing="4px">
                  <FormatToColorfulCurrency
                    amount={item.price_per_fraction}
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="17.75px"
                    decimalStyle={{color: '#606060'}}
                  />
                  <Text
                    textAlign="start"
                    fontSize="10px"
                    fontWeight="400"
                    lineHeight="12.68px"
                    color="#606060"
                  >
                    {item.amount}
                  </Text>
                </Stack>
                <Stack spacing="4px">
                  <FormatToColorfulCurrency
                    amount={item.purchase_price}
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="17.75px"
                    decimalStyle={{color: '#606060'}}
                  />
                  <Text
                    textAlign="end"
                    fontSize="10px"
                    fontWeight="400"
                    lineHeight="12.68px"
                    color="#606060"
                  >
                    {changeDateFormat(item.created_at, 'monthFirst')}
                  </Text>
                </Stack>
              </Flex>
            ))}
          </Stack>
        )}
      </DrawerBody>
    </>
  );
};

export default SelectFractionalTransactionToBeTerminated;
