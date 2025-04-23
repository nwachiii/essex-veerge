import React from 'react';
import {
  Image,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
} from '@chakra-ui/react';
import {Button} from 'ui-lib/ui-lib.components';
import achieved from '/src/images/archieved_allocation.png';
import successful from '/src/images/successful_allocatin.png';

export const ArchivedInfoModals = ({
  isFirstOpen,
  onFirstClose,
  handleNext,
  selectedAllocations,
  isSecondOpen,
  onSecondClose,
  handleProgress,
}) => {
  return (
    <div>
      {' '}
      <Modal isCentered isOpen={isFirstOpen} onClose={onFirstClose} px={0}>
        <ModalOverlay />
        <ModalContent borderRadius="16px">
          <ModalCloseButton mt={4} fontWeight={'500'} fontSize={'20px'} />
          <ModalBody width="100%" mt="26px" pb="31px">
            <VStack width="100%" pb={'10px'}>
              <Image
                alt=""
                mt="19px"
                src={achieved.src}
                boxSize="72px"
                width="68px"
                height="68px"
              />
              <Text
                mt="30px"
                textAlign="center"
                maxW="235px"
                fontSize="24px"
                fontWeight="600"
                lineHeight="30px"
              >
                Archive selected allocations
              </Text>
              <Text mt="11px" textAlign="center" fontSize="16px" fontWeight="300" lineHeight="20px">
                You are about to archive {selectedAllocations?.length} selected allocations
              </Text>
              <Button onClick={handleNext} mt="33px" variant="primary" width="325px" height="48px" borderRadius='72px'>
                Proceed
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={isSecondOpen} onClose={onSecondClose}>
        <ModalOverlay />
        <ModalContent borderRadius="16px">
          <ModalCloseButton />
          <ModalBody width="100%" mt="26px" pb="31px">
            <VStack width="100%" pb={'10px'}>
              <Image
                alt=""
                mt="19px"
                src={successful.src}
                boxSize="72px"
                width="68px"
                height="68px"
              />
              <Text
                mt="30px"
                textAlign="center"
                maxW="235px"
                fontSize="24px"
                fontWeight="600"
                lineHeight="30px"
              >
                Allocations archived successfully
              </Text>
              <Text mt="11px" textAlign="center" fontSize="16px" fontWeight="300" lineHeight="20px">
                Ready to publish allocations?
              </Text>
              <Button
                onClick={() => handleProgress(val => val + 1)}
                mt="53px"
                variant="primary"
                width="425px"
                borderRadius="72px"
                height="48px"
              >
                OK
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ArchivedInfoModals;
