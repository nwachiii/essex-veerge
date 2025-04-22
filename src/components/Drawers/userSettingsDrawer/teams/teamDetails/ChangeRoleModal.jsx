import React, {useState} from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  FormControl,
  HStack,
  Select,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from 'ui-lib/ui-lib.components';
import {updateTeamMember} from '/src/apis/settings';
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
    <Drawer isOpen={isModalOpen} onClose={handleClose} size={'sm'}>
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
                Change Roles
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
        <DrawerBody>
          <SelectRole selectedRole={selectedRole} h="50px" setRole={setRole} />
        </DrawerBody>

        <DrawerFooter pb="20px">
          <Button
            alignSelf="strech"
            isLoading={isLoading}
            variant="dark"
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default ChangeRoleModal;
