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
  Text,
  Button,
  Heading,
} from '@chakra-ui/react';

const ResetWarningModal = ({modalDisclosure, resetFnc}) => {
  return (
    <Modal isOpen={modalDisclosure.isOpen} isCentered onClose={modalDisclosure.onClose}>
      <ModalOverlay bg="rgba(0,0,0,0.2)" />
      <ModalContent borderRadius="16px" p="24px" minW="428px" maxW="428px" minH="fit-content">
        <HStack mb="26px" w="full" justify="end">
          <ModalCloseButton position="initial" />
        </HStack>
        <ModalBody p="0px">
          <VStack w="full" justify="center" spacing="14px">
            <Heading fontSize="24px" fontWeight="600">
              Are you sure?
            </Heading>
            <Text maxW="368px" fontSize="16px" fontWeight="400" textAlign="center">
              This action is irreversible, once discarded {"you'll "}have to start all over again
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter p="0px">
          <HStack mt="24px" spacing="16px">
            <Button
              w="167px"
              _hover={{
                opacity: 1,
                bg: 'transparent',
              }}
              _focus={{
                opacity: 1,
                bg: 'transparent',
              }}
              h="55px"
              variant="ghost"
              cursor="default"
            >
              <Text
                as="span"
                color="#FF6A6A"
                fontSize="18px"
                fontWeight="400"
                onClick={modalDisclosure.onClose}
                cursor="pointer"
              >
                {' '}
                No,go back
              </Text>
            </Button>
            <Button
              bg="#242526"
              _hover={{
                opacity: 1,
              }}
              _focus={{
                opacity: 1,
              }}
              w="167px"
              fontSize="18px"
              variant="filled-radius"
              fontWeight="400"
              color="#ffffff"
              h="55px"
              onClick={resetFnc}
            >
              Yes
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetWarningModal;
