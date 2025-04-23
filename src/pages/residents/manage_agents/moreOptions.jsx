import React, {useState} from 'react';
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
import mo from '/src/images/icons/moreoptions.svg';
import {useRouter} from 'next/router';
import ActivityLog from './ActivityLog';
import {AgentDrawerOptions} from 'constants/agents/drawers/AgentDrawerOptions';
import {SendEmailDrawer} from 'constants/agents/drawers/drawer_screens/sendEmail';
import {SendMessageDrawer} from 'constants/agents/drawers/drawer_screens/sendMessage';
import ModifyCommission from 'constants/agents/drawers/drawer_screens/modify_commission';

const MoreOptions = ({agent}) => {
  const {
    isOpen: activityLogIsOpen,
    onClose: activityLogOnClose,
    onOpen: activityLogOnOpen,
  } = useDisclosure();
  const router = useRouter();
  const {id} = router.query;

  const [screen, setScreen] = useState('options');

  const drawerDisclosure = useDisclosure();
  const openActivityLog = () => {
    drawerDisclosure.onClose();
    activityLogOnOpen();
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {width: '4px', borderRadius: '16px'},
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      // outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const handleClose = () => {
    setScreen('options');
    return drawerDisclosure.onClose();
  };

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };

  const displayMoreOption = key => {
    switch (key) {
      case 'options':
        return (
          <AgentDrawerOptions
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            handleClose={handleClose}
            openActivityLog={openActivityLog}
          />
        );

      case 'modify commission':
        return (
          <ModifyCommission
            handleMainScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
            agent={agent}
            mainScreen={screen}
          />
        );
      case 'message':
        return (
          <SendMessageDrawer
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
            agent={agent}
          />
        );
      case 'email':
        return (
          <SendEmailDrawer
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
          />
        );
      default:
        <AgentDrawerOptions
          customScrollbarStyles={customScrollbarStyles}
          handleScreen={handleScreen}
        />;

        break;
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        border="1px solid #a3a3a3"
        borderRadius="72px"
        fontWeight="normal"
        paddingY="1.5rem"
        paddingX="1.8rem"
        onClick={drawerDisclosure.onOpen}
      >
        <HStack>
          <Image src={mo.src} alt="more options" />
          <Text>More Options</Text>
        </HStack>
      </Button>
      <Drawer isOpen={drawerDisclosure.isOpen} onClose={drawerDisclosure.onClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff" p="0px">
          {displayMoreOption(screen)}
        </DrawerContent>
      </Drawer>
      <ActivityLog id={id} isOpen={activityLogIsOpen} onClose={activityLogOnClose} />
    </div>
  );
};

export default MoreOptions;
