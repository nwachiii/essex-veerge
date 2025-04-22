import {Button, Center, DrawerBody, HStack, Image, Text, VStack, useToast} from '@chakra-ui/react';
import React from 'react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import Trash from '/src/images/icons/big_red_trash_icon.svg';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toastForError} from 'utils/toastForErrors';
import {removeAProjectsBankAccount} from 'apis/settings';

const ConfirmRemovingAnAccount = ({accoundId, projectId, handleScreen}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {mutate, isLoading} = useMutation(() => removeAProjectsBankAccount(accoundId, projectId), {
    onSuccess: res => {
      queryClient.refetchQueries(['project bank accounts']);
      toast({
        status: 'success',
        position: 'top-right',
        title: 'Account removed successfully',
      });
      handleScreen('list of accounts');
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const deleteAccount = () => {
    mutate();
  };
  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="52px"
        py="12px"
        px="29px"
        h="49.699px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <Image
          onClick={() => handleScreen('list of accounts')}
          boxSize="24px"
          cursor="pointer"
          src={backIcon.src}
          alt="back icon"
        />
      </HStack>
      <DrawerBody p="0px" px="20px">
        <VStack
          border="1px solid #f5f5f5"
          align="center"
          justify="center"
          spacing="24px"
          w="full"
          borderRadius="5px"
          h="263.65px"
          px="14px"
        >
          <Image alt="image" src={Trash.src} width={'fit-content'} height={'36px'} />
          <Text fontSize="16px" fontWeight="500" color={'#0D0D0D'} textAlign={'center'}>
            Are you sure you want to remove this Account?
          </Text>

          <HStack w="full">
            <Button
              h="55px"
              px="24px"
              bg="transparent"
              // borderRadius="12px"
              variant="md-outline-radius"
              w="full"
              _hover={{opacity: 1, bg: 'transparent'}}
              display="flex"
              alignItems="center"
              // border="1px solid #FF6A6A"
              borderColor="#FF6A6A"
              onClick={() => handleScreen('list of accounts')}
              fontSize="15px"
              fontWeight="400"
              color="#FF6A6A"
              p="12.8px"
            >
              Cancel
            </Button>
            <Button
              w="full"
              // bg="#4545FE"
              bg="#191919"
              variant="md-filled-radius"
              _hover={{opacity: 1, bg: '#191919'}}
              // borderRadius="12px"
              h="55px"
              color="#fff"
              fontSize="15px"
              fontWeight="400"
              onClick={deleteAccount}
              isLoading={isLoading}
              p="12.8px"
            >
              Yes
            </Button>
          </HStack>
        </VStack>
      </DrawerBody>
    </>
  );
};

export default ConfirmRemovingAnAccount;
