import {
  Spinner,
  useToast,
  HStack,
  Heading,
  useDisclosure,
  VStack,
  Textarea,
  Text,
  Image,
  Box,
  Modal,
  ModalContent,
  Button as ChakraBtn,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react';

import successGif from '/src/images/check-icon.gif';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Button, CreateToast} from '../../ui-lib';

import {handleRequestCommssion} from '../../apis/requests';
import AcceptCommissionRequest from '../../components/Modals/commissionRequest';
import {toastForError} from '../../utils/toastForErrors';
import {useRouter} from 'next/router';

export const HandleCommissionRequest = ({refetch, agentId, requestId}) => {
  const [reason, setReason] = React.useState('');

  const toast = useToast();
  const router = useRouter();

  const success = useDisclosure();
  const reject = useDisclosure();
  const acceptModalDisclosure = useDisclosure();

  const toaster = CreateToast();

  const mutation = useMutation(formData => handleRequestCommssion(requestId, formData), {
    onSuccess: async res => {
      // success.onOpen();
      await refetch();

      toaster('commission request has been rejected successfully');
      setReason('');
      reject.onClose();
    },
    onError: err => {
      // reject.onClose();

      toastForError(err, true, toast);
    },
  });

  const closeForSuccess = async () => {
    await refetch();
    success.onClose();
  };
  const handleRequest = reason => {
    return mutation.mutate({action: 'reject', note: reason});
  };

  return (
    <HStack spacing="8px">
      {/* <AcceptRequest refetch={refetch} id={requestId} /> */}
      {/* <ChakraBtn
        onClick={acceptModalDisclosure.onOpen}
        _hover={{opacity: '0.9'}}
        _active={{opacity: '0.9'}}
        _focus={{opacity: '0.9'}}
        // variant="primary"
        borderRadius="72"
        h="26px"
        w="58px"
        bg="#191919"
        p="4px 8px"
        color="#FFFFFF"
        fontSize="12px"
        fontWeight="500"
      >
        Accept
      </ChakraBtn> */}
      <AcceptCommissionRequest
        modalDisclosure={acceptModalDisclosure}
        id={requestId}
        agentId={agentId}
        refetch={refetch}
      />
      <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

      <RejectMenu
        success={success}
        reject={reject}
        reason={reason}
        setReason={setReason}
        mutation={mutation}
        handleRequest={handleRequest}
      />
      <Modal onClose={success.onClose} isOpen={success.isOpen} isCentered>
        <ModalCloseButton />
        <ModalOverlay />
        <ModalContent borderRadius="16px" p="32px" pb="44px">
          <ModalBody p="0">
            <VStack spacing>
              <Image
                width="88px"
                height="88px"
                objectFit="contain"
                src={successGif.src}
                alt="success image"
              />
              <Heading as="h1" mt="23px" color="#191919" fontSize="24px" fontWeight="600">
                Request Rejected Successfully
              </Heading>
              {/* <Text  as="span" fontSize="16px" fontWeight="300">

              </Text> */}
              <Button
                onClick={closeForSuccess}
                w="full"
                h="55px"
                variant="violet"
                bg="#242526"
                color="#fff"
                mt="79px"
              >
                Ok
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

const RejectMenu = ({handleRequest, mutation, setReason, reason, reject}) => {
  const handleSubmit = e => {
    if (e.cancelable) e.preventDefault();

    return handleRequest(reason);
  };

  const handleClose = () => {
    setReason('');
    return reject.onClose();
  };

  const isValid = !reason.trim();

  return (
    <>
      <Button
        isDisabled={mutation.isLoading}
        mt={0}
        variant="outline"
        border="1px solid #191919"
        color="#191919"
        fontSize="12px"
        fontWeight="500"
        _hover={{opacity: '0.9'}}
        _active={{opacity: '0.9'}}
        _focus={{opacity: '0.9'}}
        // variant="primary"
        borderRadius="72px"
        h="26px"
        w="53px"
        p="4px 8px"
        onClick={reject.onOpen}
      >
        Reject
      </Button>
      <Modal isCentered isOpen={reject.isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent borderRadius="16px">
          <ModalCloseButton />
          <ModalHeader pb="0" mb="5px" fontSize="24px" textAlign="start" w="full" fontWeight="600">
            Reason for rejection
          </ModalHeader>
          <ModalBody pt="0" pb="21px">
            <VStack>
              <Text
                as="span"
                color="#3D3D3D"
                textAlign="start"
                w="full"
                fontSize="14px"
                fontWeight="300"
              >
                Why are you rejecting this request?
              </Text>
              <Box mt="17px" w="full" position="relative">
                <Textarea
                  maxLength="250"
                  name="reason"
                  onChange={e => setReason(e.target.value)}
                  value={reason}
                  resize="none"
                  width="full"
                  height="150px"
                  pb="34px"
                />
                <Text
                  as="span"
                  fontSize="14px"
                  position="absolute"
                  bottom="0"
                  right="5px"
                  fontWeight="300"
                  color="#CBCBCB"
                >
                  {reason.length}/250
                </Text>
              </Box>
              <Button
                mt="23px"
                notes
                onClick={handleSubmit}
                isLoading={mutation.isLoading}
                isDisabled={isValid || mutation.isLoading}
                h="55px"
                fontSize="16px"
                borderRadius="72px"
                _hover={{opacity: 1}}
                w="full"
                variant="violet"
                bg="#242526"
                color="#fff"
                alignSelf="end"
              >
                {mutation.isLoading ? <Spinner color="whitesmoke" /> : 'Proceed'}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
