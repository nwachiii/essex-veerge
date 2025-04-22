import {HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import identityIcon from '/src/images/icons/sortByIdentifier.png';
import filter_icon from '/src/images/icons/filter_icon.svg';

import React from 'react';

export const FilterForActivityLog = ({handleOptions, optionArray, filType, filtered}) => {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        alignSelf="flex-end"
        bg="#ffffff"
        fontWeight="400"
        fontSize="14px"
        lineHeight="18px"
        color="#191919"
        minW="144px"
        px="12px"
        height="48px"
        border="1px solid #E4E4E4"
        borderRadius="12px"
      >
        <HStack justify="center" spacing="9px">
          <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />{' '}
          <Text fontSize="16px" textTransform="capitalize" fontWeight="400">
            {filtered === 'all' ? filType : filtered}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList
        position="relative"
        zIndex="10866666"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        {optionArray.map((item, idx) => {
          return (
            <MenuItem
              as="button"
              key={idx}
              onClick={e => handleOptions(e, filType)}
              name={item.value}
              fontSize="14px"
              mb="10px"
            >
              <Image
                opacity={filtered === item.value ? 1 : 0}
                _hover={{background: '#EDF2F7'}}
                mr="10px"
                h="11px"
                src={identityIcon.src}
                alt=" identifier for options"
              />{' '}
              {item.content}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default FilterForActivityLog;
