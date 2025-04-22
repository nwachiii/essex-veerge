import {Container, HStack, Tag, TagLabel, Text, VStack} from '@chakra-ui/react';
import React from 'react';

export const Container2 = ({children, ...restProps}) => {
  return (
    <Container
      maxW="888px"
      borderRadius="16px"
      background="#FFFFFF"
      boxShadow="sm"
      border="1px solid #E5E5E5"
      {...restProps}
    >
      {children}
    </Container>
  );
};

export const Container3 = ({
  title,
  children,
  teams,
  isUpdated,
  titleFontSize,
  spacing,
  mt,
  isRequired,
  ...restProps
}) => {
  return (
    <VStack spacing={spacing ? spacing : '18px'} mt={mt ? mt : '18px'}>
      <HStack
        pt={teams ? '35px' : null}
        bg={teams ? '#ffffff' : null}
        align="center"
        spacing={'19px'}
        w="full"
      >
        <Text
          fontWeight={'500'}
          fontSize={titleFontSize || '18px'}
          lineHeight={titleFontSize ? 'auto' : '23px'}
        >
          {title}
        </Text>
        {isUpdated
          ? null
          : isRequired && (
              <Tag
                borderRadius="48px"
                color="#FF9103"
                w="94px"
                textAlign="center"
                px="13px"
                h="36px"
                bg="#FF91031A"
              >
                <Text w="full" textAlign="center">
                  Required
                </Text>
              </Tag>
            )}
      </HStack>
      <Container
        px="26px"
        py="23px"
        mb="14px"
        maxW="100%"
        // boxShadow="base"
        background="#FFFFFF"
        // border="1px solid #F4F4F4"

        borderRadius={'16px'}
        {...restProps}
      >
        {children}
      </Container>
    </VStack>
  );
};
