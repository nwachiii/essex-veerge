import {
  Button,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import cancelIcon from '/src/images/icons/cancelIconForAssignEquity.svg';
import Link from 'next/link';
import backArrow from '/src/images/icons/back-arrow.png';

const LeaveEquityAssignment = ({modalDisclosure}) => {
  return (
    <>
      <HStack w="full" justify="start" spacing="12px" mt="2vh" mb="10px">
        <Image
          w="50px"
          height="50px"
          zIndex={1000}
          alt="back_arrow"
          src={backArrow.src}
          style={{cursor: 'pointer'}}
          onClick={modalDisclosure.onOpen}
        />
        <Heading minW={'fit-content'} maxW={'300px'} w="full" fontSize="24px" fontWeight="600">
          Back
        </Heading>
      </HStack>
      <Modal
        motionPreset="slideInBottom"
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="16px" mt="15vh" p="80px 48px" maxW="611px" maxH="357px">
          <ModalBody p="0px">
            <VStack spacing="24px" w="full">
              <Image src={cancelIcon.src} alt="cancel icon" boxSize="64px" />
              <Text fontSize="24px" textAlign="center" fontWeight="600">
                Are you sure you want to discard?
              </Text>
              <HStack spacing="15px" w="full">
                <Button
                  borderRadius="72px"
                  border="1px solid #000"
                  _hover={{
                    background: 'transparent',
                  }}
                  _active={{background: 'transparent'}}
                  _focus={{background: 'transparent'}}
                  h="55px"
                  fontSize="18px"
                  fontWeight="400"
                  w="250px"
                  bg="transparent"
                  onClick={modalDisclosure.onClose}
                  color="#191919"
                >
                  Cancel
                </Button>
                <Link href="/users">
                  <Button
                    _hover={{
                      opacity: '1',
                    }}
                    _active={{opscity: '1'}}
                    _focus={{opacity: '1'}}
                    borderRadius="72px"
                    h="55px"
                    fontSize="18px"
                    fontWeight="400"
                    w="250px"
                    bg="#FF6A6A"
                    color="#fff"
                  >
                    Discard
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeaveEquityAssignment;
