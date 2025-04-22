import React, {useState} from 'react';
import {FormControl, Select, useToast} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from '../../../../ui-lib/ui-lib.components';
import {updateTeamMember} from '../../../../apis/settings';
import {useMutation} from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {toastForError} from 'utils/toastForErrors';
import SelectRole from '@/components/Drawers/inviteTeamMemberDrawer/components/selectRole';

export const ChangeRoleModal = ({isModalOpen, onModalClose, id, refetch}) => {
  const toast = useToast();
  const [selectedRole, setRole] = useState(null);

  const {mutate, isLoading} = useMutation(
    values => {
      return updateTeamMember({id: id, updatedData: values});
    },
    {
      onSuccess: async res => {
        await refetch();
        onModalClose();
      },
      onError: err => {
        onCloseModal();
        toastForError(err, true, toast);
      },
    }
  );
  const handleClose = () => {
    onModalClose();
    return setRole(null);
  };
  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      mutate({role: selectedRole.name});
    },
  });

  return (
    <Popup2 isOpen={isModalOpen} onClose={handleClose} minH={'fit-content'}>
      <Popup2.Header>Change Roles</Popup2.Header>
      <Popup2.Body px="4px" h="fit-content">
        <SelectRole selectedRole={selectedRole} h="50px" setRole={setRole} />
      </Popup2.Body>

      <Popup2.Footer pb="20px">
        <Button
          alignSelf="strech"
          isLoading={isLoading}
          variant="violet"
          onClick={formik.handleSubmit}
          _hover={{
            opacity: '1',
          }}
          _focus={{
            opacity: '1',
          }}
          _active={{
            opacity: '1',
          }}
        >
          Change
        </Button>
      </Popup2.Footer>
    </Popup2>
  );
};
export default ChangeRoleModal;
