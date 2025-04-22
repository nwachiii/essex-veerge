import React, {useState} from 'react';
import PaymentAndSecurity from './paymentAndSecurity';
import SetUpBVN from './setUpBVN';
import {useQuery} from '@tanstack/react-query';
import {fetchDeveloperProfile} from 'apis/settings';

const ProfileHomeScreen = ({handleMainScreen, isAccountActive, menu_toggle}) => {
  const [screen, setScreen] = useState('index');
  const {data, isError, isLoading, refetch} = useQuery(
    ['fetchDeveloperProfile'],
    fetchDeveloperProfile
  );
  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const displaytScreens = scrn => {
    switch (scrn) {
      case 'index':
        return (
          <PaymentAndSecurity
            refetch={refetch}
            isAccountActive={isAccountActive}
            data={data}
            mainScreenNav={handleMainScreen}
            handleScreen={handleScreen}
            menu_toggle={menu_toggle}
          />
        );
      case 'set up bvn':
        return (
          <SetUpBVN
            refetch={refetch}
            handleScreen={handleScreen}
            mainScreenNav={handleMainScreen}
          />
        );

      default:
        return (
          <PaymentAndSecurity
            refetch={refetch}
            isAccountActive={isAccountActive}
            data={data}
            mainScreenNav={handleMainScreen}
            handleScreen={handleScreen}
            menu_toggle={menu_toggle}
          />
        );
    }
  };
  return displaytScreens(screen);
};

export default ProfileHomeScreen;
