import React from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  SlideFade,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {FormatToColorfulCurrency} from 'utils/formatAmount';
import {changeDateFormat} from 'utils/formatDate';
import {IoArrowBackSharp} from 'react-icons/io5';

const UpdateDepositHistory = ({handleScreen, isError, error, isLoading, manualTransactions}) => {
  const loggedinUserFromLocalStorage =
    typeof window !== 'undefined' &&
    localStorage.getItem('loggedinUser') !== 'undefined' &&
    JSON.parse(localStorage.getItem('loggedinUser'));

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
    },
  };
  console.log('manualTransactions', manualTransactions);
  return (
    <>
      <HStack
        boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
        mb="10px"
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
            onClick={handleScreen('input transaction info')}
          />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Update Deposit History
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
      <DrawerBody pb="10px" mb="10px" sx={customScrollbarStyles} px="28.9px" pr="17.9px" mr="8px">
        <Stack spacing="16px" w="full">
          {isLoading ? (
            <AbsoluteCenter>
              <Spinner />
            </AbsoluteCenter>
          ) : isError ? (
            <AbsoluteCenter>
              <Text fontSize="16px" fontWeight="400">
                {`${
                  error?.response?.status === 500 || error?.response?.status === 400
                    ? "Apologies for the inconvenience. We're working on it. Please try again later."
                    : error?.response?.status === 401
                      ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                      : (error?.response?.data?.message ??
                        error?.response?.message ??
                        error?.message ??
                        'Something went wrong')
                }`}
              </Text>
            </AbsoluteCenter>
          ) : (
            manualTransactions?.map((info, idx) => (
              <Stack key={idx} border="1px solid #e4e4e4" borderRadius="8px" spacing="8px" p="12px">
                <Text fontSize="7.216px" fontWeight="400" color="#3d3d3d">
                  Initiated By
                </Text>
                <HStack spacing="8px">
                  <Image
                    borderRadius="full"
                    fontSize="8px"
                    src={info?.processed_by?.avatar || info?.customer?.avatar}
                    bg="#f5f5f5"
                    aspectRatio={1}
                    alt="profile image"
                    width="36px"
                  />
                  <Stack spacing="4px">
                    <Text
                      fontSize="12px"
                      textTransform="capitalize"
                      fontWeight="500"
                      color="#191919"
                    >
                      {`${info?.processed_by?.first_name} ${info?.processed_by?.last_name}`}{' '}
                      {info?.processed_by?.id === loggedinUserFromLocalStorage?.id ? '(you)' : null}
                    </Text>
                    <Text fontSize="11.222px" fontWeight="400" color="#4545FE">
                      {info?.processed_by?.email}
                    </Text>
                  </Stack>
                </HStack>
                <HStack
                  padding="12px"
                  borderRadius="4px"
                  bg="#f5f5f5"
                  align="start"
                  justifyContent="space-between"
                  w="full"
                >
                  <Stack spacing="none">
                    <Text fontSize=" 7.216px" fontWeight="400" color="#3d3d3d">
                      Amount
                    </Text>
                    <FormatToColorfulCurrency
                      amount={info?.amount}
                      fontSize="12px"
                      fontWeight="600"
                      decimalStyle={{color: '#4545FE', fontSize: '12px', fontWeight: '600'}}
                      color="#4545FE"
                      lens={20}
                    />
                  </Stack>
                  <Stack spacing="none">
                    <Text fontSize=" 7.216px" fontWeight="400" color="#3d3d3d">
                      Deposit Date
                    </Text>
                    <Text fontSize="12px" fontWeight="600" color="#191919">
                      {changeDateFormat(info?.created_at)}
                    </Text>
                  </Stack>
                  <Stack spacing="none">
                    <Text fontSize="7.216px" fontWeight="400" color="#3d3d3d">
                      Date Updated
                    </Text>
                    <Text fontSize="12px" fontWeight="600" color="#191919">
                      {changeDateFormat(info?.updated_at)}
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            ))
          )}
        </Stack>
      </DrawerBody>
    </>
  );
};

export default UpdateDepositHistory;
