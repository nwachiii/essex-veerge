import {
  Modal,
  ModalOverlay,
  ModalContent,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useFormik} from 'formik';
import React from 'react';

import {updateTwoFac} from '/src/apis/settings';
import {Button, Input, Popup2} from 'ui-lib/ui-lib.components';
import {OTPInput} from 'chakra-otp-input';
import TurnOffTwoFa from '@/components/Modals/twofa/components/TurnOffTwoFa';

export const TurnOffTwoFactor = ({isModalOpen, onModalClose, refetch}) => {
  return (
    <Drawer isOpen={isModalOpen} onClose={onModalClose} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent pt="67px">
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
          bg="#F5F5F5"
        >
          <HStack spacing="8px">
            <Text textTransform={'capitalize'} fontSize="20px" fontWeight={600} color="#191919">
              Turn off 2FA
            </Text>
          </HStack>
          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <TurnOffTwoFa onModalClose={onModalClose} />
      </DrawerContent>
    </Drawer>
  );
};

export default TurnOffTwoFactor;
