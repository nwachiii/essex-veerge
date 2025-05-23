import React from 'react';
import {Image, Text, useDisclosure, VStack} from '@chakra-ui/react';

import {Button, Popup} from '../ui-lib/ui-lib.components';
import lock from '/src/images/lock.png';

export const ComingSoonModal = ({btnText, isError, modalHeader, ...btnStyles}) => {
  const CreateDiscount = useDisclosure();
  return (
    <div>
      <Button
        my="0"
        mt={0}
        variant="default"
        borderRadius="12px"
        onClick={CreateDiscount.onOpen}
        {...btnStyles}
        isDisabled={isError}
      >
        {btnText}
      </Button>

      {/* Modal : Blacklist Info */}
      <Popup
        minW="425px"
        minH="392px"
        pt="35px"
        pb="15px"
        isOpen={CreateDiscount.isOpen}
        onClose={CreateDiscount.onClose}
        isCentered
      >
        <Popup.Header mx="auto" fontSize="24px" mt="35px" mb="25px" fontWeight={600}>
          {modalHeader}
        </Popup.Header>
        <Image src={lock.src} boxSize="88px" mx="auto" alt="" />

        <Popup.Body>
          <VStack w="full" px={0.2}>
            <Text fontSize="14px" textAlign="center" maxW="266px">
              This feature is currently in development and will be available in the next update 🎉
              🎊
            </Text>
          </VStack>
          <Button onClick={CreateDiscount.onClose} variant="primary" mx="auto" w="321px" h="55px">
            Okay
          </Button>
        </Popup.Body>
      </Popup>
    </div>
  );
};
