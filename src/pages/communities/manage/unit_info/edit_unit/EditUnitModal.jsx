import React from 'react';
import {Popup} from '../../../../../ui-lib/ui-lib.components';
import {Box, Flex, HStack, Image, Stack, Text, VStack} from '@chakra-ui/react';

const EditUnitModal = () => {
  return (
    <Popup
      overflowY="auto"
      size="full"
      minH="662px"
      mt="16vh"
      minW={{base: '90%', md: '551px'}}
      color="#191919"
      // isOpen={PRICE_UPDATE_SUMMARY.isOpen}
      // onClose={PRICE_UPDATE_SUMMARY.onClose}
    >
      <Text gap="12px" px="32px" fontSize="24px" fontWeight={'600'}>
        Edit unit
      </Text>
      <Popup.Body h="auto" px="32px" position="relative">
        Edit unit
      </Popup.Body>
    </Popup>
  );
};

export default EditUnitModal;
