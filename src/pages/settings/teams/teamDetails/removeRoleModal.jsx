import React, {useState} from 'react';
import {Box, Text, Flex, VStack, Image, useToast} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from '../../../../ui-lib/ui-lib.components';
import Right from '../../../../images/icons/check-icon-unscreen.gif';
import Cross from '../../../../images/icons/cancleBig.png';
import {useMutation} from '@tanstack/react-query';
import {deleteTeamMember} from '../../../../apis/settings';
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
    <Popup2
      hideCloseButton
      isOpen={isModalOpen}
      px="20px"
      onClose={onModalClose}
      minW={'fit-content'}
      minH={'fit-content'}
    >
      <Popup2.Body
        px="0px"
        pb="30px"
        h="fit-content"
        stackStyle={{h: 'fit-content', spacing: '12px'}}
      >
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
        <Text fontSize="16px" lineHeight="20px" fontWeight="300" color={'#3D3D3D'}>
          {isRemoved ? '' : 'Are you sure you want to remove this account?'}
        </Text>
        <Button
          borderRadius="72px"
          variant={'dark'}
          onClick={OnClickButton}
          isLoading={isRemoved ? false : isLoading}
        >
          {isRemoved ? 'Ok' : 'Proceed'}
        </Button>
      </Popup2.Body>
    </Popup2>
  );
};
export default RemoveRoleModal;
