import React, {useState} from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  Image,
  useToast,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  HStack,
  DrawerOverlay,
  Center,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from 'ui-lib/ui-lib.components';
import Right from '/src/images/icons/check-icon-unscreen.gif';
import Cross from '/src/images/icons/cancleBig.png';
import {useMutation} from '@tanstack/react-query';
import {deleteTeamMember} from '/src/apis/settings';
import Swal from 'sweetalert2';
import {toastForError} from 'utils/toastForErrors';

export const RemoveRoleModal = ({isModalOpen, onModalClose, id, refetch}) => {
  const [isRemoved, setRemoved] = useState(false);

  const toast = useToast();

  const {mutate, isLoading} = useMutation(
    id => {
      return deleteTeamMember(id);
    },
    {
      onSuccess: res => {
        setRemoved(!isRemoved);
      },
      onError: err => {
        console.log(err);

        toastForError(err, true, toast);
      },
    }
  );

  const OnClickButton = () => {
    if (isRemoved) {
      setRemoved(!isRemoved);
      onModalClose();
      setTimeout(refetch, 700);
    } else {
      mutate(id);
    }
  };

  return (
    <Drawer isOpen={isModalOpen} onClose={onModalClose} size={'sm'}>
      {' '}
      <DrawerOverlay />
      <DrawerContent pb="22px" pt="67px">
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
          <Flex width="full" justifyContent="space-between" alignItems="center">
            <HStack spacing="8px">
              <Text textTransform={'capitalize'} fontSize="20px" fontWeight={600} color="#191919">
                Remove Role
              </Text>
            </HStack>
          </Flex>
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
        <DrawerBody
        // stackStyle={{h: 'fit-content', spacing: '12px'}}
        >
          <Center flexDir={'column'} gap={'10px'}>
            <Image
              alt={isRemoved ? 'success icon' : 'cancel icon'}
              src={isRemoved ? Right.src : Cross.src}
              width={'88px'}
              height={'88px'}
              objectFit="cover"
              my={'40px'}
            />
            <Text
              fontSize="24px"
              lineHeight="30px"
              fontWeight="600"
              color={'#3D3D3D'}
              textAlign={'center'}
            >
              {isRemoved ? 'Account Removed Successfully' : 'Remove Account'}
            </Text>
            {!isRemoved && (
              <Text fontSize="16px" lineHeight="20px" fontWeight="300" color={'#3D3D3D'}>
                Are you sure you want to remove this account?
              </Text>
            )}
            <Button
              variant={'dark'}
              onClick={OnClickButton}
              borderRadius="72px"
              isLoading={isRemoved ? false : isLoading}
            >
              {isRemoved ? 'Ok' : 'Proceed'}
            </Button>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default RemoveRoleModal;
