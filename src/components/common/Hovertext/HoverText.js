import {
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {truncateLongText} from 'utils';

const HoverText = ({text, children, displayText, isTruncated}) => {
  const {isOpen, onToggle, onClose} = useDisclosure();

  return (
    <Popover placement="top" isOpen={children ? isOpen && isTruncated : isOpen} onClose={onClose}>
      {/* <Button > */}
      <PopoverTrigger>
        <Tag
          cursor="pointer"
          w={children ? 'max-content' : '95px'}
          onMouseLeave={onToggle}
          onMouseEnter={onToggle}
          h="36px"
          size="lg"
          color={children ? 'black' : '#7255CB'}
          bg={children ? 'transparent' : '#7255CB1A'}
          fontSize={children ? '14px' : '16px'}
          fontWeight="400"
          textTransform="capitalize"
          borderRadius="full"
          p={children ? 0 : ''}
        >
          <TagLabel mx="auto">{children ? children : text}</TagLabel>
        </Tag>
      </PopoverTrigger>
      {/* </Button> */}
      <PopoverContent borderRadius="16px" minW="max-content" maxW={'MAX-content'}>
        <PopoverArrow />

        <PopoverBody
          boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)"
          //   border="solid black 1px"
          borderRadius="8px"
        >
          {children ? (
            displayText
          ) : (
            <VStack justify="start" zIndex="" p="20px" bg="#ffffff">
              <Heading w="full" textAlign="start" as="h1" fontSize="18px" fontWeight="700">
                Note
              </Heading>
              <Text
                textAlign="start"
                w="354px"
                whiteSpace="break-spaces"
                fontSize="16px"
                fontWeight="400"
              >
                Dan Smith signed up with Mary Jane’s referral link. However, Samuel is requesting
                for a commission on a Property sale, it might be safe to do your due diligence
                before approving.
              </Text>
            </VStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HoverText;
