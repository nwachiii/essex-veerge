import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import selectedIcon from '/src/images/icons/check_filter.svg';
import searchIcon from '/src/images/icons/search_icon.svg';
import React, {useState} from 'react';
import filter_icon from '/src/images/icons/filter_icon.svg';
import {useRouter} from 'next/router';

const FilterForId = ({url, setUrl, listings}) => {
  const [filteredListings, setFilteredListings] = useState(listings);
  const [search, setSearch] = useState('');
  const [toBeFiltered, setToBeFiltered] = useState({});
  const {isOpen, onClose, onOpen} = useDisclosure();

  const payment = ['payment plan', 'Outright'];

  const router = useRouter();

  const handleCheck = (e, prop) => {
    console.log(e, prop);
    setToBeFiltered({...toBeFiltered, [prop]: e});
  };

  const handleRadio = (e, prop) => setToBeFiltered({...toBeFiltered, [prop]: e});

  const handleSearch = e => {
    setSearch(e.target.value);
    const filtered = listings.filter(item =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );

    return setFilteredListings(filtered);
  };

  const handleChange = e => {
    if (e?.target?.name === 'fractional')
      setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: !toBeFiltered[e.target.name],
      });

    if (e.target?.name === 'number_of_bedroom')
      setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: e.target.textContent,
      });

    console.log({
      ...toBeFiltered,
      [e.target.name]: e.target.textContent,
    });
  };

  const handleClose = () => {
    setToBeFiltered({});

    return onClose();
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

    handleClose();
  };

  const applyFilter = () => {
    if (!Object.entries(toBeFiltered).length) {
      return handleReset();
    }

    const filter_param = `${Object.entries(toBeFiltered)
      .flatMap(([name, value]) => {
        if (value === 'Any') {
          return [];
        }
        if (name === 'payment_type' || name === 'status') {
          return value.length === 2
            ? []
            : `${value.map(item => `${name}=${item.toLowerCase().replace(' ', '_')}`).join('&')}`;
        }
        if (name === 'fractional' && value === false) {
          return [];
        }
        return `${
          // name === 'number_of_bedroom' ? (value.includes('+') ? 'bedroom_above' : name) :
          name
        }=${
          // name === 'number_of_bedroom'
          //   ? value.includes('+')
          //     ? value.replace('+', '')
          //     : value
          //   :
          value
        }`;
      })
      .join('&')}`;

    const defaultQuery = {
      filter: `${filter_param}`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };

    filter_param ? null : delete mergedQuery.filter;
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });

    return onClose();
  };

  return (
    <Menu isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
      <MenuButton
        as={Button}
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
        onClick={onOpen}
      >
        <Image w="18px" h="18px" src={filter_icon.src} alt="filter icon" fontSize="10px" />{' '}
      </MenuButton>

      <MenuList
        // w="267px"
        w="388px"
        position="relative"
        zIndex="2"
        maxH="465px"
        h="fit-content"
        // px="26px"
        py="20px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        {/* <Wrap> */}
        <VStack spacing="14px" w="full">
          <HStack
            borderBottom="solid 1px #E4E4E4"
            px="26px"
            pb="20px"
            w="full"
            align="flex-start"
            justify="space-between"
          >
            <VStack align="flex-start" spacing="12px">
              <Heading fontSize="14px" fontWeight="600">
                Fractional
              </Heading>
              <Switch
                name="fractional"
                isChecked={toBeFiltered?.fractional ?? false}
                onChange={handleChange}
              />
            </VStack>
            <Text
              onClick={handleReset}
              as="span"
              color="#4545FE"
              cursor="pointer"
              fontSize="14px"
              fontWeight="300"
            >
              Reset
            </Text>
          </HStack>

          <VStack borderBottom="solid 1px #E4E4E4" spacing="none" px="26px" w="full" pb="5px">
            <Heading mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
              Payment type
            </Heading>
            <CheckboxGroup
              w="full"
              onChange={e => handleCheck(e, 'payment_type')}
              value={toBeFiltered?.payment_type ?? []}
            >
              <VStack spacing="26px" w="full" align="flex-start" h="full">
                {payment.map((item, idx) => (
                  <Checkbox key={idx} value={item}>
                    <Text fontSize="14px" fontWeight="400">
                      {item}
                    </Text>
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </VStack>
          <VStack
            w="full"
            px="26px"
            align="flex-start"
            pb="13px"
            // borderBottom="1px solid #E4E4E4"
            spacing="12px"
          >
            <Heading
              // mb="12px"
              alignSelf={'flex-start'}
              fontSize="14px"
              fontWeight="600"
            >
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
                  onClick={handleChange}
                  _active={{opacity: '1'}}
                  _focus={{opacity: '1'}}
                  _hover={{opacity: '1'}}
                  name="number_of_bedroom"
                  minW="fit-content"
                  py="5.5px"
                  h="25px"
                  lineHeight="14px"
                >
                  {item}
                </Button>
              ))}
            </HStack>
          </VStack>
        </VStack>
        {/* </Wrap> */}
        <Box mt="20px" justifySelf="flex-end" px="46px">
          <Button
            w="full"
            onClick={applyFilter}
            borderRadius="72px"
            bg={'#4545FE'}
            color={'#FFFFFF'}
            fontWeight={'400'}
            fontSize={'18px'}
            lineHeight={'23px'}
            _hover={{
              shadow: 'md',
            }}
            _active={{
              opacity: 0.8,
            }}
            minH={'55px'}
          >
            Apply Filter
          </Button>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default FilterForId;
