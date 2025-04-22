import {AspectRatio, Box, Stack} from '@chakra-ui/react';
import React from 'react';
import Carousel from 'react-elastic-carousel';

const styleCarousel = {
  '.rec': {
    height: '100%',
  },
  '.rec-carousel': {
    height: '100% !important',
  },
  '.rec-slider-container': {
    margin: '0px',
  },
};

const DashBoardCarousel = ({
  children,
  aspectRatio = 1.432,
  aspectRationStyle,
  paginationColors,
  carouselStyle,
  carouselWrapper,
}) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <AspectRatio ratio={aspectRatio} maxH="290px" w="full" {...aspectRationStyle}>
      <Stack
        pos="relative"
        spacing="none"
        border="0.5px #e4e4e4 solid"
        bg="#f5f5f5"
        h="full"
        borderRadius="12px"
        overflow="hidden"
        sx={styleCarousel}
        {...carouselWrapper}
      >
        <Carousel
          itemPadding={[0, 0]}
          showArrows={false}
          pagination={childrenArray.length > 1}
          renderPagination={({pages, activePage, onClick}) => (
            <Box
              pos="absolute"
              bottom="0"
              display="flex"
              justifyContent="center"
              gap="6.63px"
              my="8.8px"
            >
              {pages.map(page => (
                <Box
                  key={page}
                  boxSize="6.63px"
                  bg={
                    activePage === page
                      ? paginationColors?.[activePage]?.active || '#ffffff'
                      : paginationColors?.[activePage]?.inactive || '#FFFFFF33'
                  }
                  borderRadius="full"
                  blur="22px"
                  cursor="pointer"
                  transition="all 0.3s"
                  onClick={() => onClick(page)}
                />
              ))}
            </Box>
          )}
          {...carouselStyle}
        >
          {children}
        </Carousel>
      </Stack>
    </AspectRatio>
  );
};

export default DashBoardCarousel;
