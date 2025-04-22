import {
  Button,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, {useCallback} from 'react';

import RightComponent from '../../pages/customiseStore/store_activated/rightComponent';
import LeftForOnSuccess from './leftForonSuccess';
import LeftForManageStore from './left-ForManageStore';
import {Success} from './scheduleMeeting';
import {toastForError} from '../../utils/toastForErrors';
import {fetchQrCodeData} from '../../apis/settings';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

const QrCodeForManageStoreAndOnsuccesStoreCreation = ({
  manageStore,
  manageClose,
  forSuccessOnStoreCreation,
  onClose,
}) => {
  const toast = useToast();

  const forQRCode = useQuery(['QrCode - data fetching'], fetchQrCodeData);

  // toastForError(forQRCode.error, forQRCode.isError, toast);

  const queryClient = useQueryClient();

  // if (forQRCode?.data?.data?.most_recent_domain) {
  //   console.log("cangning all the time");
  //   localStorage.setItem(
  //     "storeName",
  //     JSON.stringify(forQRCode?.data?.data?.most_recent_domain)
  //   );
  // }

  useEffect(() => {
    const refetch = async () => {
      return await forQRCode.refetch();
    };

    refetch();
    if (forQRCode?.data?.data?.most_recent_domain && manageStore.isOpen) {
      console.log('changing all the time');
      localStorage.setItem('storeName', JSON.stringify(forQRCode?.data?.data?.most_recent_domain));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manageStore.isOpen]);

  return (
    <Modal
      borderRadius="20px"
      // isCentered
      isOpen={manageStore.isOpen}
      onClose={manageClose}
    >
      <ModalOverlay bg="#191919CF" />
      <ModalContent
        mt="18vh"
        minW="1037px"
        minH="550px"
        h="fit-content"
        borderRadius="20px"
        p="0px"
      >
        <ModalCloseButton color="#000000" />
        <ModalBody h="full" p="0px">
          <HStack borderRadius="20px" w="full" h="550px" spacing="none">
            {forSuccessOnStoreCreation ? (
              <LeftForOnSuccess domainUrl={forQRCode.data?.data?.most_recent_domain} />
            ) : (
              <LeftForManageStore />
            )}
            <RightComponent
              isloading={forQRCode.isLoading}
              isError={forQRCode.isError}
              domainUrl={forQRCode.data?.data?.most_recent_domain}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QrCodeForManageStoreAndOnsuccesStoreCreation;
