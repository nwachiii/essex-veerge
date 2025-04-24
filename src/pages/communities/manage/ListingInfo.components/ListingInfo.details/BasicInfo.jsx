import {useState} from 'react';
import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'; // Import icons

import videoFallback from '/src/images/video-fallback.png';
import imageFallback from '/src/images/image-fallback.png';
import {themeStyles} from '../../../../../theme';
import {AnimatePresence, LayoutGroup} from 'framer-motion';
import {EmbedVideoForFullScreenView} from '../../../../../ui-lib/ui-lib.components/EmbedVideo';
import ViewImage from './ViewImage';
import ReactElasticCarousel from 'react-elastic-carousel';

const scrollBar = {
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const renderArrow = ({ type, onClick, isEdge }) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      disabled={isEdge}
      zIndex="10"
      borderRadius="full"
      _hover={{ bg: 'gray.200' }}
      left={type === 'PREV' ? '0' : undefined}
      right={type === 'NEXT' ? '0' : undefined}
    >
      {type === 'PREV' ? <ChevronLeftIcon boxSize={8} /> : <ChevronRightIcon boxSize={8} />}
    </Box>
  );
};

export const BasicInfo = ({listingDetail}) => {
  const [direction, setDirection] = useState(0);
  const [viewId, setViewId] = useState(0);
  const VIEW_IMAGE = useDisclosure();
  const CURRENT_DISPLAY_PICTURE = listingDetail?.profile
    ? listingDetail?.profile
    : listingDetail?.photos
      ? listingDetail?.photos[0]?.photo
      : imageFallback.src;
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(CURRENT_DISPLAY_PICTURE);
  const handlePhotoView = (src, idx) => {
    setBigPhotoViewSrc(src);
    setViewId(idx);
    idx <= direction ? setDirection(-1) : setDirection(1);
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
         <ReactElasticCarousel
          itemsToShow={4}
          pagination={false}
          renderArrow={renderArrow} // Use the custom renderArrow function
         >
          {listingDetail?.photos?.map((photo, index) => {
            return (
              <Image
                src={photo?.photo}
                key={index}
                alt='photo'
                rounded='12px'
                w='112.785px'
                h='108.769px'
                border={bigPhotoViewSrc === photo?.photo ? '1.5px solid #4545FE' : 'none'}
                cursor='pointer'
                onClick={() => setBigPhotoViewSrc(photo?.photo)}
              />
            )
          })}
         </ReactElasticCarousel>
        </VStack>
      </LayoutGroup>
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
