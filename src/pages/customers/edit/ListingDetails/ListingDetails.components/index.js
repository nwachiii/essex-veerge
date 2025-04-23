import {SmallCloseIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  useRadioGroup,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {themeStyles} from '../../../../../theme';
import {RadioButtons} from '../../../../../ui-lib';

export const CustomSelectBox = ({options, setState}) => {
  const {getRootProps, getRadioProps} = useRadioGroup({
    name: 'framework',
    defaultValue: '',
    onChange: val => setState(val),
  });
  const group = getRootProps();

  return (
    <Wrap {...group} w="full" justify="space-evenly">
      {options &&
        options.map(value => {
          const radio = getRadioProps({value});
          return (
            <RadioButtons key={value} {...radio}>
              {value}
            </RadioButtons>
          );
        })}
    </Wrap>
  );
};

export const CustomConstructionDates = ({
  setStartPeriod,
  setEndPeriod,
  setStartYear,
  setEndYear,
  showStartDate,
  toggleVisibility,
}) => {
  const [radioValue, setRadioValue] = useState('quater');
  const QUATERS = ['Q1', 'Q2', 'Q3', 'Q4'];

  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const PREV_YEARS = [
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

  const YEARS = showStartDate
    ? ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
    : PREV_YEARS;

  return (
    <Box
      {...themeStyles.boxStyles}
      h="fit-content"
      pos="absolute"
      zIndex={5}
      bg="#FFFFFF"
      minW={!showStartDate ? '900px' : 'fit-content'}
      boxShadow="lg"
      right="5%"
    >
      <Stack>
        <RadioGroup onChange={setRadioValue} value={radioValue} pb={3}>
          <Flex justify={'space-between'} align="center">
            <HStack spacing="20px">
              <Button maxW="139px" borderRadius="28px" variant="">
                <Radio
                  mr={1}
                  color={themeStyles.color.primary}
                  borderColor={themeStyles.color.primary}
                  value={'quater'}
                />
                Choose Quarter
              </Button>
              <Button maxW="139px" borderRadius="28px" variant="">
                <Radio
                  mr={1}
                  color={themeStyles.color.primary}
                  borderColor={themeStyles.color.primary}
                  value={'month'}
                />
                Choose Month
              </Button>
            </HStack>
            <Icon
              color="red"
              width="30px"
              height="30px"
              justifySelf="flex-end"
              alt="cancel_icon"
              onClick={toggleVisibility}
              as={SmallCloseIcon}
            />
          </Flex>
        </RadioGroup>

        {radioValue === 'quater' && (
          <CustomSelectBox setState={setStartPeriod || setEndPeriod} options={QUATERS} />
        )}
        {radioValue === 'month' && (
          <CustomSelectBox setState={setStartPeriod || setEndPeriod} options={MONTHS} />
        )}
      </Stack>

      <Divider w="full" orientation="horizontal" my={6} />

      <CustomSelectBox setState={setStartYear || setEndYear} options={YEARS} />

      <Button
        variant={'dark'}
        my={6}
        borderRadius="lg"
        h="48px"
        w="169px"
        bg="#191919"
        color="white"
        onClick={() => toggleVisibility('end' && 'start')}
      >
        Save Date
      </Button>
    </Box>
  );
};

export default CustomSelectBox;
