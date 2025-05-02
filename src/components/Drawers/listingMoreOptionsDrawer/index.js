import {Drawer, DrawerOverlay, useDisclosure, Button, Image, HStack, Text} from '@chakra-ui/react';
import mo from '/src/images/icons/moreoptions.svg';
import {useState} from 'react';
import ListOfDrawerOptions from './screens/listOfDrawerOptions';
import ActivityLog from './screens/activityLog';
import {ListingVisibility} from './screens/listingVisibility';
import {SecondaryMP} from './screens/secMarketPlace';
import EditUnitPriceDrawer from '../editUnitPriceDrawer';
import FractionalizationModal from '@/components/Modals/fractionalization';
import {useQuery} from '@tanstack/react-query';
import {fetchAllBundlePaymentPlan} from 'apis/listings';
import {PinnedListingDrawer} from './screens/pinnedListingDrawer';
import {InspectionSettingsDrawer} from './screens/drawer/InspectionSettingsDrawer';
import {MapViewDrawer} from './screens/mapViewDrawer';
import UploadSubDoc from './screens/uploadSubDoc';
import AddProjectBankAccount from './screens/addBankAccount';
import {ListingDisplayPicture} from './screens/listingDisplayPicture';
import { SendEmailDrawer } from './screens/sendEmail/sendEmail';

