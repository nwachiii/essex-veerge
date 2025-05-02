/* eslint-disable jsx-a11y/aria-proptypes */
import {
  HStack,
  Image,
  Text,
  VStack,
  Button,
  Box,
  Heading,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useDisclosure,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Input,
  InputGroup,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  StackDivider,
} from '@chakra-ui/react';
import filter_icon from '/src/images/icons/filter-icon.svg';
import React, {useState} from 'react';
// import OptionsToRadio from './OptionsToRadio';
import {useRouter} from 'next/router';

import {violationConstants} from 'constants/violation/radioConstants';

import {
  violationUnits,
  violationinspectorAndPatrolConstant,
} from 'constants/violation/filterConstant';
import FilterSearch from '@/components/violations/filterSearch';
import OptionToRadioViolation from '@/components/violations/optionToRadioViolation';
import ViolationDateRange from '@/components/violations/dateRange';


const ViolationFilter = ({forFilter}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [toBeFiltered, setToBeFiltered] = useState({});
  const router = useRouter();
  const handleRange = e => setToBeFiltered({...toBeFiltered, price_from: e[0], price_to: e[1]});

  const handleAmount = event => {
    const input = event.target.value || '';
    const name = event.target.name || '';

    let val = input;

    const cleanedString = val.replace(/[^\d]/g, '');

    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length === 0) {
      val = '0.00';
    } else if (length === 1) {
      val = '0.0' + val;
    } else if (length === 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }

    // setFieldValue(name, val);
    setToBeFiltered({...toBeFiltered, [name]: val});
  };

  const handleChange = e => {
    if (e.target?.name === 'reset') {
      return setToBeFiltered({});
    }
    if (e.target?.name?.toLowerCase() === 'number_of_bedroom') {
      return setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: e.target.textContent,
      });
    }

    return setToBeFiltered({
      ...toBeFiltered,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    const mergedQuery = {
      ...router.query,
      page: 1,
    };
    delete mergedQuery.filter;
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });

    setToBeFiltered({});

    return onClose();
  };

  const applyFilter = () => {
    toast
  };

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
      backgroundColor: '#0000004D',
    },
  };

  return (
    <>
      <Tooltip
        placeContent="center"
        px="5.2px"
        h="29.6px"
        bg="black"
        borderRadius="3.62px"
        label="Filter"
      >
        <Button
          onClick={onOpen}
          bg="#fff"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          _hover={{
            bg: 'rgba(0,0,0,0.1)',
            borderColor: '#919191',
            img: {opacity: '0.5'},
          }}
          color="#191919"
          p="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="36px"
          w="36px"
          minW="36px"
          border="0.5px solid #E4E4E7"
          borderRadius="8.12px"
        >
          <Image w="16px" minW="16px" h="16px" src={filter_icon.src} alt="filter  icon" />{' '}
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff" p="0px">
          <HStack
            mb="20px"
            py="12px"
            h="49.699px"
            bg="#F5F5F5"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Filter
            </Heading>
            <HStack align="center" justify="space-between">
              <Text
                as="button"
                color="#4545FE"
                cursor="pointer"
                fontSize="14px"
                fontWeight="300"
                border="none"
                name="reset"
                onClick={handleReset}
              >
                Reset
              </Text>
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
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    my="auto"
                    color="#000"
                    top="0"
                    bottom="0"
                  />
                </VStack>
              </HStack>
            </HStack>
          </HStack>
          <DrawerBody sx={customScrollbarStyles} p="0px" pl="20px" pr="14.5px" mr="7px">
            <VStack
              divider={<StackDivider border="none" h="0.68px" bg="#f4f4f5" />}
              align="flex-start"
              pl="5px"
              spacing="16px"
              w="full"
            >
              <FilterSearch {...violationUnits} />
              <FilterSearch {...violationinspectorAndPatrolConstant} />

              <OptionToRadioViolation
                options={toBeFiltered}
                setOption={setToBeFiltered}
                constants={violationConstants}
              />
              <ViolationDateRange />
            </VStack>
          </DrawerBody>
          <DrawerFooter p="20px 30px" borderTop="0.5px solid #e4e4e7">
            <Button
              onClick={applyFilter}
              w="full"
              h="36.6px"
              borderRadius="72px"
              bg={'#000000'}
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'13px'}
              _hover={{
                shadow: 'md',
              }}
              _active={{
                opacity: 0.8,
              }}
            >
              Apply Filter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ViolationFilter;
