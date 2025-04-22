import {Box, Image, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import React from 'react';

export const CustomToolTip = ({CUSTOM_TOOL_TIP_MODAL, info, pointerPosition, ...rest}) => {
  return (
    <Menu
      isOpen={CUSTOM_TOOL_TIP_MODAL.isOpen}
      onClose={CUSTOM_TOOL_TIP_MODAL.onClose}
      fontFamily="Euclid Circular B"
    >
      <MenuList
        borderRadius={'xl'}
        mt="6rem"
        w={241}
        position={'absolute'}
        right={'-6.7rem'}
        boxShadow={'xl'}
        bg="#191919"
        {...rest}
      >
        <Box
          position={'absolute'}
          zIndex={-100}
          top={pointerPosition?.top || '-.8rem'}
          right={pointerPosition?.right || '.3rem'}
          width="0"
          height="0"
          borderLeft="70px solid transparent"
          borderRight="70px solid transparent"
          borderBottom="80px solid #191919"
          boxShadow={'xl'}
        />
        <MenuItem
          cursor={'default'}
          px="13px"
          _hover={{bg: '#191919'}}
          py="8px"
          borderRadius={'xl'}
          bg="#191919"
        >
          <Text
            color="#FFFFFF"
            fontSize="12px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="18px"
          >
            {info || 'no content...'}
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CustomToolTip;
