import {Drawer, DrawerContent, DrawerOverlay} from '@chakra-ui/react';
import React, {useState} from 'react';
import CreateLevy from '../screenComponents/createLevy';
import LevyMoreOptions from '../screenComponents/moreOptions';
import LevyMoreOptionsScreen from './levyMoreOptionsScreen';

const ManageLevy = ({drawerDisclosure}) => {
  const [screen, setScreen] = useState('create levy');

  const handleClose = () => {
    drawerDisclosure.onClose();
  };

  const displayLevyScreens = scrn => {
    switch (scrn) {
      case 'create levy':
        return <CreateLevy setScreen={setScreen} />;
      case 'more options':
        return <LevyMoreOptionsScreen setMainScreen={setScreen} />;
      default:
        return <CreateLevy setScreen={setScreen} />;
    }
  };

  return (
    <Drawer isOpen={drawerDisclosure?.isOpen} onClose={handleClose}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent mt="65px" maxW="400px" bg="#fff" py="0px">
        {displayLevyScreens(screen)}
      </DrawerContent>
    </Drawer>
  );
};

export default ManageLevy;
