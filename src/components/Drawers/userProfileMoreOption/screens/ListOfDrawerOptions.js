import giveOfferIcon from '/src/images/icons/giveOfferIcon.svg';
import activity from '/src/images/icons/security-time.svg';
import sendMessageIcon from '/src/images/icons/sendMessageIcon.svg';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';

import editUserIcon from '/src/images/icons/editUserIcon.svg';
import sendEmailIcon from '/src/images/icons/sendEmailIcon.svg';
import assignPropertyHouseIcon from '/src/images/icons/assignPropertyHouseIcon.svg';
import inspectionIcon from '/src/images/icons/scheduleInspectionIconUserProfileDrawer.svg';
import blacklistIcon from '/src/images/icons/blacklist-icon.svg';
import levyIcon from '/src/images/icons/levyOptionIcon.svg';

import sendPushNotification from '/src/images/icons/sendPushNotification.svg';
import {
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

export const ListOfDrawerOptions = ({
  handleScreen,
  handleClose,
  openGiveOffer,
  isGateWayDisabled,
  customScrollbarStyles,
  assignEquity,
  userInfo,
}) => {
  const List = [
    {
      icon: activity.src,
      title: 'Activity log',
      message:
        "Monitor your listing's activity log to see who visited, shared, made payments, scheduled inspections, and more, ensuring a comprehensive view of all user interactions and activities.",

      openListItem: handleScreen('activity'),
    },
    // {
    //   icon: levyIcon.src,
    //   title: 'Levy',
    //   message: '',

    //   openListItem: handleScreen('levy'),
    // },

    {
      icon: inspectionIcon.src,
      title: 'Schedule Inspection',
      message: 'To schedule an inspection manually,click here',

      openListItem: handleScreen('scheduleInspection'),
    },
    ...(isGateWayDisabled
      ? []
      : [
          {
            icon: giveOfferIcon.src,
            title: 'Give an offer',
            message:
              'Send private purchase offers here, whether you need a custom payment structure or a personalized purchase agreement.',
            openListItem: () => (handleClose(), openGiveOffer.onOpen()),
          },
        ]),
    {
      icon: assignPropertyHouseIcon.src,
      title: 'Assign Property',
      message:
        'To assign a property to a buyer for purchases made outside the application, click here.',
      openListItem: assignEquity,
    },
    {
      icon: sendMessageIcon.src,
      title: 'Send a message',
      message: 'Send an in-app message to the user with no response expected.',
      openListItem: handleScreen('message'),
    },
    {
      title: 'Send email',
      icon: sendEmailIcon.src,
      message: 'Send an email to the user with no response required.',
      openListItem: handleScreen('email'),
    },
    {
      icon: sendPushNotification.src,
      title: 'Send push notification ',
      message: '',
      openListItem: handleScreen('pushNotification'),
    },
    {
      icon: editUserIcon.src,
      title: `Edit name`,
      message: `If a client makes a mistake during sign-up or account creation, you can correct their name here.`,
      openListItem: handleScreen('editUser'),
    },
    {
      icon: blacklistIcon.src,
      title: 'Add to Blacklist ',
      message:
        'Blacklisting is a reversible action. If needed, you can remove a user from the blacklist at any time.',
      openListItem: handleScreen('blacklistUser'),
    },
  ];

  return (
    <>
      <HStack
        py="30px"
        h="49.699px"
        bg="#F5F5F5"
        px="25px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <Heading fontSize="18.9px" fontWeight="700">
          More Options
        </Heading>
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
      <DrawerBody sx={customScrollbarStyles} paddingTop="1rem" mr="3px" w="400px">
        {List.flatMap((data, index) =>
          data
            ? [
                <HStack
                  cursor={data.openListItem ? 'pointer' : 'default'}
                  border="1px solid #E4E4E4"
                  padding="15px 11px"
                  onClick={data.openListItem}
                  borderRadius="12px"
                  marginBottom="1rem"
                  key={index}
                  justify={'space-between'}
                >
                  <VStack spacing="11px" alignItems="start">
                    <HStack spacing="15px">
                      <Image src={data.icon} alt="icons" />
                    </HStack>
                    <Stack spacing="8px">
                      <Text fontSize="0.8rem" fontWeight="600">
                        {data.title}
                      </Text>
                      <Text fontWeight="400" color="#606060" fontSize="10px">
                        {data.message}
                      </Text>
                    </Stack>
                  </VStack>
                  <Image src={rightArrow.src} alt="right icon" />
                </HStack>,
              ]
            : []
        )}
      </DrawerBody>
    </>
  );
};

export default ListOfDrawerOptions;
