import React from 'react';
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import successIcon from '/src/images/animated_icons/successIcon.gif';

export const SuccessForJoinBeta = ({customScrollbarStyles, closeDrawer}) => {
  return (
    <>
      <HStack
        boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
        py="12px"
        bg="#F5F5F5"
        px="29px"
        justify="end"
        w="full"
        align="center"
        position="relative"
      >
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
      <DrawerBody sx={customScrollbarStyles} m="0px" px="35px" py="20px" pt="52.023px">
        <VStack
          w="full"
          borderRadius="5px"
          border="1px solid #e5e5e5"
          py="60px"
          px="14px"
          spacing="20px"
        >
          <Image w="auto" h="88px" src={successIcon.src} alt="success icon" />
          <Stack spacing="12px">
            <Text fontSize="16px" textAlign="center" fontWeight="500" color="#0D0D0D">
              {" You've joined the waitlist"}
            </Text>
            <Text fontSize="14px" textAlign="center" fontWeight="300" color="#606060">
              We will contact you as soon as we want you to join the test team.
            </Text>
          </Stack>
          <Button
            _hover={{opacity: 1}}
            bg="#191919"
            fontSize="14.429px"
            borderRadius="9.619px"
            fontWeight="400"
            color="#fff"
            h="43.65px"
            w="full"
            onClick={closeDrawer}
          >
            Ok
          </Button>
        </VStack>
      </DrawerBody>
    </>
  );
};

export default SuccessForJoinBeta;
