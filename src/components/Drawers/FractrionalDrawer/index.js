import {useState} from 'react';
import ListOfFractionalOptions from './ListOfFractionalOptions';
import {Button} from 'ui-lib/ui-lib.components';
import {Drawer, DrawerOverlay, useDisclosure, useToast} from '@chakra-ui/react';
import ViewSummaryDrawer from './view-summary/ViewSummaryDrawer';
import {PayDividendDrawer} from './pay-dividend';
import {UnitAllocationDrawer} from './unit-allocation';
import {SendEmailDrawer} from './send-email';
import {PushNotificationDrawer} from './push-notification';
import {FractionVisibility} from './toggle-visible';
import {RefundDrawer} from './refund';
import {fetchFractionalizedInfo} from 'apis/listings';
import {useQuery} from '@tanstack/react-query';
import {EditFractional} from '@/components/Modals/editFractional';
import {EmailDrawer} from './send-email/EmailDrawer';
import {NotificationDrawer} from './push-notification/PushNotification';

export const ManageFractions = ({
  unitInfo,
  FRACTIONS_QUERY,
  unitInfoRefetch,
  FractionsDrawer,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const [screen, setScreen] = useState('options');
  const editFractionalDisclosure = useDisclosure();
  const emailDisclosure = useDisclosure();
  const pushNotifDisclosure = useDisclosure();

  const {data, isError, isLoading, error, refetch} = useQuery(
    ['editFractionalInitialData', unitInfo.id],
    () => fetchFractionalizedInfo(unitInfo.id),
    {enabled: !!unitInfo.id}
  );

  const handleClose = () => {
    setScreen('options');
    return FractionsDrawer.onClose();
  };

  const handleScreen = scrn => () => {
    setScreen(scrn);
    // if (scrn === 'pushNotification') {
    //   pushNotifDisclosure.onOpen();
    // } else if (scrn === 'sendEmail') {
    //   emailDisclosure.onOpen();
    // }
  };

  const displayFractionalOptions = key => {
    switch (key) {
      case 'options':
        return (
          <ListOfFractionalOptions
            unitInfo={unitInfo}
            unitInfoRefetch={unitInfoRefetch}
            handleScreen={handleScreen}
            handleClose={handleClose}
            refetch={FRACTIONS_QUERY?.refetch}
            fractionalInfo={FRACTIONS_QUERY?.data}
            customScrollbarStyles={customScrollbarStyles}
            editFractionalDisclosure={editFractionalDisclosure}
            isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}

            // openActivity={handleOpenActivityLog}
          />
        );
      case 'showFractionalSummary':
        return (
          <ViewSummaryDrawer
            unitInfo={unitInfo}
            handleScreen={handleScreen}
            fractionalInfo={FRACTIONS_QUERY?.data}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
      case 'showUnitAllocation':
        return (
          <UnitAllocationDrawer
            unitInfo={unitInfo}
            handleScreen={handleScreen}
            fractionalInfo={FRACTIONS_QUERY?.data}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
      case 'showPayDividendDrawer':
        return (
          <PayDividendDrawer
            unitInfo={unitInfo}
            handleScreen={handleScreen}
            fractionalInfo={FRACTIONS_QUERY?.data}
            customScrollbarStyles={customScrollbarStyles}
            isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
          />
        );
      case 'sendEmail':
        return (
          <>
            <SendEmailDrawer
              unitInfo={unitInfo}
              handleScreen={handleScreen}
              fractionalInfo={FRACTIONS_QUERY?.data}
              customScrollbarStyles={customScrollbarStyles}
              handleClose={handleClose}
            />
            {/* <EmailDrawer isOpen={emailDisclosure.isOpen} onClose={emailDisclosure.onClose} /> */}
          </>
        );
      case 'pushNotification':
        return (
          <>
            <PushNotificationDrawer
              unitInfo={unitInfo}
              handleScreen={handleScreen}
              fractionalInfo={FRACTIONS_QUERY?.data}
              customScrollbarStyles={customScrollbarStyles}
              handleClose={handleClose}
            />
            {/* <NotificationDrawer
              isOpen={pushNotifDisclosure.isOpen}
              onClose={pushNotifDisclosure.onClose}
            /> */}
          </>
        );
      case 'toggleVisibility':
        return (
          <FractionVisibility
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
          />
        );
      case 'refund':
        return (
          <RefundDrawer
            handleScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
          />
        );
      default:
        <ListOfFractionalOptions
          unitInfo={unitInfo}
          refetch={FRACTIONS_QUERY?.refetch}
          fractionalInfo={FRACTIONS_QUERY?.data}
          customScrollbarStyles={customScrollbarStyles}
          handleScreen={handleScreen}
          isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
        />;

        break;
    }
  };

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

  return (
    <div>
      <Button
        w="83px"
        h="36px"
        mt={0}
        fontSize="14px"
        fontWeight="500"
        borderRadius="72px"
        border="1px solid #a3a3a3"
        background="#FFF"
        onClick={FractionsDrawer.onOpen}
        boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
      >
        Manage
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={FractionsDrawer.isOpen}
        onClose={handleClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        {displayFractionalOptions(screen)}
      </Drawer>
      {editFractionalDisclosure.isOpen ? (
        <EditFractional
          drawerDisclosure={FractionsDrawer}
          unitInfo={unitInfo}
          unitInfoRefetch={unitInfoRefetch}
          modalDisclosure={editFractionalDisclosure}
          data={data}
          isError={isError}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      ) : null}
    </div>
  );
};

export default ManageFractions;
