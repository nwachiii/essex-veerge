import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const HoverForPopUp = ({children, popUpText, handleClose, handleOpen, isOpen, popoverStyle}) => {
  return (
    <Popover
      autoFocus={false}
      placement="auto"
      isOpen={isOpen}
      onClose={handleClose}
      {...popoverStyle}
    >
      <PopoverTrigger w="fit-content" bg="blue">
        <Stack w="fit-content" onMouseLeave={handleClose} onMouseEnter={handleOpen}>
          {children}
        </Stack>
      </PopoverTrigger>

      <PopoverContent w="fit-content">
        <PopoverArrow />

        {isOpen ? (
          <PopoverBody boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)" borderRadius="8px">
            <Text
              w="fit-content"
              fontSize={'16px'}
              fontWeight="400"
              textAlign="center"
              whiteSpace="break-spaces"
            >
              {isOpen ? popUpText : null}
            </Text>
          </PopoverBody>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default HoverForPopUp;
