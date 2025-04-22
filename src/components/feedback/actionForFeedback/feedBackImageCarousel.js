import React from 'react';
// import { AngledIcon } from "../../../assets/angledIcon";

import Carousel, {consts} from 'react-elastic-carousel';

import {Flex, Image, Button, Text} from '@chakra-ui/react';
import {AngledIcon} from '@/components/assets/angledIcon';

const FeedBackImageCarousel = ({imageArray}) => {
  const customCarouselStyles = {
    '.rec-slider-container': {
      margin: '0px 0px',
      width: '100%',
    },
    '.rec-item-wrapper': {
      width: '61.734px !important',
    },
    '.rec-swipable': {
      display: 'flex',
      'justify-content': 'start',
      gap: '8px',
    },
  };
  const breakPoints = [{width: 1, itemsToShow: 4}];

  const renderArrows = ({type, onClick, isEdge}) => {
    return (
      <Button
        onClick={onClick}
        minW={isEdge ? '0px' : '17px'}
        w={isEdge ? '0px' : '17px'}
        transition="0.3s ease-in-out"
        overflowX="hidden"
        maxW="fit-content"
        bg="transparent"
        _hover={{bg: 'transparent'}}
        _active={{bg: 'transparent'}}
        _focus={{bg: 'transparent'}}
        p="0px"
        pr="0px"
        left={type === consts.PREV ? '0px' : 'initial'}
        right={type === consts.PREV ? 'initial' : '0px'}
        zIndex={2}
        top="50%"
        transform="translateY(-50%)"
        h="fit-content"
        isDisabled={isEdge}
      >
        <AngledIcon rotate={type === consts.PREV ? '180deg' : '0deg'} />
      </Button>
    );
  };
  return (
    <Flex
      h="61.734px"
      position="relative"
      w="full"
      mt="16px"
      justifyContent="center"
      sx={customCarouselStyles}
      overflowX="auto"
    >
      {imageArray?.length ? (
        <Carousel
          pagination={false}
          itemPadding={[0, 0, 0, 0]}
          enableAutoPlay={false}
          breakPoints={breakPoints}
          renderArrow={renderArrows}
        >
          {imageArray?.map((item, index) => {
            return (
              <Image
                key={index}
                src={item?.image ?? ''}
                alt="image"
                aspectRatio="1.0369"
                width="64.013px"
                height=" 61.734px"
                fontSize="8px"
                objectFit="cover"
                borderRadius="10.102px"
                bg="#4848484D"
              />
            );
          })}
        </Carousel>
      ) : (
        <Text textAlign="center" w="full" alignSelf="center" fontSize="14px" fontWeight="400">
          {"Currently, there isn't a supporting image. Kindly refresh."}
        </Text>
      )}
    </Flex>
  );
};

export default FeedBackImageCarousel;
