import {Box, Flex, Image, ModalCloseButton, useMediaQuery} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {IoChevronBack, IoChevronForward} from 'react-icons/io5';
import {Popup} from '../../../../../ui-lib/ui-lib.components';

export default function ViewImage({
  modal,
  currentImageIndex,
  setCurrentImageIndex,
  photos,
  resetCurrentImageIndex,
  src,
}) {
  const photoSrc = src ?? photos?.[currentImageIndex]?.photo;

  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');
  return (
    <div>
      <Popup
        // mt="6vh"
        transform={isShortScreenHeight ? 'scale(0.7) !important' : 'none'}
        size="full"
        minH="200px"
        // minH="679px"
        color="#191919"
        overflowY="auto"
        isOpen={modal.isOpen}
        onClose={() => {
          modal.onClose();
          resetCurrentImageIndex();
        }}
        // minW={{base: '90%', md: 'fit-content'}}
        maxW={{base: '90%', md: '1190px'}}
        bg="gray"
        pos="relative"
        closeButtonColor={'#fff'}
        style={{...glassmorphicBg}}
      >
        <Popup.Body h="auto">
          <Flex maxH="600px" width={'100%'} justifyContent="space-between" alignItems={'center'}>
            {/* <div> */}
            {currentImageIndex > 0 && (
              <Box
                as={'button'}
                position="absolute"
                left="5px"
                onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
              >
                <IoChevronBack size={'30'} />
              </Box>
            )}
            {/* </div> */}
            <Image
              mx="auto"
              src={photoSrc}
              alt=""
              width={'93%'}
              height="100%"
              objectFit={'contain'}
            />

            {currentImageIndex < photos?.length - 1 && (
              <Box
                as={'button'}
                position="absolute"
                right="5px"
                onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              >
                <IoChevronForward size={'30'} />
              </Box>
            )}
          </Flex>
        </Popup.Body>
      </Popup>
    </div>
  );
}

const glassmorphicBg = {
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};
