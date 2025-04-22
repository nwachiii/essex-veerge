import {Menu, MenuButton, MenuList, MenuItem, Text, Box, useDisclosure} from '@chakra-ui/react';
import React from 'react';

// Utility function to truncate long text
const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + '...';
  }
  return text;
};

export const TruncatedTextWithPopup = ({
  children, // Text passed as children
  maxLength = 20, // Maximum characters before truncation
  popupBgColor = 'white', // Background color of the menu
  textProps = {}, // Additional props for Text component
  popUpProps = {}, // Additional props for MenuList component
  ...rest // Rest props passed to Box
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const truncatedText = truncateText(children, maxLength);
  const isTruncated = children.length > maxLength;

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton as={Box} onMouseEnter={onOpen} onMouseLeave={onClose} cursor="pointer" {...rest}>
        <Text
          isTruncated
          noOfLines={1}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          {...textProps}
        >
          {truncatedText}
        </Text>
      </MenuButton>

      {isTruncated && (
        <MenuList bg={popupBgColor} borderRadius="8px" {...popUpProps}>
          <MenuItem _hover={{bg: 'transparent'}} _focus={{bg: 'transparent'}} h={'fit-content'}>
            <Text overflow="hidden" whiteSpace="wrap">
              {children}
            </Text>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default TruncatedTextWithPopup;
