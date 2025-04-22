import {
  Center,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {BsReply, BsThreeDotsVertical} from 'react-icons/bs';
import {CreateToast} from '../../../ui-lib';

export const ActionMenu = ({respondDisclosure}) => {
  const toast = CreateToast();

  const handleDisabledState = () => {
    return toast("You're currently ineligible for this feature,please contact support.", {
      // bg: "rgb(242, 171, 70,0.9)",
      // color: "#fff",
      color: '#fff',
      bg: 'orange.300',
      h: '55px',

      borderRadius: '3px',
      py: '10px',
    });
  };
  return (
    <>
      <Center
        h="30px"
        w="30px"
        borderRadius={'4px'}
        border="2px solid #e4e4e4"
        onClick={respondDisclosure.onOpen}
        _hover={{background: '#f5f5f5'}}
        cursor="pointer"
      >
        <Icon as={BsReply} color="#191919" />
      </Center>
      {/* <Menu closeOnSelect autoSelect={false} placement="bottom-end">
        <MenuButton borderRadius={'4px'} _hover={{background: '#f5f5f5'}}></MenuButton>
        <MenuList
          minW="139px"
          p="20px"
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          borderRadius="16px"
          bg="#fff"
        >
          <MenuItem p="0px" bg="transparent">
            <Text
              w="full"
              onClick={respondDisclosure.onOpen}
              fontSize="14px"
              fontWeight="400"
              color="#191919"
            >
              Respond
            </Text>
          </MenuItem>
          <MenuItem mt="25px" onClick={handleDisabledState} p="0px" bg="transparent">
            <Text w="full" fontSize="14px" fontWeight="400" color="#191919">
              Create a ticket
            </Text>
          </MenuItem>
        </MenuList>
      </Menu> */}
    </>
  );
};

export default ActionMenu;
