import React, {useState} from 'react';
import {HistoryAndInspectionList} from '/src/components/Drawers/scheduledInspection/screens/HistoryAndInspectionList';
import {InspectionDetails} from '/src/components/Drawers/scheduledInspection/components/InspectionDetails';
import {useRouter} from 'next/router';
import {fetchListingInspection} from '../../../../apis/listings';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

export const UpcomingInspectionScreen = ({customScrollbarStyles, handleScreen, historyLength}) => {
  const [screen, setScreen] = useState('inspectionList');
  const [sortValue, setSortValue] = useState('latest_to_oldest');

  const [detail, setinspectionDetail] = useState({});

  const router = useRouter();
  const routeQueries = router.query;

  const param = `${routeQueries?.listingId}/?sort=${sortValue}`;

  const {data, isError, isLoading, error, refetch} = useQuery(['inspectionforListing', param], () =>
    fetchListingInspection(param)
  );

  useEffect(() => {
    const fetch = async () => {
      return await refetch();
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue]);

  const inspectionDetails = data?.data?.data?.find(item => item?.id === detail);

  const handleScreenUpdate = prop => () => {
    return setScreen(prop);
  };
  const displayUpcomingInspectionScreen = key => {
    switch (key) {
      case 'inspectionList':
        return (
          <HistoryAndInspectionList
            sortValue={sortValue}
            handleSortValue={setSortValue}
            historyLength={historyLength}
            inspectiionList={data?.data?.data}
            customScrollbarStyles={customScrollbarStyles}
            setDetails={setinspectionDetail}
            handleScreen={() => handleScreenUpdate('inspectionDetails')}
            handleForMainScreen={handleScreen}
          />
        );
        break;
      case 'inspectionDetails':
        return (
          <InspectionDetails
            inspectionDetails={inspectionDetails}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={() => handleScreenUpdate('inspectionList')}
            handleForMainScreen={handleScreen}
          />
        );
        break;

      default:
        return (
          <HistoryAndInspectionList
            sortValue={sortValue}
            handleSortValue={setSortValue}
            historyLength={historyLength}
            setDetails={setinspectionDetail}
            inspectiionList={data?.data?.data}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={() => handleScreenUpdate('inspectionList')}
            handleForMainScreen={handleScreen}
          />
        );
    }
  };
  return displayUpcomingInspectionScreen(screen);
};

export default UpcomingInspectionScreen;
