import React, {useState} from 'react';
import {Modal, ModalOverlay, ModalContent, useToast, useMediaQuery} from '@chakra-ui/react';
import EnterWebApplicationUrl from './EnterWebApplicationUrl';
import {toastForError} from '../../../../../utils/toastForErrors';
import {useMutation} from '@tanstack/react-query';
import SelectOptionToCreate from './SelectOptionToCreate';
import CreateMobileApp from './CreateMobileApp';
import SuccessScreenForAppCreation from './SuccessScreenForAppCreation';
import ColorSelectionModal from '../ColorSelectionModal';
import {useRouter} from 'next/router';
import {createStore, updateStore} from '../../../../../apis/settings';
import PurchaseApp from './purchaseApp';
import SelectThemeColorMode from './selectThemeColorMode';
import AdditionalFeatures from './additionalFeatures';
import AppPurchaseSummary from './appPurchaseSummary';
import {DeployingStore} from './deployingStore';

export const CreateAppModal = ({
  modalDisclosure,
  selectedTheme,
  setSelectedTheme,
  placeHolder,
  themes,
  storeInfo,
  screen,
  setScreen,
}) => {
  const toast = useToast();
  const router = useRouter();
  const storeName = storeInfo.data?.data?.store_name;
  const storeColorMode = storeInfo?.data?.data?.theme_mode;
  const storeThemeName = storeInfo?.data?.data?.theme_name;
  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');

  const [strName, setStrName] = useState('');
  const [theme_mode, setThemeMode] = useState('');

  const isCurrentThemeMode = mode =>
    selectedTheme.themeName === storeThemeName && storeColorMode === mode && storeName;

  const warn = text =>
    toast({
      title: text,
      position: 'top',
      status: 'warning',
      isClosable: false,
    });

  const {baseColor: theme_color, themeName: theme_name, subTheme: sub_theme} = router.query;

  const totalAmountToBePaid = () => {
    const price = Number(selectedTheme?.price?.replace(/[^\d.]/g, ''));
    const total = price;
    // + 1500 + 1000 + 1300 + 2000;
    return total;
  };

  const mutation = useMutation(
    formData => (storeName ? updateStore(formData) : createStore(formData)),
    {
      onSuccess: res => {
        storeInfo.refetch();
        setScreen('deploying');
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleStoreCreation = () => {
    if (!theme_color || !theme_name) {
      return warn(`kindly select a theme ${!theme_color ? 'color' : 'name'} to proceed`);
    }

    const storeObj = {
      ...(storeName ? {} : {store_name: strName}),
      ...(storeName ? {} : {business: storeInfo.data?.data?.business_id}),
      theme_color,
      theme_name,
      theme_mode,
      sub_theme,
    };

    return mutation.mutate(storeObj);
  };
  const handleClose = () => {
    setStrName('');
    setSelectedTheme({});
    const {themeName, subTheme, baseColor, ...rest} = router.query;
    router.replace({pathname: router.pathname, query: rest}, undefined, {shallow: true});
    if (screen === 'successScreen') {
      return router.push('/dashboard?manageApp=true');
    }
    return modalDisclosure.onClose();
  };

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const displayCreateScreens = key => {
    switch (key) {
      case 'selectOption':
        return <SelectOptionToCreate handleScreen={handleScreen} />;

      case 'createMobileApp':
        return <CreateMobileApp handleScreen={handleScreen} mutation={mutation} />;

      case 'selectThemeColorMode':
        return (
          <SelectThemeColorMode
            isCurrentThemeMode={isCurrentThemeMode}
            selectedTheme={selectedTheme}
            handleScreen={setScreen}
            setColorMode={setThemeMode}
          />
        );

      case 'additionalFeatures':
        return (
          <AdditionalFeatures
            storeName={storeName}
            mutation={mutation}
            handleStoreCreation={handleStoreCreation}
            handleScreen={setScreen}
            selectedTheme={selectedTheme}
            onClose={modalDisclosure.onClose}
          />
        );

      case 'appPurchaseSummary':
        return (
          <AppPurchaseSummary
            totalAmountToBePaid={totalAmountToBePaid}
            selectedTheme={selectedTheme}
            handleScreen={setScreen}
          />
        );

      case 'createWebApplication':
        return (
          <EnterWebApplicationUrl
            handleScreen={setScreen}
            placeHolder={placeHolder}
            storeInfo={storeInfo}
            mutation={mutation}
            setStrName={setStrName}
            strName={strName}
            handleStoreCreation={handleStoreCreation}
          />
        );

      case 'purchaseApp':
        return (
          <PurchaseApp
            mutation={mutation}
            themeName={theme_name}
            handleScreen={setScreen}
            totalAmountToBePaid={totalAmountToBePaid}
            handleStoreCreation={handleStoreCreation}
          />
        );

      case 'deploying':
        return (
          <DeployingStore
            refetch={storeInfo.refetch}
            handleScreen={setScreen}
            screen={screen}
            mutation={mutation}
          />
        );

      case 'selectColor':
        return (
          <ColorSelectionModal
            handleScreen={setScreen}
            storeThemeColor={storeInfo?.data?.data?.theme_color}
            storeThemeName={storeInfo?.data?.data?.theme_name}
            modalDisclosure={modalDisclosure}
          />
        );
      case 'selectColorOnly':
        return (
          <ColorSelectionModal
            screen={screen}
            handleScreen={setScreen}
            storeThemeColor={storeInfo?.data?.data?.theme_color}
            storeThemeName={storeInfo?.data?.data?.theme_name}
            modalDisclosure={modalDisclosure}
          />
        );

      case 'successScreen':
        return (
          <SuccessScreenForAppCreation
            handleScreen={handleScreen}
            domainUrl={storeInfo.data?.data?.store_link}
            storeInfo={storeInfo}
            mutation={mutation}
          />
        );

      default:
        return <SelectOptionToCreate handleScreen={handleScreen} />;
    }
  };
  return (
    <Modal
      borderRadius="19.308px"
      autoFocus={false}
      isOpen={modalDisclosure.isOpen}
      onClose={handleClose}
      closeOnOverlayClick={screen === 'deploying' ? false : true}
      isCentered={isShortScreenHeight ? true : false}
      motionPreset="scale"
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg={'linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%)'}
      />
      <ModalContent
        overflow="hidden"
        bg="#0C2841"
        transform={
          isShortScreenHeight
            ? 'scale(0.8) !important'
            : {base: 'scale(0.75) !important', xl: 'scale(1) !important'}
        }
        minW="fit-content"
        mt={isShortScreenHeight ? '0vh' : '10vh'}
        w="fit-content"
        minH="fit-content"
        borderRadius="19.308px"
        p="0px"
      >
        {displayCreateScreens(screen)}
      </ModalContent>
    </Modal>
  );
};

export default CreateAppModal;
