import {useRouter} from 'next/router';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import transaction_icon from '/src/images/icons/transactions.svg';
import modifyCommissionIcon from '/src/images/icons/modifyCommissionIcon.svg';
import activity from '/src/images/icons/security-time.svg';
import msg from '/src/images/icons/message-notif.svg';
import email from '/src/images/icons/sms-tracking.svg';
import warning from '/src/images/icons/Info Circle.svg';
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

export const AgentDrawerOptions = ({
  handleScreen,
  handleClose,
  openGiveOffer,
  customScrollbarStyles,
  openActivityLog = () => {},
}) => {
  const router = useRouter();
  const {id} = router.query;
  const List = [
    {
      icon: modifyCommissionIcon.src,
      title: 'Modify Commission',
      message: 'Update the commission to fit your agreement.',
      openListItem: handleScreen('modify commission'),
    },
    {
      icon: transaction_icon.src,
      title: 'Transactions',
      message:
        'View and export transaction details for this listing, including deposits, payer information, payment purposes, outstanding balances, and transaction dates.',
      openListItem: () => id && router.push(`/users/manage_agents/transaction_statement/${id}`),
    },
    {
      icon: activity.src,
      title: 'Activity log',
      message:
        "Track the user's activity log to observe their navigation, transactions, and more, providing a complete overview of all interactions and activities.",
      openListItem: openActivityLog,
    },
    {
      icon: msg.src,
      title: 'Send a message',
      message: 'Send an in-app message to the user with no response expected.',
      openListItem: handleScreen('message'),
    },
    {
      title: 'Send email',
      icon: email.src,
      message: 'Send an email to the user with no response required.',
      openListItem: handleScreen('email'),
    },
    // {
    //   /* TEMPORARILY COMMENT THIS OUT TO COME BACK TO IMPLEMENT BLACKLIST OPTION */
    // },
    // {
    //   icon: warning.src,
    //   title: 'Add to Blacklist',
    //   message:
    //     'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque.',
    //   openListItem: () => {},
    // },
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
            _hover={{width: '30px', height: '30px'}}
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
                      <Image boxSize="24px" src={data.icon} alt="icons" />
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
