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
  Switch,
  Text,
  useDisclosure,
  VStack,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Tooltip,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import selectedIcon from '/src/images/icons/check_filter.svg';
import searchIcon from '/src/images/icons/search_icon.svg';

import React, {useState} from 'react';
import filter_icon from '/src/images/icons/filter_icon.svg';
import {useRouter} from 'next/router';

const Filter = ({listings, setUrl, url, isFractional}) => {
  const [filteredListings, setFilteredListings] = useState(listings);
  const [search, setSearch] = useState('');
  const [toBeFiltered, setToBeFiltered] = useState({});
  const {isOpen, onClose, onOpen} = useDisclosure();

  const payment = ['Payment plan', 'Outright'];
  const category = [
    {name: 'Assets holders', value: 'asset_holders=true'},
    {name: 'Without assets', value: 'asset_holders=false'},
    {name: 'Defaulting', value: 'defaulting=true'},
    {name: 'With outstanding payment', value: 'outstanding=true'},
    {name: 'Without outstanding payment', value: 'outstanding=false'},
    {name: 'With fractional', value: 'fractions=true'},
  ];
  const status = ['Active', 'Inactive'];

  const router = useRouter();

  const handleCheck = (e, prop) => {
    let array = e;

    const lastItem = array.slice(-1)[0];

    if (lastItem.includes('asset_holders')) {
      array = e.filter(item => !item.includes('asset_holders')).concat(lastItem);
    }

    setToBeFiltered({...toBeFiltered, [prop]: array});
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
  };

  const handleReset = () => {
    const mergedQuery = {
      ...router.query,
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
      // setUrl({
      //   ...url,
      //   filter: "",
      //   param: `${url.sort && "lower_filter=true&"}${url.sort}`,
      // });
      // router.push(
      //   `${router.route}${url.sort && "?lower_filter=true&"}${url.sort}`
      // );
      const defaultQuery = {
        filter: `lower_filter=true`,
        page: 1,
      };

      const mergedQuery = {
        ...router.query,
        ...defaultQuery,
      };
      router.push({
        pathname: router.pathname,
        query: mergedQuery,
      });
      return onClose();
    }

    const filter_param = `${Object.entries(toBeFiltered)
      .map(([name, value]) => {
        if (value === 'Any') {
          return null;
        }
        if (name === 'listing[]') {
          return `${value.map(item => `${name}=${item}`).join('&')}`;
        }
        if (name === 'category') {
          return `${value.join('&')}`;
        }
        if (name === 'payment_plan' || name === 'status') {
          return value.length === 2
            ? ''
            : `${value.map(item => `${name}=${item.toLowerCase().replace(' ', '_')}`).join('&')}`;
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
      .filter(item => {
        return item;
      })
      .join('&')}`;

    // setUrl({
    //   ...url,
    //   filter: `${filter_param}`,
    //   param: `lower_filter=true&${filter_param}${url.sort && "&"}${url.sort}`,
    // });
    // router.push(
    //   `${router.route}?lower_filter=true&${filter_param}${url.sort && "&"}${
    //     url.sort
    //   }`
    // );
    const defaultQuery = {
      filter: `lower_filter=true${filter_param ? `&${filter_param}` : ''}`,
      page: 1,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    return onClose();
  };
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: 'darkgrey',
      // outline: "1px solid slategrey", // You can include this line if needed
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
          bg="#fff"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
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
          _hover={{
            bg: 'rgba(0,0,0,0.1)',
            borderColor: '#919191',
            img: {opacity: '0.5'},
          }}
        >
          <Image w="16px" h="16px" src={filter_icon.src} alt="filter  icon" />{' '}
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent
          position="relative"
          zIndex={100}
          mt="58px"
          // mt="112.12px"
          minW="400px"
          bg="#fff"
          p="0px"
        >
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
                onClick={() => {
                  setSearch('');
                  setFilteredListings(listings);
                  return handleReset();
                }}
                as="span"
                color="#4545FE"
                cursor="pointer"
                fontSize="14px"
                fontWeight="300"
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
                    //   background: "rgb(145, 145, 145,0.1)",

                    width: '30px',
                    height: '30px',
                  }}
                >
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    //   _hover={{
                    //     color: "#d0d0d0",
                    //   }}
                    my="auto"
                    color="#000"
                    top="0"
                    bottom="0"
                  />
                </VStack>
              </HStack>
            </HStack>
          </HStack>

          <DrawerBody sx={customScrollbarStyles} p="0px" mr="7px">
            {/* <Wrap> */}
            <VStack spacing="14px" w="full">
              {isFractional ? (
                <HStack
                  borderBottom="solid 1px #E4E4E4"
                  px="26px"
                  pb="20px"
                  w="full"
                  align="flex-start"
                  justify="space-between"
                >
                  <VStack align="flex-start" spacing="9px">
                    <Heading fontSize="14px" fontWeight="600">
                      Fractional
                    </Heading>
                    <Switch
                      name="fractional"
                      isChecked={toBeFiltered.fractional}
                      onChange={handleChange}
                    />
                  </VStack>
                </HStack>
              ) : null}

              <VStack borderBottom="solid 1px #E4E4E4" spacing="none" px="26px" w="full" pb="5px">
                <Heading mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Listing
                </Heading>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // eslint-disable-next-line react/no-children-prop
                    children={
                      <Image
                        filter="brightness(1.8)"
                        boxSize={'20px'}
                        src={searchIcon.src}
                        alt="seacrh icon"
                      />
                    }
                  />
                  <Input
                    type="text"
                    borderRadius="10px"
                    h="39px"
                    px="10px"
                    value={search}
                    border="solid 1px #3D3D3D5A"
                    focusBorderColor="#3D3D3D5A"
                    onChange={handleSearch}
                  />
                </InputGroup>
                <CheckboxGroup
                  w="full"
                  onChange={e => handleCheck(e, 'listing[]')}
                  value={toBeFiltered.listing}
                >
                  <Wrap inner>
                    <VStack px="5px" spacing="26px" w="full" align="flex-start" h="full">
                      {filteredListings.map((item, idx) => (
                        <Checkbox
                          borderColor={'#606060'}
                          focusBorderColor=""
                          key={idx}
                          value={item}
                        >
                          <Text fontSize="14px" fontWeight="400">
                            {item}
                          </Text>
                        </Checkbox>
                      ))}
                    </VStack>
                  </Wrap>
                </CheckboxGroup>
              </VStack>

              <VStack borderBottom="solid 1px #E4E4E4" spacing="none" px="26px" w="full" pb="5px">
                <Heading mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Users Category
                </Heading>
                <CheckboxGroup
                  w="full"
                  onChange={e => handleCheck(e, 'category')}
                  value={toBeFiltered.category}
                >
                  <VStack spacing="26px" w="full" align="flex-start" h="full">
                    {category.map((item, idx) => (
                      <Checkbox
                        key={idx}
                        value={item.value}
                        borderColor={'#606060'}
                        focusBorderColor=""
                      >
                        <Text fontSize="14px" fontWeight="400">
                          {item.name}
                        </Text>
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </VStack>
              <VStack borderBottom="solid 1px #E4E4E4" spacing="none" px="26px" w="full" pb="5px">
                <Heading mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Payment type
                </Heading>
                <CheckboxGroup
                  w="full"
                  onChange={e => handleCheck(e, 'payment_plan')}
                  value={toBeFiltered.payment_plan}
                >
                  <VStack spacing="26px" w="full" align="flex-start" h="full">
                    {payment.map((item, idx) => (
                      <Checkbox key={idx} value={item} borderColor={'#606060'} focusBorderColor="">
                        <Text fontSize="14px" fontWeight="400">
                          {item}
                        </Text>
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </VStack>
              {/* <VStack spacing="none" px="26px" w="full" pb="5px">
                <Heading mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Status
                </Heading>

                <CheckboxGroup
                  w="full"
                  onChange={e => handleCheck(e, 'status')}
                  value={toBeFiltered.status}
                >
                  <VStack spacing="26px" w="full" align="flex-start" h="full">
                    {status.map((item, idx) => (
                      <Checkbox key={idx} value={item} borderColor={'#606060'} focusBorderColor="">
                        <Text fontSize="14px" fontWeight="400">
                          {item}
                        </Text>
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </VStack>  */}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              w="full"
              borderRadius="72px"
              bg="#4545FE"
              color="#FFFFFF"
              onClick={applyFilter}
              fontWeight="400"
              fontSize="18px"
              lineHeight="23px"
              _hover={{
                shadow: 'md',
              }}
              _active={{
                opacity: 0.8,
              }}
              minH="55px"
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

const Wrap = styled.div`
  overflow: auto;
  width: 100%;
  height: ${prop => (prop.inner ? '142px' : '350px')};
  //   background: ${prop => prop.inner && 'red'};
  margin-top: ${prop => prop.inner && '16px'};

  &::-webkit-scrollbar {
    width: ${prop => (prop.inner ? '4px' : '9px')};

    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: #e1e1e1;
    // outline: 1px solid slategrey;
  }
`;
