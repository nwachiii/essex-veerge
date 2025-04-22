import React, {useState} from 'react';
import LevyMoreOptions from '../screenComponents/moreOptions';
import LevyHistoryScreen from './levyHistoryScreen';
import PastLevyPayments from '../screenComponents/pastLevyPayments';
import IncomingLevyPayment from '../screenComponents/incomingLevyPayment';

const LevyMoreOptionsScreen = ({setMainScreen}) => {
  const [screen, setScreen] = useState('more options');

  const displayMoreOptionsScreens = scrn => {
    switch (scrn) {
      case 'more options':
        return <LevyMoreOptions setScreen={setScreen} setMainScreen={setMainScreen} />;
      case 'levy history':
        return <LevyHistoryScreen setMainScreen={setScreen} />;
      case 'past payment':
        return <PastLevyPayments setScreen={setScreen} />;
      case 'incoming payment':
        return <IncomingLevyPayment setScreen={setScreen} />;
      default:
        return <LevyMoreOptions setScreen={setScreen} setMainScreen={setMainScreen} />;
    }
  };
  return displayMoreOptionsScreens(screen);
};

export default LevyMoreOptionsScreen;
