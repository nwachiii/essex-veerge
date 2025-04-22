import React from 'react';
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
import viewSummaryIcon from '/src/images/icons/fractional/view-summary.svg';
import editIcon from '/src/images/icons/fractional/edit.svg';
import assignFractionIcon from '/src/images/icons/fractional/assignFractionIcon.svg';
import unitAllocationIcon from '/src/images/icons/fractional/allocation.svg';
import dividendIcon from '/src/images/icons/fractional/pay-dividend.svg';
import makePrivateIcon from '/src/images/icons/fractional/make-private.svg';
import enableProgressBar from '/src/images/icons/fractional/enable-progress-bar.svg';
import disableProgressBar from '/src/images/icons/fractional/disable-progress-bar.svg';
import sellFractionIcon from '/src/images/icons/fractional/sell-fractions.svg';
import votingIcon from '/src/images/icons/fractional/voting-poll.svg';
import emailOfferIcon from '/src/images/icons/fractional/send-email-offer.svg';
import emailIcon from '/src/images/icons/fractional/sms-tracking.svg';
import pushNotifIcon from '/src/images/icons/fractional/push-notification.svg';
import refundIcon from '/src/images/icons/fractional/refund.svg';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {EmailDrawer} from './send-email/EmailDrawer';
import {NotificationDrawer} from './push-notification/PushNotification';
import {EnableProgressBarDrawer} from './progress_bar/EnableProgressBar';
import {fetchDeveloperProfile} from 'apis/settings';
import {useQuery} from '@tanstack/react-query';

import AssignFractionalEquity from './assign-fractionalEquity';
import {fetchListingDetail} from 'apis/listings';

