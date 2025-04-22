import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Box, DrawerBody, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import {FormatToColorfulCurrency} from 'utils/formatAmount';
import {IoArrowBackSharp} from 'react-icons/io5';

import {motion} from 'framer-motion';

import SearchInput from '@/components/Drawers/levy/components/utils/searchInput';
import {changeDateFormat} from 'utils/formatDate';
import LevyProgressComponent from '@/components/Drawers/levy/components/utils/levyProgressComponent';

const IndividualLevy = ({handleScreen}) => {
  const [active, setActive] = useState(false);
  const [isPaid, setIsPaid] = useState(true);
  const [activeWidth, setActiveWidth] = useState('');
  const paidTextRef = useRef(null);
  const outStandingTextRef = useRef(null);
  useLayoutEffect(() => {
    if (paidTextRef.current) setActiveWidth(paidTextRef.current.offsetWidth);
  }, []);

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
        alignItems="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap="10px">
          <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={handleScreen('options')} />
          <Box overflowX="hidden" transition="0.3s ease-in-out" w={active ? '0px' : '42px'}>
            <Text
              wordBreak="keep-all"
              whiteSpace="none"
              fontSize="16px"
              fontWeight={600}
              color="#18181b"
              w="42px"
            >
              Levy
            </Text>
          </Box>
        </Flex>

        <SearchInput
          inputStyles={{
            h: '36px',
          }}
          addonStyles={{
            h: '36px',
            w: '36px',
          }}
          inputGroupWrapper={isActive => (
            setActive(isActive),
            {
              border: '0.5px solid ',
              borderColor: '#52525b',
              w: isActive ? '260px' : '36px',
              h: '36px',
            }
          )}
        />
      </HStack>
      <DrawerBody maxW="400px" minW="400px" pt="24px" px={'20px'}>
        <Stack spacing="12px" w="full">
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
          {isPaid
            ? [1, 2].map((item, idx) => <LevyInfo />)
            : [1, 2, 2, 2].map((itm, idx) => <LevyInfo forOutstanding />)}
        </Stack>
      </DrawerBody>
    </>
  );
};

export default IndividualLevy;

const LevyInfo = ({isCompleted, forOutstanding}) => {
  return (
    <Stack
      spacing="16px"
      w="full"
      bg="#fbfcfc"
      border="0.5px solid #e4e4e7"
      borderRadius="4px"
      p="12px"
    >
      <Text fontSize="11px" fontWeight="400" color="#52525b">
        {changeDateFormat('02/02/2025', 'add_time').replace(',', ' |')}
      </Text>{' '}
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
      {forOutstanding ? null : <LevyProgressComponent />}
    </Stack>
  );
};
