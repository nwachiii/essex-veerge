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
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import DocItem from './DocItem';

const UpdatedDocs = ({isOpen, onClose, docs}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="18px"
        minW="686px"
        // pl="50px"
        pl="45px"
        pt="35px"
        pb="41.5px"
        // pr="35.83px"
        pr="20px"
      >
        <ModalHeader p="0">Uploaded Documents</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="0">
          <HStack as={Wrap} flexWrap="wrap" pt="30px" spacingY="10px" spacing="20px">
            {docs.map((item, idx) => {
              return <DocItem key={idx} date={item.created_at} idx={idx} />;
            })}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdatedDocs;

const Wrap = styled.div`
  max-height: 291px;
  overflow: auto;
  padding-right: 8px;
  padding-left: 5px;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: darkgrey;
    // outline: 1px solid slategrey;
  }
`;
