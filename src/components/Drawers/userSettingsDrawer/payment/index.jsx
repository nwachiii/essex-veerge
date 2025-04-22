import React, {useState} from 'react';
import AddBankAccount from './addBankAccount';
import {PaymentGatewayDrawer} from './paymentConfigcontrolRoom';
import ConfigOptions from './ConfigOptions';
import ProfileHomeScreen from './ProfileHomeScreen';

const PaymentControlRoom = ({menu_toggle, isAccountActive}) => {
  const [screen, setScreen] = useState('options');

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const displayPaymentScreens = scrn => {
    switch (scrn) {
      case 'options':
        return (
          <ProfileHomeScreen
            isAccountActive={isAccountActive}
            handleMainScreen={setScreen}
            menu_toggle={menu_toggle}
          />
        );
      case 'handle accounts':
        return <AddBankAccount mainScreenNav={setScreen} />;
      case 'payment config':
        return <PaymentGatewayDrawer mainScreenNav={handleScreen} menu_toggle={menu_toggle} />;

      default:
        return (
          <ProfileHomeScreen
            isAccountActive={isAccountActive}
            handleMainScreen={setScreen}
            menu_toggle={menu_toggle}
          />
        );
    }
  };
  return displayPaymentScreens(screen);
};

export default PaymentControlRoom;
