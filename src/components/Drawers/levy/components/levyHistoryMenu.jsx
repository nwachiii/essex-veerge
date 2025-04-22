import React from 'react';
import {Menu, MenuButton, MenuList, MenuItem, Button, Stack, Image} from '@chakra-ui/react';

import optionIcon from '/src/images/icons/optionIcon.svg';

const LevyHistoryMenu = ({setScreen}) => {
  return (
    <Menu autoFocus={false} autoSelect={false} placement="bottom-end">
      <MenuButton
        as={Button}
        minW={'fit-content'}
        p="0px"
        minH="fit-content"
        w="fit-content"
        h="fit-content"
        variant="unstyled"
      >
        <Image src={optionIcon.src} alt="option icon" />
      </MenuButton>
      <MenuList
        boxShadow="none"
        minW="98px"
        borderRadius="4px"
        border="0.5px solid #e4e4e7"
        p="8px 0px"
      >
        <Stack w="full" spacing="8px">
          <MenuItem
            onClick={() => setScreen('track payment')}
            fontSize="11px"
            fontWeight="500"
            px="8px"
            h="17px"
            color="#27272a"
            _focus={{
              bg: 'transparent',
            }}
            _hover={{
              opacity: '0.7',
              bg: 'transparent',
            }}
          >
            Track Payment
          </MenuItem>
          <MenuItem
            fontSize="11px"
            _focus={{
              bg: 'transparent',
            }}
            fontWeight="500"
            px="8px"
            h="17px"
            color="#27272a"
            _hover={{
              opacity: '0.7',
              bg: 'transparent',
            }}
          >
            {'Pin Levy'}
          </MenuItem>
        </Stack>
      </MenuList>
    </Menu>
  );
};

export default LevyHistoryMenu;
