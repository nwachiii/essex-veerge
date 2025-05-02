import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import userIcon from '/src/images/icons/profile-2user.svg';
import violation from '/src/images/icons/setting-2.svg';
import lease from '/src/images/icons/building-3.svg';
import request from '/src/images/icons/usd-coin.svg';
import receipt from '/src/images/icons/receipt-edit.svg';
import receiptIcon from '/src/images/icons/receipt-icon.svg';
import message from '/src/images/icons/message.svg';
import info from '/src/images/icons/home-wifi.svg';

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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import NotesDrawer from '@/components/notesDrawer';

export const ListOfDrawerOptions = ({customScrollbarStyles}) => {
  const modalDisclosure = useDisclosure();

  const toast = useToast();

  const openList = () => {
    toast({
      position: 'top-right',
      description: 'You are currently ineligible for this action',
      status: 'info',
      duration: 5000,
    });
  };

  const List = [
    {
      icon: receiptIcon.src,
      // onClick: openList,
      notAllowed: true,
      title: 'Send Statement',
      message:
        'Generate and deliver detailed account statements to residents with a single click—includes all balances, fees, and payment history.',
    },
    {
      icon: message.src,
      onClick: () => modalDisclosure.onOpen(),
      title: 'Add Note',
      message: `Attach private notes to a resident's profile or financial record—ideal for internal updates, reminders, or documentation of conversations.`,
    },
    {
      icon: receipt.src,
      // onClick: openList,
      notAllowed: true,
      title: 'Update Information',
      message: 'Quickly edit or update information to ensure records stay accurate and up to date.',
    },
    {
      icon: request.src,
      // onClick: openList,
      notAllowed: true,
      title: 'Request Fee',
      message:
        'Easily initiate a fee request for any applicable charges, such as maintenance, violations, or special assessments. Track status and history in one place.',
    },
    {
      icon: violation.src,
      // onClick: openList,
      notAllowed: true,
      title: 'New Work Request',
      message:
        'Create  maintenance or repair requests for resident —track status, assign vendors, and close tickets with ease.',
    },
    {
      icon: lease.src,
      // onClick: openList,
      notAllowed: true,
      title: 'Lease Request',
      message:
        'Track and manage rental approvals within the community. Review applications, verify lease terms, and ensure compliance with HOA rental policies—all from one centralized dashboard.',
    },
    {
      icon: info.src,
      // onClick: openList,
      notAllowed: true,
      title: 'Transfer Ownership',
      message:
        'Easily update property records when a unit changes hands. Preserve past data while onboarding new owners with accurate, seamless transitions.',
    },
  ];

  return (
    <>
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
          {List.flatMap((data, index) =>
            data
              ? [
                  <HStack
                    cursor={data.notAllowed ? 'not-allowed' : 'pointer'}
                    border="1px solid #E4E4E4"
                    padding="15px 11px"
                    onClick={data.onClick}
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
                  </HStack>,
                ]
              : []
          )}
        </DrawerBody>
      </DrawerContent>

      <NotesDrawer modalDisclosure={modalDisclosure} />
    </>
  );
};

export default ListOfDrawerOptions;
