import React from 'react';
import RatingAndFeedBacks from './components/ratingAndFeedback';
import ListOfReviews from './screens/listOfReviews';
import {useRouter} from 'next/router';
import {Drawer, DrawerContent, DrawerOverlay, useToast} from '@chakra-ui/react';
import {toastForError} from 'utils/toastForErrors';
import ReviewDetail from './screens/reviewDetail';
import {useState} from 'react';
import {useEffect} from 'react';

export const SeeReviewDrawer = ({drawerDisclosure, feedbacks, refetch}) => {
  const [detail, setFeedbackDetailId] = useState({});
  const [screen, setScreen] = useState('reviews');

  const router = useRouter();

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
    setScreen('reviews');
    return drawerDisclosure.onClose();
  };

  const updatedFeedbackInfo = feedbacks.find(item => item.id === detail);

  //   useEffect(() => {
  //     const updatedFeedbackInfo = feedbacks.find(item => item.id === details.id);
  //     setFeedbackDetails(updatedFeedbackInfo);
  //   }, [feedbacks]);

  const displaySeeReviewScreens = key => {
    switch (key) {
      case 'reviews':
        return (
          <ListOfReviews
            // isLoading={isLoading}
            refetch={refetch}
            // isError={isError}
            info={feedbacks}
            setFeedbackDetailId={setFeedbackDetailId}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            screen={screen}
          />
        );
        break;
      case 'reviewDetails':
        return (
          <ReviewDetail
            // isLoading={isLoading}
            refetch={refetch}
            setFeedbackDetailId={setFeedbackDetailId}
            // isError={isError}

            info={updatedFeedbackInfo}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            screen={screen}
          />
        );
        break;

      default:
        return (
          <ListOfReviews
            // isLoading={isLoading}
            refetch={refetch}
            // isError={isError}
            setFeedbackDetailId={setFeedbackDetailId}
            info={feedbacks}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            screen={screen}
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

        minW="499px"
        bg="#fff"
        p="0px"
      >
        {displaySeeReviewScreens(screen)}
      </DrawerContent>
    </Drawer>
  );
};

export default SeeReviewDrawer;
