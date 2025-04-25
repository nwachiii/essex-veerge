import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import userIcon from '/src/images/icons/profile-2user.svg';
import violation from '/src/images/icons/Info-circle.svg';
import lease from '/src/images/icons/building-3.svg';
import email from '/src/images/icons/ic_round-mail.svg';
import receipt from '/src/images/icons/receipt-edit.svg';
import message from '/src/images/icons/device-message.svg';
import activity from '/src/images/icons/activity.svg';

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

export const ListOfDrawerOptions = ({
  listingDetail,
  customScrollbarStyles,
}) => {

  const List = [
    {
      icon: userIcon.src,
      title: 'Occupants',
      message:
        'Keep an up-to-date log of all residents per unit, including tenants, owners, and additional occupants—ideal for communication and access control.',
    },
    {
      icon: activity.src,
      title: 'Amenities Access',
      message:
        "Manage and monitor access to community amenities like gyms, pools, and lounges—assign permissions, track usage, and set booking rules effortlessly.",
    },
    {
      icon: email.src,
      title: 'Send Email',
      message: 'Communicate directly with residents, board members, or staff using built-in email tools—perfect for notices, newsletters, or follow-ups.',
    },
    {
      icon: violation.src,
      title: 'Violation',
      message: 'Record and track rule violations with supporting notes and evidence. Assign fines, notify residents, and monitor resolution progress—all in one place.',
    },
    {
      icon: lease.src,
      title: 'Lease Request',
      message:
        'Track and manage rental approvals within the community. Review applications, verify lease terms, and ensure compliance with HOA rental policies—all from one centralized dashboard.',
    },
    {
      icon: message.src,
      title: 'Send Broadcast',
      message:
        'Send instant announcements or updates to all residents or selected units. Keep your community informed in real time.',
    },
    {
      icon: receipt.src,
      title: 'Update Information',
      message: 'Quickly edit or update information to ensure records stay accurate and up to date.',
    },
  ];

  const toast = useToast();

  const openList = () => {
    toast({
      position: 'top-right',
      description: 'You are currently ineligible for this action',
      status: 'info',
      duration: 5000
    })
  }

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
                    cursor={'pointer'}
                    border="1px solid #E4E4E4"
                    padding="15px 11px"
                    onClick={openList}
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
    </>
  );
};

export default ListOfDrawerOptions;
