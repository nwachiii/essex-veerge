import React, {useState} from 'react';
import LevyHistory from '../screenComponents/levyHistory';
import TrackPayment from '../screenComponents/trackPayment';
import AddNewSubscribers from '../screenComponents/addNewSubscribers';
import UpdateLevyPaymentScreen from './updateLevyPaymentScreen';
import CustomerLevyProfile from '../screenComponents/customerLevyProfile';

const LevyHistoryScreen = ({setMainScreen}) => {
  const [screen, setScreen] = useState('levy history');

  const displayLevyHistoryScreens = scrn => {
    switch (scrn) {
      case 'levy history':
        return <LevyHistory setScreen={setScreen} setMainScreen={setMainScreen} />;
      case 'track payment':
        return <TrackPayment setScreen={setScreen} />;
      case 'add new subscribers':
        return <AddNewSubscribers setScreen={setScreen} />;
      case 'update payment':
        return <UpdateLevyPaymentScreen setMainScreen={setScreen} />;
      case 'customer levy profile':
        return <CustomerLevyProfile setScreen={setScreen} />;
      default:
        return <LevyHistory setScreen={setScreen} setMainScreen={setMainScreen} />;
    }
  };
  return displayLevyHistoryScreens(screen);
};

export default LevyHistoryScreen;
