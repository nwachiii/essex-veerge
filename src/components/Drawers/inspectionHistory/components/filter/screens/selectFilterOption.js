import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  MenuItem,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import miniCalendarIcon from '/src/images/icons/calendar.svg';
import check_filter from '/src/images/icons/check_filter.svg';
import {changeDateFormat} from 'utils/formatDate';

export const SelectFilterOption = ({
  handleScreen,
  setAddedParam,
  handleClose,
  setDate,
  selectedDate,
  setStatustype,
  statusType,
}) => {
  const status = ['virtual', 'in-Person'];

  const resetFilters = () => {
    setDate({from: '', to: ''});
    setStatustype([]);
  };

  const handleCheckBox = e => {
    setStatustype(e);
  };

  const applyFilter = () => {
    const statusTypeKey = {
      virtual: 'video',
      'in-Person': 'in_person',
    };

    const queryObj = {
      ...(selectedDate.from && selectedDate.to
        ? {
            date_range: true,
            date_from: selectedDate.from.toISOString(),
            date_to: selectedDate.to.toISOString(),
          }
        : {}),
      ...(statusType.length === 1 ? {filter: statusTypeKey[statusType[0]]} : {}),
    };
    const params = new URLSearchParams(queryObj);
    setAddedParam(params.toString() ? `?${params.toString()}` : '');
    handleClose();
  };

  return (
    <MenuItem
      cursor="default"
      borderRadius="12.3px"
      _hover={{bg: 'transparent'}}
      _active={{bg: 'transparent'}}
      _focus={{bg: 'transparent'}}
      position="relative"
      px="0px"
      minW="297.435px"
      py="15px"
      pb="0px"
    >
      <VStack spacing="none" w="full">
        <HStack px="18.4px" pr="21.9px" w="full" align="flex-start" justify="space-between">
          <Heading fontSize="10px" color="#191919" fontWeight="600">
            Date Range
          </Heading>

          <Text
            as="span"
            color="#4545FE"
            cursor="pointer"
            fontSize="10px"
            fontWeight="300"
            onClick={resetFilters}
          >
            Reset
          </Text>
        </HStack>
        <HStack px="18.4px" pr="21.9px" mt="11.53px" w="full" justify="space-between">
          <Text fontSize="12px" color="#3D3D3D" fontWeight="400">
            {selectedDate.from && selectedDate.to
              ? `${changeDateFormat(selectedDate.from)} - ${changeDateFormat(selectedDate.to)}`
              : 'Filter by date range'}
          </Text>

          <Image
            onClick={handleScreen('dateRange')}
            src={miniCalendarIcon.src}
            boxSize="16px"
            alt="calendar icon"
            cursor="pointer"
          />
        </HStack>
        <Divider border="none" h="1px" bg="#E4E4E4" mb="9.2px" mt="19px" />

        <VStack spacing="none" px="18.4px" pr="21.9px" w="full">
          <Heading mb="11.3px" alignSelf={'flex-start'} fontSize="10.7px" fontWeight="600">
            Inspection Type
          </Heading>

          <CheckboxGroup w="full" onChange={handleCheckBox} value={statusType}>
            <VStack spacing="19.93px" w="full" align="flex-start" h="full">
              {status.map((item, idx) => (
                <Checkbox
                  key={idx}
                  colorScheme="#fff"
                  icon={
                    <HStack justify="center" p="1px" bg="#D9D9D9">
                      <Image
                        opacity={statusType.some(type => type === item) ? 1 : 0}
                        transition="ease-in-out 0.3s"
                        transform={
                          statusType.some(type => type === item) ? 'scale(1)' : 'scale(0.4)'
                        }
                        alt="check icon"
                        src={check_filter.src}
                      />
                    </HStack>
                  }
                  value={item === 'Virtual' ? 'video' : item}
                >
                  <Text textTransform="capitalize" fontSize="14px" fontWeight="400">
                    {item}
                  </Text>
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
        </VStack>
        <Divider border="none" h="1px" bg="#E4E4E4" mt="13px" mb="0px" />

        <Stack w="full" my="30.5px" px="35.26px">
          <Button
            w="full"
            borderRadius="72px"
            h="41.5px"
            bg={'#4545FE'}
            color={'#FFFFFF'}
            fontWeight={'400'}
            fontSize={'14px'}
            lineHeight={'23px'}
            _hover={{
              opacity: '1',
            }}
            _active={{
              opacity: 1,
            }}
            onClick={applyFilter}
          >
            Apply Filter
          </Button>
        </Stack>
      </VStack>
    </MenuItem>
  );
};

export default SelectFilterOption;
