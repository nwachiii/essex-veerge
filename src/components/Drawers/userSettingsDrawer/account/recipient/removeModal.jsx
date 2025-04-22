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
  DrawerBody,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Center,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from 'ui-lib/ui-lib.components';
import Right from '/src/images/icons/check-icon-unscreen.gif';
import Trash from '/src/images/icons/big_red_trash_icon.svg';
import Cross from '/src/images/icons/cancleBig.png';
import {deleteBankAccount} from '/src/apis/settings';
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
    <Drawer isOpen={isModalOpen} onClose={onModalClose} h={'322px'} size={'sm'}>
      {/* <DrawerOverlay /> */}
      <DrawerContent pt="67px">
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
          bg="#F5F5F5"
        >
          <HStack spacing="8px">
            <Text textTransform={'capitalize'} fontSize="20px" fontWeight={600} color="#191919">
              Remove Bank Account{' '}
            </Text>
          </HStack>
          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <DrawerBody>
          <Center flexDirection={'column'} h="100%">
            <Image
              alt="image"
              src={isRemoved ? Right.src : Trash.src}
              width={'fit-content'}
              height={isRemoved ? '88px' : '36px'}
            />
            <Text fontSize="16px" fontWeight="500" color={'#0D0D0D'} m="10px" textAlign={'center'}>
              {isRemoved
                ? 'Account Removed Successfully'
                : 'Are you sure you want to remove this Bank Account?'}
            </Text>

            <HStack spacing="14px" w="full">
              <ChakraButton
                h="55px"
                px="24px"
                bg="transparent"
                borderRadius="72px"
                w="full"
                _hover={{opacity: 1, bg: 'transparent'}}
                display="flex"
                alignItems="center"
                // border="1px solid #FF6A6A"
                onClick={onModalClose}
                fontSize="15px"
                fontWeight="400"
                color="#FF6A6A"
                p="12.8px"
              >
                Cancel
              </ChakraButton>
              <ChakraButton
                w="full"
                // bg="#4545FE"
                bg="#191919"
                _hover={{opacity: 1, bg: '#191919'}}
                borderRadius="72px"
                h="55px"
                color="#fff"
                fontSize="15px"
                fontWeight="400"
                onClick={OnClickButton}
                isLoading={isLoading}
                p="12.8px"
              >
                {isRemoved ? 'Ok' : 'Yes'}
              </ChakraButton>
            </HStack>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RemoveModal;
