import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  AbsoluteCenter,
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
  Text,
  Textarea,
} from '@chakra-ui/react';
import {FormatToColorfulCurrency} from 'utils/formatAmount';
import {IoArrowBackSharp} from 'react-icons/io5';
import {GoPlus} from 'react-icons/go';
import {motion} from 'framer-motion';
import LevyTable from '../components/levyTable';
import {
  TrackOutstandingPaymentsRowComponent,
  TrackPaidPaymentsRowComponent,
} from '../components/table/trackPayment';
import LevyTags from '../components/utils/levyTags';

const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const TrackPayment = ({setScreen}) => {
  const [isPaid, setIsPaid] = useState(true);
  const [activeWidth, setActiveWidth] = useState('');
  const paidTextRef = useRef(null);
  const outStandingTextRef = useRef(null);
  useLayoutEffect(() => {
    if (paidTextRef.current) setActiveWidth(paidTextRef.current.offsetWidth);
  }, []);

  const Component = isPaid ? TrackPaidPaymentsRowComponent : TrackOutstandingPaymentsRowComponent;
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
            onClick={() => setScreen('levy history')}
          />
          <Text fontSize="16px" fontWeight={600} color="#18181b">
            Levy Payment
          </Text>
        </Flex>

        <HStack
          p="8px"
          justifyContent="center"
          role="button"
          boxSize="36px"
          border="0.5px solid #52525b"
          borderRadius="8px"
          spacing="13px"
          onClick={() => setScreen('add new subscribers')}
        >
          <Icon as={GoPlus} color="#52525b" />
        </HStack>
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
              onClick={() => setScreen('customer levy profile')}
              minH="119px"
            >
              <Flex gap="8px" alignItems="center" w="full">
                <Text fontSize="13px" fontWeight={400} color="#52525b">
                  To:
                </Text>
                <HStack sx={customScrollStyle} w="full">
                  {[1, 2, 2].map(() => (
                    // <HStack
                    //   p="8px"
                    //   bg="#f4f4f5"
                    //   border="0.5px solid #e4e4e5"
                    //   borderRadius="34px"
                    //   h="32px"
                    // >
                    //   <Text fontSize="12px" fontWeight={400} color="#000000">
                    //     Everyone
                    //   </Text>
                    // </HStack>
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
            <Stack w="full" spacing="4px">
              <HStack w="full" justify="space-between">
                <Text
                  fontSize="13px"
                  fontWeight="400"
                  color={isPaid ? '#000000' : '#a1a1a1'}
                  cursor="pointer"
                  transition="0.3s ease-in-out"
                  onClick={() => (setActiveWidth(paidTextRef.current.offsetWidth), setIsPaid(true))}
                  ref={paidTextRef}
                >
                  Paid
                </Text>
                <Text
                  transition="0.3s ease-in-out"
                  fontSize="13px"
                  fontWeight="400"
                  color={!isPaid ? '#000000' : '#a1a1a1'}
                  cursor="pointer"
                  onClick={() => (
                    setActiveWidth(outStandingTextRef.current.offsetWidth), setIsPaid(false)
                  )}
                  ref={outStandingTextRef}
                >
                  Outstanding
                </Text>
              </HStack>
              <Box
                pos="relative"
                display="flex"
                justifyContent={isPaid ? 'start' : 'end'}
                h="0.5px"
                bg="#e4e4e7"
                w="full"
              >
                <Box
                  as={motion.div}
                  layout
                  w={`calc( 3px + ${activeWidth}px)`}
                  position="relative"
                  h="3px"
                  bg="#000000"
                  borderRadius="3px"
                  top="-1.5px"
                />
              </Box>
            </Stack>
            <LevyTable
              data={[1, 2]}
              handlers={{
                setScreen,
              }}
              Component={Component}
            />
          </Stack>
        )}
      </DrawerBody>
    </>
  );
};

export default TrackPayment;