export const ListOfFractionalOptions = ({
  customScrollbarStyles,
  handleScreen,
  fractionalInfo,
  unitInfoRefetch,
  editFractionalDisclosure,
  handleClose,
  unitInfo,
  isBuildingTypeSingleFamilyResidential,
  refetch,
}) => {
  const toast = useToast();
  const isAllocation = unitInfo?.has_allocations;
  const hasInvestedUsers = unitInfo?.invested_users?.length > 0;
  const canPayDividend =
    (isAllocation && hasInvestedUsers) || isBuildingTypeSingleFamilyResidential;
  const openPayDividendScreen = handleScreen('showPayDividendDrawer');
  const emailDisclosure = useDisclosure();
  const pushNotifDisclosure = useDisclosure();
  const assignFractionDisclosure = useDisclosure();
  const progressBarDrawerDisclosure = useDisclosure();

  const {data, refetch: refetchListingData} = useQuery(
    ['listingDetail', unitInfo?.project?.id],
    () => fetchListingDetail(unitInfo?.project?.id)
  );
  const listingDetail = data && data?.data?.project;

  const handleDividend = () => {
    if (!isAllocation) {
      toast({
        render: () => (
          <MatadorCustomToast
            description={'You have to create allocations before you can pay dividend to buyers'}
          />
        ),
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else if (isAllocation && !hasInvestedUsers) {
      toast({
        render: () => <MatadorCustomToast description={'There are no buyers yet'} />,
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    }

    // openScreen();
  };

  const handleAssignFractionDrawer = () => {
    return assignFractionDisclosure.onOpen;
  };
  const isDisabled = title => {
    switch (title) {
      case 'Assign Fraction':
        !unitInfo?.total_fractions;
        break;

      default:
        false;
        break;
    }
  };
  const handleNotEligible = () => {
    toast({
      render: () => (
        <MatadorCustomToast
          description={
            'Unfortunately, you are currently not eligible to use this feature. Please contact our support team for assistance.'
          }
        />
      ),
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };
  const List = [
    {
      icon: viewSummaryIcon.src,
      title: 'View Summary',
      message:
        'Explore the details of this fractional unit, encompassing its strategic approach, investment holding period, deal structuring, involved stakeholders, and additional relevant information.',
      openListItem: handleScreen('showFractionalSummary'),
    },
    {
      icon: editIcon.src,
      title: 'Edit',
      message:
        'Modify the details of this fractional unit, including the quantity of fractionalized shares, strategic approach, investment holding period, deal structuring, involved stakeholders, & other information.',
      openListItem: () => (handleClose(), editFractionalDisclosure.onOpen()),
    },
    {
      icon: assignFractionIcon.src,
      title: 'Assign Fraction',
      message:
        'Allocate fractional units to users who have made manual payments to your bank account or to those you wish to gift fractions.',
      openListItem: handleAssignFractionDrawer(),
    },
    isBuildingTypeSingleFamilyResidential
      ? null
      : {
          icon: unitAllocationIcon.src,
          title: 'Unit Allocation',
          message: 'Allocate a property unit to the fractional owners.',
          openListItem: handleScreen('showUnitAllocation'),
        },
    {
      icon: dividendIcon.src,
      title: 'Pay Dividend',
      message: 'Allocate dividends to the fractional owners.',
      openListItem: canPayDividend ? openPayDividendScreen : handleDividend,
    },
    {
      icon: makePrivateIcon.src,
      title: 'Make Private',
      message:
        'Setting this to private restricts visibility and purchase options for users visiting your application; access is exclusively granted through invitation.',
      openListItem: handleScreen('toggleVisibility'),
    },
    {
      icon: listingDetail?.fractions_progress_bar ? disableProgressBar.src : enableProgressBar.src,
      title: `${listingDetail?.fractions_progress_bar ? 'Disable' : 'Enable'} Progress Bar`,
      openListItem: progressBarDrawerDisclosure.onOpen,
      message:
        'The Progress Bar allows users to monitor the performance of fractional ownership sales in real-time.',
    },
    {
      icon: sellFractionIcon.src,
      title: 'Sell Fraction',

      openListItem: handleNotEligible,
      message: 'Divest the entire fractionalized unit to facilitate the exit of fractional owners.',
    },
    {
      icon: votingIcon.src,
      title: 'Create Voting Poll',
      message:
        'Establish a voting poll to enable fractional owners to participate in making strategic decisions.',
      openListItem: handleNotEligible,
    },
    {
      icon: emailOfferIcon.src,
      title: 'Send an Email Offer',
      message:
        'For potential buyers without application access, extend an offer to purchase via email. Upon account creation, their investment will automatically appear in their portfolio.',

      openListItem: handleNotEligible,
    },
    {
      icon: emailIcon.src,
      title: 'Email',
      // openListItem: handleScreen('sendEmail'),
      openListItem: emailDisclosure.onOpen,
      message: 'Dispatch a no-reply email to the fractional owners.',
    },
    {
      icon: pushNotifIcon.src,
      title: 'Push Notification',
      // openListItem: handleScreen('pushNotification'),
      openListItem: pushNotifDisclosure.onOpen,
      message: 'Send a push notification to fractional owners.',
    },
    {
      icon: refundIcon.src,
      title: 'Refund',
      openListItem: handleScreen('refund'),
      message: 'Issue a refund to a fractional owner.',
    },
  ];
  return (
    <div>
      <>
        <DrawerContent
          p="0px"
          bg="#fff"
          zIndex={100}
          mt="65.12px"
          position="relative"
          minW="fit-content"
          sx={customScrollbarStyles}
        >
          <HStack
            py="30px"
            px="25px"
            h="49.699px"
            bg="#F5F5F5"
            align="center"
            position="relative"
            justify="space-between"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Manage Fractions
            </Heading>
            <HStack spacing="15px">
              <VStack
                w="30px"
                h="30px"
                _hover={{
                  width: '30px',
                  height: '30px',
                }}
                align="center"
                justify="center"
                position="relative"
                borderRadius="5px"
                transition="0.3s ease-in-out"
              >
                <DrawerCloseButton
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
            {List?.flatMap((data, index) =>
              data
                ? [
                    <HStack
                      cursor={isDisabled(data.title) ? 'not-allowed' : 'pointer'}
                      border="1px solid #E4E4E4"
                      padding="15px 11px"
                      opacity={isDisabled(data.title) ? 0.6 : 1}
                      onClick={isDisabled(data.title) ? null : data.openListItem}
                      borderRadius="12px"
                      marginBottom="1rem"
                      justify="space-between"
                      key={index}
                    >
                      <VStack spacing="11px" alignItems="start">
                        <Image src={data.icon} alt="icons" />
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
        <EmailDrawer isOpen={emailDisclosure.isOpen} onClose={emailDisclosure.onClose} />
        <NotificationDrawer
          isOpen={pushNotifDisclosure.isOpen}
          onClose={pushNotifDisclosure.onClose}
        />
        <AssignFractionalEquity
          mainRefetch={unitInfoRefetch}
          unitInfo={unitInfo}
          drawerDisclosure={assignFractionDisclosure}
        />
        {console.log({fractionalInfo})}
        {console.log({listingDetail})}
        <EnableProgressBarDrawer
          drawerDisclosure={progressBarDrawerDisclosure}
          active={listingDetail?.fractions_progress_bar}
          refetch={refetchListingData}
          listingID={unitInfo?.project?.id}
        />
      </>
    </div>
  );
};

export default ListOfFractionalOptions;
