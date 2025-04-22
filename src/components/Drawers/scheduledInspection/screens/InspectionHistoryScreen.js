import React, {useState} from 'react';
import HistoryAndInspectionList from './HistoryAndInspectionList';
import InspectionDetails from '../components/InspectionDetails';
import {useQuery} from '@tanstack/react-query';
import {fetchListingInspection} from '../../../../apis/listings';
import {useRouter} from 'next/router';

export const InspectionHistoryScreen = ({
  handleScreen,
  customScrollbarStyles,
  historyList,
  refetch,
  sortValue,
  handleSortValue,
}) => {
  const [detail, setinspectionDetail] = useState({});

  const [screen, setScreen] = useState('inspectionHistoryList');

  const inspectionDetails = historyList?.find(item => item?.id === detail);

  const handleScreenUpdate = prop => () => {
    return setScreen(prop);
  };
  const displayInspectionHistoryScreen = key => {
    switch (key) {
      case 'inspectionHistoryList':
        return (
          <HistoryAndInspectionList
            sortValue={sortValue}
            handleSortValue={handleSortValue}
            forHistory
            inspectiionList={historyList}
            setDetails={setinspectionDetail}
            handleForMainScreen={() => handleScreen('upcomingInspection')}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={() => handleScreenUpdate('inspectionHistoryDetails')}
          />
        );
        break;
      case 'inspectionHistoryDetails':
        return (
          <InspectionDetails
            refetch={refetch}
            forHistory
            inspectionDetails={inspectionDetails}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={() => handleScreenUpdate('inspectionHistoryList')}
          />
        );
        break;

      default:
        return (
          <HistoryAndInspectionList
            sortValue={sortValue}
            handleSortValue={handleSortValue}
            inspectiionList={historyList}
            forHistory
            setDetails={setinspectionDetail}
            handleForMainScreen={handleScreen}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreenUpdate('inspectionHistoryDetails')}
          />
        );
    }
  };
  return displayInspectionHistoryScreen(screen);
};

export default InspectionHistoryScreen;
