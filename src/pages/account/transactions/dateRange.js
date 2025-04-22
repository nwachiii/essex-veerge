import React, {useState, useRef, useEffect} from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import calendar_agents_inspection from '/src/images/icons/calendar_agents_inspection.svg';
import {reversedDayMonthYear} from 'utils/formatDate';

const DateRange = ({
  isOpen,
  filterByVal,
  setFilterByVal,
  onClose,
  futureFilter,
  onOpen,
  setQuery,
  router,
}) => {
  const [date, setDate] = useState({from: '', to: ''});
  const fromDate = useRef();
  const toDate = useRef();

  useEffect(() => {
    fromDate.current.value = '';
    toDate.current.value = '';
  }, []);

  const applyFilter = () => {
    setQuery(
      `?start_date=${reversedDayMonthYear(date.from)}&end_date=${reversedDayMonthYear(date.to)}`
    );
    fromDate.current.value = '';
    toDate.current.value = '';
    const defaultQuery = {
      page: `1`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    setFilterByVal('7');
    onClose();
  };
  const handleChange = e => {
    const inputDate = new Date(e.target.valueAsNumber);

    return (
      !isNaN(inputDate.getTime()) && setDate({...date, [e.target.name]: inputDate.toISOString()})
    );
  };

  const isValid = date.from && date.to;

  return (
    <Menu isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
      <MenuButton onClick={onOpen}>
        {/* <HStack
          cursor="pointer"
          transition="0.5s ease-in-out background-color"
          bg={filterByVal === '7' ? '#4545FE' : 'transparent'}
          py={'14px'}
          px={'16px'}
          minW="80px"
          justify="center"
          borderRadius="8px"
          onClick={() => console.log('hi there')}
        >
          <Text
            transition="0.5s ease-in-out color"
            color={filterByVal === '7' ? '#ffffff' : '#4545FE'}
            fontSize="14px"
            fontWeight="600px"
          >
            Date Range
          </Text>
        </HStack> */}
        <Box
          py={'14px'}
          px={'16px'}
          borderRadius={'0px 12px 12px 0px'}
          fontWeight={'600'}
          bg={filterByVal == '7' ? '#4545FE' : '#ffffff'}
          width={'max-content'}
          color={filterByVal == '7' ? '#FFFFFF' : '#344054'}
          cursor={'pointer'}
        >
          <Text>Date Range</Text>
        </Box>
      </MenuButton>

      <MenuList
        position="relative"
        zIndex="2"
        w="388px"
        minH="319px"
        py="20px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        <VStack spacing="7px" w="full">
          <VStack w="full" px="26px" align="start" spacing="9px">
            <Image
              alignSelf="start"
              src={calendar_agents_inspection.src}
              alt="back button"
              // mb="8px"
              ml="-6px"
            />

            <Heading fontSize="14px" fontWeight="600" color="black" m="10px 0px 23px">
              Select Date Range
            </Heading>
          </VStack>
          <VStack px="26px" w="full" spacing="5px">
            <Text
              as="label"
              alignSelf="flex-start"
              htmlFor="from"
              fontSize="14px"
              fontWeight="400"
              color="black"
            >
              From
            </Text>
            <Input
              ref={fromDate}
              placeholder="Select date"
              className="dateforManageAgent"
              type="date"
              borderColor="#E4E4E4"
              h="50px"
              w="full"
              borderRadius="8px"
              name="from"
              onChange={handleChange}
              color="black"
              sx={{
                WebkitAppearance: 'none',
                '&::-webkit-calendar-picker-indicator': {
                  display: 'none',
                },
              }}
            />
          </VStack>
          <VStack px="26px" w="full" spacing="5px">
            <Text
              as="label"
              alignSelf="flex-start"
              htmlFor="from"
              fontSize="14px"
              fontWeight="400"
              color="black"
            >
              To
            </Text>
            <Input
              ref={toDate}
              name="to"
              className="dateforManageAgent"
              onChange={handleChange}
              placeholder="Select date"
              type="date"
              borderColor="#E4E4E4"
              h="50px"
              w="full"
              borderRadius="8px"
              color="black"
              sx={{
                WebkitAppearance: 'none',
                '&::-webkit-calendar-picker-indicator': {
                  display: 'none',
                },
              }}
            />
          </VStack>
          <Box pt="15px" w="full" justifySelf="flex-end" px="26px">
            <Button
              w="full"
              // h="36.52px"
              py="10px"
              borderRadius="8px"
              bg="#191919"
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'18px'}
              lineHeight={'23px'}
              isDisabled={!isValid}
              onClick={applyFilter}
              _hover={{
                shadow: 'md',
              }}
              _active={{
                opacity: 0.8,
              }}
            >
              View
            </Button>
          </Box>
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default DateRange;
