import React from 'react';
import {useState} from 'react';
import ListOfContactsScreen from './savedContactPerson';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import AddContactPersonScreen from './addcontactPerson';
import {AnimatedLoader} from '@/components/common/loaders';

export const ContactPersonDrawer = ({
  modalDisclosure,
  loggedinUserRole,
  refetch,
  contacts,
  projectId,
  roles,
  isLoading,
}) => {
  const [screen, setScreen] = useState('contactPerson');
  const handleClose = () => {
    setScreen('contactPerson');
    return modalDisclosure.onClose();
  };
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      outline: '1px solid slategrey',
    },
  };

  const displayContactPersonScreens = key => {
    switch (key) {
      case 'contactPerson':
        return (
          <ListOfContactsScreen
            listOfContacts={contacts}
            projectId={projectId}
            refetch={refetch}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );
        break;
      case 'addContactPerson':
        return (
          <AddContactPersonScreen
            refetch={refetch}
            listOfContacts={contacts}
            projectId={projectId}
            loggedinUserRole={loggedinUserRole}
            roles={roles}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );
        break;

      default:
        return (
          <ListOfContactsScreen
            listOfContacts={contacts}
            refetch={refetch}
            projectId={projectId}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );

        break;
    }
  };

  return (
    <Drawer isOpen={modalDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />

      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="419px" bg="#fff" p="0px">
        {isLoading ? <AnimatedLoader size="sm" /> : displayContactPersonScreens(screen)}
      </DrawerContent>
    </Drawer>
  );
};

export default ContactPersonDrawer;
