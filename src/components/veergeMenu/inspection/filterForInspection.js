import {
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import filter_icon from '/src/images/icons/filter_icon.svg';
import RadioForInspectionTypes from './radioForInspectionTypes';

export const FilterForInspection = () => {
  const filtered = useDisclosure();
  return (
    <Menu
      autoSelect={false}
      isOpen={filtered.isOpen}
      onClose={filtered.onClose}
      closeOnSelect={false}
    >
      <MenuButton
        alignSelf="flex-end"
        bg="#fff"
        fontWeight="400"
        fontSize="14px"
        lineHeight="18px"
        color="#191919"
        px="37px"
        height="48px"
        border="1px solid #E4E4E4"
        borderRadius="16px"
        onClick={filtered.onOpen}
      >
        <HStack justify="center" spacing="9px">
          <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />{' '}
          <Text fontSize="14px" fontWeight="400">
            Filter
          </Text>
        </HStack>
      </MenuButton>
      <MenuList
        w="188px"
        position="relative"
        zIndex="2"
        h="fit-content"
        px="24px"
        pl="20px"
        py="16px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        <MenuItem cursor="default" p="0px" bg="transparent">
          <HStack pl="4px" mb="21px" justify="space-between" w="full">
            <Heading fontSize="16px" fontWeight="500" color="#000">
              Inspection Type
            </Heading>
          </HStack>
        </MenuItem>
        <MenuItem
          bg="transparent"
          _active={{
            bg: 'transparent',
          }}
          p="0px"
        >
          <RadioForInspectionTypes menuDisclosure={filtered} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FilterForInspection;
