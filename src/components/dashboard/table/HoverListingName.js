import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {truncateLongText} from '../../../utils';

const HoverListingName = ({text, lens, ...rest}) => {
  const {isOpen, onToggle, onClose, onOpen} = useDisclosure();

  return (
    <Popover autoFocus={false} placement="top" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Text
          onMouseLeave={() => (text.length < (lens ?? 17) ? null : onClose())}
          onMouseEnter={() => (text.length < (lens ?? 17) ? null : onOpen())}
          fontSize={'16px'}
          fontWeight="400"
          textAlign={'left'}
          textTransform="capitalize"
          {...rest}
        >
          {truncateLongText(text, lens)?.truncatedText.split(',')[0]}
          <Text as="span" fontWeight="500">
            {truncateLongText(text, lens)?.truncatedText.split(',')[1]}
          </Text>
        </Text>
      </PopoverTrigger>

      <PopoverContent w="fit-content">
        <PopoverArrow />

        <PopoverBody boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)" borderRadius="8px">
          <Text
            w="fit-content"
            fontSize={'16px'}
            fontWeight="400"
            textAlign="center"
            whiteSpace="break-spaces"
          >
            {text}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HoverListingName;
