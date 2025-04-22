import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import mapIcon from '/src/images/icons/map.svg';
import trans from '/src/images/icons/transactions.svg';
import activity from '/src/images/icons/security-time.svg';
import orangeStarIcon from '/src/images/icons/orangeStar.svg';
import editListing from '/src/images/icons/editListingIcon.svg';
import openHouseIcon from '/src/images/icons/openHouseIcon.svg';
import secondaryMarketIconForListingDrawer from '/src/images/icons/secondaryMarketIconForListingDrawer.svg';
import editunitpriceIcon from '/src/images/icons/editUnitPriceIcon.svg';
import inspection_settings from '/src/images/icons/inspection_settings.svg';
import uploadSubDocsIcon from '/src/images/icons/uploadSubDocsIcon.svg';
import makePrivatePadlockIcon from '/src/images/icons/makePrivatePadlockIcon.svg';
import displayPicture from '/public/icons/icon-park_upload-picture.svg';
import makePublicUnlockIcon from '/src/images/icons/makePublicUnlockIcon.svg';
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
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {LuPinOff} from 'react-icons/lu';
import {BsFillPinAngleFill} from 'react-icons/bs';
import {CourtHouseIcon} from '@/components/assets/courthouse';

export const ListOfDrawerOptions = ({
  name,
  listingDetail,
  customScrollbarStyles,
  listingId,
  openActivity,
  openListingVisibility,
  openSecondaryMP,
  handleScreen,
  fractionalizeModal,
  inspectionSettingsDrawer,
  drawerDisclosure,
  togglePinnedListingDrawer,
  mapDrawer,
  displayPictureDrawer,
  openUploadSubDoc,
  openBankAccountScreen,
  isBuildingTypeSingleFamilyResidential,
  isPrivate,
}) => {
  const router = useRouter();
  const IS_PINNED = Boolean(listingDetail?.pinned);

  const List = [
    {
      icon: trans.src,
      title: 'Transactions',
      message:
        'View and export transaction details for this listing, including deposits, payer information, payment purposes, outstanding balances, and transaction dates.',
      openListItem: () =>
        router.push({
          pathname: `/dashboard/outstanding-balance/`,
          query: {
            isFractional: listingDetail?.fraction_is_available,
            listingId,
            name,
          },
        }),
    },
    {
      icon: activity.src,
      title: 'Activity log',
      message:
        "Monitor your listing's activity log to see who visited, shared, made payments, scheduled inspections, and more, ensuring a comprehensive view of all user interactions and activities.",
      openListItem: () => openActivity(),
    },
    {
      icon: uploadSubDocsIcon.src,
      title: 'Upload Subscribers Document',
      message: 'Share documents related to this listing with existing subscribers here.',
      openListItem: () => openUploadSubDoc(),
    },
    {
      iconComponent: <CourtHouseIcon baseColor="#4545FE" boxSize="24px" />,
      title: 'Bank Account',

      message: 'Add designated bank account to your listing',
      openListItem: () => openBankAccountScreen(),
    },
    {
      icon: editListing.src,
      title: 'Edit listing',
      message:
        'Customize your listing with ease: Edit the name, update pictures and videos, modify descriptions, and more to keep your listing fresh and engaging.',
      openListItem: () => router.push(`/listings/edit/?listingId=${listingId}`),
    },
    {
      icon: inspection_settings.src,
      title: 'Inspection Settings',
      message:
        'Enable or disable inspection and choose the specific days of the week for inspection availability.',
      openListItem: () => {
        drawerDisclosure.onClose();
        inspectionSettingsDrawer.onOpen();
      },
    },
    isBuildingTypeSingleFamilyResidential
      ? {
        icon: editunitpriceIcon.src,
        title: 'Modify Price',
        message:
          'Customize your single family residence with ease: Edit price, upload purchase agreement and more to keep your residence fresh and engaging.',
        openListItem: handleScreen('editUnitPrice'),
      }
      : null,
    isBuildingTypeSingleFamilyResidential || !listingDetail?.fraction_is_available
      ? {
          icon: editListing.src,
          title: 'Fractionalize',
          message:
            'Fractional real estate ownership allows multiple investors to collectively own a portion of a property, without owning the entire property outright.',
          openListItem: () => {
            fractionalizeModal.onOpen();
            drawerDisclosure.onClose();
          },
        }
      : null,
    {
      icon: displayPicture.src,
      title: 'Display Listing Picture',
      message: 'Select the main image that represents your listing on the application.',
      openListItem: () => {
        displayPictureDrawer.onOpen();
        drawerDisclosure.onClose();
      },
    },
    {
      icon: mapIcon.src,
      title: 'Map View',
      message:
        'Here, you can control the visibility of the map on the listings page of the web application.',
      openListItem: () => {
        mapDrawer.onOpen();
        drawerDisclosure.onClose();
      },
    },
    IS_PINNED
      ? {
          iconComponent: <LuPinOff color={'#191919'} fontSize={'26px'} />,
          title: 'Remove from Pinned Listings',
          message:
            'This listing will automatically return to its original state and order before it was pinned',
          openListItem: () => {
            togglePinnedListingDrawer();
            drawerDisclosure.onClose();
          },
        }
      : {
          iconComponent: <BsFillPinAngleFill color={'#222222'} fontSize={'28px'} />,
          title: 'Pin This Listing',
          message:
            'This listing will appear first at the top of other listings for your customers.',
          openListItem: () => {
            togglePinnedListingDrawer();
            drawerDisclosure.onClose();
          },
        },
        
    {
      icon: isPrivate ? makePublicUnlockIcon.src : makePrivatePadlockIcon.src,
      title: isPrivate ? 'Make Listing Public' : 'Make Listing Private',
      message: isPrivate
      ? 'Make your listing visible in public view in the app and grant  access to all users  for  a better sharing experience.'
      : 'Privatize your listing to control its visibility. Remove it from public view in the app and grant exclusive access to select individuals for a more controlled and private sharing experience.',
      openListItem: () => {
        openListingVisibility();
        drawerDisclosure.onClose();
        
      }
    },
    {
      icon: secondaryMarketIconForListingDrawer.src,
      title: 'Secondary Market Place',
      message:
        'Establish your eligibility to sell properties quickly and seamlessly. A dedicated setup process for homeowners aiming to sell properties in the secondary market.',
      openListItem: () => {
        openSecondaryMP();
        return drawerDisclosure.onClose();
        
      }
    },
    {
      icon: openHouseIcon.src,
      title: 'Set Open House Date',
      message:
        'Schedule and manage open house dates for your property listings, inviting potential buyers to view and experience the space firsthand.',
      openListItem: null,
      comingSoon: {
        icon: orangeStarIcon.src,
      },
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
                    cursor={data.openListItem ? 'pointer' : 'default'}
                    border="1px solid #E4E4E4"
                    padding="15px 11px"
                    onClick={data.openListItem}
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
