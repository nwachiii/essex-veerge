import {Drawer, DrawerContent, DrawerOverlay} from '@chakra-ui/react';
import React, {useState} from 'react';
import SetMaturityDate from './screens/setMaturityDate';

const PastPaymentOptionsDrawer = ({
  defaultScreen,
  drawerDisclosure,
  maturity_date,
  maturity_assigned_to,
  transactionID,
  refetch,
}) => {
  const [screen, setScreen] = useState(defaultScreen);

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };
  const handleClose = () => {
    drawerDisclosure.onClose();
  };

  const displayOptionsScreens = scrn => {
    switch (scrn) {
      case 'maturityDate':
        return (
          <SetMaturityDate
            transactionID={transactionID}
            maturity_date={maturity_date}
            maturity_assigned_to={maturity_assigned_to}
            refetch={refetch}
            drawerDisclosure={drawerDisclosure}
          />
        );
      case 'terminateTransaction':
        return <></>;

      default:
        return <SetMaturityDate drawerDisclosure={drawerDisclosure} />;
    }
  };

  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />

      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
      >
        {displayOptionsScreens(screen)}
      </DrawerContent>
    </Drawer>
  );
};

export default PastPaymentOptionsDrawer;
