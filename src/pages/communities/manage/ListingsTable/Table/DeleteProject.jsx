import React from 'react';
import {Button, Popup} from '../../../../../ui-lib/ui-lib.components';
import {themeStyles} from '../../../../../theme';
import {HStack, Image, Spinner, Text, VStack, useDisclosure, useToast} from '@chakra-ui/react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {deleteListingFromDraft, fetchDrafts} from '../../../../../apis/listings';
import deleteIcon from '/src/images/icons/delete-icon.svg';

import successGif from '/src/images/check-icon.gif';
import {AnimatedLoader} from '../../../../../components/common/loaders';

export const DeleteProject = ({project}) => {
  const id = project?.id;
  const name = project?.name;
  const WARNING_MODAL = useDisclosure();
  const DELETE_SUCCESS_MODAL = useDisclosure();
  return (
    <div>
      <Button
        mt={0}
        onClick={WARNING_MODAL.onOpen}
        borderRadius="12px"
        bg="rgba(255, 106, 106, 0.1)"
        w="115px"
        h="40px"
        color={themeStyles.color.matador__red}
        border="1px solid #e5e5e5"
        fontWeight="400"
        fontSize="16px"
        variant="outline"
      >
        Delete
      </Button>
      <WarningModal
        WARNING_MODAL={WARNING_MODAL}
        DELETE_SUCCESS_MODAL={DELETE_SUCCESS_MODAL}
        name={name}
        id={id}
      />
      <ConfirmDeleteModal
        WARNING_MODAL={WARNING_MODAL}
        DELETE_SUCCESS_MODAL={DELETE_SUCCESS_MODAL}
        name={name}
        id={id}
      />
    </div>
  );
};

export const WarningModal = ({WARNING_MODAL, DELETE_SUCCESS_MODAL, name, id}) => {
  const toast = useToast();
  const mutation = useMutation(data => deleteListingFromDraft(data), {
    onSuccess: res => {
      console.log(res);
      DELETE_SUCCESS_MODAL.onOpen();
      WARNING_MODAL.onClose();
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err.response.data.message ?? err.response.data.email[0] ?? 'An error occured'}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleDeleteWarning = () => {
    mutation.mutate(id);
  };
  return (
    <Popup
      minW="492px"
      minH="406px"
      pt="35px"
      pb="35px"
      isOpen={WARNING_MODAL.isOpen}
      onClose={WARNING_MODAL.onClose}
      isCentered
    >
      <Image alt="" src={deleteIcon.src} boxSize="68px" mt="25px" mx="auto" />

      <Popup.Body mb={8}>
        <Text fontSize="24px" fontWeight={600}>
          Delete Listing
        </Text>
        <VStack w="full" px={0.2} pt={4}>
          <Text
            fontWeight="300"
            fontSize="16px"
            lineHeight="20px"
            color="#191919"
            textAlign="center"
          >
            Are you sure you want to delete <b>{name}</b> from draft?
          </Text>
        </VStack>
      </Popup.Body>
      <HStack w="full" justify={'center'} spacing="21px" mt="30px">
        <Button
          borderRadius="72px"
          onClick={handleDeleteWarning}
          variant="primary"
          mx="auto"
          h="55px"
        >
          {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Yes'}
        </Button>
        <Button
          color={themeStyles.color.matador__red}
          onClick={WARNING_MODAL.onClose}
          variant="primary"
          bg="transparent"
          border={`1px solid ${themeStyles.color.matador__red}`}
          borderRadius="72px"
          mx="auto"
          h="55px"
        >
          Cancel
        </Button>
      </HStack>
    </Popup>
  );
};
export const ConfirmDeleteModal = ({DELETE_SUCCESS_MODAL, name, id}) => {
  const toast = useToast();
  const DRAFTS_DATA = useQuery(['listing_drafts'], fetchDrafts);
  if (DRAFTS_DATA?.isLoading) {
    return (
      <VStack h="50vh">
        <AnimatedLoader />
      </VStack>
    );
  }
  if (DRAFTS_DATA?.isError) {
    return toast({
      title: `Kindly refresh the page' `,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }
  const handleSuccess = () => {
    DELETE_SUCCESS_MODAL.onClose();
    location.reload();
  };
  return (
    <Popup
      minW="492px"
      minH="406px"
      pt="55px"
      isOpen={DELETE_SUCCESS_MODAL.isOpen}
      onClose={DELETE_SUCCESS_MODAL.onClose}
      isCentered
    >
      <Popup.Body mb={8}>
        <Image alt="" src={successGif.src} w="108px" mx="auto" />
        <Text mx="auto" textAlign={'center'} fontSize="24px" fontWeight={500}>
          Deleted <b>{name}</b> Successfully!
        </Text>
      </Popup.Body>
      <Button my="35px" onClick={handleSuccess} variant="primary" mx="auto" w="86%" h="55px">
        {'Close'}
      </Button>
    </Popup>
  );
};

export default DeleteProject;
