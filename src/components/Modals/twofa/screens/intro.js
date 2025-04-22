import React, {useState} from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Heading,
  Image,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import lockIcon from '/src/images/icons/lockFortwFa.svg';

export const Intro = ({handleScreen, customScrollbarStyles, handleClose}) => {
  return (
    <>
      <HStack mt="30px" justify="end" px="29px" align="center" position="relative">
        <ModalCloseButton onClick={handleClose} position="initial" />
      </HStack>
      <ModalBody sx={customScrollbarStyles} mt="11px" w="483px" px="29px" py="0px">
        <VStack spacing="none" w="full" mb="36px">
          <Image mb="36px" src={lockIcon.src} alt="lock icon" />

          <Heading mb="15px" fontSize="24px" fontWeight="600" color="#191919">
            Enable Two Factor Authentication
          </Heading>
          <Text fontSize="14px" textAlign="center" color="#3d3d3d" fontWeight="300">
            In order to set up 2FA, we need to verify your email address and phone number.
          </Text>
        </VStack>
      </ModalBody>

      <ModalFooter p="0px" px="29px" mb="65px">
        <Button
          h="55px"
          color="#fff"
          w="full"
          bg="#4545FE"
          borderRadius="72px"
          fontSize="18px"
          fontWeight="400"
          _hover={{
            opacity: 1,
          }}
          _active={{
            opacity: 1,
          }}
          onClick={handleScreen('emailotp')}
        >
          Proceed
        </Button>
      </ModalFooter>
    </>
  );
};

export default Intro;
