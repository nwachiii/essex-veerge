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
import uploadSubDocsIcon from '/src/images/icons/uploadSubDocsIcon.svg';

import editunitIcon from '/src/images/icons/editListingIcon.svg';
import editunitpriceIcon from '/src/images/icons/editUnitPriceIcon.svg';
import editunitquantityIcon from '/src/images/icons/editUnitQuantityIcon.svg';
import trans from '/src/images/icons/transactions.svg';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import fractionalizeIcon from '/src/images/icons/moreOptionsFractionalizeIcon.svg';
import archiveIcon from '/src/images/icons/moreOptionsListArchiveUnitIcon.svg';
import makePrivatePadlockIcon from '/src/images/icons/makePrivatePadlockIcon.svg';
import displayPicture from '/public/icons/icon-park_upload-picture.svg'
import makePublicUnlockIcon from '/src/images/icons/makePublicUnlockIcon.svg';

import {useRouter} from 'next/router';
import {LuPinOff} from 'react-icons/lu';
import {BsFillPinAngleFill} from 'react-icons/bs';

export const ListOfDrawerOption = ({
  handleScreen,
  customScrollbarStyles,
  unitInfo,
  bundleId,
  disclosure,
  editDisclosure,
  fractionalizeModal,
  openUploadSubDoc,
  isFractionsCreated,
  togglePinnedUnitDrawer,
  displayPictureDrawer,
  unitVisible,
  isPrivate
}) => {
  const router = useRouter();
  const IS_PINNED = Boolean(unitInfo?.is_pinned);

  const List = [
    {
      icon: trans.src,
      title: 'Transactions',
      message:
        'View and export transaction details for this listing, including deposits, payer information, payment purposes, outstanding balances, and transaction dates.',
      openListItem: () => router.push(`/listings/manage/unit_info/transactions/?id=${bundleId}`),
    },
    {
      icon: editunitIcon.src,
      title: 'Modify Unit Info',
      message:
        'Customise your unit with ease: Edit the name, update pictures and videos, and more to keep your unit fresh and engaging.',
      openListItem: () => {
        editDisclosure.onOpen();
        disclosure.onClose();
      },
    },
    {
      icon: editunitpriceIcon.src,
      title: 'Modify Unit Price',
      message:
        'Customize your unit with ease: Edit price, upload purchase agreement and more to keep your unit fresh and engaging.',
      openListItem: handleScreen('editUnitPrice'),
    },
    {
      icon: editunitquantityIcon.src,
      title: 'Modify Unit Quantity',
      message:
        'Customize your unit with ease: Edit unit quantity and more to keep your unit fresh and engaging.',
      openListItem: handleScreen('editUnitQuantity'),
    },
    {
      icon: displayPicture.src,
      title: 'Display Unit Picture',
      message: 'Select the main image that represents your unit on the application.',
      openListItem: () => displayPictureDrawer.onOpen(),
    },
    IS_PINNED
      ? {
          iconComponent: <LuPinOff color={'#191919'} fontSize={'26px'} />,
          title: 'Remove from Pinned Units',
          message:
            'This unit will automatically return to its original position and order before it was pinned',
          openListItem: () => togglePinnedUnitDrawer(),
        }
      : {
          iconComponent: <BsFillPinAngleFill color={'#222222'} fontSize={'28px'} />,
          title: 'Pin this Unit',
          message: 'This unit will appear first before other units.',
          openListItem: () => togglePinnedUnitDrawer(),
        },
        {
          icon: isPrivate ? makePublicUnlockIcon.src : makePrivatePadlockIcon.src,
          title: isPrivate ? 'Make Unit Public' : 'Make Unit Private',
          message: isPrivate
            ? 'Make your unit visible in public view in the app and grant access to all users for a better sharing experience.'
            : 'Privatize your unit to control its visibility. Remove it from public view in the app and grant exclusive access to select individuals for a more controlled and private sharing experience.',
          openListItem: () => unitVisible.onOpen(),
        },
    {
      icon: uploadSubDocsIcon.src,
      title: 'Share Unit Document',
      message: 'Share all property purchase-related documents here.',
      openListItem: () => openUploadSubDoc(),
    },
    !unitInfo.project.fraction_is_available && unitInfo?.quantity !== 0
      ? {
          icon: fractionalizeIcon.src,
          title: 'Fractionalize',
          message:
            'Easily divide and sell shares of your property, enabling fractional ownership and investment in real estate. A smart solution for accessible and diversified property investment.',
          openListItem: () => {
            fractionalizeModal.onOpen();
            disclosure.onClose();
          },
        }
      : null,

    {
      icon: archiveIcon.src,
      title: 'Archived Units',
      message:
        'Conveniently archive units to temporarily remove them from the application, reserving them for future availability or strategic release.',
      openListItem: handleScreen('archiveUnit'),
    },
  ];

  return (
    <DrawerBody>
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
            More Options
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
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <DrawerBody sx={customScrollbarStyles} paddingTop="1rem" mr="3px" w="400px">
          {List?.flatMap((data, index) =>
            data
              ? [
                  <HStack
                    cursor="pointer"
                    border="1px solid #E4E4E4"
                    padding="15px 11px"
                    onClick={data?.openListItem}
                    borderRadius="12px"
                    marginBottom="1rem"
                    key={index}
                    w="full"
                    justifyContent="space-between"
                  >
                    <VStack spacing="11px" alignItems="start">
                      {data.iconComponent ? (
                        data.iconComponent
                      ) : (
                        <Image src={data.icon} alt="icons" />
                      )}
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
    </DrawerBody>
  );
};

export default ListOfDrawerOption;
