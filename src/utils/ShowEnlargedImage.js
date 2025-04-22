import {Image} from '@chakra-ui/react';
import React from 'react';
import {Popup} from '../ui-lib';

export const ShowEnlargedImage = ({imgSrc, modalTriger}) => {
  return (
    <Popup
      hideCloseBtn
      pb="0"
      px={0}
      pt={0}
      h="fit-content"
      minH="383px"
      minW={{base: '90%', md: '683px'}}
      isOpen={modalTriger.isOpen}
      onClose={modalTriger.onClose}
      isCentered
      size="full"
      mt="7vh"
    >
      <Popup.Body bg="transparent" my={0}>
        <Image borderRadius={'12px'} w="full" h="583px" src={imgSrc} alt="enlarged-image" />
      </Popup.Body>
    </Popup>
  );
};
