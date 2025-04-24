import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Button,
  Image,
  HStack,
  Text,
} from '@chakra-ui/react';

import {useState} from 'react';

import ViolationDrawerOptions from './viewViolationMoreOptions';
import IssueDetails from './issueDetails';

export const ViewViolation = ({
  customerInfo,
  name,
  listingDetail,
  giveOffer,
  isGateWayDisabled,
  refetch,
  listingId,
}) => {
  const defaultScreen = 'issue details';
  const [screen, setScreen] = useState(defaultScreen);

  const drawerDisclosure = useDisclosure();

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {width: '4px', borderRadius: '16px'},
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
    },
  };
  const handleClose = () => {
    setScreen(defaultScreen);
    return drawerDisclosure.onClose();
  };

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };

  const displayIssueDetails = key => {
    switch (key) {
      case 'issue details':
        return (
          <IssueDetails
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
          />
        );

      case 'options':
        return (
          <ViolationDrawerOptions
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            user_drawer={false}
          />
        );

      default:
        <IssueDetails
          handleScreen={handleScreen}
          customScrollbarStyles={customScrollbarStyles}
          handleClose={handleClose}
        />;

        break;
    }
  };
  return (
    <>
      <Button
        onClick={drawerDisclosure.onOpen}
        borderRadius="72px"
        w="118px"
        h="46px"
        fontWeight={'500'}
        color="#000000"
        fontSize="16px"
        borderColor={'#e4e4e7'}
        variant="outline"
        _hover={{
          bg: 'rgba(0,0,0,0.03)',
        }}
      >
        View
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={drawerDisclosure.isOpen}
        onClose={handleClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt="65px"
          sx={customScrollbarStyles}
          minW="fit-content"
          boxShadow="none"
          bg="#fff"
          p="0px"
        >
          {displayIssueDetails(screen)}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ViewViolation;
