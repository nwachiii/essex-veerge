import React, {useEffect, useState} from 'react';

import UpcomingInspectionScreen from './screens/UpcomingInspectionScreen';
import InspectionHistoryScreen from './screens/InspectionHistoryScreen';
import {Box, Drawer, DrawerOverlay} from '@chakra-ui/react';
import {fetchListingInspection} from '../../../apis/listings';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';

export const ScheduledInspectionDrawer = ({modalDisclosure}) => {
  const [screen, setScreen] = useState('upcomingInspection');
  const [sortValue, setSortValue] = useState('latest_to_oldest');

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
    setScreen('upcomingInspection');
    return modalDisclosure.onClose();
  };

  const router = useRouter();
  const routeQueries = router.query;
  const param = `${routeQueries?.listingId}/?history=true&sort=${sortValue}`;

  const {data, isError, isLoading, refetch, error} = useQuery(['inspectionforListing', param], () =>
    fetchListingInspection(param)
  );

  useEffect(() => {
    const fetch = async () => {
      return await refetch();
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue]);

  const handleScreen = screen => () => setScreen(screen);

  const displayForScheduledInspectionOfListing = key => {
    switch (key) {
      case 'upcomingInspection':
        return (
          <UpcomingInspectionScreen
            historyLength={data?.data?.data?.length}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );
        break;
      case 'inspectionHistory':
        return (
          <InspectionHistoryScreen
            refetch={refetch}
            sortValue={sortValue}
            handleSortValue={setSortValue}
            historyList={data?.data?.data}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );
        break;

      default:
        return (
          <UpcomingInspectionScreen
            historyLength={data?.data?.data?.length}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );

        break;
    }
  };

  return (
    <Drawer
      isOpen={modalDisclosure.isOpen}
      // isOpen={true}
      onClose={handleClose}
      borderRadius="16px"
    >
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />

      {displayForScheduledInspectionOfListing(screen)}
    </Drawer>
  );
};

export default ScheduledInspectionDrawer;
