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
import {RemoveContactPerson} from '../../../../apis/listings';
import ConfirmUserActionComponent from '../../confirmUserAction';

export const ContactComponent = ({contactObj, editMode, listOfContacts, refetch, projectId}) => {
  const toast = useToast();
  const drawerDisclosure = useDisclosure();

  const mutation = useMutation(formData => RemoveContactPerson(formData, Number(projectId)), {
    onSuccess: async res => {
      await refetch();
      drawerDisclosure.onClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const removeContact = id => () => {
    mutation.mutate(id);
  };
  return (
    <>
      <HStack padding="14px 10px" bg="#F9FAFB" justify="space-between" border="0.5px solid #E4E4E4">
        <HStack spacing="15px">
          <Image
            alt="profile image icon"
            borderRadius="full"
            boxSize="68.5px"
            src={contactObj.image}
            objectFit="cover"
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
        {editMode ? (
          <HStack spacing="10px">
            <Button
              fontSize="10px"
              p="6px 8px"
              lineHeight={'12px'}
              borderRadius="4px"
              bg="transparent"
              h="max-content"
              border={'1px solid'}
              fontWeight="400"
              _hover={{
                opacity: '1',
              }}
              color="#FF6A6A"
              onClick={drawerDisclosure.onOpen}
            >
              Remove
            </Button>
          </HStack>
        ) : null}
      </HStack>
      <ConfirmUserActionComponent
        mutation={mutation}
        drawerDisclosure={drawerDisclosure}
        handleClose={drawerDisclosure.onClose}
        description={
          'The following details will be removed from contact persons for this listing'
        }
        handleSubmit={removeContact(contactObj.id)}
      />
    </>
  );
};

export default ContactComponent;
