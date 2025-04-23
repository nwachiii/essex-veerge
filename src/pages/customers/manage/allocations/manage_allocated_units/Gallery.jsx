import React, {useState} from 'react';
import {Box, Center, Flex, Grid, Image, Text, VStack, useDisclosure} from '@chakra-ui/react';
import {Popup} from 'ui-lib/ui-lib.components';
import ViewImage from '../../ListingInfo.components/ListingInfo.details/ViewImage';

const AllocationImageGallery = ({setActiveImg, activeImg, uploads}) => {
  const VIEW_IMAGE = useDisclosure();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (upload, idx) => {
    setActiveImg(upload);
    setCurrentImageIndex(idx);
    VIEW_IMAGE.onOpen();
  };

  return (
    <>
      {uploads.length ? (
        <div>
          <Grid templateColumns={'repeat(5, 1fr)'} gap={4}>
            {uploads?.map((upload, index) => (
              <Flex key={index} align="center" h="full">
                <Box pos="relative" h="full">
                  <VStack
                    borderRadius="12px"
                    maxW={'120px'}
                    w="100%"
                    aspectRatio={'1 / 1'}
                    border={'1px solid #e4e4e4'}
                  >
                    <Image
                      alt=""
                      cursor={'pointer'}
                      onClick={() => handleImageClick(upload, index)}
                      src={upload}
                      width="full"
                      height="full"
                      borderRadius="12px"
                      opacity={1}
                    />
                  </VStack>
                </Box>
              </Flex>
            ))}
          </Grid>
        </div>
      ) : null}
      <ViewImage
        modal={VIEW_IMAGE}
        src={activeImg}
        currentImageIndex={currentImageIndex}
        photos={uploads}
        setPhotoViewSrc={setActiveImg}
        setCurrentImageIndex={setCurrentImageIndex}
        resetCurrentImageIndex={() => setActiveImg(activeImg)}
      />
    </>
  );
};

export default AllocationImageGallery;
