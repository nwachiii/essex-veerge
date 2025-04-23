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
} from '@chakra-ui/react';
import filter_icon from '/src/images/icons/filter_icon.svg';
import React, {useState} from 'react';
import OptionsToRadio from './OptionsToRadio';
import {useRouter} from 'next/router';
import {formatToCurrency} from 'utils/formatAmount';
import {constants} from 'constants/listings/constantsForListingsFilter';
import {PriceMenu} from 'pages/communities/create/WholeUnits/WholeUnits.Form';

const Filter = ({forFilter}) => {
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
    if (!Object.entries(toBeFiltered).length) {
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
    }
    const filter_param = `${Object.entries(toBeFiltered)
      .map(([name, value]) => {
        if (value === 'Any') {
          return null;
        }
        if (Array.isArray(value)) {
          return value.map(v => `${name}=${v}`);
        }
        return `${
          name === 'number_of_bedroom' ? (value.includes('+') ? 'bedroom_above' : name) : name
        }=${
          name === 'number_of_bedroom'
            ? value.includes('+')
              ? value.replace('+', '')
              : value
            : value
        }`;
      })
      .filter(item => item)
      .join('&')}`;

    const defaultQuery = {
      filter: `${filter_param}`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    setToBeFiltered({});
    return onClose();
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
      backgroundColor: '#606060',
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
          border="0.5px solid #E4E4E4"
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
          <DrawerBody sx={customScrollbarStyles} p="0px" pl="20px" pr="20.5px" mr="7px">
            <VStack align="flex-start" pl="5px" spacing="13px" w="full">
              <VStack
                w="full"
                align="flex-start"
                pb="13px"
                borderBottom="1px solid #E4E4E4"
                spacing="6px"
              >
                <Heading alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Number of Bedroom
                </Heading>
                <HStack maxW="326px" spacing="9.47px">
                  {['Any', '1', '2', '3', '4', '5', '6', '7+'].map((item, idx) => (
                    <Button
                      borderRadius="8.1px"
                      fontSize="10.2px"
                      key={idx}
                      bg={item === toBeFiltered.number_of_bedroom ? '#191919' : '#F5F5F5'}
                      color={item === toBeFiltered.number_of_bedroom ? '#ffffff' : '#3D3D3D'}
                      px="11px"
                      w="26px"
                      minW="fit-content"
                      py="5.5px"
                      h="25px"
                      onClick={handleChange}
                      _active={{opacity: '1'}}
                      _focus={{opacity: '1'}}
                      _hover={{opacity: '1'}}
                      name="number_of_bedroom"
                      lineHeight="14px"
                    >
                      {item}
                    </Button>
                  ))}
                </HStack>
              </VStack>
              <VStack
                w="full"
                pb="13px"
                align="flex-start"
                borderBottom="1px solid #E4E4E4"
                spacing="none"
              >
                <Heading mb="10px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Price
                </Heading>
                <HStack w="full" spacing="31px" justify="space-between">
                  {/* <RangeSlider
                    w="316px"
                    aria-label={['min', 'max']}
                    min={forFilter?.min_price ?? 0}
                    max={forFilter?.max_price ?? 0}
                    value={[toBeFiltered?.price_from ?? 0, toBeFiltered?.price_to ?? 0]}
                    onChange={handleRange}
                  >
                    <RangeSliderTrack bg="#E4E4E4" h="7.44px" borderRadius="8px">
                      <RangeSliderFilledTrack bg="#000000" />
                    </RangeSliderTrack>
                    <RangeSliderThumb
                      index={0}
                      bg="black"
                      boxSize="20.9px"
                      border="solid 2px white"
                    />
                    <RangeSliderThumb
                      index={1}
                      boxSize="20.9px"
                      border="solid 2px white"
                      bg="black"
                    />
                  </RangeSlider> */}
                  <Stack spacing="none">
                    <Text fontSize="9.52px" fontWeight="400" color="#191919" lineHeight="16px">
                      Min
                    </Text>

                    <InputGroup
                      align="center"
                      border="1px solid #E4E4E4"
                      h="34px"
                      w="full"
                      borderRadius={'5.44px'}
                      display="flex"
                    >
                      <PriceMenu
                        wrapperStyle={{
                          gap: '-5px',
                          marginLeft: '11.56px',
                        }}
                        styleForIcon={{transform: 'scale(0.9)'}}
                        fillForNairaSvgIcon="#12D8A0"
                        disableMenu
                      />
                      <Divider orientation="vertical" ml="6.84px" height="full" />
                      <Input
                        type="text"
                        border="none"
                        w="full"
                        h="full"
                        _focus={{
                          border: 'none',
                          boxShadow: 'none',
                          outline: 'none',
                        }}
                        _active={{
                          border: 'none',
                          boxShadow: 'none',
                          outline: 'none',
                        }}
                        _focusVisible={{
                          border: 'none',
                          boxShadow: 'none',
                          outline: 'none',
                        }}
                        placeholder="0.00"
                        fontSize="9.52px"
                        fontWeight="500"
                        color="#606060"
                        lineHeight="15.3px"
                        name={`price_from`}
                        onChange={event => handleAmount(event)}
                        value={formatToCurrency(toBeFiltered?.price_from ?? 0)}
                      />
                    </InputGroup>
                  </Stack>
                  <Stack spacing="none">
                    <Text fontSize="9.52px" fontWeight="400" color="#191919" lineHeight="16px">
                      Max
                    </Text>

                    <InputGroup
                      align="center"
                      border="1px solid #E4E4E4"
                      h="34px"
                      w="full"
                      borderRadius={'5.44px'}
                      display="flex"
                    >
                      <PriceMenu
                        wrapperStyle={{
                          gap: '-5px',
                          marginLeft: '11.56px',
                        }}
                        styleForIcon={{transform: 'scale(0.9)'}}
                        fillForNairaSvgIcon="#12D8A0"
                        disableMenu
                      />
                      <Divider orientation="vertical" ml="4px" height="full" />
                      <Input
                        type="text"
                        border="none"
                        w="full"
                        h="full"
                        _focus={{
                          border: 'none',
                          boxShadow: 'none',
                          outline: 'none',
                        }}
                        _active={{
                          border: 'none',
                          boxShadow: 'none',
                          outline: 'none',
                        }}
                        _focusVisible={{
                          border: 'none',
                          boxShadow: 'none',
                          outline: 'none',
                        }}
                        placeholder="0.00"
                        fontSize="9.52px"
                        fontWeight="500"
                        color="#606060"
                        lineHeight="15.3px"
                        name={`price_to`}
                        onChange={event => handleAmount(event)}
                        value={formatToCurrency(toBeFiltered?.price_to ?? 0)}
                      />
                    </InputGroup>
                  </Stack>
                </HStack>
                {/* <HStack mt="10px" alignSelf="flex-start" spacing="20px">
                  <Box pb="6px" borderBottom="1px solid #E4E4E4" minW="73px">
                    <Text as="span" fontSize="16px" fontWeight="400" color="#919191">
                      {toBeFiltered?.price_from
                        ? formatToCurrency(toBeFiltered?.price_from)
                        : 'Min'}
                    </Text>
                  </Box>
                  <Box pb="6px" borderBottom="1px solid #E4E4E4" minW="73px">
                    <Text as="span" fontSize="16px" fontWeight="400" color="#919191">
                      {toBeFiltered?.price_to ? formatToCurrency(toBeFiltered?.price_to) : 'Max'}
                    </Text>
                  </Box>
                </HStack> */}
              </VStack>
              <VStack borderBottom="1px solid #E4E4E4">
                <OptionsToRadio
                  options={toBeFiltered}
                  setOption={setToBeFiltered}
                  constants={constants}
                />
              </VStack>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={applyFilter}
              w="full"
              h="36.6px"
              borderRadius="72px"
              bg={'#4545FE'}
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'18px'}
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

export default Filter;
