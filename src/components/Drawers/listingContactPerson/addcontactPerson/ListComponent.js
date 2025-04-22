import {Button, HStack, Image, Stack, Text} from '@chakra-ui/react';
import React, {useState} from 'react';
import cancelIcon from '/src/images/icons/cancelIconForContactPerson.svg';

export const ListComponent = ({handleCancel, contactObj}) => {
  return (
    <HStack
      padding="14px 22px 13px 25.074px"
      bg="#F9FAFB"
      justify="space-between"
      border="0.5px solid #E4E4E4"
      borderRadius={'4px'}
    >
      <HStack spacing="15px">
        <Image
          alt="profile image icon"
          borderRadius="full"
          boxSize="38.5px"
          src={contactObj.img}
          objectFit="cover"
          // bg="#191919"
        />
        <Stack spacing="10px" textTransform={'capitalize'}>
          <Text fontSize="14px" fontWeight="500" color="#191919" lineHeight={'18px'}>
            {contactObj.name}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="#606060" lineHeight={'15px'}>
            {contactObj.phone_number}
          </Text>
        </Stack>
      </HStack>

      <HStack spacing="10px">
        <Button
          fontSize="10px"
          p="6px 8px"
          lineHeight={'12px'}
          borderRadius="4px"
          // bg="rgba(255, 106, 106, 0.10)"
          bg="transparent"
          // h="30px"
          h="max-content"
          border={'1px solid'}
          fontWeight="400"
          _hover={{
            opacity: '1',
          }}
          color="#FF6A6A"
          onClick={handleCancel}
        >
          Remove
        </Button>
      </HStack>
    </HStack>
  );
};

export default ListComponent;
