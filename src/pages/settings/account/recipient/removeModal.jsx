import React, {useState} from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  Image,
  Button as ChakraButton,
  HStack,
  AbsoluteCenter,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from '../../../../ui-lib/ui-lib.components';
import Right from '../../../../images/icons/check-icon-unscreen.gif';
import Cross from '../../../../images/icons/cancleBig.png';
import {deleteBankAccount} from '../../../../apis/settings';
import {useMutation} from '@tanstack/react-query';
import Swal from 'sweetalert2';

export const RemoveModal = ({isModalOpen, onModalClose, accountId, refetch}) => {
  const [isRemoved, setRemoved] = useState(false);

  const {mutate, isLoading} = useMutation(
    id => {
      return deleteBankAccount(id);
    },
    {
      onSuccess: res => {
        setRemoved(!isRemoved);
      },
      onError: err => {
        onCloseModal();
        Swal.fire({
          icon: 'error',
          title: err.response.data,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      },
    }
  );

  const OnClickButton = async () => {
    if (isRemoved) {
      await refetch();
      setRemoved(!isRemoved);
      onModalClose();
    } else {
      mutate(accountId);
    }
  };

  return (
    <Popup2 mt="18vh" isOpen={isModalOpen} onClose={onModalClose} h={'322px'}>
      <Popup2.Body pr="0px">
        <AbsoluteCenter w="full">
          <VStack spacing="none" h="full" position="relative" my="auto" justify="center">
            {!isRemoved ? null : (
              <Image
                alt="image"
                src={isRemoved ? Right.src : Cross.src}
                width={'fit-content'}
                height={'88px'}
                my={'20px'}
              />
            )}
            <Text
              fontSize="24px"
              lineHeight="30px"
              fontWeight="600"
              color={'#191919'}
              w="397px"
              m="10px"
              textAlign={'center'}
            >
              {isRemoved
                ? 'Account Removed Successfully'
                : 'Are you sure you want to remove this Bank Account?'}
            </Text>
            {/* <Text fontSize="16px" lineHeight="20px" fontWeight="300" color={'#3D3D3D'} m="5px">
              {isRemoved ? '' : 'Are you sure you want to remove this account?'}
            </Text> */}
            <HStack spacing="14px" mt="43px" px="23px" w="full">
              {isRemoved ? (
                <ChakraButton
                  h="55px"
                  px="24px"
                  bg="transparent"
                  borderRadius="72px"
                  w="full"
                  _hover={{opacity: 1, bg: 'transparent'}}
                  display="flex"
                  alignItems="center"
                  border="1px solid #FF6A6A"
                  onClick={onModalClose}
                  fontSize="18px"
                  fontWeight="400"
                  color="#FF6A6A"
                >
                  Cancel
                </ChakraButton>
              ) : null}
              <ChakraButton
                w="full"
                bg="#4545FE"
                _hover={{opacity: 1}}
                borderRadius="72px"
                h="55px"
                color="#fff"
                fontSize="18px"
                fontWeight="400"
                onClick={OnClickButton}
                isLoading={isLoading}
              >
                {isRemoved ? 'Ok' : 'Yes'}
              </ChakraButton>
            </HStack>
          </VStack>
        </AbsoluteCenter>
      </Popup2.Body>
    </Popup2>
  );
};

export default RemoveModal;
