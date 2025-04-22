import React, {useEffect, useState} from 'react';

import {Drawer, DrawerContent, DrawerOverlay, useToast} from '@chakra-ui/react';
import ListOfClosedInspection from './screens/listOfClosedInspection';
import InspectionDetails from './screens/inspectionDetails';
import {fetchInspectionHistory} from 'apis/fetchInspection';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {toastForError} from 'utils/toastForErrors';
export const InspectionHistoryDrawer = ({drawerDisclosure}) => {
  const [detail, setinspectionDetail] = useState({});
  const [screen, setScreen] = useState('closedInspections');
  const [addedParam, setAddedParam] = useState('');
  const router = useRouter();
  const {userId} = router.query;

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
  const handleClose = () => {
    setScreen('closedInspections');
    return drawerDisclosure.onClose();
  };

  const param = {addedParam, id: userId};

  const {data, isLoading, isError, refetch, error} = useQuery(
    ['inspectionHistory', param],
    () => fetchInspectionHistory(param),
    {enabled: drawerDisclosure.isOpen}
  );
  const toast = useToast();

  toastForError(error, isError, toast);

  const historyList = data?.data?.message;

  const handleScreen = screen => () => setScreen(screen);
  const inspectionDetails = historyList?.find(item => item?.id === detail);
  const displayInspectionHistoryScreen = key => {
    switch (key) {
      case 'closedInspections':
        return (
          <ListOfClosedInspection
            isLoading={isLoading}
            isError={isError}
            setAddedParam={setAddedParam}
            inspectiionList={historyList}
            setDetails={setinspectionDetail}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );
        break;
      case 'inspectionDetails':
        return (
          <InspectionDetails
            refetch={refetch}
            inspectionDetails={inspectionDetails}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );
        break;

      default:
        return (
          <ListOfClosedInspection
            isLoading={isLoading}
            isError={isError}
            setAddedParam={setAddedParam}
            inspectiionList={historyList}
            setDetails={setinspectionDetail}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
          />
        );

        break;
    }
  };

  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        // mt="112.12px"

        minW="400px"
        bg="#fff"
        p="0px"
      >
        {displayInspectionHistoryScreen(screen)}
      </DrawerContent>
    </Drawer>
  );
};

export default InspectionHistoryDrawer;
