import React, {useState} from 'react';
import {
  DrawerContent,
} from '@chakra-ui/react';
import ShareSubscibersDoc from './screens/shareSubscibersDoc';
import WhatDoesThisMean from './screens/whatDoesthisMean';

const UploadSubDoc = ({handleMainScreen, forUnits, listingDetails}) => {
  const [screen, setScreen] = useState('');
  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };
  const handleClose = () => {
    setScreen('what does this mean');
    return handleMainScreen('options');
  };

  const renderUploadSubDocScreens = scrn => {
    switch (scrn) {
      case 'what does this mean':
        return (
          <WhatDoesThisMean forUnits={true} handleScreen={handleScreen} handleClose={handleClose} />
        );

      case 'upload Doc':
        return (
          <ShareSubscibersDoc
            forUnits={forUnits}
            handleScreen={handleScreen}
            handleClose={handleClose}
          />
        );

      default:
        return (
          <WhatDoesThisMean forUnits={true} handleScreen={handleScreen} handleClose={handleClose} />
        );
    }
  };
  return (
    <>
      <DrawerContent mt="65px" maxW="400px" bg="#fff" py="0px">
        {renderUploadSubDocScreens(screen)}
      </DrawerContent>
    </>
  );
};

export default UploadSubDoc;
