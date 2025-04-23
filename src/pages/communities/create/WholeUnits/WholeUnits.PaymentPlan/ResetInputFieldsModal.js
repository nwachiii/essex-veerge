import React from 'react';
import {Button, Popup} from '../../../../../ui-lib';
import {HStack, Image, Text, VStack} from '@chakra-ui/react';
import lock from '/src/images/icons/cancel_icon.png';

export const ResetInputFieldsModal = ({modal, resetFnc, forFees}) => {
  return (
    <div>
      <Popup
        minW="425px"
        minH="252px"
        pt="25px"
        pb="38px"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        isCentered
      >
        <Image alt="" src={lock.src} boxSize="88px" mt="25px" mx="auto" />

        <Popup.Body mb={4}>
          <VStack w="full" px={6} pt={2}>
            <Text fontSize="14px" textAlign="center">
              {`You are about to cancel this operation. Any ${
                forFees ? 'closing cost' : 'payment plan'
              } information entered will be lost. `}
            </Text>
          </VStack>
        </Popup.Body>
        <HStack w="full" justify={'flex-end'} spacing={'13px'}>
          <Button
            color="#191919"
            border={'1px solid #191919'}
            onClick={modal.onClose}
            bg="#EFEFEF"
            variant="primary"
            mx="auto"
            w="161px"
            borderRadius="72px"
            h="48px"
          >
            Back
          </Button>
          <Button
            borderRadius="72px"
            onClick={resetFnc}
            variant="dark"
            mx="auto"
            w="161px"
            h="48px"
          >
            Proceed
          </Button>
        </HStack>
      </Popup>
    </div>
  );
};

export default ResetInputFieldsModal;