export const ListingMoreOption = ({
  name,
  doc,
  setDoc,
  refetch,
  mutation,
  listingId,
  listingDetail,
  editUnitPrice,
  isPriceUpdated,
  pendingEquities,
  setEditUnitPrice,
  drawerDisclosure,
  isPrivate,
  pendingTransactions,
  handlePendingTransactions,
}) => {
  const [screen, setScreen] = useState('options');

  const activitLog = useDisclosure();
  const mapDrawer = useDisclosure();
  const secondaryMP = useDisclosure();
  const unitQuantity = useDisclosure();
  const listingVisible = useDisclosure();
  const fractionalizeModal = useDisclosure();
  const pinnedListingDrawer = useDisclosure();
  const displayPictureDrawer = useDisclosure();
  const inspectionSettingsDrawer = useDisclosure();
  const isBuildingTypeSingleFamilyResidential =
    listingDetail?.building_type == 'Detached' || listingDetail?.building_type == 'Semi Detached';

  const BUNDLE_IN_LISTING_QUERY = useQuery(
    ['units', Number(listingDetail?.unit_id)],
    () => fetchAllBundlePaymentPlan(Number(listingDetail?.unit_id)),
    {enabled: !!!isNaN(Number(listingDetail?.unit_id))}
  );
  const UNIT_INFO =
    BUNDLE_IN_LISTING_QUERY && BUNDLE_IN_LISTING_QUERY?.data?.data?.results?.[0]?.bundle;
  const isFractionsCreated = UNIT_INFO?.is_fraction_sale_available;

  const IS_PINNED = Boolean(listingDetail?.pinned);

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',
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

  const handleOpenActivityLog = () => {
    drawerDisclosure.onClose();
    activitLog.onOpen();
  };

  const handleOpenListingVisibility = () => {
    drawerDisclosure.onClose();
    listingVisible.onOpen();
  };
  const togglePinnedListingDrawer = () => {
    drawerDisclosure.onClose();
    pinnedListingDrawer.onOpen();
  };

  const handleOpenSecondaryMP = () => {
    drawerDisclosure.onClose();
    secondaryMP.onOpen();
  };

  const handleBack = () => {
    drawerDisclosure.onOpen();
  };

  const handleOpenEditUnit = () => {
    drawerDisclosure.onClose();
    unitQuantity.onOpen();
  };
  const openUploadSubDoc = () => {
    return setScreen('uploadSubDoc');
  };
  const openBankAccountScreen = () => {
    return setScreen('handle accounts');
  };

  const displayMoreOption = key => {
    switch (key) {
      case 'options':
        return (
          <ListOfDrawerOptions
            name={name}
            listingId={listingId}
            listingDetail={listingDetail}
            refetch={refetch}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            openActivity={handleOpenActivityLog}
            openSecondaryMP={handleOpenSecondaryMP}
            openEditQuantity={handleOpenEditUnit}
            openUploadSubDoc={openUploadSubDoc}
            fractionalizeModal={fractionalizeModal}
            inspectionSettingsDrawer={inspectionSettingsDrawer}
            drawerDisclosure={drawerDisclosure}
            isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
            isPrivate={isPrivate}
            openListingVisibility={handleOpenListingVisibility}
            openBankAccountScreen={openBankAccountScreen}
            togglePinnedListingDrawer={togglePinnedListingDrawer}
            mapDrawer={mapDrawer}
            displayPictureDrawer={displayPictureDrawer}
          />
        );
      case 'editUnitPrice':
        return (
          <EditUnitPriceDrawer
            refetch={refetch}
            unitInfo={listingDetail}
            // bundleId={bundleId}
            handleMainScreen={setScreen}
            pendingTransactions={pendingTransactions}
            isPriceUpdated={isPriceUpdated}
            editedUnitPrice={editUnitPrice}
            setEditedUnitPrice={setEditUnitPrice}
            mutation={mutation}
            doc={doc}
            setDoc={setDoc}
            handlePendingTransactions={handlePendingTransactions}
            pendingEquities={pendingEquities}
          />
        );
      case 'handle accounts':
        return <AddProjectBankAccount mainScreenNav={setScreen} />;
      case 'uploadSubDoc':
        return <UploadSubDoc listingDetails={listingDetail} handleMainScreen={setScreen} />;
      case 'email':
        return <SendEmailDrawer customScrollbarStyles={customScrollbarStyles} handleScreen={handleScreen} />
      
      default:
        <ListOfDrawerOptions
          name={name}
          listingId={listingId}
          listingDetail={listingDetail}
          refetch={refetch}
          customScrollbarStyles={customScrollbarStyles}
          handleScreen={handleScreen}
          openActivity={handleOpenActivityLog}
          openSecondaryMP={handleOpenSecondaryMP}
          openEditQuantity={handleOpenEditUnit}
          openUploadSubDoc={openUploadSubDoc}
          fractionalizeModal={fractionalizeModal}
          inspectionSettingsDrawer={inspectionSettingsDrawer}
          drawerDisclosure={drawerDisclosure}
          isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
          isPrivate={isPrivate}
          openListingVisibility={handleOpenListingVisibility}
          openBankAccountScreen={openBankAccountScreen}
          togglePinnedListingDrawer={togglePinnedListingDrawer}
          mapDrawer={mapDrawer}
          displayPictureDrawer={displayPictureDrawer}
        />;

        break;
    }
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
        bg='#FFF'
      >
        <HStack gap={'8px'}>
          <Image src={mo.src} alt="more options" />
          <Text>More Options</Text>
        </HStack>
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={drawerDisclosure.isOpen}
        onClose={handleClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        {displayMoreOption(screen)}
      </Drawer>
      <ActivityLog isOpen={activitLog.isOpen} onClose={activitLog.onClose} id={listingId} />
      <ListingVisibility
        isOpen={listingVisible.isOpen}
        onClose={listingVisible.onClose}
        handleBack={handleBack}
        listingId={listingId}
        isPrivate={isPrivate}
        refetch={refetch}
      />
      <PinnedListingDrawer
        isPinned={IS_PINNED}
        handleBack={handleBack}
        listingId={listingId}
        refetch={refetch}
        isOpen={pinnedListingDrawer.isOpen}
        onClose={pinnedListingDrawer.onClose}
      />
      <SecondaryMP
        isOpen={secondaryMP.isOpen}
        onClose={secondaryMP.onClose}
        handleBack={handleBack}
      />
      <FractionalizationModal
        unitQtyLeft={1}
        unitInfo={UNIT_INFO}
        bundleId={listingDetail?.unit_id}
        modalDisclosure={fractionalizeModal}
        refetch={BUNDLE_IN_LISTING_QUERY?.refetch}
        isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
      />
      <InspectionSettingsDrawer
        refetch={refetch}
        drawerDisclosure={inspectionSettingsDrawer}
        listingDetail={listingDetail}
      />
      <MapViewDrawer
        isOpen={mapDrawer.isOpen}
        onClose={mapDrawer.onClose}
        listingId={listingId}
        listingDetail={listingDetail}
        refetch={refetch}
      />
      <ListingDisplayPicture
        isOpen={displayPictureDrawer.isOpen}
        onClose={displayPictureDrawer.onClose}
        listingId={listingId}
        listingDetail={listingDetail}
      />
    </>
  );
};

export default ListingMoreOption;
