import React, {useState} from 'react';
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
  Image,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';
import FilterIcon from '@/components/assets/filterIcon';
import SearchIcon from '@/components/assets/searchIcon';
import {changeDateFormat} from 'utils/formatDate';
import StarIcon from '@/components/assets/starIcon';
import {FormatToColorfulCurrency} from 'utils/formatAmount';
import {CiMenuKebab} from 'react-icons/ci';
import SearchInput from '../components/utils/searchInput';
import {motion} from 'framer-motion';
import LevyHistoryMenu from '../components/levyHistoryMenu';
import LevyTags from '../components/utils/levyTags';
import LevyHistoryFilter from '../components/levyHistoryFilter';
const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
const LevyHistory = ({setScreen, setMainScreen}) => {
  const [active, setActive] = useState(false);
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
            onClick={() => setMainScreen('more options')}
          />
          <Box overflowX="hidden" transition="0.3s ease-in-out" w={active ? '0px' : '95px'}>
            <Text
              wordBreak="keep-all"
              whiteSpace="none"
              w="95px"
              fontSize="16px"
              fontWeight={600}
              color="#18181b"
            >
              Levy History
            </Text>
          </Box>
        </Flex>

        <HStack spacing="13px">
          <SearchInput
            inputStyles={{
              h: '36px',
            }}
            addonStyles={{
              h: '36px',
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
          {/* <FilterIcon /> */}
          <LevyHistoryFilter />
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
            {[1, 2].map((item, idx) => (
              <Stack
                key={idx}
                spacing="16px"
                w="full"
                bg="#fbfcfc"
                border="0.5px solid #e4e4e7"
                borderRadius="4px"
                p="12px"
                minH="119px"
              >
                <HStack justify="space-between" w="full">
                  <Flex gap="8px">
                    {true ? <StarIcon /> : null}
                    <Text fontSize="11px" fontWeight="400" color="#52525b">
                      {changeDateFormat('02/02/2025', 'add_time').replace(',', ' |')}
                    </Text>{' '}
                  </Flex>
                  <LevyHistoryMenu setScreen={setScreen} />
                </HStack>
                <Flex gap="8px" alignItems="center" w="full">
                  <Text fontSize="13px" fontWeight={400} color="#52525b">
                    To:
                  </Text>
                  <HStack sx={customScrollStyle} w="full">
                    <LevyTags text="Everyone" type="everyone" />
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
            ))}
          </Stack>
        )}
      </DrawerBody>
    </>
  );
};

export default LevyHistory;
