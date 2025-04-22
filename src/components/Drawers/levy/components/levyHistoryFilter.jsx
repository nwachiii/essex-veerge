import FilterIcon from '@/components/assets/filterIcon';
import {Button, Heading, MenuItem, Menu, MenuButton, MenuList, Stack} from '@chakra-ui/react';
import React from 'react';
import CustomCheckBox from './utils/CustomCheckBox';
import LevyHistoryCheck from './checkbox/levyHistoryCheck';

const historyDataList = [
  {
    name: 'Individual Levy',
    value: 'individual',
  },
  {
    name: 'Everyone',
    value: 'everyone',
  },
  {
    name: 'Listing',
    value: 'listing',
  },
  {
    name: 'Unit',
    value: 'unit',
  },
];

const LevyHistoryFilter = () => {
  const handleChange = value => {};
  return (
    <Menu>
      <MenuButton
        minW={'fit-content'}
        p="0px"
        minH="fit-content"
        w="fit-content"
        h="fit-content"
        variant="unstyled"
        as={Button}
      >
        <FilterIcon />
      </MenuButton>

      <MenuList
        p="20px 16px"
        // boxShadow="none"
        boxShadow="0px 2px 13px 4px #e5e5e5 !important"
        minW="300px"
        minH="fit-content"
        borderRadius="4px"
        border="0.5px solid #e4e4e7"
      >
        <Stack h="full" w="full" spacing="16px">
          <Heading fontSize="13px" fontWeight="500" color="#3f3f46">
            Filter by category
          </Heading>
          <CustomCheckBox
            data={historyDataList}
            handleChange={handleChange}
            Component={LevyHistoryCheck}
          />
          <Button h="44px" variant="md-filled-radius" w="full">
            Apply Filter
          </Button>
        </Stack>
      </MenuList>
    </Menu>
  );
};

export default LevyHistoryFilter;
