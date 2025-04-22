import React, {useState} from 'react';
import {Heading, Image, Text, Button, VStack, DrawerBody, DrawerFooter} from '@chakra-ui/react';
// import lockIcon from '/src/images/icons/lockFortwFa.svg';
import lockIcon from '/src/images/icons/lockForTwoFADark.svg';

export const Intro = ({handleScreen, customScrollbarStyles, handleClose}) => {
  return (
    <>
      <DrawerBody
        sx={customScrollbarStyles}
        mt="11px"
        px="20px"
        py="0px"
        textAlign={'center'}
        bg="#FBFCFC"
      >
        <VStack
          spacing="5px"
          w="full"
          mb="36px"
          bg="#fff"
          borderRadius={'16px'}
          border="0.478px solid  #E4E4E4"
          p="60px 16px"
        >
          <Image mb="24px" src={lockIcon.src} alt="lock icon" />

          <Heading fontSize="20px" fontWeight="600" color="#191919">
            Enable Two Factor Authentication
          </Heading>
          <Text fontSize="12px" textAlign="center" color="#3d3d3d" fontWeight="300">
            In order to set up 2FA, we need to verify your email address and phone number.
          </Text>
          <Button
            h="55px"
            color="#fff"
            w="96%"
            mx="auto"
            my="20px"
            variant="filled-radius"
            bg="#191919"
            // borderRadius="12px"
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
        </VStack>
      </DrawerBody>
    </>
  );
};

export default Intro;
