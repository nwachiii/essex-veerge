import React from 'react';
import {useState} from 'react';
import {ManageApp} from './ManageApp';
import {SuccessForJoinBeta} from './successForJoinBeta';
import {TermsOfService} from './termsOfService';
import {fetchcreateStoreInfo, patchcreateStoreInfo} from '../../../../../apis/settings';
import {useMutation, useQuery} from '@tanstack/react-query';
import {toastForError} from '../../../../../utils/toastForErrors';
import {useToast} from '@chakra-ui/react';
import AppPreferences from './AppPreferences';

export const ManageApplicationScreen = ({customScrollbarStyles, closeDrawer, handleMainScreen}) => {
  const [screen, setScreen] = useState('manageApp');
  const [patchParam, setPatchParam] = useState('');

  const storeInfo = useQuery(['store-info'], fetchcreateStoreInfo);
  const toast = useToast();
  const mutation = useMutation(formData => patchcreateStoreInfo(formData), {
    onSuccess: async res => {
      await storeInfo.refetch();
      screen === 'termsofService' ? setScreen('successScreenForWaitlist') : null;
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const manageAppPatchHandler =
    (param, body = {}) =>
    () => {
      const prop = {
        body,
        param,
      };

      mutation.mutate(prop);
    };

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const navToTermsOfService = (scrn, param) => () => {
    setPatchParam(param);
    return setScreen(scrn);
  };

  const displayManageApplicationScreens = key => {
    switch (key) {
      case 'manageApp':
        return (
          <ManageApp
            closeDrawer={closeDrawer}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            mutation={mutation}
            storeInfo={storeInfo}
            navToTermsOfService={navToTermsOfService}
            handleMainScreen={handleMainScreen}
            manageAppPatchHandler={manageAppPatchHandler}
          />
        );
        break;

      case 'preferences':
        return (
          <AppPreferences
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            mutation={mutation}
            storeInfo={storeInfo}
            manageAppPatchHandler={manageAppPatchHandler}
          />
        );
        break;
      case 'termsofService':
        return (
          <TermsOfService
            customScrollbarStyles={customScrollbarStyles}
            mutation={mutation}
            handleScreen={handleScreen}
            patchParam={patchParam}
            manageAppPatchHandler={manageAppPatchHandler}
          />
        );
        break;
      case 'successScreenForWaitlist':
        return (
          <SuccessForJoinBeta
            closeDrawer={closeDrawer}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );
        break;

      default:
        return (
          <ManageApp
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            mutation={mutation}
            storeInfo={storeInfo}
            navToTermsOfService={navToTermsOfService}
            closeDrawer={closeDrawer}
            handleMainScreen={handleMainScreen}
            manageAppPatchHandler={manageAppPatchHandler}
          />
        );

        break;
    }
  };
  return displayManageApplicationScreens(screen);
};

export default ManageApplicationScreen;
