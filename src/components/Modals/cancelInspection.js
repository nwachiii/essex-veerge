import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  Heading,
  Image,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react';
import binIcon from '/src/images/icons/binIcon.svg';
import {useMutation} from '@tanstack/react-query';
import {cancelInspectionForACustomer} from 'apis/fetchInspection';
import {CreateToast} from 'ui-lib/ui-lib.components';
import {toastForError} from 'utils/toastForErrors';

const CancelInspection = ({modalDisclosure, setListingId, listingId, refetch}) => {
  const toast = useToast();
  const toaster = CreateToast();
  const mutation = useMutation(listingId => cancelInspectionForACustomer(listingId), {
    onSuccess: async res => {
      setListingId('');
      toaster('Inspection successfully canceled.');
      refetch();
      modalDisclosure.onClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const cancelInspection = () => mutation.mutate(listingId);

  return (
    <Modal autoFocus={false} isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose}>
      <ModalOverlay />
      <ModalContent mt="15vh" borderRadius="16px" p="24px 0px 0px" minH="261px" maxH="428px">
        <HStack justify="end" mb="26px" pr="20px">
          <ModalCloseButton position="initial" />
        </HStack>
        <ModalBody p="0px 24px 24px 24px">
          <VStack align="center" spacing="24px">
            <VStack spacing="14px">
              <Heading fontSize="24px" fontWeight="600" color="#191919" textAlign="center">
                Are you sure ?
              </Heading>
              <Text w="368px" color="#4B4B4B" fontSize="16px" fontWeight="400" textAlign="center">
                {
                  'This action is irreversible. Once deleted, you will need to reschedule the inspection'
                }
              </Text>
            </VStack>

            <HStack w="full" spacing="16px" justify="center">
              <Button
                bg="transparent"
                onClick={modalDisclosure.onClose}
                h="55px"
                minW="167px"
                color="#FF6A6A"
                p="16px 48px"
                borderRadius="72px"
                border="none"
                boxShadow="0px 0px 1px 1px #FF6A6A"
                _focus={{
                  bg: 'transparent',
                }}
                _hover={{
                  bg: 'transparent',
                }}
                _active={{bg: 'transparent'}}
                _focusVisible={{
                  bg: 'transparent',
                }}
              >
                Cancel
              </Button>
              <Button
                h="55px"
                minW="167px"
                bg="#191919"
                p="16px 48px"
                onClick={cancelInspection}
                borderRadius="72px"
                color="#fff"
                _focus={{
                  opacity: 1,
                }}
                _hover={{
                  opacity: 1,
                }}
                _active={{opacity: 1}}
                isLoading={mutation.isLoading}
                _focusVisible={{
                  opacity: 1,
                }}
              >
                Proceed
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CancelInspection;
