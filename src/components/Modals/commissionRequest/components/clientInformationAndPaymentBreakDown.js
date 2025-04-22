import {HStack, Text} from '@chakra-ui/react';
import React from 'react';
import ClientInfoAndListOfEquity from './clientInfoListEquity';
import PaymentBreakDown from './paymentBreakDown';

export const ClientInformationAndPaymentBreakDown = ({
  handleSubScreens,
  subScreen,
  equityListObj,
  commissionRequestObj,
  customScrollbarStyles,
  selectedEquityId,
  clientData,
  setSelectedEquityId,
  incomingPaymentObj,
  setClientData,
  pastPaymentObj,
}) => {
  const displayScreens = key => {
    switch (key) {
      case 'clientInfo':
        return (
          <ClientInfoAndListOfEquity
            customScrollbarStyles={customScrollbarStyles}
            equityListObj={equityListObj}
            setClientData={setClientData}
            selectedEquityId={selectedEquityId}
            setSelectedEquityId={setSelectedEquityId}
            commissionRequestObj={commissionRequestObj}
            handleSubScreens={handleSubScreens}
          />
        );
        break;
      case 'paymentBreakDown':
        return (
          <PaymentBreakDown
            equityListObj={equityListObj}
            incomingPaymentObj={incomingPaymentObj}
            pastPaymentObj={pastPaymentObj}
            clientData={clientData}
            selectedEquityId={selectedEquityId}
            commissionRequestObj={commissionRequestObj}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
        break;

      default:
        return (
          <ClientInfoAndListOfEquity
            customScrollbarStyles={customScrollbarStyles}
            handleSubScreens={handleSubScreens}
            equityListObj={equityListObj}
            commissionRequestObj={commissionRequestObj}
          />
        );

        break;
    }
  };

  return displayScreens(subScreen);
};

export default ClientInformationAndPaymentBreakDown;
