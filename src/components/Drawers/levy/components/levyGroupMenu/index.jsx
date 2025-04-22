import {Box, Flex, HStack, Input, Stack, Text, useOutsideClick} from '@chakra-ui/react';
import React, {useRef, useState} from 'react';
import LevyTags from '../utils/levyTags';
import {motion} from 'framer-motion';
import GroupMenu from './groupMenu';
const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
const SelectLevyGroup = () => {
  const [active, setActive] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);
  const sourceRef = useRef(null);

  useOutsideClick({
    handler: () => setActive(false),
    ref: sourceRef,
  });
  useOutsideClick({
    handler: () => setIsFocus(false),
    ref: inputRef,
  });

  return (
    <Box zIndex={3} pos="relative">
      <HStack
        ref={sourceRef}
        p="8px 12px"
        border="1px solid"
        borderRadius="8px"
        borderColor={active ? '#a1a1aa' : '#e4e4e4'}
        spacing="6px"
        w="full"
        minH="40px"
        pos="relative"
        as={motion.div}
        layout
      >
        <Text
          alignSelf={active && [].length ? 'start' : 'center'}
          fontSize="14px"
          fontWeight="400"
          as={motion.p}
          layout
          color="#919191"
        >
          To:
        </Text>
        <Stack spacing="6px" w="full">
          {false || active ? (
            false ? (
              <Flex
                sx={customScrollStyle}
                overflowX={active ? 'auto' : 'initial'}
                overflowY={!active ? 'auto' : 'initial'}
                gap="6px"
                maxW="321px"
                maxH="200px"
                as={motion.div}
                layout
                flexWrap={active ? 'wrap' : 'nowrap'}
                w="full"
              >
                {false
                  ? [].map(() => <LevyTags canDelete type="client" text="Client Type" />)
                  : null}
              </Flex>
            ) : null
          ) : (
            <Text
              cursor="pointer"
              onClick={() => setActive(true)}
              fontSize="13px"
              fontWeight="400"
              color="#919191"
            >
              Add by name or Filter by category{' '}
            </Text>
          )}
          {active ? (
            <Input
              h="27px"
              ref={inputRef}
              onFocus={() => setIsFocus(true)}
              //   onBlur={() => setIsFocus(false)}
              p="0px"
              border="none"
              fontSize="13px"
              fontWeight="400"
              _placeholder={{color: '#919191'}}
              placeholder="Add by name or Filter by category"
              color="#52525b"
              _focus={{
                bg: 'transparent',
                border: 'none',
                outline: 'none',
              }}
              _focusVisible={{
                bg: 'transparent',
                border: 'none',
                outline: 'none',
              }}
              _hover={{
                bg: 'transparent',
                border: 'none',
                outline: 'none',
              }}
              w="full"
            />
          ) : null}
        </Stack>
        {active ? <GroupMenu userRef={inputRef} isFocus={isFocus} /> : null}
      </HStack>
    </Box>
  );
};

export default SelectLevyGroup;
