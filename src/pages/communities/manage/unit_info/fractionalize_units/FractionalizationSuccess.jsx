import {Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {Button, Popup} from '../../../../../ui-lib/ui-lib.components';
import successGif from '/src/images/check-icon.gif';

export const FractionalizationSuccess = ({FRACTIONALIZE_SUCCESS}) => {
  return (
    <div>
      <Popup
        pt="45px"
        pb="15px"
        h="392px"
        isCentered
        minW="425px"
        isOpen={FRACTIONALIZE_SUCCESS.isOpen}
        onClose={FRACTIONALIZE_SUCCESS.onClose}
      >
        <Image alt="" src={successGif.src} w="108px" mb="25px" mx="auto" />
        <Text textAlign="center" fontSize="24px" fontWeight={600}>
          Fractionalization Successfully.
        </Text>
        <Popup.Body>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              You have successfully fractionalized this unit.
            </Text>
          </VStack>
          <Button
            onClick={FRACTIONALIZE_SUCCESS.onClose}
            variant="primary"
            mx="auto"
            w="321px"
            h="55px"
          >
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default FractionalizationSuccess;
