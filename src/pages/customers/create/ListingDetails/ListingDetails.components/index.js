import {SmallCloseIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useRadioGroup,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {themeStyles} from '../../../../../theme';
import {Popup, RadioButtons} from '../../../../../ui-lib';
import Carousel from 'react-elastic-carousel';
import arrowDown from '/src/images/icons/Iconly/Sharp/Arrow - Down 3.svg';
import arrowUp from '/src/images/icons/Iconly/Sharp/Stroke 50.svg';
import RadioOptionsForConstructionDate from '../../../../../components/RadioButtons/RadioOptionsForConstructionDate';

export const CustomSelectBox = ({options, setState}) => {
  const [slider, setSlider] = useState('');
  const breakPoints = [{width: 1, itemsToShow: 3}];
  const {getRootProps, getRadioProps} = useRadioGroup({
    name: 'construction-dates',
    defaultValue: options[0],
    onChange: val => setState(val),
  });
  const group = getRootProps();

  return (
    <Flex pt="10px" pb="15px" {...group} w="full" position="relative">
      <Image
        cursor="pointer"
        src={arrowUp.src}
        boxSize={'15px'}
        alt=""
        pos="absolute"
        zIndex={99}
        right={'53%'}
        top={'-4%'}
        onClick={() => slider.slidePrev()}
      />

      <Carousel
        showArrows={false}
        pagination={false}
        itemPadding={[0, 1]}
        enableAutoPlay={false}
        breakPoints={breakPoints}
        verticalMode
        ref={slider => setSlider(slider)}
        showEmptySlots={true}
      >
        {options &&
          options.map((value, i) => {
            const radio = getRadioProps({value});
            return (
              <RadioButtons
                variant="ghost"
                cursor={'pointer'}
                color={'#606060'}
                key={value}
                {...radio}
              >
                {value}
              </RadioButtons>
            );
          })}
      </Carousel>

      <Image
        cursor="pointer"
        src={arrowDown.src}
        boxSize={'20px'}
        alt=""
        pos="absolute"
        zIndex={99}
        right={'53%'}
        bottom={'-3%'}
        onClick={() => slider.slideNext()}
      />
    </Flex>
  );
};

export const CustomConstructionDates = ({
  DATE_PICKER,
  modalHeader,
  setStartPeriod,
  setEndPeriod,
  setStartYear,
  setEndYear,
  showStartDate,
  toggleVisibility,
}) => {
  const [radioValue, setRadioValue] = useState('Choose by Quarter');
  const QUATERS = ['Q1', 'Q2', 'Q3', 'Q4'];

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const PREV_YEARS = [
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
    '1996',
    '1995',
    '1994',
    '1993',
    '1992',
    '1991',
    '1990',
  ];

  const FUTURE_YEARS = [
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
    '2031',
    '2032',
    '2033',
    '2034',
    '2035',
    '2036',
    '2037',
    '2038',
    '2039',
    '2040',
    '2041',
    '2042',
    '2043',
  ];

  const YEARS = showStartDate ? FUTURE_YEARS : PREV_YEARS;

  const handleValue = val => setRadioValue(val);

  // console.log('RadioVAlue', radioValue);

  return (
    <Popup
      hideCloseBtn
      minW="356px"
      w="fit-content"
      minH="302px"
      pt="5px"
      px="10px"
      pb="15px"
      isOpen={DATE_PICKER.isOpen}
      onClose={DATE_PICKER.onClose}
      isCentered
    >
      <Popup.Body>
        <Text fontSize="24px" fontWeight={600} px={3} w="full" color="#191919" mb={'10px'}>
          {modalHeader}
        </Text>

        <RadioOptionsForConstructionDate
          mb={6}
          options={['Choose by Quarter', 'Choose by Month']}
          handleValue={handleValue}
          fontSize={'12px'}
          fontWeight={'400'}
        />

        <Flex w="full" justify="space-between">
          <Stack w="50%" pr="20px">
            <CustomSelectBox
              setState={setStartPeriod || setEndPeriod}
              options={radioValue?.toLowerCase() == 'choose by quarter' ? QUATERS : MONTHS}
            />
          </Stack>
          <Stack w="50%" pl="25px">
            <CustomSelectBox
              setState={setStartYear || setEndYear}
              options={modalHeader?.toLowerCase() == 'end date' ? PREV_YEARS : YEARS}
            />
          </Stack>
        </Flex>
      </Popup.Body>

      <Button
        variant={'dark'}
        my={6}
        mx="auto"
        borderRadius="lg"
        h="48px"
        w="88%"
        bg="#191919"
        color="white"
        onClick={DATE_PICKER.onClose}
      >
        Save Date
      </Button>
    </Popup>
  );
};

export default CustomSelectBox;
