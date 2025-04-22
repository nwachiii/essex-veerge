import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import filterIcon from '/src/images/icons/activitylogDrawerfiltericon.svg';
import identityIcon from '/src/images/icons/sortByIdentifier.svg';

export const FilterMenu = ({forFilter, handleOptions}) => {
  const filterDisclosure = useDisclosure();
  const hoverDisclosure = useDisclosure();
  const arrayForType = [
    {value: 'all', content: 'Type'},
    {
      value: 'share',
      content: 'Share',
    },
    {value: 'Project', content: 'Project'},
    {value: 'Offer', content: 'Offer'},
    {value: 'inspection', content: 'Inspection'},
    {value: 'Watchlist', content: 'Watchlist'},
    {value: 'Feedback', content: 'Feedback'},
  ];
  return (
    <Box position="relative">
      <Menu autoSelect={false} isOpen={hoverDisclosure.isOpen} onClose={hoverDisclosure.onClose}>
        <MenuButton
          position="absolute"
          right="0px"
          bg="transparent"
          p="0px"
          boxSize="36px"
          _focus={{
            bg: 'transparent',
          }}
          h="36px"
          minW="36px"
          onClick={filterDisclosure.onOpen}
          onMouseEnter={hoverDisclosure.onOpen}
          onMouseLeave={hoverDisclosure.onClose}
          _active={{
            bg: 'transparent',
          }}
          as={Button}
        >
          <Image alt="filter icon" m="0px" src={filterIcon.src} />
        </MenuButton>
        <Menu
          autoSelect={false}
          isOpen={filterDisclosure.isOpen}
          onClose={filterDisclosure.onClose}
        >
          <MenuButton
            bg="transparent"
            p="0px"
            boxSize="36px"
            h="36px"
            minW="36px"
            _focus={{
              bg: 'transparent',
            }}
            onClick={filterDisclosure.onOpen}
            onMouseEnter={hoverDisclosure.onOpen}
            onMouseLeave={hoverDisclosure.onClose}
            _active={{
              bg: 'transparent',
            }}
            as={Button}
          >
            <Image alt="filter icon" m="0px" src={filterIcon.src} />
          </MenuButton>
          <MenuList
            minW="135px"
            position="relative"
            zIndex="10866666"
            boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
            borderRadius="16px"
            bg="#ffffff"
            overflow="hidden"
          >
            {arrayForType.map((item, idx) => {
              return (
                <>
                  <MenuItem
                    as="button"
                    key={idx}
                    onClick={handleOptions}
                    name={item.value}
                    fontSize="14px"
                    mb="10px"
                    fontWeight="400"
                  >
                    <Image
                      opacity={forFilter === item.value ? 1 : 0}
                      _hover={{background: '#EDF2F7'}}
                      mr="10px"
                      h="11px"
                      src={identityIcon.src}
                      alt=" identifier for options"
                    />{' '}
                    {item.content}
                  </MenuItem>
                  {item.value === 'all' ? <MenuDivider /> : null}
                </>
              );
            })}
          </MenuList>
        </Menu>
        <MenuList
          bg="#191919"
          minW="fit-content"
          borderRadius="3.624px"
          padding="7.8px 5.2px"
          mt="-8px"
        >
          <MenuItem
            m="0"
            fontSize="10.873px"
            fontWeight="400"
            color="#fff"
            p="0"
            bg="transparent"
            w="fit-content"
          >
            filter
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default FilterMenu;
