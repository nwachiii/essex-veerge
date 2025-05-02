import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import userIcon from '/src/images/icons/profile-2user.svg';
import violation from '/src/images/icons/Info-circle.svg';
import lease from '/src/images/icons/building-3.svg';
import email from '/src/images/icons/ic_round-mail.svg';
import receipt from '/src/images/icons/receipt-edit.svg';
import message from '/src/images/icons/device-message.svg';
import activity from '/src/images/icons/activity.svg';

import {Button, Drawer, DrawerOverlay, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import mo from '/src/images/icons/moreoptions.svg';

import moreoptions1 from '../../../images/resident-profile/more-options1.svg';
import moreoptions2 from '../../../images/resident-profile/more-options2.svg';
import moreoptions3 from '../../../images/resident-profile/more-options3.svg';
import moreoptions4 from '../../../images/resident-profile/more-options4.svg';
import moreoptions5 from '../../../images/resident-profile/more-options5.svg';
import moreoptions6 from '../../../images/resident-profile/more-options6.svg';
import moreoptions7 from '../../../images/resident-profile/more-options7.svg';

import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

export const ResidentProfileDrawerOptions = ({}) => {
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

  const drawerDisclosure = useDisclosure();

  const List = [
    {
      icon: moreoptions1.src,
      title: 'Link New Unit ',
      message:
        'Easily add a new property to a resident’s profile. Ensures residents have all their properties connected under one account.',
    },
    {
      icon: moreoptions2.src,
      title: 'Activity Log',
      message: `Track the user's activity log to observe their navigation, transactions, and more, providing a complete overview of all interactions and activities.`,
    },
    {
      icon: moreoptions3.src,
      title: 'Request Fee',
      message:
        'Easily initiate a fee request for any applicable charges, such as maintenance, violations, or special assessments. Track status and history in one place.',
    },
    {
      icon: moreoptions4.src,
      title: 'Update Information',
      message: 'Quickly edit or update information to ensure records stay accurate and up to date.',
    },
    {
      icon: moreoptions5.src,
      title: 'Send Email',
      message: 'Quickly send announcements, reminders, or notices.',
    },
    {
      icon: moreoptions6.src,
      title: 'Reset Password',
      message:
        'Securely assist in resetting account password reset, ensuring smooth access while maintaining platform security.',
    },
    {
      icon: moreoptions7.src,
      title: 'Block',
      message:
        'Temporarily or permanently restrict access to an account due to policy violations or inactivity, with full admin control and transparency.',
    },
  ];

  const toast = useToast();

  const openList = () => {
    toast({
      position: 'top-right',
      description: 'You are currently ineligible for this action',
      status: 'info',
      duration: 5000,
    });
  };

  return (
    <>
      <Button
        variant="outline-radius"
        borderColor="#E4E4E7"
        color="#242526"
        fontWeight="500"
        maxW={'215px'}
        fontFamily="Euclid Circular B"
        onClick={drawerDisclosure.onOpen}
        bg="#FFF"
        _hover={{bg: '#FAFAFA', opacity: 1}}
      >
        <HStack gap={'8px'}>
          <Image src={mo.src} alt="more options" />
          <Text>More Options</Text>
        </HStack>
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt="65.12px"
          sx={customScrollbarStyles}
          // mt="112.12px"
          minW="fit-content"
          bg="#fff"
          p="0px"
          //   pr="3px"
        >
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
                <DrawerCloseButton
                  _focus={{outline: 'none'}}
                  _focusVisible={{outline: 'none'}}
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>
          <DrawerBody sx={customScrollbarStyles} paddingTop="1rem" mr="3px" w="400px">
            {List.flatMap((data, index) => (
              <HStack
                cursor={'not-allowed'}
                border="1px solid #E4E4E4"
                padding="15px 11px"
                // onClick={openList}
                borderRadius="12px"
                marginBottom="1rem"
                justify="space-between"
                key={index}
              >
                <VStack spacing="11px" alignItems="start">
                  <HStack spacing="15px">
                    {data?.iconComponent ? (
                      data?.iconComponent
                    ) : (
                      <Image src={data.icon} alt="icons" />
                    )}
                    {data?.comingSoon ? (
                      <HStack
                        bg="rgba(255, 145, 3, 0.10)"
                        borderRadius="8px"
                        border=" 0.603px solid #FF9103"
                        boxShadow="0px 4.80333px 28.81997px 0px rgba(0, 0, 0, 0.04)"
                        p="6px"
                      >
                        <Image src={data.comingSoon.icon} alt="icons" />
                        <Text fontWeight="500" color="#FF9103" fontSize="9.607px">
                          Coming soon!
                        </Text>
                      </HStack>
                    ) : null}
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
              </HStack>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ResidentProfileDrawerOptions;
