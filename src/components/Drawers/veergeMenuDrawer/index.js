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
import React from 'react';
import VeergeMenuScreen from './screens/veergeMenuScreen';
import ManageApplicationScreen from './screens/manageAppScreens';
import {useState} from 'react';

export const VeergeMenuDrawer = ({modalDisclosure}) => {
  const [screen, setScreen] = useState('manageApplication');

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
      outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const displayVeergeMenuScreens = key => {
    switch (key) {
      case 'veergeMenu':
        return (
          <VeergeMenuScreen
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );
        break;
      case 'manageApplication':
        return (
          <ManageApplicationScreen
            customScrollbarStyles={customScrollbarStyles}
            handleMainScreen={handleScreen}
            closeDrawer={modalDisclosure.onClose}
          />
        );
        break;

      default:
        return (
          <VeergeMenuScreen
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );

        break;
    }
  };
  return (
    <>
      <Drawer isOpen={modalDisclosure.isOpen} placement="right" onClose={modalDisclosure.onClose}>
        <DrawerOverlay />
        <DrawerContent mt="65px" p="0px" maxW={`400px`}>
          {displayVeergeMenuScreens(screen)}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default VeergeMenuDrawer;
