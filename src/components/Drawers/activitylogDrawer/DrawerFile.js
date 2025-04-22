import React from 'react';
import {Drawer, DrawerContent, DrawerOverlay} from '@chakra-ui/react';
import ActivityLogDrawer from '.';

const ActivityLogDrawerFile = ({id, modalDisclosure}) => {
  const handleScreen = () => () => {
    return modalDisclosure.onClose();
  };

  return (
    <Drawer
      autoFocus={false}
      isOpen={modalDisclosure.isOpen}
      onClose={handleScreen()}
      borderRadius="16px"
    >
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        minW="fit-content"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
      >
        <ActivityLogDrawer userId={id} handleScreen={handleScreen} user_drawer={false} />
      </DrawerContent>
    </Drawer>
  );
};

export default ActivityLogDrawerFile;
