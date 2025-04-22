import React, {useState} from 'react';
import UpdatePayment from '../screenComponents/updatePayment';
import LevyTwoFa from '../screenComponents/levyTwoFa';
import TwoFaVerifcation from '../../transferownership/screens/verify2fa';

const UpdateLevyPaymentScreen = ({setMainScreen}) => {
  const [screen, setScreen] = useState('update payment');

  const handleProceed = () => {};

  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };
  const displayUpdatePaymentScreens = scrn => {
    switch (scrn) {
      case 'update payment':
        return <UpdatePayment setMainScreen={setMainScreen} />;
      case '2fa':
        return (
          <TwoFaVerifcation
            headerTextStyle={{
              fontSize: '16px',

              color: '#18181b',
            }}
            headerStyle={{
              borderBottom: '0.5px solid #e4e4e7',
              ' box-shadow': ' 0px 2px 4px 0px #0000000D',
              py: '7px',
              bg: '#fafafa',
              h: '50px',
            }}
            navigateBack={handleScreen('update payment')}
            header="Levy Payment"
            handleVerify={handleProceed}
            isLoading={false}
          />
        );
      // case '2fa':
      //   return <LevyTwoFa />;

      default:
        return <UpdatePayment />;
    }
  };
  return displayUpdatePaymentScreens(screen);
};

export default UpdateLevyPaymentScreen;
