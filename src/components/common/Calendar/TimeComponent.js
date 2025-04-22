import {VStack, HStack, Text, Box, Button} from '@chakra-ui/react';
import React, {useState} from 'react';
import {HiChevronRight, HiChevronLeft} from 'react-icons/hi';
import {Icon} from '@chakra-ui/react';

const TimeComponent = ({time, setTime}) => {
  const canUpdate = type => {
    const [hours, minutes] = time.displayTime.split(/[: ]/);
    const minMinutes = 1 * 60 + 0;
    const maxMinutes = 12 * 60 + 45;
    let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

    if (minMinutes === totalMinutes && type === 'decrease') {
      return false;
    } else if (maxMinutes === totalMinutes && type === 'increase') {
      return false;
    }
    return true;
  };

  const adjustTime = (timeStr, increment) => {
    const [hours, minutes, meridian] = timeStr.split(/[: ]/);

    const indicator =
      increment === 'switch_indicator' ? (time.indicator === 'AM' ? 'PM' : 'AM') : meridian;

    let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

    if (increment === 'increase') {
      totalMinutes += 15;
    } else if (increment === 'decrease') {
      totalMinutes -= 15;
    }

    let newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    newHours %= 24;

    let newIndicator = indicator;

    const formattedHours = newHours.toString().padStart(2, '0');
    const formattedHoursFor24 = Number(
      indicator === 'PM'
        ? newHours === 12
          ? newHours
          : newHours + 12
        : newHours === 12 && indicator === 'AM'
          ? 0
          : newHours
    )
      .toString()
      .padStart(2, '0');

    const formattedMinutes = newMinutes.toString().padStart(2, '0');
    const newTimeStr = `${formattedHoursFor24}:${formattedMinutes} ${newIndicator}`;
    const displayTime = `${formattedHours}:${formattedMinutes} ${newIndicator}`;

    return setTime({
      time: newTimeStr,
      displayTime,
      indicator: newIndicator,
    });
  };

  return (
    <HStack w="full" spacing="19.05px" alignSelf="center" justify="center">
      <HStack align="center" spacing="3px">
        <Button
          h="fit-content"
          maxH="fit-content"
          onClick={() => adjustTime(time.displayTime, 'decrease')}
          p="0px"
          bg="transparent"
          w="fit-content"
          minW="fit-content"
          isDisabled={!canUpdate('decrease')}
          variant="ghost"
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
          _focus={{
            bg: 'transparent',
          }}
        >
          <Icon
            fontSize="20px"
            color={!canUpdate('decrease') ? '#E6E6E6' : '#989898'}
            as={HiChevronLeft}
          />
        </Button>
        <VStack justify="center" minW="76px" bg=" #F8F8F8" h="30.536px" borderRadius="8px">
          <Text fontSize="12.905px" fontWeight="400" color="#0C1B2B" as="span">
            {time.displayTime.split(' ')[0]}
          </Text>
        </VStack>
        <Button
          h="fit-content"
          maxH="fit-content"
          onClick={() => adjustTime(time.displayTime, 'increase')}
          p="0px"
          isDisabled={!canUpdate('increase')}
          bg="transparent"
          w="fit-content"
          minW="fit-content"
          variant="ghost"
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
          _focus={{
            bg: 'transparent',
          }}
        >
          <Icon
            fontSize="20px"
            color={!canUpdate('increase') ? '#E6E6E6' : '#989898'}
            as={HiChevronRight}
          />
        </Button>
      </HStack>
      {/* <HStack align="center" spacing="3px">
        <Icon as={HiChevronLeft} />
        <VStack justify="center" minW="102px" bg=" #F8F8F8" h="42px" borderRadius="12px">
          <Text color="#0C1B2B" as="span">
            {time.indicator}
          </Text>
        </VStack>

        <Icon as={HiChevronRight} />
      </HStack> */}
      <HStack align="center" spacing="3px">
        <Button
          h="fit-content"
          maxH="fit-content"
          onClick={() => adjustTime(time.displayTime, 'switch_indicator')}
          p="0px"
          bg="transparent"
          w="fit-content"
          minW="fit-content"
          variant="ghost"
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
          _focus={{
            bg: 'transparent',
          }}
        >
          <Icon fontSize="20px" color={'#989898'} as={HiChevronLeft} />
        </Button>
        <VStack justify="center" minW="76px" bg=" #F8F8F8" h="30.536px" borderRadius="8px">
          <Text fontSize="12.905px" fontWeight="400" color="#0C1B2B" as="span">
            {time.indicator}
          </Text>
        </VStack>
        <Button
          h="fit-content"
          maxH="fit-content"
          onClick={() => adjustTime(time.displayTime, 'switch_indicator')}
          p="0px"
          bg="transparent"
          w="fit-content"
          minW="fit-content"
          variant="ghost"
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
          _focus={{
            bg: 'transparent',
          }}
        >
          <Icon fontSize="20px" color="#989898" as={HiChevronRight} />
        </Button>
      </HStack>
    </HStack>
  );
};

export default TimeComponent;
