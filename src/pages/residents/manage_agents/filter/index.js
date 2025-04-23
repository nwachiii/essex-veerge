import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  Tag,
  Checkbox,
  Tooltip,
} from '@chakra-ui/react';
import filter_icon from '/src/images/icons/filter_icon.svg';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import RatingIcon from '../../../../components/assets/rating';

const Filter = ({setUrl, url}) => {
  const [date, setDate] = useState({});
  const [dateError, setDateError] = useState('');
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [toBeFiltered, setToBeFiltered] = useState({});

  const handleRatingChange = value => {
    const updatedRatings = toBeFiltered?.['rating[]']?.includes(value)
      ? toBeFiltered?.['rating[]']?.filter(rating => rating !== value)
      : [...(toBeFiltered?.['rating[]'] ?? []), value];

    setToBeFiltered({...toBeFiltered, ['rating[]']: updatedRatings});
  };

  const router = useRouter();
  const dateInputfield = document.querySelectorAll('.dateforManageAgent');

  const {sign_up_time} =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON?.parse(localStorage.getItem('loggedinUser')) !== undefined &&
    JSON?.parse(localStorage.getItem('loggedinUser'));

  const sign_up_date = new Date(sign_up_time);

  const handleClose = () => {
    setToBeFiltered({});
    dateInputfield.forEach(input => {
      input.value = '';
    });

    setDateError('');

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

    // setToBeFiltered({});
    // dateInputfield.forEach(input => {
    //   input.value = '';
    // });

    // setDateError('');

    // return onClose();

    handleClose();
  };

  const applyFilter = () => {
    if (!Object.entries(toBeFiltered).length) {
      handleReset();
    }

    const dateFrom = new Date(toBeFiltered?.date_from);
    const dateTo = new Date(toBeFiltered?.date_to);
    if (toBeFiltered?.date_from || toBeFiltered?.date_to) {
      if (dateFrom < sign_up_date) {
        return setDateError(
          "Oops! 'Date from' predates our company's birth. Please enter a year after our creation."
        );
      }

      if (toBeFiltered.date_to && dateFrom > dateTo) {
        return setDateError("Oops, Pick a later 'date to'");
      }

      if (!toBeFiltered.date_to || !toBeFiltered.date_from) {
        return setDateError(
          `Kindly complete the ${
            !toBeFiltered.date_to ? 'date to' : 'date from'
          } field  as the date is currently missing.`
        );
      }
    }

    // const filterParams = Object.entries(date)
    //   .map(([name, value]) => `${name}=${value}`)
    //   .join('&');

    // let queryParams = `?lower_filter=true&${filterParams}${url.sort ? '&' + url.sort : ''}`;

    // // Add unit parameter if selected
    // if (selectedUnits && selectedUnits !== 'any') {
    //   queryParams += `&unit=${selectedUnits}`;
    // }

    // // Add rating parameters if any are selected
    // if (selectedRating.length > 0) {
    //   const ratingParams = selectedRating.map((rating, index) => `rating[]=${5 - index}`).join('&');
    //   queryParams += `&${ratingParams}`;
    // }

    // setUrl({
    //   ...url,
    //   filter: `date_range=true&${filterParams}`,
    //   param: queryParams,
    // });

    // router.push(`${router.route}${queryParams}`);

    const filter_param = `${Object.entries(toBeFiltered)
      .flatMap(([name, value]) => {
        if (value === 'Any') {
          return [];
        }
        if (name === 'rating[]') {
          return value.map(rating => {
            return `${name}=${rating}`;
          });
        }
        return `${
          name === 'date_from'
            ? 'date_range=true&date_from'
            : name === 'unit'
              ? value.includes('+')
                ? 'bedroom_above'
                : name
              : name
        }=${name === 'unit' ? (value.includes('+') ? value.replace('+', '') : value) : value}`;
      })
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
    console.log(filter_param);

    // setToBeFiltered({});
    // dateInputfield.forEach(input => {
    //   input.value = '';
    // });
    return handleClose();
  };

  const handleChange = e => {
    const inputDate = new Date(e.target.valueAsNumber);

    const currentDate = new Date();
    // if (inputDate > currentDate) {
    //   return setDateError(
    //     "Oops, looks like you're ahead of your time! Please select a date on or before today. Thanks!"
    //   );
    // }
    if (e.target?.name === 'reset') {
      return setToBeFiltered({});
    }
    if (e.target?.name === 'unit') {
      return setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: e.target.textContent,
      });
    }

    setDateError('');
    return (
      !isNaN(inputDate.getTime()) &&
      setToBeFiltered({...toBeFiltered, [e.target.name]: inputDate.toISOString()})
    );
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
          <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />{' '}
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} onClose={handleClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent
          position="relative"
          zIndex={100}
          mt="65.12px"
          // mt="112.12px"
          minW="400px"
          bg="#fff"
          p="0px"
        >
          <HStack
            py="30px"
            h="49.699px"
            bg="#F5F5F5"
            px="25px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Filter
            </Heading>
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
                <Text
                  as="span"
                  color="#4545FE"
                  cursor="pointer"
                  fontSize="14px"
                  fontWeight="300"
                  marginRight="6rem"
                  onClick={handleReset}
                >
                  Reset
                </Text>
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
          <DrawerBody>
            <VStack spacing="7px" w="full">
              <HStack w="full" align="flex-start" justify="space-between">
                <Heading fontSize="14px" fontWeight="600">
                  Date Joined
                </Heading>
              </HStack>
              <VStack w="full">
                <Text
                  as="label"
                  alignSelf="flex-start"
                  htmlFor="from"
                  fontSize="14px"
                  fontWeight="400"
                  color="#191919"
                >
                  From
                </Text>
                <Input
                  placeholder="Select date"
                  className="dateforManageAgent"
                  type="date"
                  borderColor="#E4E4E4"
                  h="50px"
                  w="full"
                  borderRadius="8px"
                  name="date_from"
                  onChange={handleChange}
                />
              </VStack>
              <VStack w="full">
                <Text
                  as="label"
                  alignSelf="flex-start"
                  htmlFor="from"
                  fontSize="14px"
                  fontWeight="400"
                  color="#191919"
                >
                  To
                </Text>
                <Input
                  name="date_to"
                  className="dateforManageAgent"
                  onChange={handleChange}
                  placeholder="Select date"
                  type="date"
                  borderColor="#E4E4E4"
                  h="50px"
                  w="full"
                  borderRadius="8px"
                />
                {dateError && (
                  <Text alignSelf="flex-start" as="span" fontSize="10px" color="red.400">
                    {dateError}
                  </Text>
                )}
              </VStack>
            </VStack>

            <Text fontSize="0.9rem" fontWeight="600" marginTop="2rem" marginBottom="1rem">
              Number of unit sold
            </Text>
            <HStack justifyContent="space-between">
              {/* {[null, 1, 2, 3, 4, 5, 6, '+7'].map(units => (
                <Tag
                  key={units === null ? 'any' : units}
                  cursor="pointer"
                  fontWeight="400"
                  background={selectedUnits === units ? '#000' : '#F5F5F5'} // Change background color based on selectedUnits
                  color={selectedUnits === units ? '#FFFFFF' : '#191919'} // Change text color based on selectedUnits
                  onClick={() => setSelectedUnits(units)}
                >
                  {units === null ? 'Any' : units === '+7' ? '7+' : units}
                </Tag>
              ))} */}
              {['Any', '1', '2', '3', '4', '5', '6', '7+'].map((item, idx) => (
                <Button
                  borderRadius="8.1px"
                  fontSize="10.2px"
                  key={idx}
                  bg={item === (toBeFiltered?.unit ?? 'Any') ? '#000' : '#F5F5F5'}
                  color={item === (toBeFiltered.unit ?? 'Any') ? '#ffffff' : '#191919'}
                  px="11px"
                  w="26px"
                  minW="fit-content"
                  py="5.5px"
                  h="25px"
                  onClick={handleChange}
                  _active={{opacity: '1'}}
                  _focus={{opacity: '1'}}
                  _hover={{opacity: '1'}}
                  name="unit"
                  lineHeight="14px"
                >
                  {item}
                </Button>
              ))}
            </HStack>
            <Text fontSize="0.9rem" fontWeight="600" marginTop="2rem" marginBottom="1rem">
              Filter by rating
            </Text>

            <VStack alignItems="start">
              {[...Array(5)].map((_, rowIndex) => (
                <HStack key={rowIndex} gap={3}>
                  <Checkbox
                    isChecked={toBeFiltered?.['rating[]']?.includes(5 - rowIndex)}
                    onChange={() => handleRatingChange(5 - rowIndex)}
                    size="lg"
                  />
                  {[...Array(5)].map((_, starIndex) => (
                    <Box key={starIndex}>
                      <RatingIcon
                        width={30}
                        height={29}
                        fill={starIndex < 5 - rowIndex ? '#FF9103' : '#CBCBCB'}
                      />
                    </Box>
                  ))}
                </HStack>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              w="full"
              borderRadius="xl"
              bg={'#4545FE'}
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'18px'}
              lineHeight={'23px'}
              isDisabled={dateError}
              onClick={applyFilter}
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filter;
