import React from 'react';
import {
  AbsoluteCenter,
  Avatar,
  Box,
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
  StackDivider,
  Tag,
  TagLabel,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {FormatToColorfulCurrency} from 'utils/formatAmount';
import {changeDateFormat} from 'utils/formatDate';
import {ChevronRightIcon} from '@chakra-ui/icons';
import LevyTags from '../components/utils/levyTags';

const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
const CustomerLevyProfile = ({setScreen}) => {
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
            onClick={() => setScreen('track payment')}
          />
          <Text fontSize="16px" fontWeight={600} color="#18181b">
            Levy Payment
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
          <Stack spacing="12px" w="full">
            <Stack
              spacing="16px"
              w="full"
              bg="#fbfcfc"
              border="0.5px solid #e4e4e7"
              borderRadius="4px"
              p="12px"
              minH="119px"
              divider={<StackDivider h="0.5px" bg="#e4e4e7" border="none" />}
            >
              <Stack w="full" spacing="12px">
                <Flex gap="8px" alignItems="center" w="full">
                  <Text fontSize="13px" fontWeight={400} color="#52525b">
                    To:
                  </Text>
                  <HStack sx={customScrollStyle} w="full">
                    {[1].map(() => (
                      <LevyTags text="Everyone" type="everyone" />
                    ))}
                  </HStack>
                </Flex>
                <HStack justify="space-between" w="full">
                  <Text fontSize="16px" fontWeight={500} color="#27272a">
                    {'Security Levy'}
                  </Text>

                  <FormatToColorfulCurrency
                    amount={1200000}
                    fontSize="16px"
                    fontWeight="600"
                    color="#18181b"
                    decimalStyle={{
                      color: '#919191',
                    }}
                  />
                </HStack>
              </Stack>
              {true ? (
                <LevyTags text="Completed" />
              ) : (
                <Flex alignItems="center" gap="12px" w="full">
                  <Text color="#3f3f46" fontSize="14px" fontWeight="500">
                    40%
                  </Text>
                  <Box w="full" bg="#e4e4e7" overflow="hidden" borderRadius="4px" h="8px">
                    <Box
                      w="40%"
                      borderRadius="4px"
                      bg="#22c55e"
                      h="full"
                      transition="0.8s ease-in-out"
                    />
                  </Box>
                </Flex>
              )}
            </Stack>
            <Stack
              spacing="12px"
              w="full"
              bg="#fbfcfc"
              border="0.5px solid #e4e4e7"
              borderRadius="4px"
              p="12px"
              minH="119px"
              divider={<StackDivider h="0.5px" bg="#e4e4e7" border="none" />}
            >
              <Flex w="full" alignItems="center" justify="space-between">
                <Text fontSize="13px" fontWeight="400" color="#424242">
                  Updated By
                </Text>
                <HStack alignItems="center" spacing="12px">
                  <Avatar boxSize="32px" />
                  <Text fontSize="16px" fontWeight={500} color="#27272a">
                    Olivia Rhye
                  </Text>
                </HStack>
              </Flex>
              <Flex alignItems="center" w="full" justify="space-between">
                <Text fontSize="13px" fontWeight="400" color="#424242">
                  Amount Paid
                </Text>
                <FormatToColorfulCurrency
                  amount={100000}
                  fontSize="16px"
                  fontWeight="600"
                  color="#18181b"
                  decimalStyle={{
                    color: '#919191',
                  }}
                />
              </Flex>
              <Flex alignItems="center" w="full" justify="space-between">
                <Text fontSize="13px" fontWeight="400" color="#424242">
                  Payment Receipt
                </Text>
                <Button
                  as="a"
                  fontWeight={500}
                  fontSize="16px"
                  l
                  target="_blank"
                  variant="link"
                  color="#4545FE"
                  cursor="pointer"
                  href={''}
                  rightIcon={<ChevronRightIcon />}
                  iconSpacing="1px"
                >
                  view
                </Button>
              </Flex>
              <Flex alignItems="center" w="full" justify="space-between">
                <Text fontSize="13px" fontWeight="400" color="#424242">
                  Payment Date
                </Text>

                <Text fontSize="16px" fontWeight={500} color="#27272a">
                  {changeDateFormat('02/02/2025')}
                </Text>
              </Flex>
            </Stack>
          </Stack>
        )}
      </DrawerBody>
      {true ? null : (
        <DrawerFooter p="20px 30px" borderTop="0.5px solid #e4e4e7">
          <Button variant="md-filled-radius" w="full">
            Update Payment
          </Button>
        </DrawerFooter>
      )}
    </>
  );
};

export default CustomerLevyProfile;
