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
import successGif from '/src/images/check-icon.gif';
import {useRouter} from 'next/router';
import {Button} from 'ui-lib/ui-lib.components';

const SuccessModal = ({isOpen, onClose}) => {
  const router = useRouter();
  const {unit_id} = router?.query;

  const clearLocaStorage = () => {
    onClose();
    router.back(`/listings/manage/unit_info/?unitId=${parseInt(unit_id)}`);
    localStorage.removeItem('allocations_type');
    localStorage.removeItem('allocations_milestone');
    localStorage.removeItem('allocations_data');
    localStorage.removeItem('allocations_archived');
  };

  return (
    <Modal isCentered h="636px" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="25.125rem" borderRadius="16px">
        <ModalCloseButton />
        <ModalBody pt="26px" pb="31px" px="31">
          <Image alt="" src={successGif.src} w="108px" mx="auto" />
          <Text
            fontSize="1.5rem"
            fontWeight="600"
            textAlign="center"
            marginTop="1rem"
            marginBottom="1rem"
            lineHeight="normal"
          >
            Allocations Published Successfully
          </Text>
          <Button
            mt="23px"
            variant="primary"
            height="48px"
            w="full"
            maxW="unset"
            bg="#4545FE"
            onClick={clearLocaStorage}
            borderRadius="72px"
          >
            OK
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
