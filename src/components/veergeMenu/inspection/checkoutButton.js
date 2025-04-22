import {Box, Button, HStack, Text, VStack, useDisclosure, useToast} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {toastForError} from '../../../utils/toastForErrors';
import {checkOutInspection} from '../../../apis/veerge_menu';
import {CreateToast, Popup2} from 'ui-lib/ui-lib.components';

export const CheckoutButton = ({refetch, REQUESTID, children}) => {
  const toast = useToast();
  const toaster = CreateToast();

  const modalDisclosure = useDisclosure();

  const mutation = useMutation(formData => checkOutInspection(formData, REQUESTID), {
    onSuccess: async res => {
      await refetch();
      toaster('Check out successful');
      return modalDisclosure.onClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const handleCheckout = () => {
    return mutation.mutate({});
  };
  return (
    <>
      {children ? (
        <Box onClick={modalDisclosure.onOpen}>{children}</Box>
      ) : (
        <Button
          fontSize="16px"
          fontWeight="500"
          color="#242526"
          w="115px"
          bg="transparent"
          h="52px"
          onClick={modalDisclosure.onOpen}
          borderRadius="12px"
          border="1px solid #242526"
          _hover={{
            opacity: '1',
          }}
        >
          Check-out
        </Button>
      )}
      <Popup2
        minW="464px"
        maxW="464px"
        p="30px 36px"
        mt="20vh"
        hideCloseButton={true}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        h="fit-content"
      >
        <Popup2.Header displayCloseBtn></Popup2.Header>
        <Popup2.Body p="0px" h="69px">
          <VStack w="full" pt="20px" justify="space-between">
            <Text fontSize="28px" fontWeight="700">
              Are you sure?
            </Text>
            <Text fontSize="14px" fontWeight="300">
              Make sure the inspection is completed before checking out
            </Text>
          </VStack>
        </Popup2.Body>
        <Popup2.Footer p="0px" mt="36px" stackStyle={{w: 'full'}}>
          <HStack w="full" justify="space-between">
            <Button
              variant="outline"
              borderColor="#FF6A6A"
              h="55px"
              p="16px 48px"
              flex={`1`}
              fontSize="18px"
              fontWeight="400"
              _hover={{opacity: '1'}}
              color="#FF6A6A"
              borderRadius="72px"
              onClick={modalDisclosure.onClose}
            >
              Cancel
            </Button>
            <Button
              bg="#242526"
              color="#fff"
              fontSize="18px"
              fontWeight="400"
              borderColor="#FF6A6A"
              h="55px"
              p="16px 48px"
              flex={`1`}
              borderRadius="72px"
              onClick={handleCheckout}
              _hover={{opacity: '1'}}
              isLoading={mutation.isLoading}
            >
              Proceed
            </Button>
          </HStack>
        </Popup2.Footer>
      </Popup2>
    </>
  );
};

export default CheckoutButton;
