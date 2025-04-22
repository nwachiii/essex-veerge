import {
  HStack,
  Tag,
  Button,
  Image,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  TagLabel,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import Carousel, {consts} from 'react-elastic-carousel';
import threeDots from '/src/images/icons/threeDotsIcon.svg';
import arrowForCarousel from '/src/images/icons/ArrowForCarousel.svg';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import CancelInspection from '@/components/Modals/cancelInspection';

const PendingInspectionCarousel = ({data, refetch}) => {
  const [listingId, setListingId] = useState('');
  const timeArray = item => item?.month?.split(' ');
  const cancelInspectionDisclosure = useDisclosure();

  const storeListingId = id => () => {
    setListingId(id), cancelInspectionDisclosure.onOpen();
  };

  const customCarouselStyles = {
    '.rec-slider-container': {
      margin: '0px 0px',
    },
    '.rec-item-wrapper': {
      // display: 'flex',
      // 'justify-content': 'start',
      width: '167px !important',
    },
    '.rec-swipable': {
      display: 'flex',
      'justify-content': 'start',
      gap: '24px',
    },
  };

  const tourMethod = {
    video: {
      bg: '#E7FBF5',
      color: '#064B38',
      text: 'Virtual',
    },
    virtual: {
      bg: '#E7FBF5',
      color: '#064B38',
      text: 'Virtual',
    },
    'in-person': {
      bg: '#4545FE1A',
      color: '#4545FE',
      text: 'In Person',
    },
  };
  const breakPoints = [{width: 1, itemsToShow: 4}];

  const renderArrows = ({type, onClick, isEdge}) => {
    const pointer =
      type === consts.PREV ? (
        <Image src={arrowForCarousel.src} transform="rotate(180deg)" alt="left arrow icon" />
      ) : (
        <Image src={arrowForCarousel.src} alt="right arrow icon" />
      );

    return (
      <Button
        onClick={onClick}
        minW="fit-content"
        maxW="fit-content"
        bg="transparent"
        _hover={{bg: 'transparent'}}
        _active={{bg: 'transparent'}}
        _focus={{bg: 'transparent'}}
        p="0px"
        pr="0px"
        left={type === consts.PREV ? '16px' : 'initial'}
        right={type === consts.PREV ? 'initial' : '16px'}
        zIndex={2}
        top="50%"
        transform="translateY(-50%)"
        position="absolute"
        h="fit-content"
        isDisabled={isEdge}
        visibility={isEdge ? 'hidden' : 'visible'}
      >
        {pointer}
      </Button>
    );
  };
  return (
    <>
      <HStack
        justify="start"
        w="full"
        maxW="888px"
        bg="#fff"
        borderRadius="16px"
        border=" 0.5px solid  #E4E4E4"
        p="13px 56px"
        pr="0px"
        spacing="24px"
        overflowX="auto"
        sx={customCarouselStyles}
        position="relative"
      >
        <Carousel
          pagination={false}
          itemPadding={[0, 0, 0, 0]}
          enableAutoPlay={false}
          breakPoints={breakPoints}
          renderArrow={renderArrows}
        >
          {data.map((item, index) => (
            <VStack
              key={index}
              pt="12px"
              pb="18px"
              px="12px"
              border="1px solid #E4E4E4"
              maxW="167px"
              minW="167px"
              w="full"
              minH="226px"
              borderRadius="12px"
              justify="start"
              spacing="10px"
            >
              <Tooltip
                boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
                p="8px"
                color="#FF6A6A"
                fontSize="14px"
                fontWeight="400"
                bg="#fff"
                label="Cancel"
                borderRadius="4px"
              >
                <Image
                  onClick={storeListingId(item.id)}
                  src={threeDots.src}
                  cursor="pointer"
                  alt="three dots icon"
                  alignSelf="end"
                />
              </Tooltip>
              <HoverText
                text={item?.project?.name ?? '-'}
                color="#191919"
                fontSize="16px"
                fontWWeight="500"
                pr="0px"
                lens={10}
              />
              <VStack spacing="6px">
                <Text fontSize="14px" fontWeight="300" color="#344054">
                  {timeArray(item)?.[2] ?? '-'}
                </Text>
                <Text fontSize="22px" fontWeight="400" color="#344054">
                  {timeArray(item)?.[1] ?? '-'}
                </Text>
                <Text
                  fontSize="12px"
                  color="#667085"
                  fontWeight="400"
                >{`${timeArray(item)?.[0] ?? '-'}`}</Text>
              </VStack>
              <Tag
                p="8px 13px"
                minW="97px"
                minH="36px"
                bg={tourMethod[item?.tour_method?.toLowerCase()]?.bg ?? ''}
                color={tourMethod[item?.tour_method?.toLowerCase()]?.color ?? ''}
                borderRadius="full"
              >
                <TagLabel mx="auto" fontSize="16px" fontWeight="500">
                  {tourMethod[item.tour_method?.toLowerCase()]?.text ?? '-'}
                </TagLabel>
              </Tag>
            </VStack>
          ))}
        </Carousel>
      </HStack>
      <CancelInspection
        listingId={listingId}
        setListingId={setListingId}
        refetch={refetch}
        modalDisclosure={cancelInspectionDisclosure}
      />
    </>
  );
};

export default PendingInspectionCarousel;
