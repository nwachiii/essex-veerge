import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import downArrow from '/src/images/icons/downArrow.svg';

export const InspectionStateMenu = () => {
  const sortDisclosure = useDisclosure();
  const router = useRouter();

  const handleStatus = e => {
    const defaultQuery = {
      status: `${e.target.name}`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    // return menuDisclosure.onClose();
  };
  return (
    <Menu autoSelect={false} isOpen={sortDisclosure.isOpen} onClose={sortDisclosure.onClose}>
      <MenuButton
        onClick={sortDisclosure.onOpen}
        p="0px"
        w="fit-content"
        border="1px solid #E4E4E4"
        px="18px"
        h="46px"
        borderRadius="16px"
        _hover={{
          background: '#fff',
        }}
        bg="#fff"
        _focus={{background: '#fff'}}
        _active={{
          background: '#fff',
        }}
        fontSize="14px"
        fontWeight="400"
        rightIcon={<Image src={downArrow.src} alt="arrow icon" />}
        as={Button}
      >
        {router.query.status || 'Upcoming inspection'}
      </MenuButton>
      <MenuList
        zIndex="222"
        minW="256px"
        py="8px"
        borderRadius="13.775px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        padding="18px 0px"
      >
        <MenuItem
          px="25px"
          pl="12.9px"
          name={'Upcoming inspection'}
          onClick={handleStatus}
          textAlign="start"
          fontSize="14px"
          fontWeight="400"
          py="15px"
        >
          Upcoming inspection
        </MenuItem>
        <MenuDivider my="0px" />
        <MenuItem
          px="25px"
          pl="12.9px"
          py="15px"
          name={'Completed'}
          onClick={handleStatus}
          textAlign="start"
          fontSize="14px"
          fontWeight="400"
        >
          Completed
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default InspectionStateMenu;
