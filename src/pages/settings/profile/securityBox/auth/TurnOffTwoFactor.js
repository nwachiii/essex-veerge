import {Modal, ModalOverlay, ModalContent} from '@chakra-ui/react';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useFormik} from 'formik';
import React from 'react';

import {updateTwoFac} from '../../../../../apis/settings';
import {Button, Input, Popup2} from '../../../../../ui-lib';
import {OTPInput} from 'chakra-otp-input';
import TurnOffTwoFa from '../../../../../components/Modals/twofa/components/TurnOffTwoFa';

export const TurnOffTwoFactor = ({isModalOpen, onModalClose, refetch}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      // h={"660px"}
      mt="15vh"
      h="fit-content"
    >
      <ModalOverlay />
      <ModalContent borderRadius="16px" p="0" mt="18vh" minW="fit-content">
        <TurnOffTwoFa onModalClose={onModalClose} />
      </ModalContent>
    </Modal>
  );
};

export default TurnOffTwoFactor;
