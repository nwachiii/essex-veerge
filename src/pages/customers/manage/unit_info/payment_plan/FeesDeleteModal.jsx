import {
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
  Button as ChakraButton,
  useDisclosure,
  Center,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '/src/constants/routes';
import {toastForError} from '../../../../../utils/toastForErrors';
import {getPendingEquities} from 'apis/listings';
import {useRouter} from 'next/router';
import lockIcon from '/src/images/icons/black-icon.svg';
import FeesPendingTransactions from './FeesPendingTransactions';

const FeesDeleteModal = ({data, isOpen, onClose, refetch, setPlanText, unitInfo, feeId}) => {
  const PAYMENT_PLAN_PENDING_TRANSACTIONS = useDisclosure();
  const router = useRouter();
  const bundleId = Number(router?.query?.unitId);
  const toastError = useToast();
  const token = JSON.parse(localStorage.getItem('devToken'));
  const FETCHED_PENDING_EQUITIES = useQuery(
    ['get-pending-equities', bundleId, null, true],
    () => getPendingEquities(bundleId, null, true),
    {enabled: !!!isNaN(bundleId)}
  );
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`${BaseURL_TWO}/investment/fees/${feeId}/`, {
        headers: {Authorization: `Bearer ${token}`},
      });
    },
    onSuccess: async res => {
      console.log(res);
      await refetch();
      onClose();
      setPlanText('private');
      toastError({
        title: 'Success!!',
        description: `Fee is now private!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toastError({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      toastForError(err, true, toast);
    },
  });

  const pendingEquities = FETCHED_PENDING_EQUITIES?.data?.data?.data;

  const handleSubmit = () => {
    pendingEquities?.length > 0 ? PAYMENT_PLAN_PENDING_TRANSACTIONS.onOpen() : mutation.mutate();
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="471px" p="0px" borderRadius="16px">
          <ModalCloseButton />
          <ModalBody px="23px" w="full" pt="98px" pb="73px">
            <Center mb="1">
              <Image src={lockIcon.src} alt="lock-icon" h={10} />
            </Center>

            <Text
              mx="auto"
              textAlign="center"
              maxW="302px"
              fontSize="24px"
              fontWeight="600"
              lineHeight="30px"
            >
              Are you sure you want to make private
            </Text>
            <HStack spacing="14px" mt="49px">
              <ChakraButton
                borderRadius="72px"
                fontSize="18px"
                fontWeight="400"
                w="full"
                h="55px"
                color="#4545FE"
                border="1px solid #4545FE"
                bg="transparent"
                _hover={{opacity: 1, bg: 'transparent'}}
                onClick={onClose}
              >
                No, go back
              </ChakraButton>

              <ChakraButton
                isDisabled={mutation.isLoading}
                loading={mutation.isLoading}
                onClick={handleSubmit}
                borderRadius="72px"
                fontSize="18px"
                fontWeight="400"
                bg="#4545FE"
                _hover={{opacity: 1}}
                color="#fff"
                w="full"
                h="55px"
              >
                {mutation.isLoading ? <Spinner /> : 'Yes'}
              </ChakraButton>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <FeesPendingTransactions
        refetch={refetch}
        unitId={bundleId}
        modal={PAYMENT_PLAN_PENDING_TRANSACTIONS}
        unitInfo={unitInfo}
        privateMutation={mutation}
        deleteClose={onClose}
        feesMutation={mutation}
      />
    </>
  );
};

export default FeesDeleteModal;
