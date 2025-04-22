import {AbsoluteCenter, Button, DrawerContent, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import successGif from '/src/images/check-icon.gif';

const SuccessForArchiving = ({add, handleClose}) => {
  return (
    <DrawerContent
      position="relative"
      zIndex={100}
      mt="65.12px"
      // mt="112.12px"
      minW="499px"
      bg="#fff"
      p="0px"
    >
      <AbsoluteCenter>
        <VStack spacing="27px" align="center">
          <Image src={successGif.src} w="88px" alt="success icon" />
          <Text textAlign="center" w="265px" color="#0D0D0D" fontSize="24px" fontWeight="600">
            {add ? 'Units added to archive' : 'Units removed from archive'}
          </Text>
          <Button
            type="button"
            w="431px"
            h="55px"
            py="16px"
            bg="#191919"
            color="#fff"
            onClick={handleClose}
            _hover={{opacity: '1'}}
            borderRadius="12px"
            fontWeight="400"
            fontSize="18px"
          >
            Ok
          </Button>
        </VStack>
      </AbsoluteCenter>
    </DrawerContent>
  );
};

export default SuccessForArchiving;
