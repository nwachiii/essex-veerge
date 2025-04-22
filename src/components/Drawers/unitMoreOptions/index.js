import {
  Button,
  Drawer,
  DrawerOverlay,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import ListOfDrawerOption from './screens/listOfDrawerOption';
import {EditUnit as EditUnitTwo} from './components/editUnit';
import Fractionalize from './components/fractionalize';
import ArchiveUnitDrawer from '../archiveUnitDrawer';
import mo from '/src/images/icons/moreoptions.svg';
import EditUnit from 'pages/listings/manage/unit_info/edit_unit';
import {EditUnitPriceDrawer} from '../editUnitPriceDrawer';
import EditUnitQuantityDrawer from '../editUnitQuantityDrawer';
import {useRouter} from 'next/router';
import FractionalizationModal from '@/components/Modals/fractionalization';
import UploadSubDoc from '../listingMoreOptionsDrawer/screens/uploadSubDoc';
import {PinnedUnitDrawer} from './screens/pinnedUnitDrawer';
import {UnitDisplayPicture} from './screens/unitDisplayPicture';
import {UnitVisibility} from './screens/unitVisibility';

const UnitMoreOption = ({
  refetch,
  unitInfo,
  unitQty,
  unitPrice,
  bundleId,
  pendingTransactions,
  isPriceUpdated,
  editUnitPrice,
  setEditUnitPrice,
  mutation,
  handlePendingTransactions,
  drawerDisclosure,
  doc,
  setDoc,
  pendingEquities,
  equityRefresh,
}) => {
  const [screen, setScreen] = useState('options');
  const fractionalizeModal = useDisclosure();
  const pinnedUnitDrawer = useDisclosure();
  const displayPictureDrawer = useDisclosure();
  const unitVisible = useDisclosure();
  const EDIT_UNIT = useDisclosure();
  const router = useRouter();
  const {isFraction} = router.query;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
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
    setScreen('options');
    return drawerDisclosure.onClose();
  };
  const handleBack = () => {
    drawerDisclosure.onOpen();
  };

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };
  const openUploadSubDoc = () => {
    return setScreen('uploadSubDoc');
  };
  const togglePinnedUnitDrawer = () => {
    drawerDisclosure.onClose();
    pinnedUnitDrawer.onOpen();
  };
  const isFractionsCreated = unitInfo?.is_fraction_sale_available;
  const IS_PINNED = Boolean(unitInfo?.is_pinned);
  const isPrivate = Boolean(unitInfo?.is_private);

  const displayMoreOption = key => {
    switch (key) {
      case 'options':
        return (
          <ListOfDrawerOption
            unitInfo={unitInfo}
            bundleId={bundleId}
            refetch={refetch}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            unitQty={unitQty}
            unitPrice={unitPrice}
            isFractionsCreated={isFractionsCreated}
            fractionalizeModal={fractionalizeModal}
            displayPictureDrawer={displayPictureDrawer}
            disclosure={drawerDisclosure}
            editDisclosure={EDIT_UNIT}
            openUploadSubDoc={openUploadSubDoc}
            togglePinnedUnitDrawer={togglePinnedUnitDrawer}
            isPrivate={isPrivate}
            unitVisible={unitVisible}
          />
        );
        break;
      case 'editUnit':
        return (
          <EditUnitTwo
            refetch={refetch}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );
        break;

      case 'fractionalize':
        return (
          <Fractionalize
            refetch={refetch}
            isFractionsCreated={isFractionsCreated}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );
        break;
      case 'uploadSubDoc':
        return <UploadSubDoc forUnits={true} handleMainScreen={setScreen} />;
      case 'archiveUnit':
        return (
          <ArchiveUnitDrawer
            refetch={refetch}
            unitInfo={unitInfo}
            bundleId={bundleId}
            handleMainScreen={setScreen}
            drawerDisclosure={drawerDisclosure}
          />
        );
        break;

      case 'editUnitPrice':
        return (
          <EditUnitPriceDrawer
            refetch={refetch}
            unitInfo={unitInfo}
            bundleId={bundleId}
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
            equityRefresh={equityRefresh}
          />
        );
        break;
      case 'editUnitQuantity':
        return (
          <EditUnitQuantityDrawer
            refetch={refetch}
            unitInfo={unitInfo}
            bundleId={bundleId}
            handleMainScreen={setScreen}
            customScrollbarStyles={customScrollbarStyles}
            modalDisclosure={drawerDisclosure}
          />
        );
        break;
      default:
        return (
          <ListOfDrawerOption
            unitInfo={unitInfo}
            bundleId={bundleId}
            refetch={refetch}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            unitQty={unitQty}
            unitPrice={unitPrice}
            isFractionsCreated={isFractionsCreated}
            fractionalizeModal={fractionalizeModal}
            displayPictureDrawer={displayPictureDrawer}
            disclosure={drawerDisclosure}
            editDisclosure={EDIT_UNIT}
            openUploadSubDoc={openUploadSubDoc}
            togglePinnedUnitDrawer={togglePinnedUnitDrawer}
            unitVisible={unitVisible}
            isPrivate={isPrivate}
          />
        );

        break;
    }
  };
  return (
    <>
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
        More Options
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
      <EditUnit
        modalDisclosure={EDIT_UNIT}
        refetch={refetch}
        unitInfo={unitInfo}
        bundleId={bundleId}
      />
      {
        <FractionalizationModal
          unitQtyLeft={unitInfo?.quantity}
          bundleId={bundleId}
          refetch={refetch}
          unitInfo={unitInfo}
          modalDisclosure={fractionalizeModal}
        />
      }
      <PinnedUnitDrawer
        isPinned={IS_PINNED}
        handleBack={handleBack}
        bundleId={bundleId}
        refetch={refetch}
        isOpen={pinnedUnitDrawer.isOpen}
        onClose={pinnedUnitDrawer.onClose}
      />
      <UnitDisplayPicture
        isOpen={displayPictureDrawer.isOpen}
        onClose={displayPictureDrawer.onClose}
        unitInfoId={unitInfo?.id}
        unitInfo={unitInfo}
        bundleId={bundleId}
        refetch={refetch}
        />
      <UnitVisibility
        isOpen={unitVisible.isOpen}
        onClose={unitVisible.onClose}
        handleBack={handleBack}
        unitId={unitInfo?.id}
        isPrivate={isPrivate}
        refetch={refetch}
      />
    </>
  );
};

export default UnitMoreOption;
