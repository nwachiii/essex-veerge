import {Fragment, useEffect, useState} from 'react';
import {
  Box,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';

import videoFallback from '/src/images/video-fallback.png';
import imageFallback from '/src/images/image-fallback.png';
import {themeStyles} from '../../../../../theme';
import {ContactPersons} from './ContactPersons';
import {ScheduledInspection} from './ScheduledInspection';
import {motion, AnimatePresence, LayoutGroup} from 'framer-motion';
import {useQuery} from '@tanstack/react-query';
import Carousel from 'react-elastic-carousel';
import {fetchRolesAccepted} from '../../../../../apis/settings';
import Commissions from '../../../create/Publish/Commissions';
import PublishModal from '../../../create/ListingDetails/ListingDetails.components/PublishModal';
import AddContactModal from '../../../create/Publish/AddContactModal';
import {EmbedVideoForFullScreenView} from '../../../../../ui-lib/ui-lib.components/EmbedVideo';
import carrouselArrow from '/src/images/icons/paymentplanNavArrow.svg';
import ViewImage from './ViewImage';

const scrollBar = {
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const BasicInfo = ({listingDetail, isCreate}) => {
  const [photoViewSrc, setPhotoViewSrc] = useState(
    listingDetail?.photo_urls ? listingDetail?.photo_urls?.[0] : imageFallback.src
  );

  const [direction, setDirection] = useState(0);
  const [viewId, setViewId] = useState(0);
  const VIEW_IMAGE = useDisclosure();
  const CURRENT_DISPLAY_PICTURE = listingDetail?.profile
    ? listingDetail?.profile
    : listingDetail?.photos
      ? listingDetail?.photos[0]?.photo
      : imageFallback.src;
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(CURRENT_DISPLAY_PICTURE);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const FETCH_ROLES_DATA = useQuery(['fetchAcceptedRoles'], fetchRolesAccepted);
  const FETCH_ROLES__RESULTS =
    FETCH_ROLES_DATA?.data && FETCH_ROLES_DATA?.data?.data?.results?.map(item => item);

  const handlePhotoView = (src, idx) => {
    setPhotoViewSrc(src);
    setBigPhotoViewSrc(src);
    setViewId(idx);
    setCurrentImageIndex(idx); //
    idx <= direction ? setDirection(-1) : setDirection(1);
  };

  const resetCurrentImageIndex = () => {
    setPhotoViewSrc(bigPhotoViewSrc);
  };

  // isCreate useCase
  const checkedContacts = checkedItems
    .map(item => FETCH_ROLES__RESULTS.filter(entry => entry?.id == item))
    .map(([i]) => i);

  const handleRemove = arg => {
    const copy = [...checkedItems];
    for (let index = 0; index < checkedItems.length; index++) {
      if (copy[index] === arg?.id) {
        copy.splice(index, 1);
        index = copy.length;
      }
      setCheckedItems(copy);
    }
  };

  return (
    <Box maxW={{base: 'full', lg: 'full'}} w="full" h="full">
      <LayoutGroup type="crossfade">
        <VStack align="flex-start" pos="relative">
          <Flex w="full" justify={{base: 'initial', base: 'space-between'}} columnGap="25px">
            <AnimateImagePresence
              layoutId={viewId}
              direction={direction}
              sourceUrl={bigPhotoViewSrc}
              onClick={VIEW_IMAGE.onOpen}
              videoUrl={listingDetail?.youtube_url}
              cursor={'zoom-in'}
              w="full"
              maxW="full"
              aspectRatio={1.618}
              borderRadius="20px"
            />
          </Flex>
          {listingDetail?.photo_urls?.length > 1 ? (
            <SimpleGrid columns={1} spacing="18px" pt="8px" w="full">
              {listingDetail?.reels?.length > 0 && (
                <Image
                  alt=""
                  {...themeStyles.imageFallback}
                  src={listingDetail?.reels[0] ?? videoFallback.src}
                />
              )}
              <Flex w="full" sx={scrollBar} overflowX="auto">
                {listingDetail?.photo_urls?.map((item, idx) => (
                  <AnimatePresence key={idx}>
                    <Image
                      alt=""
                      h="90px"
                      w="105px"
                      mx={'6px'}
                      zIndex={2}
                      cursor="pointer"
                      position="relative"
                      borderRadius="16px"
                      objectFit={'cover'}
                      {...themeStyles.imageFallback}
                      src={item?.photo || item || imageFallback.src}
                      onClick={() => handlePhotoView(item?.photo || item, idx)}
                    />
                  </AnimatePresence>
                ))}
                {/* </Carousel> */}
              </Flex>
            </SimpleGrid>
          ) : null}
        </VStack>
      </LayoutGroup>
      <ViewImage
        modal={VIEW_IMAGE}
        currentImageIndex={currentImageIndex}
        photos={listingDetail?.photos}
        setCurrentImageIndex={setCurrentImageIndex}
        resetCurrentImageIndex={resetCurrentImageIndex}
      />
    </Box>
  );
};
export default BasicInfo;

export const AnimateImagePresence = ({
  sourceUrl,
  refetch,
  videoUrl,
  layoutId,
  onClick,
  ...rest
}) => {
  const variants = {
    enter: direction => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 1,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: direction => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <AnimatePresence>
      <Box w="full" position="relative">
        <Image
          onClick={onClick}
          alt=""
          h={{md: '440px', xl: '420px'}}
          w={{md: '276px', lg: '310px', xl: '465px'}}
          maxW="465px"
          src={sourceUrl || imageFallback.src}
          objectFit={'cover'}
          borderRadius="36px"
          lazy={true}
          {...rest}
        />

        {videoUrl ? <EmbedVideoForFullScreenView videoId={videoUrl?.slice(-11)} /> : null}
      </Box>
      {/* </motion.div> */}
    </AnimatePresence>
  );
};
