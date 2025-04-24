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
import {useState} from 'react';
import ListOfDrawerOptions from './screens/ListOfDrawerOptions';
import ActivityLogDrawer from '../activitylogDrawer';
import {PushNotificationDrawer} from './screens/pushNotif';
import {SendEmailDrawer} from './screens/sendEmail';
import {SendMessageDrawer} from './screens/sendMessage';

import {useRouter} from 'next/router';
import ScheduleCustomerInspection from './screens/scheduleInspection';

import {BlacklistUser} from './screens/blacklistUser';
import {EditUserDrawer} from './screens/editUser';
import IndividualLevy from './screens/levy';

export const UserProfileMoreOption = ({
  customerInfo,
  name,
  listingDetail,
  giveOffer,
  isGateWayDisabled,
  refetch,
  listingId,
}) => {
  const defaultScreen = 'options';
  const [screen, setScreen] = useState(defaultScreen);
  const router = useRouter();

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
      outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const handleClose = () => {
    setScreen(defaultScreen);
    return drawerDisclosure.onClose();
  };

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };
  const assignEquity = () => {
    const user_id = customerInfo?.user_info?.user?.id || '';
    const customer_id = customerInfo?.user_info?.id || '';
    return router.push({
      pathname: '/residents/profile/assignEquity',
      query: {user_id, customer_id},
    });
  };

  const displayMoreOption = key => {
    switch (key) {
      case 'options':
        return (
          <ListOfDrawerOptions
            isGateWayDisabled={isGateWayDisabled}
            assignEquity={assignEquity}
            name={name}
            userInfo={customerInfo?.user_info}
            listingId={listingId}
            listingDetail={listingDetail}
            openGiveOffer={giveOffer}
            refetch={refetch}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            handleClose={handleClose}
          />
        );

      case 'activity':
        return (
          <ActivityLogDrawer
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            user_drawer={false}
          />
        );
      case 'levy':
        return (
          <IndividualLevy
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );

      case 'editUser':
        return (
          <EditUserDrawer
            handleScreen={handleScreen}
            handleClose={handleClose}
            customerInfo={customerInfo?.user_info}
            refetch={refetch}
          />
        );
      case 'message':
        return (
          <SendMessageDrawer
            customerInfo={customerInfo}
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
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
      case 'pushNotification':
        return (
          <PushNotificationDrawer
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
          />
        );
      case 'blacklistUser':
        return (
          <BlacklistUser
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
            userInfo={customerInfo?.user_info}
          />
        );
      case 'scheduleInspection':
        return (
          <ScheduleCustomerInspection
            refetch={refetch}
            navigateMainDrawer={handleScreen('options')}
          />
        );
      default:
        <ListOfDrawerOptions
          assignEquity={assignEquity}
          name={name}
          listingId={listingId}
          listingDetail={listingDetail}
          openGiveOffer={giveOffer}
          refetch={refetch}
          customScrollbarStyles={customScrollbarStyles}
          handleScreen={handleScreen}
          handleClose={handleClose}
        />;

        break;
    }
  };
  return (
    <div>
      <Button
        fontSize="18px"
        _hover={{opacity: '1'}}
        onClick={drawerDisclosure.onOpen}
        leftIcon={<Image src={mo.src} alt="more options" />}
        variant="outline-radius"
        borderColor="#a3a3a3"
        color="#242526"
        fontWeight="400"
        maxW={'195px'}
        fontFamily="Euclid Circular B"
      >
        <HStack>
          <Text>More Options</Text>
        </HStack>
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={drawerDisclosure.isOpen}
        // isOpen={true}
        onClose={handleClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt="58px"
          sx={customScrollbarStyles}
          // mt="112.12px"
          minW="fit-content"
          boxShadow="none"
          bg="#fff"
          p="0px"
        >
          {displayMoreOption(screen)}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserProfileMoreOption;
