import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  Image,
  MenuDivider,
  VStack,
  StackDivider,
  Button,
} from '@chakra-ui/react';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';

const SelectRole = ({setRole, selectedRole, placeHolderText = 'Role', iconStyle, ...rest}) => {
  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',
    },
  };

  const roles = [
    {name: 'Account & Finance', value: 'Account & Finance'},
    {name: 'Admin', value: 'Admin'},
    {name: 'Directors & General Managers', value: 'Directors & General Managers'},
    {name: 'Front Desk', value: 'Front Desk'},
    {name: 'Head of Sales', value: 'Head of Sales'},
    {name: 'Operations', value: 'Operations'},
    {name: 'Sales Representative', value: 'Sales Representative'},
    {name: 'Customer care representative', value: 'Customer care representative'},
    {name: 'Site Admin', value: 'Site Admin'},
  ];

  const handleSelect = obj => {
    setRole(obj);
  };
  const listOfActiveRoles = ['Account & Finance', 'Admin', 'Directors & General Managers'];
  const shouldDisable = role => {
    return !listOfActiveRoles.includes(role);
  };
  return (
    <Menu autoSelect={false}>
      <MenuButton
        border="0.667px solid #E4E4E4"
        borderRadius="5.339px"
        h="33.366px"
        w="full"
        bg="transparent"
        _hover={{bg: 'tranparent'}}
        _active={{
          bg: 'transparent',
        }}
        fontSize="12px"
        fontWeight="400"
        as={Button}
        textAlign="start"
        rightIcon={<Image src={dropDownIcon.src} alt="dropDown icon" {...iconStyle} />}
        {...rest}
      >
        {selectedRole ? selectedRole.name : placeHolderText}
      </MenuButton>
      <MenuList
        // py="13px"
        // as={VStack}
        minW="250px"
        boxShadow="2.57732px 2.57732px 5.15464px 0px rgba(123, 157, 157, 0.15), -2.57732px -2.57732px 5.15464px 0px rgba(123, 157, 157, 0.15)"
        p="0"
        m="0"
        overflow="hidden"
        borderRadius="10.31px"
      >
        <VStack
          divider={<StackDivider my="6px" borderColor="#F5F5F5" />}
          py="13px"
          overflowY="scroll"
          maxH="320px"
          sx={customScrollbarStyle}
        >
          {roles.map((item, idx) => (
            <MenuItem
              name={item.value}
              px="7.81px"
              pt="6.56px"
              fontSize="12px"
              fontWeight="400"
              color="#000"
              pb="7.44px"
              onClick={() => handleSelect(item)}
              _hover={{bg: 'tranparent'}}
              _active={{
                bg: 'transparent',
              }}
              _focus={{
                bg: 'transparent',
              }}
              key={idx}
              isDisabled={shouldDisable(item.name)}
            >
              {item.name}
            </MenuItem>
          ))}
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default SelectRole;
