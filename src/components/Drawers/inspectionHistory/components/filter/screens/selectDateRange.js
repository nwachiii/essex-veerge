import {Button, HStack, Heading, Image, MenuItem, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import miniCalendarIcon from '/src/images/icons/calendar.svg';
import leftArrowBack from '/src/images/icons/leftArrowBack.svg';
import closeIcon from '/src/images/icons/closeIconForFilter.svg';

import calendar_agents_inspection from '/src/images/icons/calendar_agents_inspection.svg';
import {changeDateFormat} from 'utils/formatDate';

export const SelectDateRange = ({
  handleScreen,
  setDate,
  selectedDate,
  handleClose,
  setCalendarType,
}) => {
  const moveToPreviousScreen = () => {
    setDate({from: '', to: ''});
    handleScreen('index screen');
  };

  const selectDate = calendarType => () => {
    setCalendarType(calendarType);
    handleScreen('calendar');
  };
  const isValid = selectedDate.from && selectedDate.to;
  return (
    <MenuItem
      _hover={{bg: 'transparent'}}
      _active={{bg: 'transparent'}}
      _focus={{bg: 'transparent'}}
      position="relative"
      borderRadius="12.3px"
      cursor="default"
      px="18.4px"
      minW="297.435px"
      pr="21.9px"
      py="14px"
    >
      <VStack spacing="none" w="full">
        <HStack w="full" mb="5.84px" justify="space-between">
          <Image
            onClick={moveToPreviousScreen}
            alignSelf="start"
            src={leftArrowBack.src}
            cursor="pointer"
            boxSize="18.398px"
            alt="back button"
          />
          <Image
            onClick={handleClose}
            alignSelf="start"
            src={closeIcon.src}
            cursor="pointer"
            alt="close button"
          />
        </HStack>

        <VStack w="full" align="start" mb="16.58px" spacing="none">
          <Image
            alignSelf="start"
            src={calendar_agents_inspection.src}
            alt="back button"
            boxSize="35.056px"
            mb="8px"
          />

          <Heading fontSize="10px" fontWeight="400">
            Select Date Range
          </Heading>
        </VStack>
        <VStack w="full" spacing="3.83px" mb="5.37px">
          <Text
            as="label"
            alignSelf="flex-start"
            htmlFor="from"
            fontSize="12px"
            fontWeight="400"
            color="#191919"
          >
            From
          </Text>
          <HStack
            h="38.3px"
            onClick={selectDate('from')}
            border="0.767px solid #E4E4E4"
            w="full"
            borderRadius="6.133px"
            justify="space-between"
            pl="13.0px"
            pr="8.87px"
            cursor="pointer"
          >
            <Text fontSize="10px" color="#606060" fontWeight="400">
              {selectedDate.from ? changeDateFormat(selectedDate.from) : 'Select date'}
            </Text>
            <Image src={miniCalendarIcon.src} boxSize="16px" alt="calendar icon" />
          </HStack>
        </VStack>
        <VStack w="full" spacing="3.83px">
          <Text
            as="label"
            alignSelf="flex-start"
            htmlFor="from"
            fontSize="12px"
            fontWeight="400"
            color="#191919"
          >
            To
          </Text>
          <HStack
            h="38.3px"
            onClick={selectDate('to')}
            border="0.767px solid #E4E4E4"
            w="full"
            borderRadius="6.133px"
            justify="space-between"
            pl="13.0px"
            cursor="pointer"
            pr="8.87px"
          >
            <Text fontSize="10px" color="#606060" fontWeight="400">
              {selectedDate.to ? changeDateFormat(selectedDate.to) : 'Select date'}
            </Text>
            <Image src={miniCalendarIcon.src} boxSize="16px" alt="calendar icon" />
          </HStack>

          {/* {dateError && (
                <Text alignSelf="flex-start" as="span" fontSize="10px" color="red.400">
                  {dateError}
                </Text>
              )} */}
        </VStack>

        <Button
          w="full"
          // h="36.52px"
          mt="13.42px"
          py="10px"
          borderRadius="72px"
          bg="#191919"
          color={'#FFFFFF'}
          fontWeight={'400'}
          fontSize={'10px'}
          h="28px"
          isDisabled={!isValid}
          transition="ease-in-out 0.3s"
          onClick={() => handleScreen('index screen')}
          _hover={{
            opacity: '1',
          }}
          _active={{
            opacity: 1,
          }}
        >
          Proceed
        </Button>
      </VStack>
    </MenuItem>
  );
};

export default SelectDateRange;
