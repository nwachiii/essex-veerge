import React, {useState} from 'react';
import {Flex, Box, Divider, InputGroup, InputLeftAddon, Input, Image, Text} from '@chakra-ui/react';
import {SelectMenu, RangeMenu, SliderMenu} from './Menu';
import {Toggle} from './Toggle';

import searchIcon from '../../../images/veerge-menu/marketplace/search-icon.png';
import {Button} from 'ui-lib/ui-lib.components';

const domainOfPrice = [1000, 50000000];

const propertyTypeOptions = [
  {value: 'Any', label: 'Any'},
  {value: 'Single Family Residential', label: 'Single Family Residential'},
  {value: 'Apartment Complex', label: 'Apartment Complex'},
  {value: 'Estate', label: 'Estate'},
  {value: 'Mall', label: 'Mall'},
  {value: 'Terraces', label: 'Terraces'},
  {value: 'Mixed Use', label: 'Mixed Use'},
  {value: 'Land', label: 'Land'},
  {value: 'Detached', label: 'Detached'},
  {value: 'Semi Detached', label: 'Semi Detached'},
];
const projectStatusOptions = [
  {value: 'Any', label: 'Any'},
  {value: 'Post Construction', label: 'Post Construction'},
  {value: 'In Construction', label: 'In Construction'},
  {value: 'Pre Construction', label: 'Pre Construction'},
];

const FilterList = () => {
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('Any');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Any');
  const [rangeOfRooms, setRangeOfRoom] = useState([1, 10]);
  const [rangeOfPrice, setRangeOfPrice] = useState(domainOfPrice);
  const [isPaymentPlanOn, setPaymentPlan] = useState(true);

  return (
    <Box
      w={'100%'}
      padding={'13px 58px'}
      border={'1px solid #e4e4e4'}
      borderRadius={'8px'}
      y={'5px'}
      bg="#ffffff"
      color="#000000"
      mx="auto"
    >
      <Flex
        w="full"
        h={'52px'}
        gap={'16px'}
        alignItems={'center'}
        justify={'space-between'}
        fontSize={'13px'}
        color="#4B4B4B"
      >
        <InputGroup w="15%">
          <InputLeftAddon bg={'transparent'} p={'0px'} border={'none'}>
            <Image alt="next_image" src={searchIcon.src} />
          </InputLeftAddon>
          <Input
            placeholder="Search by location"
            w="full"
            minW={{md: '50px', lg: '180px'}}
            py={'10px'}
            pl="12px"
            h={'100%'}
            _focusVisible={{border: 'none !important', outline: 'none !important'}}
            border={'none !important'}
            fontSize={'15px'}
          />
        </InputGroup>
        <Divider border={'1px solid #E3E6EA'} orientation="vertical" height={'82%'} />
        <SliderMenu
          maxW={'max-content'}
          label={'Price'}
          range={rangeOfPrice}
          onApply={setRangeOfPrice}
          domain={domainOfPrice}
          stepOfIncrement={1000}
        />
        <Divider border={'1px solid #E3E6EA'} orientation="vertical" height={'82%'} />
        <SelectMenu
          maxW={'max-content'}
          label={'Project Status'}
          options={projectStatusOptions}
          selected={selectedProjectStatus}
          onApply={setSelectedProjectStatus}
        />
        <Divider border={'1px solid #E3E6EA'} orientation="vertical" height={'82%'} />
        <SelectMenu
          maxW={'max-content'}
          label={'Property type'}
          options={propertyTypeOptions}
          selected={selectedPropertyType}
          onApply={setSelectedPropertyType}
        />
        <Divider border={'1px solid #E3E6EA'} orientation="vertical" height={'82%'} />
        <RangeMenu
          maxW={'max-content'}
          label={'Bedroom No'}
          range={rangeOfRooms}
          onApply={setRangeOfRoom}
        />
        <Divider border={'1px solid #E3E6EA'} orientation="vertical" height={'82%'} />

        <Toggle
          maxW={'max-content'}
          label={'Payment Plan'}
          value={isPaymentPlanOn}
          onChange={setPaymentPlan}
        />
        <Button
          mt="0"
          maxW={'112px'}
          w="full"
          color="#ffffff"
          bg="black"
          p={'18px 79px'}
          _active={{backgroundColor: '#000000'}}
          _hover={{backgroundColor: '#000000'}}
          fontWeight={'400'}
          fontSize={'16px'}
          lineHeight={'17px'}
        >
          Search
        </Button>
      </Flex>
    </Box>
  );
};

export default FilterList;
