import {
  Button,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {toastForError} from '../../../../utils/toastForErrors';
import ConfirmUserActionComponent from '../../confirmUserAction';

export const ContactComponent = ({contactObj, editMode, listOfContacts, refetch, projectId}) => {
  return (
    <>
      <Stack
        padding="12px"
        bg="#F9FAFB"
        justify="space-between"
        border="0.5px solid #E4E4E7"
        borderRadius="8px"
        gap="12px"
        h="100px"
      >
        <Text
          fontSize="14px"
          fontWeight="600"
          color="#191919"
          lineHeight={'19.5px'}
          letterSpacing="0.26px"
        >
          {contactObj.title}
        </Text>
        <HStack spacing="15px">
          <Image
            alt="profile image icon"
            borderRadius="full"
            boxSize="32px"
            src={contactObj.image}
            objectFit="cover"
          />
          <Stack spacing="4px">
            <Text
              fontSize="14px"
              fontWeight="500"
              color="#191919"
              lineHeight={'19.5px'}
              letterSpacing="0.26px"
            >
              {contactObj.name}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="#4545FE" lineHeight={'15px'}>
              {contactObj.email}
            </Text>
          </Stack>
        </HStack>
      </Stack>
    </>
  );
};

export default ContactComponent;
